import { defineStore } from 'pinia';
import { RunningInstanceVO } from '@/types/vo/RunningInstanceVO';
import TerminalTabItem from '@/types/app-running/TerminalTabItem';

export const useRunningInstanceStore = defineStore('runningInstance', {
  state: () => ({
    runningInstances: [] as RunningInstanceVO[],
    appSettingsSaved: false,
    terminals: [] as TerminalTabItem[],
    currentTerminalTab: ''
  }),
  actions: {
    addRunningInstance(instance: RunningInstanceVO) {
      // 如果传入的instance不存在，则加入到runningInstances
      const targetItem = this.runningInstances.find(item=>{
        return item.id === instance.id
      })
      if(!targetItem) {
        this.runningInstances.push(instance)
      }
    },
    removeRunningInstance(instance: RunningInstanceVO) {
      const targetIndex = this.runningInstances.findIndex(item => {
        return item.id === instance.id
      })
      if(targetIndex != -1) {
        this.runningInstances.splice(targetIndex, 1)
      }
    },
    resetAppSettingsSavedStatus() {
      this.appSettingsSaved = false
    },
    onAppSettingsSaved() {
      this.appSettingsSaved = true
    },
    changeMainTerminalScriptType(scriptType: string, msg: string) {
      try {
        const terminal = this.terminals[0]
        terminal.commandExecuteEndKeywords = [`lmd ${scriptType} script end.`]
        terminal.commandExecuteEndToastMsg = msg
      } catch (err) {
        console.error(err)
      }
    },
    initTerminal(tabDisplayText: string) {
      const mainProcessTerminal: TerminalTabItem = {
        icon: 'mdi-application-brackets-outline',
        text: tabDisplayText,
        tabName: 'main-process',
        closable: false,
        // commandExecuteEndKeywords: [`lmd ${action} script end.`]
      }
      this.terminals = [mainProcessTerminal]
      this.currentTerminalTab = mainProcessTerminal.tabName
    },
    addTerminal(terminalData: TerminalTabItem) {
      const targetTab = this.terminals.find(item => item.tabName === terminalData.tabName)
      if(!targetTab) {
        console.log('addTerminal', terminalData.commandExecuteEndKeywords)
        this.terminals.push(terminalData)
      }

      this.currentTerminalTab = terminalData.tabName
    },
    removeTerminal(item: TerminalTabItem, index: number) {
      this.currentTerminalTab = 'main-process'
      this.terminals.splice(index, 1)
    },
    addInstallModelTerminal(installNameAndSize: string, tabText: string, initCommand: string, endToastMsg: string) {
      const terminalData =
      {
        // icon: 'mdi-file-download-outline',
        text: tabText,
        tabName: tabText,
        initCommand: initCommand,
        closable: true,
        commandExecuteEndKeywords: ['digest', 'writing manifest', 'success'],
        commandExecuteEndToastMsg: endToastMsg
      }
      this.addTerminal(terminalData)
    },
    addDeleteModelTerminal(installNameAndSize: string, tabText: string, initCommand: string, endToastMsg: string) {
      const terminalData =
      {
        // icon: 'mdi-file-download-outline',
        text: tabText,
        tabName: tabText,
        initCommand: initCommand,
        closable: true,
        commandExecuteEndKeywords: [`deleted '${installNameAndSize}'`],
        // commandExecuteEndKeywords: [`Error: model '${installNameAndSize}' not found`], // If it dose not exist.
        commandExecuteEndToastMsg: endToastMsg
      }
      this.addTerminal(terminalData)
    }

  },
});
