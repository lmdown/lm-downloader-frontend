import { LMD_MAIN_MENU } from '@/app-config/menu'
import { AppPageName } from '@/router/AppPagePath';

export default class MainMenuUtil {
  static getCurrentIndex(routerName: string) {
    let index = LMD_MAIN_MENU.findIndex((item) => {
      return item.routerName === routerName
    })
    if(index === -1) {
      switch (routerName) {
        case AppPageName.UniversalAppCat:
          index = 0
          break;

        case AppPageName.AppDetail:
        case AppPageName.StoryPostDetail:
          index = 1
          break;

        default:
          break;
      }
    }
    return index
  }
}
