<template>
  <v-app-bar elevation="0" class="window-drag" height="80">
    <template v-slot:prepend>
      <v-btn class="window-no-drag mt-4" @click="goBack" variant="plain">
        <!--  -->
        <v-icon
          class="lmd-back-icon mr-3"
          style="font-size: 1.4rem"
          size="36"
          icon="mdi-chevron-left"
          color="#FB6C00"
        ></v-icon>
        <span style="font-size: 20px">{{ $t('LMAppDetail.goBack') }}</span>
      </v-btn>
    </template>
    <template v-slot:append>
      <div class="mt-4">
        <top-right-controls></top-right-controls>
      </div>
    </template>
  </v-app-bar>
  <!-- height: calc(100vh - 80px);   -->
  <v-container class="px-0 py-0" style="max-width: none; " >
    <v-row class="app-detail my-4 mx-6" >
      <v-col cols="12" md="8" lg="9">
        <BasicInfoAndTags :lmAppData="lmAppData"></BasicInfoAndTags>
        <AppSnapshotSlide v-if="lmAppData.snapshots" :snapshots="lmAppData.snapshots"></AppSnapshotSlide>
        <v-spacer class="mb-4"></v-spacer>
        <FullDescText :lm-app-data="lmAppData"></FullDescText>
        <ExtraInfo :lmAppData="lmAppData"></ExtraInfo>
      </v-col>
      <v-col class="app-detail-container-sidebar px-4" cols="12" md="4" lg="3">
        <div style="font-size: 1.25rem; font-weight: bold;">{{ $t('LMAppDetail.InstallRecord') }}</div>
        <InstalledInfoList v-if="lmAppData.id" :lmAppData="lmAppData"></InstalledInfoList>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.lmd-back-icon {
  background-color: rgba(251, 108, 0, 0.1);
  border-radius: 100%;
  font-size: 9px;
}

.app-detail {
  border-radius: 16px;
  border: 1px solid #EBEBF7;
  display: flex;
}

.app-detail-container-main {
  flex: 1;
}

.app-detail-container-sidebar {
  border-left: 1px #EBEBF7 solid;
}

</style>
<script lang="ts" setup>
import AppSnapshotSlide from '@/components/app-detail/app-snapshot-slide.vue'
import BasicInfoAndTags from '@/components/app-detail/basic-info-and-tags.vue'
import ExtraInfo from '@/components/app-detail/extra-info.vue'
import InstalledInfoList from '@/components/app-detail/installed-info-list.vue'
// import StorageInfo from '@/components/app-detail/storage-info.vue';
import { useLMAppStore } from '@/store/lmapp'
// import { useInstalledInstanceStore } from '@/store/installed-instance'
import { AIAppDTO } from '@/types/AIAppDTO'
// import { useRouter } from 'vue-router'
import TopRightControls from '@/components/common/top-right-controls.vue'
import FullDescText from '@/components/app-detail/full-desc-text.vue'

const route = useRoute()
const lmAppStore = useLMAppStore()

const lmAppData = ref({} as AIAppDTO)
// const installedInstancesForApp = ref([] as InstalledInstanceDTO[])

const router = useRouter()

watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log('app detail ', newId, oldId)
  },
)

onMounted(async () => {
  const id = route.params.id as string
  await lmAppStore.fetchApp(id)
  lmAppData.value = lmAppStore.currentLmApp

  // await instanceStore.getInstalledInstanceForApp(id);
  // installedInstancesForApp.value = instanceStore.instancesForApp
})

const goBack = () => {
  router.go(-1)
}
</script>
