<template>
  <v-container class="mx-10 d-flex flex-column ga-2 "
  style="width: 100%;" v-if="installedInstanceList && installedInstanceList.length > 0">
    <v-row>
      <v-col
      v-for="(item, index) in installedInstanceList" :key="index"
      cols="6">
      <InstalledInstanceItem
        :app-icon-url="item.appIcon"
        :instance-data="item" @deleted="onDeleted"
        :app-name-visible="true" :icon-visible="true"></InstalledInstanceItem>
      </v-col>
    </v-row>
  </v-container>
  <h1 class="text-center mx-auto" v-if="installedInstanceList && installedInstanceList.length === 0">
    {{ $t('InstalledApps.NoApp') }}
  </h1>
</template>
<style>

</style>
<script lang="ts" setup>
import { getInstalledInstanceList } from '@/api/install-instance';
// import { useLMAppStore } from '@/store'
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import InstalledInstanceItem from '../app-detail/installed-instance-item.vue';
// const lmAppStore = useLMAppStore()
const installedInstanceList = ref<InstalledInstanceDTO[] | null>(null)

onMounted(() => {
  getList()
})

const getList = async () => {
  const list = await getInstalledInstanceList()
  installedInstanceList.value = list
}

const onDeleted = () => {
  getList()
}
</script>
