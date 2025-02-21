<template>
  <FloatingTitleCard v-if="allModelFileSize"
    :title="$t('AppRunningWindow.ModelStorageLabel')">
    <v-sheet class="py-2 pb-3 px-5">
      <a href="#" @click.prevent="openModelsDir">
      {{ $t('AppRunningWindow.StorageUsage') }}
      {{ allModelFileSize }}
      &gt;
      <v-tooltip activator="parent" location="top" v-if="modelDir">
        {{ modelDir }}
      </v-tooltip>
    </a>
    </v-sheet>
  </FloatingTitleCard>
</template>
<style>

</style>
<script lang="ts" setup>
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import FloatingTitleCard from '../common/floating-title-card.vue';
import { openPath } from '@/client-api/config-file';
import { getUserHomeDir } from '@/api/common-util';

const props = defineProps<{
  installedInstance: InstalledInstanceDTO | null,
  appEnv: object | null
}>()

const defaultModelsDir = ref('')

onMounted(async () => {
  await initDefaultModelsDir()
  updateModelFileSize()
})

const allModelFileSize = ref<string | null>(null)

const initDefaultModelsDir = async () => {
  const homeDir = await getUserHomeDir()
  defaultModelsDir.value = homeDir + '/.ollama/models'
}

const updateModelFileSize = async () => {
  const dir = await AppInfoUtil.getModelsDir(
    props.installedInstance?.installName, props.appEnv)
    console.log('dir', dir)
  modelDir.value = dir || defaultModelsDir.value
  console.log('modelDir.value', modelDir.value)

  allModelFileSize.value = await AppInfoUtil.getModelFileSize(
      props.installedInstance?.installName, modelDir.value)
}

const modelDir = ref('')

watch(() => props.appEnv, () => {
  updateModelFileSize()
})

watch(() => props.installedInstance, () => {
  updateModelFileSize()
})

const openModelsDir = async () => {
  openPath(modelDir.value)
}

</script>
