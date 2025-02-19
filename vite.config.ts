import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import importToCDN from 'vite-plugin-cdn-import'
import VuetifyPlugin from 'vite-plugin-vuetify'
// import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // visualizer({
    //   open: true,
    // }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/store': ['useStore'],
        },
      ],
      dts: 'auto-imports.d.ts',
      vueTemplate: true,
    }),
    VuetifyPlugin(
      { styles: 'none' }
    ),
    vueJsx(),
    // vueDevTools(),
    importToCDN({
      modules: [
        // {
        //   name: 'vue',
        //   var: 'Vue',
        //   path: 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.5.13/vue.runtime.global.prod.min.js'

        // },
        // {
        //   name: 'vue-router',
        //   var: 'VueRouter',
        //   path: './libs/vue-router/4.5.0/vue-router.global.prod.min.js'
        // },
        // {
        //   name: 'vuetify',
        //   var: 'Vuetify',
        //   path: './libs/vuetify/3.7.6/vuetify.min.js',
        //   css: './libs/vuetify/3.7.6/vuetify.min.css'
        // },
        {
          name: 'axios',
          var: 'axios',
          path: './libs/axios/1.7.9/axios.min.js'
        },
        {
          name: '@xterm/xterm',
          var: 'window',
          path: './libs/xterm/5.5.0/xterm.js',
          css: './libs/xterm/5.5.0/xterm.min.css'
        },
        // {
        //   name: 'vue-demi',
        //   var: 'VueDemi',
        //   path: 'https://cdnjs.cloudflare.com/ajax/libs/vue-demi/0.14.10/index.iife.min.js'
        // },
        // {
        //   name: 'pinia',
        //   var: 'Pinia',
        //   path: 'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.3.0/pinia.iife.prod.min.js'
        // },
      ],
      prodUrl: '{path}'
    }),
  ],
  resolve: {
    alias: {
      // @ 替代为 src
      '@': resolve(__dirname, 'src'),
      // @component 替代为 src/component
      '@components': resolve(__dirname, 'src/components'),
    },
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    // },
  },
  build: {
    minify: 'terser',
    target: 'es2022',
    sourcemap: false,
    cssMinify: 'lightningcss',
    rollupOptions: {
      // Disabling tree-shaking
      // Prevent vite remove unused exports
      // treeshake: false
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          xterm: ['@xterm/addon-attach', '@xterm/addon-fit', '@xterm/addon-web-links'],
          vuetify: [
            'vuetify',
            'vuetify/components',
            'vuetify/locale',
            'vuetify/locale/adapters/vue-i18n',
            'vuetify/directives',
          ],
          pinia: ['pinia'],
          vuei18n: ['vue-i18n'],
          dayjs: [
            'dayjs',
            'dayjs/locale/zh-cn'
          ],
          debounce: ['debounce'],
          "pretty-bytes": ['pretty-bytes'],
          'lmd-locales': [
            'src/locales/en.ts',
            'src/locales/zhHans.ts'
          ],
        },
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    },

  },
  server: {
    proxy: {
      '/story-assets': {
        target: 'http://127.0.0.1:19313',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
