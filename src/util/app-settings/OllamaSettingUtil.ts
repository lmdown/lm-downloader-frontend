import { getLanIP, getOSEnv, setOSEnv } from "@/api/common-util"
import { ALL_MODELS, APP_CONFIG } from "@/app-config/apps/ollama"
import AppBaseSettings from "@/types/app-running/AppBaseSettings"
import { DownloadableModel } from "@/types/app-running/DownloadableModel"
import DirInfo from "@/types/config/DirInfo"

export default class OllamaSettingUtil {

  static async getAppSettings(): Promise<AppBaseSettings> {
    // const ollamaAppEnv: object = await getOSEnv(
    //   // ['OLLAMA_MODELS', 'OLLAMA_HOST']
    // )
    const ollamaAppEnv = await this.getOSEnvObj()
    return {
      modelsDir: ollamaAppEnv['OLLAMA_MODELS'],
      externalAccessHost: ollamaAppEnv['OLLAMA_HOST']
    }
  }

  static async getOSEnvObj(): Promise<object> {
    const ollamaAppEnv: object = await getOSEnv(
      APP_CONFIG.DISPLAY_ENV
    )
    return ollamaAppEnv
  }

  static async getAccessHosts(externalAccessHost: string): Promise<string[]> {
    const defaultPort = '11434'
    const accessHosts: string[] = [`http://127.0.0.1:${defaultPort}`]
    if(!externalAccessHost || externalAccessHost === '127.0.0.1') {
      // default
    } else {
      // got host value, maybe include port.
      const hostDataArr = externalAccessHost.split(':')
      const ip = hostDataArr[0]
      let lanIPArr: string[] = [ip]
      const port = hostDataArr[1] || defaultPort
      if(ip === '0.0.0.0') {
        lanIPArr = await getLanIP()
      }
      if(lanIPArr && lanIPArr.length > 0) {
        lanIPArr.forEach((lanIP => {
          accessHosts.push(`http://${lanIP}:${port}`)
        }))
      }
    }
    return accessHosts
  }

  static async saveAppSettings(appBaseSettings: AppBaseSettings, defaultModelsDir: string) {
    // If modelsDir is equal to defaultModelsDir, submitSettingObj.modelsDir should be ''
    // Empty string will be saved.
    if(appBaseSettings.modelsDir === defaultModelsDir) {
      appBaseSettings.modelsDir = ''
    }
    const data = {
      OLLAMA_MODELS: appBaseSettings.modelsDir,
      OLLAMA_HOST: appBaseSettings.externalAccessHost
    }

    return await setOSEnv(data)
  }

  static filterSpecialFiles(fileNames) {
    if(!fileNames) return fileNames

    // 定义要过滤掉的文件名，不区分大小写
    const specialFiles = ['desktop.ini', '.ds_store', 'thumbs.db'];

    return fileNames.filter(fileName => {
        // 将当前文件名转换为小写后检查是否在特殊文件列表中
        const lowerCaseFileName = fileName.toLowerCase();
        return !specialFiles.includes(lowerCaseFileName);
    });
  }

  static checkModelsDirValid(dirInfo: DirInfo, requiredDirs: string[]): boolean {
    // 去掉不影响存储模型的系统文件
    dirInfo.subdirs = this.filterSpecialFiles(dirInfo.subdirs)
    dirInfo.files = this.filterSpecialFiles(dirInfo.files)

    // 如果没有任何子目录或文件，认为可用
    if (
      (!dirInfo.subdirs || dirInfo.subdirs.length === 0)
      && (!dirInfo.files || dirInfo.files.length === 0)
    ) {
      return true;
    }

    // 将子目录名称数组转换为Set以便快速查找
    const subDirsSet = new Set(dirInfo.subdirs);

    // 检查所有必需的目录是否存在
    const allRequiredExist = requiredDirs.every(dir => subDirsSet.has(dir));
    return allRequiredExist
  }

  static getDownloadableModels(): DownloadableModel[] {
    return ALL_MODELS
  }

}
