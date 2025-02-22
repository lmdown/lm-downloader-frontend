<template>
  <v-layout>
    <v-app-bar elevation="0" class="px-6 running-app-bar" height="92"
      style=" background-color: #F3F3FA;" >
      <template v-slot:prepend>
        <div class="d-flex flex-row">
          <v-img :src="lmAppData?.icon"
              width="60" height="60"></v-img>
          <div class="d-flex flex-column justify-center">
            <v-card-title class="pt-1 pb-0">
              {{ lmAppData?.name }}
            </v-card-title>
            <v-card-subtitle class="py-0"
              v-if="installedInstance?.version && installedInstance?.version !=='--' ">
              {{ $t('AppRunningWindow.Version') }} {{ installedInstance?.version }}
            </v-card-subtitle>
          </div>
        </div>
      </template>
      <template v-slot:append>
        <!-- <v-btn height="100%" stacked v-show="updateBtnVisible" @click="reinstallApp">
          <template v-slot:prepend>
            <v-img src="./images/icons/lmd-logo.png" width="28" height="28" style="margin-bottom: 3px; margin-top: 3px"></v-img>
          </template>
          {{ $t('AppRunningWindow.Reinstall') }}
        </v-btn> -->
        <v-btn v-if="isAppRunning" variant="flat" color="#F2313F" class="mx-2" width="80" height="40"
          @click="stopApp()">
          {{$t('AppRunningWindow.Stop')}}
        </v-btn>
        <!-- start -->
        <v-btn v-else color="primary" variant="flat" class="mx-2" width="80" height="40"
          @click="startApp()">
          {{$t('AppRunningWindow.Start')}}
        </v-btn>
        <!-- app settings -->
        <!-- <app-settings-btn :installedInstance="installedInstance"></app-settings-btn> -->

      </template>
    </v-app-bar>
    <v-main class="running-window-main mb-0 d-flex">
      <!-- <v-row style="height: 100%;"> -->
        <v-sheet fluid class="d-flex flex-column" style="height: 100%; flex: 1; min-width: 0; overflow: hidden;">
          <v-tabs class="mx-0"
            v-model="runningInstanceStore.currentTerminalTab" align-tabs="start" color="primary" >
            <v-tab :value="item.tabName"
              :key="item.tabName" v-for="(item, index) in runningInstanceStore.terminals">
              <template v-slot:append>
                <v-icon v-if="item.closable" icon="mdi-close-circle-outline"
                  @click.stop="closeTab(item, index)"></v-icon>
              </template>
              {{item.text}}
            </v-tab>
          </v-tabs>
          <v-tabs-window v-model="runningInstanceStore.currentTerminalTab"
            class="mx-0 my-0 pt-0 mb-0"
            style="flex: 1; padding-left: 4px; background-color: black; padding-bottom: 6px;">
            <v-tabs-window-item v-for="(item, index) in runningInstanceStore.terminals" style="flex: 1;"
              :key="item.text" :value="item.tabName" eager>
              <GeneralTerminal
                @execute-end="onMainTerminalCommandEnd(item.commandExecuteEndToastMsg)"
                :command-execute-end-keywords="item.commandExecuteEndKeywords"
                ref="generalTerminal" v-if="item.tabName === 'main-process'"
                socketURI="ws://localhost:19312"></GeneralTerminal>
              <GeneralTerminal
                @execute-end="onCommandExecuteEnd(item.commandExecuteEndToastMsg)"
                v-else :command-execute-end-keywords="item.commandExecuteEndKeywords"
                :initCommand="item.initCommand" socketURI="ws://localhost:19312"></GeneralTerminal>
              <!-- <GeneralTerminal :ref="(el) => createTerminalRef(index, el as GeneralTerminalType)" v-else
                :initCommand="item.initCommand"
                socketURI="ws://localhost:19312"></GeneralTerminal> -->
            </v-tabs-window-item>
          </v-tabs-window>
        </v-sheet>
        <v-sheet class="running-app-right-side-bar">
          <app-env-and-access
            ref="appEnvAndAccessComponent"
            @appEnvSavedAndUpdated="onAppEnvSavedAndUpdated"
            :lmAppData="lmAppData" v-if="installedInstance && lmAppData && envAndAccessAllowRender"
            :installedInstance="installedInstance"></app-env-and-access>
        </v-sheet>
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { useLMAppStore } from '@/store/lmapp'
import { AIAppDTO } from '@/types/AIAppDTO'
import GeneralTerminal from '@/components/general-terminal/index.vue'
import { IPCChannelName } from '@/constant/IPCChannelName'
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO'
import { getInstalledInstance } from '@/api/install-instance'
import { AppScriptType } from '@/constant/AppScriptType'
import { genInstallCommand, genSetEnvCommand, genStartCommand, genUpdateCommand } from '@/util/AppCommandUtil'
import AppSettingsBtn from '@/components/running/app-settings-btn.vue'
import AppEnvAndAccess from '@/components/running/app-env-and-access.vue'
import { useLocale } from 'vuetify'
import { useRunningInstanceStore } from '@/store/running-instance'
import TerminalTabItem from '@/types/app-running/TerminalTabItem'
import OSUtil from '@/util/OSUtil'
import AppInfoUtil from '@/util/app-settings/AppInfoUtil'
import { ShowToastMessage } from '@/types/toast-message-type'

