<template>
  <a href="#" class="settings-link-btn"
    @click.prevent="showDialog">
    {{ $t('AppRunningWindow.Settings') }}
  </a>
  <!-- <v-btn width="80" height="40px" variant="flat" color="#CCC"
    v-if="settingsBtnVisible" @click="showDialog">
    {{ $t('AppRunningWindow.Settings') }}
  </v-btn> -->

  <v-dialog v-model="dialogVisible" min-width="400" max-width="800">
    <v-card
      class="mx-auto px-0 py-0 window-no-drag"
      width="100%"
      :title="$t('AppSettingDialog.Title') + installedInstance.name"
      v-if="installedInstance"
    >
      <template v-slot:append>
        <v-btn
          icon="mdi-close"
          class="ms-auto"
          size="compact"
          text="Ok"
          elevation="0"
          @click="dialogVisible = false"
        ></v-btn>
      </template>
      <v-form
        v-if="appBaseSettings"
        class="pt-0 pb-3 px-6"
        v-model="formValid"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="appBaseSettings.modelsDir" density="comfortable"
          :readonly="submitLoading"
          :rules="modelsDirValidRules"
          :label="$t('AppSettingDialog.ModelsDirLabel')">
          <template v-slot:append>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" icon="mdi-information-slab-circle-outline"></v-icon>
              </template>
              <pre>{{ modelsDirIconTip }}</pre>
            </v-tooltip>
            <v-btn class="ml-1" @click="browse">{{ $t('AppSettingDialog.Browse') }}</v-btn>
            <v-btn class="ml-1" @click="useDefaultValue">{{ $t('AppSettingDialog.UseDefaultValue') }}</v-btn>
          </template>
        </v-text-field>

        <v-card-text class="pt-0">
          <pre style="font-size: 12px;">{{ getFullModelsDirTip() }}</pre>
        </v-card-text>

        <v-text-field
          v-model="appBaseSettings.externalAccessHost" density="comfortable"
          :readonly="submitLoading"
          :rules="accessHostsValidRules"
          :label="$t('AppSettingDialog.ServerHostLabel')">
        </v-text-field>

        <v-card-text class="pt-0">
          <pre style="font-size: 12px;">{{ getFullServerHostTip() }}</pre>
        </v-card-text>
        <v-card-actions class="text-center justify-center">
          <v-btn variant="outlined" @click="dialogVisible = false">
            {{ $t('AppSettingDialog.close') }}
          </v-btn>
          <v-btn color="primary" variant="flat" type="submit" :loading="submitLoading">
            {{ $t('AppSettingDialog.saveConfig') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style>

</style>

<script lang="ts" setup>
import { getUserHomeDir } from '@/api/common-util';
import { selectDirectory } from '@/client-api/file-system';
import AppBaseSettings from '@/types/app-running/AppBaseSettings';
import DirInfo from '@/types/config/DirInfo';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import { ShowToastMessage } from '@/types/toast-message-type';
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import OllamaSettingUtil from '@/util/app-settings/OllamaSettingUtil';
import { useLocale } from 'vuetify';
import { useRunningInstanceStore } from '@/store/running-instance'
import OSUtil from '@/util/OSUtil';
import { exitLMDApp } from '@/client-api/lmd-system';
import DirCheckUtil from '@/util/DirCheckUtil';

const { t } = useLocale()

const settingsBtnVisible = ref(false)

const dialogVisible = ref(false)
const formValid = ref(false)
const submitLoading = ref(false)
const defaultModelsDir = ref('')

const runningInstanceStore = useRunningInstanceStore()

const toast = inject<ShowToastMessage>('showToastMessage')
const appBaseSettings = ref<AppBaseSettings>({} as AppBaseSettings)
const dirValid = ref(true)

const props = defineProps<{
  installedInstance: InstalledInstanceDTO | null
}>()

watch( () => props.installedInstance, () => {
  updateSettingsBtnVisibility()
})

const updateSettingsBtnVisibility = () => {
  if(appIsOllama()) {
    settingsBtnVisible.value = true
  } else {
    settingsBtnVisible.value = false
  }
}

onMounted(()=>{
  updateSettingsBtnVisibility()
})

const showDialog = async () => {
  dialogVisible.value = true
  await initDefaultModelsDir()
  await getOSEnvForCurrentApp()
  // updateModelsDirHint()
}

const hideDialog = () => {
  dialogVisible.value = false
}

const initDefaultModelsDir = async () => {
  const homeDir = await getUserHomeDir()
  defaultModelsDir.value = homeDir + '/.ollama/models'
}

const onSubmit = async () => {
  if (!formValid.value) return
  if (!appBaseSettings) return

  if(defaultModelsDir.value === '') {
    const msg = t('AppSettingDialog.DataNotValid')
    if(toast) {
      toast(msg, 'error')
    }
    return
  }
  submitLoading.value = true
  const submitSettingObj: AppBaseSettings = Object.assign({}, appBaseSettings.value)

  const result = await OllamaSettingUtil.saveAppSettings(submitSettingObj, defaultModelsDir.value)
  console.log('save result ', result)
  const msg = t('Common.saveSuccess')
  if(toast) {
    toast(msg, 'success')
  }
  submitLoading.value = false
  runningInstanceStore.onAppSettingsSaved()
  setTimeout(() => {
    runningInstanceStore.resetAppSettingsSavedStatus()
  }, 100)
  hideDialog()
  if(OSUtil.isWindows()) {
    AppInfoUtil.killAppProcessed(props.installedInstance?.installName)
    setTimeout(() => {
      exitLMDApp()
    }, 1500)
  }
}

// const updateModelsDirHint = () => {
//   const modelsDir = appBaseSettings.value.modelsDir
//   if(!modelsDir) {
//     modelsDirHint.value = t('AppSettingDialog.ModelsDirDefaultHint')
//   } else {
//     modelsDirHint.value = t('AppSettingDialog.ModelsDirExistHint')
//   }
//   console.log('modelsDirHint', modelsDirHint.value)
// }

const required = (v) => {
  return !!v || t('Common.fieldRequired')
}

const browse = async () => {
  const dirInfo: DirInfo = await selectDirectory(appBaseSettings.value.modelsDir, true);
  if (dirInfo && dirInfo.path) {
    appBaseSettings.value.modelsDir = dirInfo.path;
    console.log('dirInfo', dirInfo)
    dirValid.value = DirCheckUtil.checkModelsDirValid(dirInfo, ['blobs'])
    console.log('dirValid.value', dirValid.value)
  }
}

const modelsDirValidRules = [
  required,
  () => {
    return dirValid.value || t('AppSettingDialog.ModelsDirNotValid')
  }
]

const ipRegex = /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?$/;
const accessHostsValidRules = [
  // required,
  (value: string) => {
    if(value === '') {
      return true
    }
    return ipRegex.test(value) || t('AppSettingDialog.HostNotValid')
  }
]

const useDefaultValue = async () => {
  appBaseSettings.value.modelsDir = defaultModelsDir.value
}

const modelsDirIconTip =  computed(() => {
  if(appIsOllama()) {
    return t('AppSettingDialog.OllamaModelsDirInfoIconTip')
  }
})

const getOSEnvForCurrentApp = async () => {
  // console.log('getOSEnvForCurrentApp')
  if(appIsOllama()) {
    const settingData = await OllamaSettingUtil.getAppSettings()
    console.log('getOSEnvForCurrentApp', settingData)
    appBaseSettings.value = Object.assign({}, settingData)
    // If this value is empty, use default defaultModelsDir.
    if(settingData.modelsDir === '') {
      console.log('getOSEnvForCurrentApp', settingData)
      appBaseSettings.value.modelsDir = defaultModelsDir.value
    }
    // appBaseSettings.value = settingData
    // console.log('getOSEnvForCurrentApp', settingData)
    // accessHosts.value = await OllamaSettingUtil.getAccessHosts(settingData.externalAccessHost)
  }
}

const appIsOllama = () => {
  return AppInfoUtil.appIsOllama(props.installedInstance?.installName)
}

const getFullModelsDirTip = (): string => {
  let fullTip = t('AppSettingDialog.ModelsDirTip')
  if(OSUtil.isWindows()) {
    fullTip += t('AppSettingDialog.ModelsDirTipExtraWindows')
  } else {
    fullTip += t('AppSettingDialog.ModelsDirTipExtraMac')
  }
  return fullTip
}

const getFullServerHostTip = () => {
  let fullTip = t('AppSettingDialog.ServerHostTip')
  if(OSUtil.isWindows()) {
    fullTip += t('AppSettingDialog.ServerHostTipExtraWindows')
  } else {
    fullTip += t('AppSettingDialog.ServerHostTipExtraMac')
  }
  return fullTip
}



</script>
