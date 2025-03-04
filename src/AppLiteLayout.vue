<template>

  <!-- <router-view></router-view> -->
  <v-app>
    <!-- <top-system-bar></top-system-bar> -->
    <!-- <v-main class="d-flex justify-center" style="min-height: 300px"> -->
      <router-view></router-view>
    <!-- </v-main> -->
  </v-app>

</template>

<script setup lang="ts">
onMounted(() => {
  const htmlEl = document.querySelector('html') as HTMLElement;
  htmlEl.setAttribute('lite-layout', '');
})

onBeforeUnmount(() => {
  const htmlEl = document.querySelector('html') as HTMLElement;
  if (htmlEl) {
    htmlEl.removeAttribute('lite-layout');
  }
})

</script>

<style></style>