type GeneralTerminalType = InstanceType<typeof GeneralTerminal>
type AppEnvAndAccessType = InstanceType<typeof AppEnvAndAccess>

const route = useRoute()
const lmAppStore = useLMAppStore()
const lmAppData = ref<AIAppDTO | null>(null)

const generalTerminal = ref<GeneralTerminalType | null>()
const appEnvAndAccessComponent = ref<AppEnvAndAccessType | null>()

const installedInstance = ref<InstalledInstanceDTO|null>(null)
const isAppRunning = ref(false)

// some apps should start the main process, then render the component.
const envAndAccessAllowRender = ref(false)

const startTimeStr = ref('--')
const currentAction = ref('')

const {t} = useLocale()
const toast = inject<ShowToastMessage>('showToastMessage')

const runningInstanceStore = useRunningInstanceStore()

const updateBtnVisible = computed(() => {
  if (isAppRunning.value && !lmAppStore.currentLmApp.runtimeUpdateAllowed) {
    return false
  } else {
    return true
  }
})

onMounted(async () => {
  initTerminals()
  const instanceId = route.params.id as string
  const installedData: InstalledInstanceDTO = await getInstalledInstance(instanceId)
  installedInstance.value = installedData
  const appId = installedData.appId
  await lmAppStore.fetchApp(appId)
  lmAppData.value = lmAppStore.currentLmApp
  window.ipcRenderer?.on(IPCChannelName.STOP_AI_RUNNING_INSTANCE, (_event, ...args) => {
    stopApp()
    exitApp()
  })
  runDefaultScript()
  const appName = lmAppData?.value.name
  document.title = appName
  // autoStartMainProcess()
})

const getDefaultAction = (): string => {
  const script = route.query.script
  let action:string //  = AppScriptType.START
  if (script === AppScriptType.INSTALL) {
    action = script
  } else {
    action = currentAction.value
  }
  return action
}

const initTerminals = () => {
  const tabDisplayText = t('AppRunningWindow.MainProcessTab')
  runningInstanceStore.initTerminal(tabDisplayText)
}

const restartApp = () => {
  stopApp()
  startApp()
}

const changeMainTerminalScriptType = (scriptType: string) => {
  currentAction.value = scriptType
  let msg = ''
  if(scriptType === AppScriptType.INSTALL) {
    msg = t('AppRunningWindow.InstallSuccess')
  }
  console.log('changeMainTerminalScriptType', scriptType, msg)
  runningInstanceStore.changeMainTerminalScriptType(scriptType, msg)
}

const startApp = async () => {
  // runStopCommand()
  changeMainTerminalScriptType(AppScriptType.START)
  isAppRunning.value = true
  if (lmAppData.value) {
    const command = await genStartCommand(lmAppData.value)
    runCommand(command)
    window.ipcRenderer?.send(IPCChannelName.RUNNING_STATUS_CHANGE, true)
  }
}

