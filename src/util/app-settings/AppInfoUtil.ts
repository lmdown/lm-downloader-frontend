import { getDirAndDiskInfo, getDirFileSize, getInstalledModelList } from "@/api/common-util"
import { OLLAMA_MODELS_KEY } from "@/app-config/apps/ollama"
import { killProcesses } from "@/client-api/lmd-system"
import { DownloadableModel } from "@/types/app-running/DownloadableModel"
import InstalledModel from "@/types/app-running/InstalledModel"
import LocalDirectoryInfo from "@/types/app-running/LocalDirectoryInfo"
import prettyBytes from "pretty-bytes"

export default class AppInfoUtil {

  static appIsOllama(installName: string | undefined | null) {
    return installName === 'ollama'
  }

  static appIsSillyTavern(installName: string | undefined | null) {
    return installName === 'sillytavern'
  }

  static async getModelFileSize(
    installName: string | undefined | null,
    dirPath: string | null
  ): Promise<LocalDirectoryInfo> {
    console.log('getModelFileSize', installName, dirPath)
    if (this.appIsOllama(installName) && dirPath) {
      if(dirPath) {
        const dirInfo: LocalDirectoryInfo = await getDirAndDiskInfo(dirPath)
        return dirInfo
      }
    }
    return {} as LocalDirectoryInfo
  }

  static async getModelsDir(
    installName: string | undefined | null,
    appEnv: object | undefined | null
  ): Promise<string> {
    if(this.appIsOllama(installName) && appEnv) {
      return appEnv[OLLAMA_MODELS_KEY]
    }
    return ''
  }

  static genModelDownloadCommand(
    appInstallName: string | null | undefined,
    installNameAndSize: string
  ): string {
    if(this.appIsOllama(appInstallName) && installNameAndSize) {
      return `
ollama pull ${installNameAndSize}`
    }
    return ''
  }

  static genModelDeleteCommand(
    appInstallName: string | null | undefined,
    installNameAndSize: string
  ): string {
    if(this.appIsOllama(appInstallName) && installNameAndSize) {
      return `
ollama rm ${installNameAndSize}`
    }
    return ''
  }

  // 把本机已经安装的模型，以及我们提供的有限的模型列表进行合并。
  static async mergeModelsList(installName: string,
      downloadableModels: DownloadableModel[]): Promise<DownloadableModel[]> {
    if(installName) {
      const installedModelList: InstalledModel[] = await getInstalledModelList(installName)
      console.log('installedModelList', installedModelList)
      installedModelList.forEach(installedModelItem => {
        const [installName, parameterSize] = installedModelItem.name.split(':');
        // 模型的名称相等，就加到列表中
        const targetModel = downloadableModels.find(downloadableModel => {
          return downloadableModel.installName === installName
        })
        if(targetModel) {
          // 如果在tags中没找到相同的，才加入
          const targetTag = targetModel.tags.find(tag => tag.parameterSize === parameterSize)
          if(!targetTag) {
            targetModel.tags.push({
              parameterSize,
              fileSize: installedModelItem.size || '',
              installed: true
            })
          } else {
            targetTag.installed = true
          }
        } else {
          downloadableModels.push({
            displayName: installName,
            installName: installName,
            tags: [
              {
                parameterSize,
                fileSize: installedModelItem.size || '',
                installed: true
              }
            ],
          })
        }
      })
    }
    return downloadableModels
  }

  static killAppProcessed(appInstallName: string | null | undefined) {
    if(this.appIsOllama(appInstallName)) {
      const names = ['ollama.exe', 'ollama app.exe']
      killProcesses(names)
    }
  }

  static needPreStartApp(appInstallName: string | null | undefined): boolean {
    if(this.appIsOllama(appInstallName)) {
      return true
    }
    return false
  }

}
