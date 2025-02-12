import { getBaseConfig, getBaseConfigFromStorage, saveBaseConfig } from "@/client-api/config-file"
import { StorageKey } from "@/constant/StorageKey"
import { LocaleType } from "@/i18n"
import LMDBaseConfig from "@/types/config/LMDBaseConfig"

export default class LocaleUtil {

  static getSystemLocale() {
    return navigator.language
  }

  static getDefaultLocale() {
    let lmdLocale = 'en'
    try {
      const systemLocale = this.getSystemLocale()
      const mainLocale = systemLocale.split('-')[0]
      switch (mainLocale) {
        case 'en':
          lmdLocale = 'en'
          break;
        case 'zh':
          lmdLocale = 'zhHans'
          break;
        default:
          lmdLocale = 'en'
          break;
      }
    }catch(err) {
      console.log('get system locale error, use default en.', err)
    }
    return lmdLocale
  }

  /**
   *
   * @param locale
   * @returns
   */
  static getLocaleIcon(locale: string): string {
    let icon = ''
    switch (locale) {
      case 'en':
        icon = './images/icons/locale-en.png'
        break;
      case 'zhHans':
        icon = './images/icons/locale-zhHans.png'
        break;
      default:
        icon = './images/icons/locale-en.png'
        break;
    }
    return icon
  }

  // 此函数主要是把locale存储到LocalStorage中，这个操作是同步的，所以不需要等待其完成
  static saveLocaleToStorage = (locale: LocaleType, configData: LMDBaseConfig) => {
    configData.LMD_LOCALE = locale
    saveBaseConfig(configData)
  }

  static getCurrentLocale() {
    let locale = 'en'
    try {
      const configData: LMDBaseConfig = getBaseConfigFromStorage()
      locale = configData.LMD_LOCALE
    } catch (err) {
      console.error('getCurrentLocale error: ', err)
    }

    return locale
  }

  static localeIsEn() {
    const locale = this.getCurrentLocale()
    if(locale === 'en') {
      return true
    } else {
      return false
    }
  }

}

