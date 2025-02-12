import { IPCHandleName } from "@/constant/IPCHandleName";

export default class AboutUtil {

  static info() {
    window.ipcRenderer?.invoke(IPCHandleName.SHOW_ABOUT)
  }

}
