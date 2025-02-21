import { getLanIP, getOSEnv, setOSEnv } from "@/api/common-util"
import { ALL_MODELS, APP_CONFIG } from "@/app-config/apps/ollama"
import AppBaseSettings from "@/types/app-running/AppBaseSettings"
import { DownloadableModel } from "@/types/app-running/DownloadableModel"

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

  static getDownloadableModels(): DownloadableModel[] {
    return JSON.parse(JSON.stringify(ALL_MODELS))
  }

}
