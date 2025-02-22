<template>
  <FloatingTitleCard
    v-if="lmAppData && modelDownloadRowVisible"
    :title="$t('AppRunningWindow.ModelDownload')">
    <template v-slot:append>
      <div class="justify-center mr-6 mt-2">
        <a href="#" @click.prevent="showDeleteModelDialog" class="del-btn"
          v-if="deleteBtnVisible" style="color: #F2313F;">
          {{ $t('AppRunningWindow.ModelDeleteBtnLabel') }}
        </a>
        <!-- <app-settings-btn
           :installedInstance="installedInstance"></app-settings-btn> -->
      </div>
    </template>
    <v-sheet class="mx-5 model-download-sheet mb-6">
      <!-- :label="$t('AppRunningWindow.ModelName')" -->
      <v-card-subtitle class="px-0 mt-3 mb-1" style="color: #4F4F67;">
        {{ $t('AppRunningWindow.ModelName') }}
      </v-card-subtitle>
      <v-select
        :items="models" item-title="displayName" item-value="installName"
        v-model="currentModel"
        variant="outlined"
        density="compact"
        hide-details>
      </v-select>

      <v-card-subtitle class="px-0 mt-3 mb-1" style="color: #4F4F67;">
        {{ $t('AppRunningWindow.ParameterSize') }}
      </v-card-subtitle>
      <v-select
        :items="parameterSizes" item-title="parameterSize" item-value="parameterSize"
        v-model="currentParameterSize"
        variant="outlined"
        density="compact"
        hide-details>

        <template v-slot:selection="{ item }">
          {{ item.title }}
          <v-chip density="default" class="mx-1 file-size-chip">
            {{ item.raw.fileSize }}
          </v-chip>
          <v-chip density="default" v-if="item.raw.installed" class="installed-chip">
            <span>{{ $t('AppRunningWindow.ModelDownloadedShort') }}</span>
          </v-chip>
          <v-chip density="default" v-else class="not-installed-chip">
            <span>{{ $t('AppRunningWindow.ModelNotDownloadedShort') }}</span>
          </v-chip>
        </template>

        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" density="compact">
          <template v-slot:title>
            {{ item.title }}
            <v-chip density="compact" class="mx-1 file-size-chip">
              {{ item.raw.fileSize }}
            </v-chip>
            <v-chip density="compact" v-if="item.raw.installed" class="installed-chip">
              <span>{{ $t('AppRunningWindow.ModelDownloaded') }}</span>
            </v-chip>
            <v-chip density="compact" v-else class="not-installed-chip">
              <span>{{ $t('AppRunningWindow.ModelNotDownloaded') }}</span>
            </v-chip>
          </template>
        </v-list-item>
      </template>
    </v-select>
    <v-card-actions
      v-if="downloadBtnVisible"
      class="text-center justify-center pt-6" >
      <v-btn @click="startDownloadModel"
        variant="flat" min-width="8rem"
        color="primary">
        {{ $t('AppRunningWindow.ModelDownloadBtnLabel') }}
      </v-btn>
    </v-card-actions>
    </v-sheet>
  </FloatingTitleCard>

  <DeleteConfirmDialog
    :model-value="deleteConfirmDialogVisible"
    @update:modelValue="value => deleteConfirmDialogVisible = value"
    :item-name="deleteItemName" @confirm="deleteModel"></DeleteConfirmDialog>
</template>
<style>
.installed-chip {
  color: #0ABB1F;
  background: #DFF4E2;
  border-radius: 12px;
  border: 1px solid rgba(10,187,31,0.29);
}

.not-installed-chip {
  color:  #8C8C8C;
  background: #EEEEEE;
  border-radius: 12px;
  border: 1px solid rgba(129,129,129,0.29);
}

.model-download-sheet .v-chip.v-chip--size-default {
  padding: 0 4px;
}

.file-size-chip {
  color: #FF7400;
  background: #FFEEE2;
  border-radius: 12px;
  border: 1px solid rgba(255,134,24,0.21);
}

.model-download-sheet .del-btn {
  color: #FF0000;
  background: #FFF1F1;
  border-radius: 4px;
  border: 1px solid #FF0000;
}
</style>
<script lang="ts" setup>
import { useRunningInstanceStore } from '@/store/running-instance';
import { AIAppDTO } from '@/types/AIAppDTO';
import { DownloadableModel } from '@/types/app-running/DownloadableModel';
import { DownloadableModelTag } from '@/types/app-running/DownloadableModelTag';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import OllamaSettingUtil from '@/util/app-settings/OllamaSettingUtil';
import { useLocale } from 'vuetify';
import FloatingTitleCard from '../common/floating-title-card.vue';
import DeleteConfirmDialog from '../common/delete-confirm-dialog.vue';

