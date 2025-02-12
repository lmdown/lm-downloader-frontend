<template>
  <v-btn variant="flat" color="amber-lighten-5" @click="showStorageInfo()"
    prepend-icon="mdi-folder-alert-outline">
    {{ formatBytes(installedInstance?.fileStorageTotalSize) }}
  </v-btn>
  <v-dialog v-model="dialogVisible" width="auto">
      <v-card class="mx-auto pa-2"
        prepend-icon="mdi-folder-open-outline"
        :title="installedInstance.name + $t('StorageDialog.title')">
        <template v-slot:append>
          <v-btn icon="mdi-close"
            class="ms-auto"
            text="Ok" elevation="0"
            @click="dialogVisible = false"
          ></v-btn>
        </template>
        <v-list v-if="applicationStorageList">
          <v-list-subheader>{{ $t('StorageDialog.application') }}</v-list-subheader>
          <v-list-item
            v-for="(item, i) in applicationStorageList"
            :key="i" :value="item" color="primary" rounded="xl">
            <template v-slot:prepend>
              <v-icon :icon="item.icon || 'mdi-application-brackets-outline'"></v-icon>
            </template>
            <v-list-item-title v-text="item.location"></v-list-item-title>
            <template v-slot:append>
              <span color="grey-lighten-1"
                icon="mdi-information"
                variant="text"
              >{{ prettyBytes(item.size) }}</span>
            </template>
          </v-list-item>
        </v-list>
        <v-list v-if="modelStorageList">
          <v-list-subheader>{{ $t('StorageDialog.model') }}</v-list-subheader>
          <v-list-item
            v-for="(item, i) in modelStorageList"
            :key="i" :value="item" color="primary" rounded="xl">
            <template v-slot:prepend>
              <v-icon :icon="item.icon || 'mdi-cube-outline'"></v-icon>
            </template>
            <v-list-item-title v-text="item.location"></v-list-item-title>
            <template v-slot:append>
              <span class="ml-4"
                color="grey-lighten-1"
                icon="mdi-information"
                variant="text"
              >{{ prettyBytes(item.size) }}</span>
            </template>
          </v-list-item>
        </v-list>

        <template v-slot:actions>
          <v-card-text>
            11
          </v-card-text>
          <v-spacer></v-spacer>
          <p>
            {{$t('StorageDialog.totalSize')}}
            {{ formatBytes(installedInstance?.fileStorageTotalSize)}}
          </p>
        </template>
      </v-card>
    </v-dialog>
</template>
<!-- <template v-if="fileStorageInfoList">
  <v-list density="compact">
    <v-list-subheader>{{ $t('LMAppDetail.directory') }}</v-list-subheader>
    <v-list-item
      v-for="(storageInfo, index) in fileStorageInfoList" :key="index">
      <template v-slot:prepend>
        <v-icon :icon="storageInfo.icon"></v-icon>
      </template>
      {{ storageInfo.location }}
    </v-list-item>
  </v-list>
</template> -->

<script lang="ts" setup>
import { FileStorageInfoDTO, InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import prettyBytes from 'pretty-bytes';

const props = defineProps<{
  installedInstance: InstalledInstanceDTO,
}>()

const dialogVisible = ref(false);
const applicationStorageList = computed(() => {
  const fileStorageInfoList = props.installedInstance?.fileStorageInfoList
  if(fileStorageInfoList && fileStorageInfoList.length > 0) {
    return fileStorageInfoList.filter(item=>item.type === 'exec')
  } else {
    return []
  }
});

const modelStorageList = computed(() => {
  const fileStorageInfoList = props.installedInstance?.fileStorageInfoList
  if(fileStorageInfoList && fileStorageInfoList.length > 0) {
    return fileStorageInfoList.filter(item=>item.type !== 'exec')
  } else {
    return []
  }
});

// const
//fileStorageInfoList?: FileStorageInfoDTO[]

const formatBytes = (value: number) => {
  if(value === undefined || value === null) {
    return '--'
  }
  return prettyBytes(value)
}


const showStorageInfo = () => {
  dialogVisible.value = true
  // const path: string = AppPagePath.AppRunning
  // const runningPagePath = path.replace(':id', props.appId)
}

</script>
