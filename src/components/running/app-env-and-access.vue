<template>
  <template v-if="appEnv && installedInstance">
    <ModelDownloadRow :appEnv="appEnv" :installedInstance="installedInstance"
      :lmAppData="lmAppData"></ModelDownloadRow>

    <app-access-row :appEnv="appEnv"
      :lmAppData="lmAppData"
      :installedInstance="installedInstance"></app-access-row>

    <app-env-row :appEnv="appEnv"
      :installedInstance="installedInstance"></app-env-row>

  </template>
</template>
<style></style>
<script lang="ts" setup>
import { AIAppDTO } from '@/types/AIAppDTO';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import OllamaSettingUtil from '@/util/app-settings/OllamaSettingUtil';
import AppEnvRow from './app-env-row.vue'
import AppAccessRow from './app-access-row.vue'
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import { useRunningInstanceStore } from '@/store/running-instance';
import ModelDownloadRow from './model-download-row.vue';

const props = defineProps<{
  installedInstance: InstalledInstanceDTO | null,
  lmAppData: AIAppDTO | null
}>()

const runningInstanceStore = useRunningInstanceStore()
const appEnv = ref<object | null>({})

const emit = defineEmits([
  'appEnvSavedAndUpdated' // 更改后，调用接口拿到最新的环境变量
])
onMounted(async () => {
  updateAppEnvData()
})

const updateAppEnvData = async () => {
  const installName = props.installedInstance?.installName
  if(AppInfoUtil.appIsOllama(installName)) {
    appEnv.value = await OllamaSettingUtil.getOSEnvObj() || {}
  }
}

defineExpose({
  updateAppEnvData
})

watch(() => props.installedInstance, () => {
  updateAppEnvData()
})

watch(() => runningInstanceStore.appSettingsSaved, async (newVal: boolean) => {
  if(newVal) {
    appEnv.value = null
    await updateAppEnvData()
    emit('appEnvSavedAndUpdated', appEnv.value)
  }
})

</script>
