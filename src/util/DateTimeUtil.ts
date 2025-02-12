import LocaleUtil from "./LocaleUtil"
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // import locale
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

export default class DateTimeUtil {

  static getLocaleStr() {
    const locale = LocaleUtil.getCurrentLocale()
    const localeMap = {
      en: 'en-US',
      zhHans: 'zh-CN',
    }
    return localeMap[locale] || 'en-US'
  }

  static format(date: string | Date | undefined): string {
    if(date === undefined) {
      return ''
    }
    let dateObj: Date
    if(typeof date === 'string') {
      dateObj = new Date(date)
    } else {
      dateObj = date
    }
    if(LocaleUtil.localeIsEn()) {
      dayjs.locale('en')
    } else {
      dayjs.locale('zh-cn')
    }
    return dayjs(dateObj).fromNow()
    // return dateObj.toLocaleString('en-US')
    // return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  }
}
