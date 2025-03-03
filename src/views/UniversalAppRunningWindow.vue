<template>
  <v-layout>
    <v-app-bar elevation="0" class="px-6 running-app-bar" density="compact"
      style=" background-color: #F3F3FA;" >
      <div class="d-flex flex-row">
        <v-img :src="icon"
            width="36" height="36"></v-img>
        <div class="d-flex flex-row justify-center" style="align-items: center;">
          <v-card-title class="pt-1 pb-0" style="font-size: 1rem;">
            {{ name }}
          </v-card-title>
          <v-card-subtitle class="mt-1" >
            {{ currentUrl }}
          </v-card-subtitle>
        </div>
      </div>
    </v-app-bar>
    <v-main class="running-window-main mb-0 d-flex">
      <webview
        ref="appWebview"
        @did-navigate="onNavigate"
        @did-finish-load="onFinishLoad"
        allowpopups="true"
        style="width: 100%; height: auto; flex: 1"
        :src="currentUrl"></webview>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>

interface WebViewElement extends HTMLElement {
  canGoBack(): boolean
}

const route = useRoute()

const appWebview = ref<WebViewElement>();
// const backBtn = ref<HTMLElement>();
// const forwardBtn = document.getElementById('forward-btn');
// const refreshBtn = document.getElementById('refresh-btn');

const name = ref('');
const icon = ref('');
const currentUrl = ref('');

onMounted(() => {
  // /:name/:icon/:url
  name.value = route.params.name as string
  icon.value = route.params.icon as string
  currentUrl.value = route.params.url as string
  document.title = name.value
})

function updateAddressBar(url) {
  // currentUrl.value = url
  // console.log((webview.value as any).userAgent)
  // console.log((webview.value as any).setUserAgent)

}

const onNavigate = (event) => {
  updateAddressBar(event.url);
}

const onFinishLoad = (event) => {
  // webview.value?.style?.height = 'auto'
}

// const goBack = () => {
//   if (webview?.value?.canGoBack()) {
//     webview.value.goBack();
//   }
// }

// const goForwardBtn = () => {
//   if (webview.canGoForward()) {
//     webview.goForward();
//   }
// }

// refreshBtn.addEventListener('click', () => {
//   webview.reload();
// });

// addressBar.addEventListener('keypress', (event) => {
//   if (event.key === 'Enter') {
//     const url = addressBar.value.trim();
//     if (url) {
//       webview.src = url.startsWith('http') ? url : `http://${url}`;
//     }
//   }
// });

</script>

<style>

</style>
