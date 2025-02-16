import { IPCHandleName } from '@/constant/IPCHandleName'
import LMDGlobalEnv from '@/types/config/LMDGlobalEnv'
import LMDBaseConfig from '@/types/config/LMDBaseConfig'
import { StorageKey } from '@/constant/StorageKey'
import LMDBaseConfigAndRootDir from '@/types/config/LMDBaseConfigAndRootDir'

export const getBaseConfig = async () => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.GET_BASE_CONFIG)
  } else {
    return JSON.parse(localStorage.getItem(StorageKey.LMD_BASE_CONFIG) || '{}')
  }
}

export const getBaseConfigFromStorage = () => {
  return JSON.parse(localStorage.getItem(StorageKey.LMD_BASE_CONFIG) || '')
}


export const getDefaultBaseConfig = async (): Promise<LMDBaseConfigAndRootDir | null> => {
  let configAndDir: LMDBaseConfigAndRootDir | null = null
  if (window.ipcRenderer) {
    try {
      configAndDir = await window.ipcRenderer?.invoke(IPCHandleName.GET_DEFAULT_CONFIG_AND_ROOT_DIR) || null
    } catch(err) {
      console.log(err)
      return null
    }
  }
  return configAndDir
}

export const getEnvVariables = async () => {
  return await window.ipcRenderer?.invoke(IPCHandleName.GET_ENV_VARIABLES)
}

export const saveBaseConfig = async (configData: LMDBaseConfig) => {
  const configDataStr = JSON.stringify(configData)
  localStorage.setItem(StorageKey.LMD_BASE_CONFIG, JSON.stringify(configData))
  // console.log('saveBaseConfig>>>>', configDataStr)
  if (window.ipcRenderer) {
    return window.ipcRenderer?.invoke(IPCHandleName.SAVE_BASE_CONFIG, configDataStr)
  }
}

export const saveEnvVariables = async (envVars: LMDGlobalEnv) => {
  const envVarsStr = JSON.stringify(envVars)
  // console.log('saveEnvVariables', envVars)
  // console.log('envVarsStr', envVarsStr)
  return window.ipcRenderer?.invoke(IPCHandleName.SAVE_ENV_VARIABLES, envVarsStr)
}

export const openPath = async (path: string) => {
  return await window.ipcRenderer?.invoke(IPCHandleName.OPEN_PATH, path)
}