const runningInstanceStore = useRunningInstanceStore()

const models = ref<DownloadableModel[]>([])
const parameterSizes = ref<DownloadableModelTag[]>([])
const modelDownloadRowVisible = ref(false)

const currentModel = ref<string | null>(null)
const currentParameterSize = ref<string | null>(null)

// const allModelFileSize = ref<string | null>(null)
const downloadBtnVisible = ref(false)
const deleteBtnVisible = ref(false)
const deleteConfirmDialogVisible = ref(false)
const deleteItemName = ref('')

const {t} = useLocale()

const props = defineProps<{
  lmAppData: AIAppDTO | null,
  installedInstance: InstalledInstanceDTO | null,
  appEnv: object | null
}>()

// const openModelsDir = async () => {
//   const dir = await AppInfoUtil.getModelsDir(
//     props.installedInstance?.installName, props.appEnv)
//   openPath(dir)
// }

onMounted(async () => {
  updateVisibility()
  // getModelFileSize()
  await getAllModelsForApp()
})

watch(() => props.lmAppData, () => {
  updateVisibility()
})

watch(() => props.installedInstance, () => {
  // getModelFileSize()
  getAllModelsForApp()
})
watch(() => props.appEnv, () => {
// getModelFileSize()
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
      deleteBtnVisible.value = false
    } else {
      downloadBtnVisible.value = !sizeItem.installed
      deleteBtnVisible.value = sizeItem.installed
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

// const getModelFileSize = async () => {
//   allModelFileSize.value = await AppInfoUtil.getModelFileSize(
//       props.installedInstance?.installName, props.appEnv)
// }

const getAllModelsForApp = async () => {
  const installName = props.installedInstance?.installName
  if(installName) {
    if(modelDownloadRowVisible.value) {
      models.value = []
      parameterSizes.value = []

      const downloadableModels = OllamaSettingUtil.getDownloadableModels()
      const mergedModelsList = await AppInfoUtil.mergeModelsList(installName, downloadableModels)
      models.value = mergedModelsList
      console.log('mergedModelsList', mergedModelsList)
      // select first item
      if(!currentModel.value) {
        if(models.value && models.value.length > 0) {
          const firstModel = models.value[0]
          currentModel.value = firstModel.installName
        }
      } else {
        updateParameterSizes()
      }
    }
  }
}

const showDeleteModelDialog = () => {
  const installNameAndSize = `${currentModel.value}:${currentParameterSize.value}`
  deleteConfirmDialogVisible.value = true
  deleteItemName.value = installNameAndSize
}

const deleteModel = async () => {
  const installNameAndSize = `${currentModel.value}:${currentParameterSize.value}`
  const initCommand =
    AppInfoUtil.genModelDeleteCommand(
      props.installedInstance?.installName, installNameAndSize)
  const tabText = t('AppRunningWindow.ModelDeleteBtnLabel') + ' ' +installNameAndSize
  if(initCommand && currentModel.value) {
    if(AppInfoUtil.appIsOllama(props.lmAppData?.installName)) {
      const toastMsg = tabText + ' ' + t('AppRunningWindow.ModelDeleteSuccessful')
      runningInstanceStore.addDeleteModelTerminal(installNameAndSize, tabText, initCommand, toastMsg)
    }
    // runningInstanceStore.addTerminal(installNameAndSize, tabText, initCommand)
  }
}

const startDownloadModel = async () => {
  const installNameAndSize = `${currentModel.value}:${currentParameterSize.value}`
  const initCommand =
    AppInfoUtil.genModelDownloadCommand(
      props.installedInstance?.installName, installNameAndSize)
  const tabText = t('AppRunningWindow.ModelDownloadBtnLabel') + ' ' +installNameAndSize
  if(initCommand && currentModel.value) {
    if(AppInfoUtil.appIsOllama(props.lmAppData?.installName)) {
      const toastMsg = tabText + ' ' + t('AppRunningWindow.ModelDownloadSuccessful')
      runningInstanceStore.addInstallModelTerminal(installNameAndSize, tabText, initCommand, toastMsg)
    }
  }
}

</script>
