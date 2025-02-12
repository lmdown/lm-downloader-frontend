import { AppPageName, AppPagePath } from '@/router/AppPagePath'

export const LMD_MAIN_MENU: LMDMainMenuItem[] = [
  // 极速下载首页
  {
    name: 'AppMenu.FastDownloadHome',
    subtitle: 'AppMenu.MyComputerResourcesSubtitle',
    icon: './images/nav/fast-download.png',
    iconActive: './images/nav/fast-download-active.png',
    path: AppPagePath.Home,
    routerName: AppPageName.Home,
  },

  // 已安装的AI
  {
    name: 'AppMenu.MyInstalledApps',
    subtitle: 'AppMenu.MyInstalledAppsSubtitle',
    icon: './images/nav/my-ai.png',
    iconActive: './images/nav/my-ai-active.png',
    path: AppPagePath.InstalledApps,
    routerName: AppPageName.InstalledApps,
  },

  // 我的电脑配置
  {
    name: 'AppMenu.MyComputerResources',
    subtitle: 'AppMenu.MyComputerResourcesSubtitle',
    icon: './images/nav/my-devices.png',
    iconActive: './images/nav/my-devices-active.png',
    path: AppPagePath.MyResource,
    routerName: AppPageName.MyResource,
  },
]

export interface LMDMainMenuItem {
  name: string
  subtitle: string
  icon: string
  iconActive: string
  path: string
  routerName: string
}
