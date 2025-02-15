import { IPCHandleName } from '@/constant/IPCHandleName'

export const getProcessEnv = async (key: string) => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.GET_PROCESS_ENV, key)
  }
}

export const restartLMDApp = async () => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.RESTART_APP)
  }
}

export const exitLMDApp = async () => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.EXIT_APP)
  }
}

export const killProcesses = async (names: string[]) => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.KILL_PROCESSES, names)
  }
}

export const runCommand = async (command: string) => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.RUN_COMMAND, command)
  }
}


