import { getUserHomeDir } from "@/api/common-util"
import { saveEnvVariables } from "@/client-api/config-file"
import LMDGlobalEnv from "@/types/config/LMDGlobalEnv"

export default class GlobalConfigUtil {

  static async getDefaultHFHomeDir(): Promise<string> {
    const homeDir = await getUserHomeDir()
    return homeDir + '/.cache/huggingface'
  }

  static async getHFHomeDirDisplay(envVars: LMDGlobalEnv): Promise<string> {
    if(!envVars.HF_HOME) {
      const defaultDir: string = await this.getDefaultHFHomeDir()
      return defaultDir
    } else {
      return envVars.HF_HOME
    }
  }

  static async saveGlobalEnvVars(envVars: LMDGlobalEnv) {
    const defaultDir: string = await this.getDefaultHFHomeDir()
    const submitEnvVars = Object.assign({}, envVars)
    if(submitEnvVars.HF_HOME === defaultDir) {
      submitEnvVars.HF_HOME = ''
    }
    return await saveEnvVariables(submitEnvVars)
  }

}
