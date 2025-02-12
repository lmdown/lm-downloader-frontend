import { getBaseConfig, getEnvVariables } from '@/client-api/config-file'
import { AIAppDTO } from '@/types/AIAppDTO'
import LMDBaseConfig from '@/types/config/LMDBaseConfig'
import LMDGlobalEnv from '@/types/config/LMDGlobalEnv'

export const convertToCommandLines = (fullCommand: string) => {
  const lines: string[] = []
  const commandArr = fullCommand.split('\n')
  commandArr.forEach((command) => {
    if (command) {
      lines.push(command)
    }
  })
  return lines
}

export const genStopCommand = () => {
  return '\x03' // ctrl+c
}

export const genSetEnvCommand = (appEnv: object) => {
  let result = ''
  if(appEnv) {
    for(const key in appEnv) {
      result += `${key}=${appEnv[key]}\n`
    }
  }
  return result
}

export const genInstallCommand = async (lmAppData: AIAppDTO) => {
  const installName = lmAppData.installName
  const baseConfigData: LMDBaseConfig = await getBaseConfig()
  // const envVars: LMDGlobalEnv = await getEnvVariables()
  // envVars.PIP_CACHE_DIR = ''
  // let envStr = EnvUtil.convertToEnvFormat(baseConfigData, 'export ')
  // envStr += EnvUtil.convertToEnvFormat(envVars, 'export ')
  const scriptsDir = baseConfigData.LMD_SCRIPTS_DIR
  const fullCommand =
`
export LMD_BASE_INSTALL_SCRIPT_DIR="${scriptsDir}/lmd-install-scripts"
git clone --depth=1 https://gitee.com/lmdown/lmd-install-scripts $LMD_BASE_INSTALL_SCRIPT_DIR
cd $LMD_BASE_INSTALL_SCRIPT_DIR && git fetch origin master && git reset --hard origin/master
sh $LMD_BASE_INSTALL_SCRIPT_DIR/apps/${installName}/install.sh`
  return fullCommand
}

export const getSingleLineStartCommand = async (installName: string) => {
  const baseConfigData: LMDBaseConfig = await getBaseConfig()
  const scriptsDir = baseConfigData.LMD_SCRIPTS_DIR
  return `sh $${scriptsDir}/lmd-install-scripts/apps/${installName}/start.sh`
}

export const genStartCommand = async (lmAppData: AIAppDTO) => {
  const installName = lmAppData.installName
  const baseConfigData: LMDBaseConfig = await getBaseConfig()
  // const envVars: LMDGlobalEnv = await getEnvVariables()
  // envVars.PIP_CACHE_DIR = ''
  // let envStr = EnvUtil.convertToEnvFormat(baseConfigData, 'export ')
  // envStr += EnvUtil.convertToEnvFormat(envVars, 'export ')
  const scriptsDir = baseConfigData.LMD_SCRIPTS_DIR
  // ${envStr}
  const fullCommand =
`
export LMD_BASE_INSTALL_SCRIPT_DIR="${scriptsDir}/lmd-install-scripts"
sh $LMD_BASE_INSTALL_SCRIPT_DIR/apps/${installName}/start.sh`
  return fullCommand
}

export const genUpdateCommand = async (lmAppData: AIAppDTO) => {
  const installName = lmAppData.installName
  const baseConfigData: LMDBaseConfig = await getBaseConfig()
  // const envVars: LMDGlobalEnv = await getEnvVariables()
  // envVars.PIP_CACHE_DIR = ''
  // let envStr = EnvUtil.convertToEnvFormat(baseConfigData, 'export ')
  // envStr += EnvUtil.convertToEnvFormat(envVars, 'export ')
  const scriptsDir = baseConfigData.LMD_SCRIPTS_DIR
  const fullCommand = `
export LMD_BASE_INSTALL_SCRIPT_DIR="${scriptsDir}/lmd-install-scripts"
sh $LMD_BASE_INSTALL_SCRIPT_DIR/apps/${installName}/update.sh
`
  return fullCommand
}
