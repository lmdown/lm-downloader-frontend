import { createApp } from 'vue'
import App from './App.vue'
// const VuetifyPackage = await import('./libs/vuetify/3.7.6/vuetify.min.js');
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { useI18n } from 'vue-i18n'
import getI18n from './i18n'
import { createPinia } from 'pinia'

// console.log('VuetifyPackage', VuetifyPackage)
// import 'vuetify/styles'
// import '@mdi/font/css/materialdesignicons.css'
// import './main.css'

// 在前端渲染进程中，可接收主进程传来的数据
import './demos/ipc'
import router from './router'
import { getBaseConfig } from './client-api/config-file'
import LMDBaseConfig from './types/config/LMDBaseConfig'
import LocaleUtil from './util/LocaleUtil'

const pinia = createPinia()

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
const initVueApp = (baseConfigData: LMDBaseConfig) => {
  const locale = baseConfigData.LMD_LOCALE || LocaleUtil.getDefaultLocale()
  LocaleUtil.saveLocaleToStorage(locale, baseConfigData)
  const i18n = getI18n(baseConfigData.LMD_LOCALE)
  const vuetify = createVuetify({
    defaults: {
      global: {
        ripple: false,
      },
    },
    components,
    directives,
    locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
      // options: {
      //   customProperties: true,
      //   disableRipple: true,
      // },
      defaultTheme: 'light', // 设置默认主题为 'light' 或 'dark'
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#FA6400', // 主要颜色
            // secondary: '#b0bec5', // 次要颜色
            // accent: '#8c9eff', // 强调颜色
            // error: '#b71c1c', // 错误颜色
            // info: '#00acc1', // 信息颜色
            // success: '#4caf50', // 成功颜色
            // warning: '#ffeb3b', // 警告颜色
          },
        },
        dark: {
          dark: true,
          colors: {
            primary: '#FA6400',
            // secondary: '#03dac6',
            // accent: '#03dac6',
            // error: '#cf6679',
            // info: '#2196F3',
            // success: '#3DDC84',
            // warning: '#FFB74D',
          },
        },
      },
    },
  })

  const vueApp = createApp(App)

  // 监听未捕获的错误
  vueApp.config.errorHandler = (err, vm, info) => {
    console.error('Global Error Handler:', err, info)
    // 你可以在这里实现全局错误处理逻辑，例如显示错误提示框
  }

  vueApp
    .use(vuetify)
    .use(i18n)
    .use(router)
    .use(pinia)
    .mount('#app')

}

getBaseConfig().then((baseConfigData: LMDBaseConfig) => {
  initVueApp(baseConfigData)
})
