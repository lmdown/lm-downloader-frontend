<template>
  <v-container class="mx-4 ga-2 "
  style="width: 100%; max-width: unset;" v-if="installedInstanceList && installedInstanceList.length > 0">
    <v-row>
      <v-col
      v-for="(item, index) in installedInstanceList" :key="index"
      cols="12" xs="12" sm="6" md="4" lg="3"  xl="2">
      <!-- <InstalledInstanceItem
        :app-icon-url="item.appIcon"
        :instance-data="item" @deleted="onDeleted"
        :app-name-visible="true" :icon-visible="true"></InstalledInstanceItem> -->

      <SingleInstalledInstance
        :app-icon-url="item.appIcon"
        card-color-style-class="instance-card-gray"
        :app-version-visible="false"
        :instance-data="item" @deleted="onDeleted"
        :app-name-visible="true" :icon-visible="true"></SingleInstalledInstance>

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
import SingleInstalledInstance from './new-style/single-installed-instance.vue';
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
