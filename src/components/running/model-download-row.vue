<template>
  <v-sheet class="my-0 py-0 mx-3 d-flex flex-row" style="gap: 0.5rem; align-items: center;"
    v-if="lmAppData && modelDownloadRowVisible">
        <div >
        {{ $t('AppRunningWindow.ModelDownload') }}:
        </div>
        <!-- model name selection -->
        <v-select class="flex-1"
          :items="models" item-title="displayName" item-value="installName"
          v-model="currentModel"
          density="compact"
          hide-details
          :label="$t('AppRunningWindow.ModelName')"
        ></v-select>
        <!-- model size -->
        <v-select class="flex-1"
          :items="parameterSizes" item-title="parameterSize" item-value="parameterSize"
          v-model="currentParameterSize"
          density="compact"
          hide-details
          :label="$t('AppRunningWindow.ParameterSize')">
          <template v-slot:selection="{ item }">
            {{ item.title }}
            <v-chip density="compact" class="mx-1" variant="flat" color="yellow-darken-2">
              {{ item.raw.fileSize }}
            </v-chip>
            <v-chip density="compact" variant="flat" color="green" v-if="item.raw.installed">
              <span>{{ $t('AppRunningWindow.ModelDownloaded') }}</span>
            </v-chip>
            <v-chip density="compact" v-else><span>{{ $t('AppRunningWindow.ModelNotDownloaded') }}</span></v-chip>
          </template>
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" density="compact">
              <!-- :subtitle="item.raw.department" -->
              <template v-slot:title>
                {{ item.title }}
                <v-chip density="compact" class="mx-1" variant="flat" color="yellow-darken-2">
                  {{ item.raw.fileSize }}
                </v-chip>
                <v-chip density="compact" variant="flat" color="green" v-if="item.raw.installed">
                  <span>{{ $t('AppRunningWindow.ModelDownloaded') }}</span>
                </v-chip>
                <v-chip density="compact"  v-else><span>{{ $t('AppRunningWindow.ModelNotDownloaded') }}</span></v-chip>
              </template>
            </v-list-item>
          </template>
        </v-select>

        <v-btn prepend-icon="mdi-download-outline" @click="startDownloadModel"
          color="green-lighten-5" v-if="downloadBtnVisible">
          {{ $t('AppRunningWindow.ModelDownloadBtnLabel') }}</v-btn>

        <!-- {{ $t('AppRunningWindow.Storage') }} -->
        <v-btn prepend-icon="mdi-folder-file-outline" color="amber-lighten-5" @click="openModelsDir">
          {{ allModelFileSize }}
          <v-tooltip activator="parent" location="top">
            {{ $t('AppRunningWindow.StorageBtnTip') }}
          </v-tooltip>
        </v-btn>
  </v-sheet>
</template>

<script lang="ts" setup>
import { openPath } from '@/client-api/config-file';
import { useRunningInstanceStore } from '@/store/running-instance';
import { AIAppDTO } from '@/types/AIAppDTO';
import { DownloadableModel } from '@/types/app-running/DownloadableModel';
import { DownloadableModelTag } from '@/types/app-running/DownloadableModelTag';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import OllamaSettingUtil from '@/util/app-settings/OllamaSettingUtil';
import { useLocale } from 'vuetify';

const runningInstanceStore = useRunningInstanceStore()

const models = ref<DownloadableModel[]>([])
const parameterSizes = ref<DownloadableModelTag[]>([])
const modelDownloadRowVisible = ref(false)

const currentModel = ref<string | null>(null)
const currentParameterSize = ref<string | null>(null)

const allModelFileSize = ref<string | null>(null)
const downloadBtnVisible = ref(false)

const {t} = useLocale()

const props = defineProps<{
  lmAppData: AIAppDTO | null,
  installedInstance: InstalledInstanceDTO | null,
  appEnv: object | null
}>()

const openModelsDir = async () => {
  const dir = await AppInfoUtil.getModelsDir(
    props.installedInstance?.installName, props.appEnv)
  openPath(dir)
}

onMounted(async () => {
  updateVisibility()
  getModelFileSize()
  await getAllModelsForApp()
})

watch(() => props.lmAppData, () => {
  updateVisibility()
})

watch(() => props.installedInstance, () => {
  getModelFileSize()
  getAllModelsForApp()
})
watch(() => props.appEnv, () => {
  getModelFileSize()
  getAllModelsForApp()
})

const updateVisibility = () => {
  modelDownloadRowVisible.value = AppInfoUtil.appIsOllama(props.lmAppData?.installName)
}

watch(currentModel, () => {
  updateParameterSizes()
})

watch(currentParameterSize, (parameterSize) => {
  updateDownloadBtnVisibility(parameterSize)
})

const updateDownloadBtnVisibility = (parameterSize) => {
  const sizeItem: DownloadableModelTag | undefined = parameterSizes.value.find((item) => item.parameterSize === parameterSize)
  if(sizeItem) {
    if(sizeItem.installed === undefined) {
      downloadBtnVisible.value = true
    } else {
      downloadBtnVisible.value = !sizeItem.installed
    }
  }
}

const updateParameterSizes = () => {
  const installName = currentModel.value
  const targetModel = models.value.find(item=>item.installName===installName)
  const tags = targetModel?.tags || []

  parameterSizes.value = tags
  if(tags.length > 0) {
    const size = tags[0].parameterSize
    currentParameterSize.value = size
    updateDownloadBtnVisibility(size)
  }
}

const getModelFileSize = async () => {
  allModelFileSize.value = await AppInfoUtil.getModelFileSize(
      props.installedInstance?.installName, props.appEnv)
}

const getAllModelsForApp = async () => {
  const installName = props.installedInstance?.installName
  if(installName) {
    if(modelDownloadRowVisible.value) {
      const downloadableModels = OllamaSettingUtil.getDownloadableModels()
      const mergedModelsList = await AppInfoUtil.mergeModelsList(installName, downloadableModels)
      models.value = mergedModelsList
      // select first item
      if(models.value && models.value.length > 0) {
        const firstModel = models.value[0]
        currentModel.value = firstModel.installName
      }
    }
  }
}

const startDownloadModel = async () => {
  const installNameAndSize = `${currentModel.value}:${currentParameterSize.value}`
  const initCommand =
    AppInfoUtil.genModelDownloadCommand(
      props.installedInstance?.installName, installNameAndSize)
  const tabText = t('AppRunningWindow.ModelDownloadBtnLabel') + ' ' +installNameAndSize
  if(initCommand && currentModel.value) {
    runningInstanceStore.addTerminal(installNameAndSize, tabText, initCommand)
  }
}

</script>
