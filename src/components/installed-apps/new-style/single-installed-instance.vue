<template>
  <v-sheet v-if="instanceData" background-color="#FFF6EE"
      class="single-instance-card rounded-lg">
      <v-card-text v-if="iconVisible && appIconUrl">
        <v-img width="68" height="68" cover style="border-radius: 8px; cursor: pointer;" @click="gotoDetailPage"
          :alt="instanceData.name" :src="appIconUrl"></v-img>
      </v-card-text>

      <!-- <v-card-title v-if="appNameVisible" @click="gotoDetailPage">
        {{ instanceData.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('LMAppDetail.version') }} {{ instanceData.version }}
        &nbsp;

        {{ DateTimeUtil.format(instanceData.createTime) }}
      </v-card-subtitle> -->

      <template v-if="appVersionVisible">
        <div class="small-title-for-version" >
          {{ $t('LMAppDetail.version') }} {{ instanceData.version }}
        </div>
      </template>
      <div class="app-info-item align-center">
        <v-tooltip :text="$t('LMAppDetail.installedAt')" location="top">
          <template v-slot:activator="{ props }">
            <div>
              <v-img width="32" height="2rem" v-bind="props" src="./images/app/install-time.png"></v-img>
            </div>
          </template>
        </v-tooltip>
        <div style="flex: 1; text-align: center;">
          {{ DateTimeUtil.format(instanceData.createTime) }}
        </div>
      </div>

      <div class="app-info-item align-center">
        <div>
          <v-img width="2rem" height="2rem" src="./images/app/model-dir.png"></v-img>
        </div>
        <v-btn variant="text" style="flex: 1;">
          {{ $t('LMAppDetail.appDirectory') }} >
        </v-btn>
      </div>

      <v-spacer class="mt-6"></v-spacer>

      <v-btn variant="flat" color="primary" class="control-btn"
        @click="startApp(instanceData.id)">
        {{ $t('LMAppDetail.RunApp') }}
      </v-btn>

      <div style="text-align: center;" v-if="!instanceData.appInstallPath">
        <div class="mt-2"></div>
        <StorageSimpleBtn @deleted="onDeleted"
          :installed-instance="instanceData"></StorageSimpleBtn>
        <v-btn
          variant="flat" color="light-green-lighten-5"
          prepend-icon="mdi-folder-refresh-outline"
          @click="refreshData()">
          {{ $t('StorageDialog.Refresh') }}
        </v-btn>
        <div class=" pb-2"></div>
      </div>
      <!-- <v-btn
        variant="flat" color="light-green-lighten-5"
        @click="refreshData()">
        {{ $t('StorageDialog.Refresh') }}
      </v-btn> -->
  </v-sheet>
</template>
<style>
.single-instance-card {
  background-color: #FFF6EE;
}

.small-title-for-version {
  padding-left: 20px;
  position: relative;
  line-height: 200%;
}
.small-title-for-version::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 4px;
  background-color: #FB6900;
  border-radius: 2px;
}

.app-info-item {
  display: flex;
  flex-direction: row;
  height: 40px;
  background: #FFFFFF;
  border-radius: 8px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  font-size: 14px;
  margin-top: 8px;
}

.control-btn {
  width: 100%;
  display: block;
  background-image: url('../images/app/run-btn-bg.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
}

</style>
<script lang="ts" setup>
import DateTimeUtil from '@/util/DateTimeUtil';
// import StorageStatBtn from '../storage/storage-stat-btn.vue';
import AppRunningUtil from '@/util/AppRunningUtil';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import { useLocale } from 'vuetify';

// import { getInstalledInstanceVer } from '@/api/install-instance';
import router from "@/router"
import { AppPageName } from '@/router/AppPagePath';
import StorageSimpleBtn from '@/components/storage/storage-simple-btn.vue';

const { t } = useLocale()

// const currentInstanceVersion = ref('')

// onMounted(() => {
//   checkVer()
// })

const props = defineProps<{
  appNameVisible: boolean,
  iconVisible: boolean,
  appVersionVisible: boolean,
  appIconUrl?: string,
  instanceData: InstalledInstanceDTO
}>()

// const mainIconType = ref<string>('')
const emit = defineEmits(['deleted', 'refresh'])

interface IconInfo {
  type: string | 'icon' | 'img'
  value: string
  installMethodStr: string
}

const installInstanceIcon = computed((): IconInfo | null => {
  const lmdLogoPath = './images/icons/lmd-logo.png'
  const iconInfo = {} as IconInfo
  if (!props.instanceData) {
    return null
  }
  const installMethod = props.instanceData.installMethod
  if(installMethod==='import') {
    iconInfo.type = 'icon'
    iconInfo.value = 'mdi-application-import'
    iconInfo.installMethodStr = t('InstalledApps.Imported')
  } else {
    iconInfo.type = 'img'
    iconInfo.value = lmdLogoPath
    iconInfo.installMethodStr = t('InstalledApps.InstalledByLMD')
  }
  return iconInfo
})

// const checkVer = async () => {
//   const version = await getInstalledInstanceVer(props.instanceData.installName)
//   currentInstanceVersion.value = version
// }

const gotoDetailPage = () => {
  console.log('gotoDetailPage', props.instanceData.appId)
  const currentRouteName = router.currentRoute.value.name
  if(currentRouteName === AppPageName.AppDetail) {
    return
  }
  router.push({
    name: AppPageName.AppDetail,
    params: { id: props.instanceData.appId }
  })
}

const startApp = (instanceId: string) => {
  AppRunningUtil.openAppRunningWindow(instanceId, 'start')
}

const onDeleted = () => {
  emit('deleted')
}

const refreshData = () => {
  emit('refresh')
}

</script>