const updateApp = async () => {
  // runStopCommand()
  if (lmAppData.value) {
    const command = await genUpdateCommand(lmAppData.value)
    runCommand(command)
  }
}

const reinstallApp = () => {
  installApp()
}

const getTerminalComponent = () => {
  if(Array.isArray(generalTerminal.value)){
    return generalTerminal.value[0]
  } else {
    return generalTerminal.value
  }
}
const runCommand = (cmd: string) => {
  const terminalComponent = getTerminalComponent()
  console.log('main terminal run command', terminalComponent, cmd)
  terminalComponent?.runCommand(cmd)
}

// const runStopCommand = () => {
//   generalTerminal.value?.runStopCommand()
// }

const stopApp = () => {
  isAppRunning.value = false
  clearStartTimeStr()
  getTerminalComponent()?.runStopCommand()
  window.ipcRenderer.send(IPCChannelName.RUNNING_STATUS_CHANGE, false)
}
const exitApp = () => {
  getTerminalComponent()?.exitTerminal()
}

const installApp = async () => {
  // runStopCommand()
  changeMainTerminalScriptType(AppScriptType.INSTALL)
  if (lmAppData.value) {
    const command = await genInstallCommand(lmAppData.value)
    runCommand(command)
  }
}

// const updateStartTimeStr = () => {
//   const now = new Date()
//   startTimeStr.value = now.toLocaleDateString()
// }

const closeTab = (item: TerminalTabItem, index: number) => {
  runningInstanceStore.removeTerminal(item, index)
}

const clearStartTimeStr = () => {
  startTimeStr.value = '--'
}

const runDefaultScript = () => {
  const script = route.query.script
  console.log('runDefaultScript', script)
  if (script === AppScriptType.INSTALL) {
    installApp()
    showEnvAndAccessRows()
  } else if (script === AppScriptType.START) {
    autoStartMainProcess()
  }
}

const onAppEnvSavedAndUpdated = (appEnv: object) => {
  if(OSUtil.isWindows()) {
    return
  }
  stopApp()
  const cmd = genSetEnvCommand(appEnv)
  getTerminalComponent()?.runCommand(cmd)
  startApp()
}

const autoStartMainProcess = async () => {
  startApp()
  if(AppInfoUtil.needPreStartApp(installedInstance.value?.installName)) {
    if(OSUtil.isMacOS()) {
      setTimeout(()=>{
        showEnvAndAccessRows()
      }, 1000)
      return
    }
    return
  }
  showEnvAndAccessRows()
}

const showEnvAndAccessRows = () => {
  envAndAccessAllowRender.value = true
}
const onMainTerminalCommandEnd = (toastMsg: string | undefined) => {
  showEnvAndAccessRows()
  console.log('onMainTerminalCommandEnd')
  onCommandExecuteEnd(toastMsg)
  // if (getDefaultAction() === AppScriptType.INSTALL) {
  //   if(toast) {
  //     const msg = t('AppRunningWindow.InstallSuccess')
  //     toast(msg, 'success')
  //   }
  // }
}

const onCommandExecuteEnd = (toastMsg: string | undefined) => {
  console.log('onCommandExecuteEnd', toastMsg)
  if(toast && toastMsg) {
    toast(toastMsg, 'success')
  }
  setTimeout(() => {
    appEnvAndAccessComponent.value?.updateAppEnvData()
  }, 400)

}

</script>
<style>
.running-window-main .v-tabs-window{
  height: 100%;
}

.running-app-bar .v-btn--stacked {
  font-size: 1rem;
}

.running-app-right-side-bar {
  width: 342px;
  padding: 12px 30px;
  border-left: 1px solid #DFDFEC;
  height: 100%;
  min-height: 100px;
  overflow: auto;
  height: calc(100vh - var(--v-layout-top));
}

a.settings-link-btn {
  color: #1E1D1D;
  font-size: 0.9rem;
}
</style>
