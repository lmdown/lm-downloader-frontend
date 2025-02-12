import { IPCHandleName } from '@/constant/IPCHandleName'

export const selectDirectory = async (defaultPath: string, needSubItems: boolean = false) => {
  if (window.ipcRenderer) {
    return await window.ipcRenderer?.invoke(IPCHandleName.SELECT_DIR, defaultPath, needSubItems)
  }
}

