<template v-if="fileStorageInfoList">
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
</template>
<style>
</style>
<script lang="ts" setup>
import { FileStorageInfoDTO } from '@/types/InstalledInstanceDTO';

defineProps<{
  fileStorageInfoList?: FileStorageInfoDTO[]
}>()


</script>
