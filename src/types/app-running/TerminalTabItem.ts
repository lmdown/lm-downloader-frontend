export default interface TerminalTabItem {
  icon?: string
  text: string
  tabName: string
  closable: boolean
  initCommand?: string
  commandExecuteEndKeywords?: string[]
}
