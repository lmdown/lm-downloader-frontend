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
    changeMainTerminalScriptType(scriptType: string) {
      try {
        const terminal = this.terminals[0]
        terminal.commandExecuteEndKeywords = [`lmd ${scriptType} script end.`]
      } catch (err) {
        console.error(err)
      }
    },
    initTerminal(mainProcessTerminal: TerminalTabItem) {
      this.terminals = [mainProcessTerminal]
      this.currentTerminalTab = mainProcessTerminal.tabName
    },
    addTerminal(tabName: string, tabText: string, initCommand: string) {
      const targetTab = this.terminals.find(item => item.tabName === tabName)
      if(!targetTab) {
        this.terminals.push({
          // icon: 'mdi-file-download-outline',
          text: tabText,
          tabName: tabName,
          initCommand: initCommand,
          closable: true,
          commandExecuteEndKeywords: ['digest', 'writing manifest', 'success'],
        })
      }
      this.currentTerminalTab = tabName
    },
    removeTerminal(item: TerminalTabItem, index: number) {
      this.terminals.splice(index, 1)
    },

  },
});
