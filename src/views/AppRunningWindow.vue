<template>
  <v-layout>
    <v-app-bar  elevation="1" class="px-2">
      <template v-slot:prepend>
        <v-img :src="lmAppData?.icon" width="60" height="60"></v-img>
        <v-card-title>
          {{ lmAppData?.name }}
        </v-card-title>
        <v-card-subtitle v-if="installedInstance?.version && installedInstance?.version !=='--' ">
          {{ $t('AppRunningWindow.Version') }} {{ installedInstance?.version }}
        </v-card-subtitle>
      </template>
      <template v-slot:append>
        <!-- reinstall -->
        <v-btn stacked v-show="updateBtnVisible" @click="reinstallApp">
          <template v-slot:prepend>
            <v-img src="./images/icons/lmd-logo.png" size="20" width="25" height="25"></v-img>
          </template>
          {{ $t('AppRunningWindow.Install') }}</v-btn>
        <!-- update -->
        <v-btn prepend-icon="mdi-autorenew" stacked v-show="updateBtnVisible" @click="updateApp">{{
          $t('AppRunningWindow.Update')
        }}</v-btn>
        <!-- stop -->
        <v-btn v-if="isAppRunning" stacked prepend-icon="mdi-stop" @click="stopApp()">{{
          $t('AppRunningWindow.Stop')
        }}</v-btn>
        <!-- start -->
        <v-btn v-else stacked prepend-icon="mdi-play" @click="startApp()">{{
          $t('AppRunningWindow.Start')
        }}</v-btn>
        <!-- restart -->
        <v-btn v-if="isAppRunning" stacked prepend-icon="mdi-refresh-circle" @click="restartApp()">
          {{ $t('AppRunningWindow.Restart') }}
        </v-btn>
        <!-- app settings -->
        <app-settings-btn :installedInstance="installedInstance"></app-settings-btn>
        <!-- <div>- updateBtnVisible {{ updateBtnVisible }}</div>
        <div>- runtimeUpdateAllowed {{ lmAppStore.currentLmApp.runtimeUpdateAllowed }}</div> -->
      </template>
    </v-app-bar>
    <v-main class="mx-1 running-window-main mb-3">
      <v-sheet fluid class="d-flex flex-column" style="height: 100%">
        <app-env-and-access
          ref="appEnvAndAccessComponent"
          @appEnvSavedAndUpdated="onAppEnvSavedAndUpdated"
          :lmAppData="lmAppData" v-if="installedInstance && lmAppData && envAndAccessAllowRender"
          :installedInstance="installedInstance"></app-env-and-access>
        <v-tabs class="mx-2"
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
        <v-tabs-window v-model="runningInstanceStore.currentTerminalTab" class="mx-2 my-0 px-0 pt-0 mb-0"
           style="flex: 1; background-color: black; ">
          <v-tabs-window-item v-for="(item, index) in runningInstanceStore.terminals" style="flex: 1;"
            :key="item.text" :value="item.tabName" eager>
            <GeneralTerminal
              @execute-end="onMainTerminalCommandEnd"
              :command-execute-end-keywords="item.commandExecuteEndKeywords"
              ref="generalTerminal" v-if="item.tabName === 'main-process'"
              socketURI="ws://localhost:19312"></GeneralTerminal>
            <GeneralTerminal
              @execute-end="onCommandExecuteEnd"
              v-else :command-execute-end-keywords="item.commandExecuteEndKeywords"
              :initCommand="item.initCommand" socketURI="ws://localhost:19312"></GeneralTerminal>
            <!-- <GeneralTerminal :ref="(el) => createTerminalRef(index, el as GeneralTerminalType)" v-else
              :initCommand="item.initCommand"
              socketURI="ws://localhost:19312"></GeneralTerminal> -->
          </v-tabs-window-item>
        </v-tabs-window>
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
const {t} = useLocale()

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
  autoStartMainProcess()
})

const initTerminals = () => {
  const mainProcessTerminal: TerminalTabItem = {
    icon: 'mdi-application-brackets-outline',
    text: t('AppRunningWindow.MainProcessTab'),
    tabName: 'main-process',
    closable: false,
    commandExecuteEndKeywords: ['lmd start script end.']
  }
  runningInstanceStore.initTerminal(mainProcessTerminal)
}

const restartApp = () => {
  stopApp()
  startApp()
}

const startApp = async () => {
  // runStopCommand()
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
  console.log('terminalComponent', terminalComponent, cmd)
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
  if (script === AppScriptType.INSTALL) {
    installApp()
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
  if(AppInfoUtil.needPreStartApp(installedInstance.value?.installName)) {
    startApp()
    if(OSUtil.isMacOS()) {
      setTimeout(()=>{
        onMainTerminalCommandEnd()
      }, 1000)
      return
    }
    return
  }

  onMainTerminalCommandEnd()
}

const onMainTerminalCommandEnd = () => {
  envAndAccessAllowRender.value = true
}

const onCommandExecuteEnd = () => {
  appEnvAndAccessComponent.value?.updateAppEnvData()
}

</script>
<style>
.running-window-main .v-tabs-window{
  height: 100%;
}
</style>
