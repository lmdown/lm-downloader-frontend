<template>
  <FloatingTitleCard v-if="allModelFileSize"
    :title="$t('AppRunningWindow.ModelStorageLabel')">
    <template v-slot:append>
      <div class="justify-center mr-6 mt-2">
        <app-settings-btn
           :installedInstance="installedInstance"></app-settings-btn>
      </div>
    </template>
    <v-sheet class="mt-3 pb-3 px-5">
      <div class="d-flex">
        <v-img src="./images/icons/harddisk.svg" class="mr-1" width="32" height="16" ></v-img>

        <v-tooltip :text="storageDetailTipStr" location="top">
          <template v-slot:activator="{ props }">
          <v-progress-linear
            class="custom-progress-bar"
            v-bind="props"
            :location="null"
            bg-color="#FFFFFF"
            bg-opacity="1"
            buffer-color="#DFDFEC"
            buffer-opacity="1"
            opacity="1"
            color="#FEF1E5"
            height="14"
            :max="currentDirInfo?.totalSpace || 10"
            min="0"
            :buffer-value="progressBarBufferValue"
            :model-value="currentDirInfo?.dirSize"
            rounded>
          </v-progress-linear>
          </template>
        </v-tooltip>
      </div>
      <div class="d-flex flex-row ml-9 mt-1" style=" font-size: 14px;">
        <div style="flex: 1;">
          {{ currentDirInfo?.diskName }}
        </div>
        <a href="#" @click.prevent="openModelsDir">
        {{ allModelFileSize }}
        &gt;
        <v-tooltip activator="parent" location="top" v-if="modelDir">
          {{ modelDir }}
        </v-tooltip>
        </a>
      </div>
    </v-sheet>
  </FloatingTitleCard>
</template>
<style>
.custom-progress-bar .v-progress-linear__background {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #d0d0db;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.custom-progress-bar .v-progress-linear__background {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #d0d0db;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.custom-progress-bar .v-progress-linear__determinate::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #FB721F;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background: repeating-linear-gradient(
    140deg,
    #FB9754,
    /* rgba(0, 0, 0, 0.2), */
    /* line */
    /* rgba(0, 0, 0, 0.2) 1px, */
    /* line */
    /* #F96E11 1px, */
    rgba(249, 110, 17, 0.1) 1px,
    /* 1px */
     rgba(255, 255, 255, 0.1) 1px,
    /* bg color, and 10px gap */ rgba(255, 255, 255, 0.1) 9px
  );
}
</style>
<script lang="ts" setup>
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import FloatingTitleCard from '../common/floating-title-card.vue';
import { openPath } from '@/client-api/config-file';
import { getUserHomeDir } from '@/api/common-util';
import prettyBytes from 'pretty-bytes';
import LocalDirectoryInfo from '@/types/app-running/LocalDirectoryInfo';
import AppSettingsBtn from '@/components/running/app-settings-btn.vue'
import { useLocale } from 'vuetify';

const props = defineProps<{
  installedInstance: InstalledInstanceDTO | null,
  appEnv: object | null
}>()

const modelDir = ref('')
const defaultModelsDir = ref('')
const storageDetailTipStr = ref('')
const progressBarBufferValue = ref(0)
const currentDirInfo = ref<LocalDirectoryInfo | null>(null)

onMounted(async () => {
  if(AppInfoUtil.appIsOllama(props.installedInstance?.installName)) {
    await initDefaultModelsDir()
    updateModelFileSize()
  }
})

const allModelFileSize = ref<string | null>(null)
const { t } = useLocale()
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

  const dirInfo = await AppInfoUtil.getModelFileSize(
    props.installedInstance?.installName, modelDir.value)
  allModelFileSize.value = prettyBytes(dirInfo.dirSize)
  currentDirInfo.value = dirInfo
  console.log('dirInfo', dirInfo)
  updateDetailTipStr()
}

const updateDetailTipStr = () => {
  if(!currentDirInfo.value) {
    return
  }
  let otherSize: number = 0;
  try {
    otherSize = currentDirInfo.value?.totalSpace - currentDirInfo.value.dirSize - currentDirInfo.value.freeSpace
    progressBarBufferValue.value = currentDirInfo.value?.totalSpace - currentDirInfo.value.freeSpace
  } catch (e) {
    console.error('calculate error', e)
  }
  const otherSizeFormated: string = prettyBytes(otherSize)
  const freeSpaceFormated: string = prettyBytes(currentDirInfo.value.freeSpace)
  const str = `${t('AppRunningWindow.StorageModelsSize')}: ${allModelFileSize.value},
  ${t('AppRunningWindow.StorageDiskOther')}: ${otherSizeFormated},
  ${t('AppRunningWindow.StorageDiskFreeSpace')}: ${freeSpaceFormated}
  `
  storageDetailTipStr.value = str
}

watch(() => props.appEnv, (val) => {
  updateModelFileSize()
})

watch(() => props.installedInstance, (val) => {
  updateModelFileSize()
})

const openModelsDir = async () => {
  openPath(modelDir.value)
}

</script>
