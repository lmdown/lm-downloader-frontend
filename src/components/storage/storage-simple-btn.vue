<template>
  <v-btn variant="flat" color="amber-lighten-5"
    @click="openFolder">
    <template v-slot:prepend>
      <v-icon color="error" v-if="!props.installedInstance.appInstallPath"
        icon="mdi-folder-alert-outline">
      </v-icon>
      <v-icon v-else icon="mdi-folder-outline"></v-icon>
    </template>
    {{ $t('StorageDialog.installDir') }}
    <!-- <v-tooltip activator="parent" location="top">
      {{ $t('StorageDialog.UnderConstruction') }}
    </v-tooltip> -->
  </v-btn>
  <v-dialog v-model="deleteDialogVisible" max-width="400">
    <v-card
      prepend-icon="mdi-folder-alert-outline"
      :title="$t('StorageDialog.MissingFiles')">
      <v-card-text>
        <p>{{ $t('StorageDialog.FilesErrorTip') }}</p>
        <p>{{ $t('StorageDialog.FilesDeleteTip') }}</p>
      </v-card-text>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteDialogVisible = false">
          <p>{{ $t('StorageDialog.Cancel') }}</p>
        </v-btn>
        <v-btn color="error" @click="deleteRecord">
          <p>{{ $t('StorageDialog.Delete') }}</p>
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<style>

</style>
<script lang="ts" setup>
import { deleteInstalledInstance } from '@/api/install-instance';
import { openPath } from '@/client-api/config-file';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import { ShowToastMessage } from '@/types/toast-message-type'
import { AxiosError } from 'axios';
import { useLocale } from 'vuetify';
const toast = inject<ShowToastMessage>('showToastMessage')
const {t} = useLocale()

const props = defineProps<{
  installedInstance: InstalledInstanceDTO
}>()

const emit = defineEmits(['deleted'])

const deleteDialogVisible = ref(false)

const deleteRecord = async () => {
  try {
    await deleteInstalledInstance(props.installedInstance.id)
    if(toast) {
      toast(t('StorageDialog.DeleteFinished'), 'success')
    }
    emit('deleted')
    deleteDialogVisible.value = false
  } catch (err) {
    const errData = err as AxiosError
    let msg = 'Error'
    // @ts-expect-error: 2339
    msg = errData.response?.data?.error
    if(toast && msg) {
      toast(t(`Api.${msg}`), 'error')
    }
  }

}

const openFolder = () => {
  // console.log(props.installedInstance.appInstallPath)
  const appInstallPath = props.installedInstance.appInstallPath
  if (appInstallPath) {
    openPath(props.installedInstance.appInstallPath)
  } else {
    deleteDialogVisible.value = true
  }
}
// const appFullPath
</script>
