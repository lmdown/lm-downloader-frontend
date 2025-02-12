<template>
  <v-card-text>
    <template
      v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length > 0">
      <!-- <v-btn variant="flat" color="#999"
      text-color="#DBDBDB"
      disabled
        v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length > 0">
        {{$t('LMAppDetail.install')}}
      </v-btn> -->
      <span class="">
        {{$t('LMAppDetail.AppInstalled')}}
      </span>
    </template>

    <template
        v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length == 0">
        <span class="">
          {{$t('LMAppDetail.notInstalled')}}
        </span>
         <!-- <v-btn variant="flat" color="primary"
      @click="startInstallApp"
      v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length == 0">
      {{$t('LMAppDetail.install')}}
    </v-btn> -->
    </template>
    <!--  -->

  </v-card-text>
</template>
<script lang="ts" setup>
import { useInstalledInstanceStore } from '@/store';

const installedInstanceStore = useInstalledInstanceStore()

// const startInstallApp = () => {

// }

</script>
<style>
</style>
