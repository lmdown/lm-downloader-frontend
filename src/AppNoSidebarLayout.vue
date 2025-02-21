<!-- 这个组件没有左侧导航菜单 -->
<template>
  <v-app>
    <!-- <top-system-bar></top-system-bar> -->
    <v-main class="d-flex justify-center" style="min-height: 300px">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { healthCheck } from './api/server-check';

onMounted(() => {
  const htmlEl = document.querySelector('html') as HTMLElement;
  htmlEl.setAttribute('running-window', '');
  healthCheck().then(()=>{
    postMessage({ payload: 'removeLoading' }, '*')
  })
})

onBeforeUnmount(() => {
  const htmlEl = document.querySelector('html') as HTMLElement;
  if (htmlEl) {
    htmlEl.removeAttribute('running-window');
  }
})

</script>

<style></style>
