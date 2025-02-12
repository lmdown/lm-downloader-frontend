import { IPCHandleName } from "@/constant/IPCHandleName"
import { addQueryParamsToPath } from "./QueryParam"
import { AppPagePath } from "@/router/AppPagePath"

export default class AppRunningUtil {

  static openAppRunningWindow(instanceId: string, script: string) {
    const path: string = AppPagePath.AppRunning
    let runningPagePath = path.replace(':id', instanceId)
    runningPagePath = addQueryParamsToPath(runningPagePath, {script})
    window.ipcRenderer?.invoke(IPCHandleName.OPEN_RUNNING_WINDOW, instanceId, runningPagePath)
  }

}
