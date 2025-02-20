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
        <v-img class="mx-auto mt-8"
          width="auto" height="200" src="./images/app/no-data.png"></v-img>

        <h1 class="text-center mt-8" style="font-size: 16px;">
          {{ $t('MyDevices.UnderConstruction') }}
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import TopRightControls from '@/components/common/top-right-controls.vue'
</script>
