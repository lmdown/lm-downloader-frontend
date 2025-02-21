<!-- 这个组件没有左侧导航菜单 -->
<template>
  <v-app class="lmd-application" v-if="serverReady" style="overflow: hidden;">
    <!-- <top-system-bar></top-system-bar> -->
    <LeftNavDrawer></LeftNavDrawer>
    <v-main class="d-flex justify-center" style="min-height: 300px">
      <router-view></router-view>
      <!-- <AppStatusBar></AppStatusBar> -->
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// import { RouterView } from 'vue-router'
import LeftNavDrawer from './components/left-nav-drawer.vue'
import { healthCheck } from './api/server-check'
// import AppStatusBar from './components/common/app-status-bar.vue'
const serverReady = ref(false)
onMounted(() => {
  healthCheck().then(()=>{
    serverReady.value = true
    postMessage({ payload: 'removeLoading' }, '*')
  })

  const htmlEl = document.querySelector('html') as HTMLElement;
  htmlEl.setAttribute('main-window', '');
})

onBeforeUnmount(() => {
  const htmlEl = document.querySelector('html') as HTMLElement;
  if (htmlEl) {
    htmlEl.removeAttribute('main-window');
  }
})

</script>

<style></style>
