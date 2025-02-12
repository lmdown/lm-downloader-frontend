<template>
  <v-app-bar light elevation="0" class="pt-4 window-drag">
    <template v-slot:prepend></template>
    <v-app-bar-title>{{ $t('InstalledApps.MainTitle') }}</v-app-bar-title>
    <template v-slot:append>
      <top-right-controls></top-right-controls>
    </template>
  </v-app-bar>
  <v-container class="installed-apps-page mt-10">
    <v-row class="mx-10">
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-application-import">
        {{ $t('InstalledApps.ImportOtherAIApp') }}
        <v-tooltip activator="parent" location="bottom">
          {{ $t('InstalledApps.UnderConstruction') }}
        </v-tooltip>
      </v-btn>
    </v-row>
    <v-row>
      <InstanceList></InstanceList>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import InstanceList from '@/components/installed-apps/instance-list.vue'
import TopRightControls from '@/components/common/top-right-controls.vue'

// const importApp = () => {

// }
</script>

<style scoped></style>
