<template>
  <!-- Installed Instances -->
  <!-- <StorageInfo :fileStorageInfoList="fileStorageInfoList"></StorageInfo> -->
  <v-spacer class="my-2"></v-spacer>
  <v-sheet class="d-flex flex-column ga-2"
  style="width: 100%;" v-if="installedInstanceList && installedInstanceList.length > 0">
    <v-row>
      <v-col
      v-for="(item, index) in installedInstanceList" :key="index">
      <SingleInstalledInstance :app-version-visible="true"
        :instance-data="item" @deleted="onDeleted" @refresh="onRefresh"
        :app-name-visible="true" :icon-visible="false"></SingleInstalledInstance>
      </v-col>
    </v-row>
  </v-sheet>
  <v-sheet class="d-flex flex-column ga-2 text-center justify-center"
      v-if="installedInstanceList && installedInstanceList.length === 0">
      <v-img width="100%" height="160" src="./images/app/no-data.png"></v-img>
      <div style="font-size: 14px; color: #7D7D7D;" class="text-center">
        {{$t('LMAppDetail.notInstalled')}}
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="flat" @click="installApp">{{$t('LMAppDetail.install')}}</v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import { useInstalledInstanceStore } from '@/store';
import { AIAppDTO } from '@/types/AIAppDTO';
import { createInstallInstance } from '@/api/install-instance';
import { AppScriptType } from '@/constant/AppScriptType';
import AppRunningUtil from '@/util/AppRunningUtil';
import SingleInstalledInstance from '../installed-apps/new-style/single-installed-instance.vue';

const installedInstanceStore = useInstalledInstanceStore();
const installedInstanceList = ref<InstalledInstanceDTO[]> ()

const props = defineProps<{
  lmAppData: AIAppDTO
}>()

onMounted(async () => {
  updateInstallList()
})

const updateInstallList = async () => {
  await installedInstanceStore.getInstalledInstanceForApp(props.lmAppData?.id)
  installedInstanceList.value = installedInstanceStore.instancesForApp
  // installedInstanceList.value = []
}

const installApp = async () => {
  // 1. Create Install Instance.
  // 2. Open running window and run install script.
  try {
    await createInstallInstance(props.lmAppData)
    await updateInstallList()
    if(installedInstanceList.value) {
      const firstInstallInstance: InstalledInstanceDTO = installedInstanceList.value[0]
      if (firstInstallInstance) {
        const instanceId = firstInstallInstance.id
        AppRunningUtil.openAppRunningWindow(instanceId, AppScriptType.INSTALL)
      } else {
        console.error('data err firstInstallInstance', firstInstallInstance)
      }
    }
    //
  } catch(err)  {
    console.error('install app err ', err)
  }
}

const onDeleted = async () => {
  updateInstallList()
}

const onRefresh = async () => {
  updateInstallList()
}

</script>
