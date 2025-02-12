<template>
  <!-- <v-app-bar light elevation="0" class="pt-4 window-drag">
    <template v-slot:prepend></template>
    <v-app-bar-title>{{ $t('InstalledApps.MainTitle') }}</v-app-bar-title>
    <template v-slot:append>
      <top-right-controls></top-right-controls>
    </template>
  </v-app-bar>
  -->

  <top-app-bar :main-title="$t('InstalledApps.MainTitle')"
    :sub-title="$t('InstalledApps.SubTitle')"></top-app-bar>
  <InstanceList></InstanceList>
  <!-- <v-container class="installed-apps-page mt-10"> -->
    <!-- <v-row class="mx-10">
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-application-import">
        {{ $t('InstalledApps.ImportOtherAIApp') }}
        <v-tooltip activator="parent" location="bottom">
          {{ $t('InstalledApps.UnderConstruction') }}
        </v-tooltip>
      </v-btn>
    </v-row> -->
    <!-- <v-row>

    </v-row> -->
  <!-- </v-container> -->
</template>

<script setup lang="ts">
import InstanceList from '@/components/installed-apps/instance-list.vue'
// import TopRightControls from '@/components/common/top-right-controls.vue'
import TopAppBar from '@/components/home/top-app-bar.vue';

// const importApp = () => {

// }
</script>

<style scoped></style>
