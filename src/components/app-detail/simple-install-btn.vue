<template>
  <v-card-text>
    <template
      v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length > 0">
      <v-btn variant="flat" color="primary"
        @click="reinstallApp"
        v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length > 0">
        {{$t('LMAppDetail.Reinstall')}}
      </v-btn>
      <span class="mx-5">
        {{$t('LMAppDetail.AppInstalled')}}
      </span>
    </template>

    <template
      v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length == 0">
      <!-- <span class="">
        {{$t('LMAppDetail.notInstalled')}}
      </span> -->
      <v-btn variant="flat" color="primary"
        @click="startInstallApp"
        v-if="installedInstanceStore.instancesForApp && installedInstanceStore.instancesForApp.length == 0">
        {{$t('LMAppDetail.install')}}
      </v-btn>
    </template>
  </v-card-text>
</template>
<script lang="ts" setup>
import { AppScriptType } from '@/constant/AppScriptType';
import { useInstalledInstanceStore } from '@/store';
import AppRunningUtil from '@/util/AppRunningUtil';
import { createInstallInstance } from '@/api/install-instance';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import { AIAppDTO } from '@/types/AIAppDTO';

const installedInstanceStore = useInstalledInstanceStore()

const props = defineProps<{
  lmAppData: AIAppDTO
}>()

const startInstallApp = async () => {
  console.log('startInstallApp', props.lmAppData)
  await createInstallInstance(props.lmAppData)
  updateInstallList()
}

const updateInstallList = async () => {
  await installedInstanceStore.getInstalledInstanceForApp(props.lmAppData?.id)
  openRunningWindow()
}

const openRunningWindow = () => {
  if(installedInstanceStore.instancesForApp) {
      const firstInstallInstance: InstalledInstanceDTO = installedInstanceStore.instancesForApp[0]
      if (firstInstallInstance) {
        const instanceId = firstInstallInstance.id
        AppRunningUtil.openAppRunningWindow(instanceId, AppScriptType.INSTALL)
      } else {
        console.error('data err firstInstallInstance', firstInstallInstance)
      }
    }
}

const reinstallApp = () => {
  const instances = installedInstanceStore.instancesForApp
  if(instances && instances.length> 0 ) {
    AppRunningUtil.openAppRunningWindow(instances[0].id, AppScriptType.INSTALL)
  }
}

</script>
<style>
</style>
