import { IPCHandleName } from "@/constant/IPCHandleName"
import { addQueryParamsToPath } from "./QueryParam"
import { AppPagePath } from "@/router/AppPagePath"
import { AppScriptType } from "@/constant/AppScriptType"
import { UniversalAIAppDTO } from "@/types/universal-app/UniversalAIAppDTO"

export default class AppRunningUtil {

  static openAppRunningWindow(instanceId: string, script: string) {
    const path: string = AppPagePath.AppRunning
    let runningPagePath = path.replace(':id', instanceId)
    runningPagePath = addQueryParamsToPath(runningPagePath, {script})

    let reloadPage: boolean = false
    if(script === AppScriptType.INSTALL) {
      reloadPage = true
    }
    console.log('openAppRunningWindow', instanceId, script, reloadPage)
    window.ipcRenderer?.invoke(IPCHandleName.OPEN_RUNNING_WINDOW, instanceId, runningPagePath, reloadPage)
  }

  static openUniversalAppRunningWindow(uniAppDTO: UniversalAIAppDTO) {
    const path: string = AppPagePath.UniversalAppRunning
    let runningPagePath = path.replace(':name', encodeURIComponent(uniAppDTO.name))
    if(uniAppDTO.url) {
      runningPagePath = runningPagePath.replace(':url', encodeURIComponent(uniAppDTO.url))
    }
    if(uniAppDTO.icon) {
      runningPagePath = runningPagePath.replace(':icon', encodeURIComponent(uniAppDTO.icon))
    }
    window.ipcRenderer?.invoke(
      IPCHandleName.OPEN_RUNNING_WINDOW, uniAppDTO.name, runningPagePath
    )
  }

}
