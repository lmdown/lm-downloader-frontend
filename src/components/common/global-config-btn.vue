<template>
  <v-btn class="hover-border" width="38" height="38" icon="" @click="showConfigDialog">
    <v-img width="36" height="36" src="./images/icons/icon-config.png" :transition="false"></v-img>
  </v-btn>
  <v-dialog v-model="globalConfigDialogVisible" min-width="400" max-width="800">
    <v-card
      class="mx-auto px-0 py-0 window-no-drag"
      width="100%"
      :title="$t('ConfigDialog.globalConfigTitle')"
    >
      <template v-slot:append>
        <v-btn
          icon="mdi-close"
          class="ms-auto"
          size="compact"
          text="Ok"
          elevation="0"
          @click="globalConfigDialogVisible = false"
        ></v-btn>
      </template>
      <v-form
        v-if="baseConfigData"
        class="pt-0 pb-3 px-6"
        v-model="configValid"
        @submit.prevent="onSubmit"
      >
        <v-card-title>{{ $t('ConfigDialog.DefaultStorageTitle') }}</v-card-title>

        <v-text-field
          v-model="baseConfigData.LMD_DATA_ROOT"
          :readonly="submitLoading"
          :rules="rootStorageDirValidRules"
          :label="$t('ConfigDialog.DefaultStoragePathLabel')"
        >
          <template v-slot:append>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" icon="mdi-information-slab-circle-outline"></v-icon>
              </template>
              <pre>{{ $t('ConfigDialog.DefaultStorageSubtitle') }}</pre>
            </v-tooltip>
            <v-btn class="ml-1" @click="browse">{{ $t('ConfigDialog.DefaultStoragePathBrowse') }}</v-btn>
            <v-btn class="ml-1" @click="useDefaultValue">{{ $t('ConfigDialog.UseDefaultValue') }}</v-btn>
          </template>
        </v-text-field>
        <v-card-title>{{ $t('ConfigDialog.GlobalVariablesTitle') }}</v-card-title>
        <!-- <v-card-subtitle>{{ $t('ConfigDialog.GlobalVariablesSubtitle') }}</v-card-subtitle> -->

        <!-- <v-text-field
            v-model="baseConfigData.LMD_DATA_ROOT"
            :readonly="submitLoading"
            :rules="[required]"
            :label="$t('ConfigDialog.DefaultStoragePathLabel')">
            <template v-slot:append>
              <v-btn>{{ $t('ConfigDialog.DefaultStoragePathBrowse') }}</v-btn>
            </template>
          </v-text-field> -->

        <!-- <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.PYTHON_HOME"
          label="PYTHON_HOME"
        ></v-text-field>

        <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.MINICONDA_DIR"
          label="MINICONDA_DIR"
        ></v-text-field> -->

        <!-- <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.NODE_JS_DIR"
          label="NODE_JS_DIR"
        ></v-text-field> -->

        <v-text-field class="mb-4"
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.HF_MIRROR"
          :hint="$t('ConfigDialog.HF_ENDPOINT_TIP')" persistent-hint
          :label="$t('ConfigDialog.HF_ENDPOINT_LABEL')"
        >
        </v-text-field>

        <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.HF_HOME"
          :label="$t('ConfigDialog.HF_HOME_LABEL')">
          <template v-slot:append>
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" icon="mdi-information-slab-circle-outline"></v-icon>
              </template>
              <pre>{{ $t('ConfigDialog.HF_HOME_TIP') }}</pre>
            </v-tooltip>
            <v-btn class="ml-1" @click="browseHFHome">{{ $t('ConfigDialog.HFHOMEPathBrowse') }}</v-btn>
          <v-btn class="ml-1" @click="useDefaultValueHFHome">{{ $t('ConfigDialog.UseDefaultValue') }}</v-btn>
          </template>

        </v-text-field>

        <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.GITHUB_PROXY"
          :hint="$t('ConfigDialog.GITHUB_PROXY_TIP')" persistent-hint
          :label="$t('ConfigDialog.GITHUB_PROXY_LABEL')">
        </v-text-field>

        <!-- <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.PIP_CACHE_DIR"
          label="PIP_CACHE_DIR"
        ></v-text-field> -->

        <v-card-actions class="text-center justify-center">
          <v-btn variant="outlined" @click="globalConfigDialogVisible = false">
            {{ $t('ConfigDialog.close') }}
          </v-btn>
          <v-btn color="primary" variant="flat" type="submit" :loading="submitLoading">
            {{ $t('ConfigDialog.saveConfig') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<style></style>
<script lang="ts" setup>
import {
  getBaseConfig,
  getDefaultBaseConfig,
  getEnvVariables,
  saveBaseConfig
} from '@/client-api/config-file'
import LMDBaseConfig from '@/types/config/LMDBaseConfig'
import LMDGlobalEnv from '@/types/config/LMDGlobalEnv'
import { useLocale } from 'vuetify'
import { ShowToastMessage } from '@/types/toast-message-type'
import { IPCChannelName } from '@/constant/IPCChannelName'
import DirInfo from '@/types/config/DirInfo'
import { selectDirectory } from '@/client-api/file-system'
import DirCheckUtil from '@/util/DirCheckUtil'
import GlobalConfigUtil from '@/util/global-config/GlobalConfigUtil'

const { t } = useLocale()

const globalConfigDialogVisible = ref(false)
const baseConfigData = ref<LMDBaseConfig>({} as LMDBaseConfig)
const envVars = ref<LMDGlobalEnv>({} as LMDGlobalEnv)
const submitLoading = ref(false)
const configValid = ref(false)
const toast = inject<ShowToastMessage>('showToastMessage')

const dirValid = ref(true)
const defaultHFHomeDir = ref('')

onMounted(() => {
  window.ipcRenderer?.on(IPCChannelName.OPEN_GLOBAL_CONFIG_DIALOG, (_event, ...args) => {
    showConfigDialog()
  })
})

const onSubmit = async () => {
  if (!configValid.value) return
  if (!baseConfigData) return
  submitLoading.value = true
  try {
    const result1 = await saveBaseConfig(baseConfigData.value)
    const result2 = await GlobalConfigUtil.saveGlobalEnvVars(envVars.value)

    const msg = t('Common.saveSuccess')
    if(toast) {
      toast(msg, 'success')
    }
    hideConfigDialog()
  } catch (error) {
    console.error(error)
    if(toast) {
      toast(String(error), 'error')
    }
  } finally {
    submitLoading.value = false
  }
}

const required = (v) => {
  return !!v || t('Common.fieldRequired')
}

const hideConfigDialog = async () => {
  globalConfigDialogVisible.value = false
}

const showConfigDialog = async () => {
  globalConfigDialogVisible.value = true
  await initDefaultHFHomeDir()
  if (window.ipcRenderer) {
    baseConfigData.value = await getBaseConfig()
    const envVarsData:LMDGlobalEnv = await getEnvVariables()
    envVarsData.HF_HOME = await GlobalConfigUtil.getHFHomeDirDisplay(envVarsData)
    envVars.value = envVarsData
    console.log('envVars', envVars)
  }
}

const browse = async () => {
  const dirInfo: DirInfo = await selectDirectory(baseConfigData.value.LMD_DATA_ROOT, true);
  if (dirInfo && dirInfo.path) {
    baseConfigData.value.LMD_DATA_ROOT = dirInfo.path;
    checkDirIsValid(dirInfo)
  }
}

const checkDirIsValid = (dirInfo: DirInfo) => {
  const validIncludeLogs = DirCheckUtil.checkModelsDirValid(dirInfo, ['logs'])
    const validIncludeScripts = DirCheckUtil.checkModelsDirValid(dirInfo, ['scripts'])
    dirValid.value = (validIncludeLogs || validIncludeScripts)
}

const useDefaultValue = async () => {
  const configAndDir = await getDefaultBaseConfig()
  if (configAndDir?.rootDir) {
    baseConfigData.value.LMD_DATA_ROOT = configAndDir?.rootDir
  } else {
    if(toast) {
      toast(t('ConfigDialog.NoDefraultDirError'), 'warning')
    }
  }
}

const rootStorageDirValidRules = [
  required,
  () => {
    return dirValid.value || t('ConfigDialog.DirNotValid')
  }
]

const browseHFHome = async () => {
  const dirInfo: DirInfo = await selectDirectory(envVars.value.HF_HOME, false);
  if (dirInfo && dirInfo.path) {
    envVars.value.HF_HOME = dirInfo.path
  }
}

const useDefaultValueHFHome = async () => {
  const defaultHFHomeDir = await GlobalConfigUtil.getDefaultHFHomeDir()

  if (defaultHFHomeDir) {
    envVars.value.HF_HOME = defaultHFHomeDir
  } else {
    if(toast) {
      toast(t('ConfigDialog.NoDefraultDirError'), 'warning')
    }
  }
}

const initDefaultHFHomeDir = async () => {
  defaultHFHomeDir.value = await GlobalConfigUtil.getDefaultHFHomeDir()
}

</script>
