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
        <v-card-subtitle>{{ $t('ConfigDialog.DefaultStorageSubtitle') }}</v-card-subtitle>
        <v-text-field
          v-model="baseConfigData.LMD_DATA_ROOT"
          :readonly="submitLoading"
          :rules="[required]"
          :label="$t('ConfigDialog.DefaultStoragePathLabel')"
        >
          <!-- <template v-slot:append>
            <v-btn>{{ $t('ConfigDialog.DefaultStoragePathBrowse') }}</v-btn>
          </template> -->
        </v-text-field>
        <v-card-title>{{ $t('ConfigDialog.GlobalVariablesTitle') }}</v-card-title>
        <v-card-subtitle>{{ $t('ConfigDialog.GlobalVariablesSubtitle') }}</v-card-subtitle>

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

        <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.NODE_JS_DIR"
          label="NODE_JS_DIR"
        ></v-text-field>

        <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.HF_MIRROR"
          label="HF_MIRROR"
        ></v-text-field>

        <v-text-field
          :readonly="submitLoading"
          :rules="[required]"
          v-model="envVars.GITHUB_PROXY"
          label="GITHUB_PROXY"
        ></v-text-field>

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
  getEnvVariables,
  saveBaseConfig,
  saveEnvVariables,
} from '@/client-api/config-file'
import LMDBaseConfig from '@/types/config/LMDBaseConfig'
import LMDAppEnvVariables from '@/types/config/LMDGlobalEnv'
import { useLocale } from 'vuetify'
import { ShowToastMessage } from '@/types/toast-message-type'
import { IPCChannelName } from '@/constant/IPCChannelName'

const { t } = useLocale()

const globalConfigDialogVisible = ref(false)
const baseConfigData = ref<LMDBaseConfig>({} as LMDBaseConfig)
const envVars = ref<LMDAppEnvVariables>({} as LMDAppEnvVariables)
const submitLoading = ref(false)
const configValid = ref(false)
const toast = inject<ShowToastMessage>('showToastMessage')
// form: false,
// email: null,
//       password: null,
//       loading: false,

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
    const result2 = await saveEnvVariables(envVars.value)
    //LMDAppEnvVariables
  } catch (error) {
    console.error(error)
  } finally {
    submitLoading.value = false
    const msg = t('Common.saveSuccess')
    // console.log('showToastMessage', toast)
    if(toast)
      toast(msg, 'success')
  }
}

const required = (v) => {
  return !!v || t('Common.fieldRequired')
}

const showConfigDialog = async () => {
  globalConfigDialogVisible.value = true
  if (window.ipcRenderer) {
    baseConfigData.value = await getBaseConfig()
    envVars.value = await getEnvVariables()
    console.log('envVars', envVars.value)
  }
}
</script>
