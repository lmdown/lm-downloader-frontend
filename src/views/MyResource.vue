<template>
  <v-app-bar light elevation="0" class="pt-4 window-drag">
    <template v-slot:prepend></template>
    <v-app-bar-title>{{ $t('MyDevices.MainTitle') }}</v-app-bar-title>
    <template v-slot:append>
      <top-right-controls></top-right-controls>
    </template>
  </v-app-bar>
  <v-container class="installed-apps-page mt-10">
    <v-row>
      <v-col>
        <h1 class="text-center">
          {{ $t('MyDevices.UnderConstruction') }}
        </h1>
        <v-img class="mx-auto"
          width="auto" height="240" src="./images/app/no-data.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import TopRightControls from '@/components/common/top-right-controls.vue'
</script>
