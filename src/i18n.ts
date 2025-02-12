import { createI18n } from 'vue-i18n';
import { zhHans as vuetifyZhHan, en as vuetifyEN } from "vuetify/locale"
import en from './locales/en.ts';
import zhHans from './locales/zhHans.ts';

export type LocaleType = 'en' | 'zh' | string

export const availableLocales: LocaleType[] = ['en', 'zh'];

export const messages = {
    en: {
      ...en,
      $vuetify: {
        ...vuetifyEN,
        // dataIterator: {
        //   rowsPerPageText: 'Items per page:',
        //   pageText: '{0}-{1} of {2}',
        // },
      },
    },
    zhHans: {
      ...zhHans,
      $vuetify: {
        ...vuetifyZhHan
      },
    },
  }

  const getI18n = (locale: string) => {
    const i18n = createI18n({
      legacy: false, // Vuetify does not support the legacy mode of vue-i18n
      locale: locale, // 设置默认语言
      fallbackLocale: 'en', // 设置回退语言
      messages
    })
    return i18n
  }

export default getI18n;
