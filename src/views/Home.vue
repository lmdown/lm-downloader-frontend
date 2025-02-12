<template>
  <top-app-bar></top-app-bar>
  <v-container class="home-page mt-0 mx-9 px-2 py-4">
    <v-row>
      <TopSlide></TopSlide>
    </v-row>
    <v-row>
      <SuggestedApps></SuggestedApps>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import TopAppBar from '@/components/home/top-app-bar.vue';
import TopSlide from '@/components/home/top-slide.vue';
import SuggestedApps from '@/components/home/suggested-apps.vue';

</script>
<style scoped>
.home-page {
  max-width: unset;
  /* padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px; */
}
</style>
