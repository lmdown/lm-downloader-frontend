<template>
  <v-sheet v-if="instanceData"
      :class="['single-instance-card', 'rounded-lg', cardColorStyleClass || 'instance-card-default', instanceCardHoverClass] " >
      <v-card-text style="display: flex;" v-if="iconVisible && appIconUrl">
        <div>
        <v-img width="68" height="68" cover style="border-radius: 8px; cursor: pointer;" @click="gotoDetailPage"
          :alt="instanceData.name" :src="appIconUrl"></v-img>
        </div>

        <div style="flex: 1;">
          <v-card-title v-if="appNameVisible" @click="gotoDetailPage"
            style="font-size: 1.125rem; font-weight: bold; color: rgba(0,0,0,0.75); ">
            {{ instanceData.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ $t('LMAppDetail.version') }} {{ instanceData.version }}
          </v-card-subtitle>
        </div>
      </v-card-text>

      <template v-if="appVersionVisible">
        <div class="small-title-for-version" >
          {{ $t('LMAppDetail.version') }} {{ instanceData.version }}
        </div>
      </template>
      <div class="app-info-item align-center">
        <v-tooltip :text="$t('LMAppDetail.installedAt')" location="top">
          <template v-slot:activator="{ props }">
            <div class="mx-1">
              <v-img width="1.8rem" height="1.8rem" v-bind="props"
                src="./images/app/install-time-gray.png"
                ></v-img>
            </div>
          </template>
        </v-tooltip>
        <div style="flex: 1;" class="text-left mx-1">
          {{ DateTimeUtil.format(instanceData.createTime) }}
        </div>
      </div>

      <div class="app-info-item align-center">
        <div class="mx-1">
          <v-img width="1.8rem" height="1.8rem"
            src="./images/app/model-dir-gray.png"></v-img>
        </div>
        <a href="#" style="flex: 1;" class="text-left mx-1" @click.prevent="openFolder">
          {{ $t('LMAppDetail.appDirectory') }} >
          <v-tooltip activator="parent" location="top">
            {{ instanceData.appInstallPath }}
          </v-tooltip>
        </a>
        <!-- <v-btn variant="text" style="flex: 1;" class="text-left">
          {{ $t('LMAppDetail.appDirectory') }} >
        </v-btn> -->
      </div>
      <v-spacer class="mt-6"></v-spacer>
      <!-- <v-btn variant="flat" class="control-btn"
        @click="startApp(instanceData.id)">
        {{ $t('LMAppDetail.RunApp') }}
      </v-btn> -->

      <a href="#" variant="flat" class="control-btn"
        @click.prevent="startApp(instanceData.id)"
         @mouseenter="onRunBtnHover" @mouseleave="onRunBtnMoveOut">
        {{ $t('LMAppDetail.RunApp') }}
      </a>

      <!-- <div style="text-align: center;" v-if="!instanceData.appInstallPath">
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
      </div> -->
  </v-sheet>
</template>
<style>
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
  border-radius: 8px;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  font-size: 14px;
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.75);
}

.app-info-item a {
  color: rgba(0, 0, 0, 0.75);
  text-decoration: none;
}

/* for app detail page */
.instance-card-default {
  background-color: #FFF6EE;
}

.instance-card-default .app-info-item {
  background: #FFFFFF;
}

.instance-card-default .control-btn {
  width: 100%;
  display: block;
  background-image: url('../images/app/run-btn-bg.png');
  background-repeat: no-repeat;
  background-size: auto;
  /* background-position-x: center; */
  color: #FFF;
  background-color: rgb(255 116 0);
}

.instance-card-default a:hover.control-btn {
  color: #FFF;
}

/* for installed app list */
.instance-card-gray {
  border: 1px solid #EBEBF7;
  background-color: #FFF;
  transition: background-color .2s;
  /* background-color: #F9F9FF; */
}

.instance-card-gray-hover {
  background-color: #F9F9FF;
  border-color: rgba(255, 255, 255, 0);
}


.instance-card-gray .app-info-item {
  background: #F9F9FF;
}

.instance-card-gray-hover .app-info-item {
  background: #FFF;
}

.instance-card-gray .control-btn {
  color: #000;
}

.single-instance-card .control-btn {
  height: 2.5rem;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;

  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  line-height: 250%;
  text-decoration: none;
  display: block;
  width: 100%;


  text-align: center;
  font-weight: bold;
  font-size: 16px;
  position: relative; /* 为伪元素定位设置相对位置 */
  overflow: hidden;

  background-position: center;
  background-size: auto 100%;
  background-repeat: no-repeat;
  z-index: 1;
  transition: color 0.2s ease, background-color 0.2s ease 0s;
}


.single-instance-card .control-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; /* 将伪元素放置在文字下方 */
  background-image: url('../images/app/run-btn-bg.png');
  background-position: -120% 100%;
  background-size: auto 100%;
  opacity: 0.0;
  background-color: rgba(249, 249, 255, 0);
  transition: background-color 0.2s ease 0.2s, opacity 0.3s ease 0.0s, background-position 0.4s ease 0.3s;
}

.instance-card-gray .control-btn {
  background-color: #F9F9FF;
}

.instance-card-gray .control-btn:hover {
  color: #FFFFFF;
  background-color: rgba(255, 116, 0, 1);
}

.single-instance-card .control-btn:hover::before {
  opacity: 1; /* 慢慢显示背景图 */
  background-position: center;
  background-color: rgba(255, 116, 0, 1);
  transition: background-color 0.2s ease 0.3s, opacity 0.3s ease 0.3s, background-position 0.3s ease 0.3s;
}

</style>
<script lang="ts" setup>
import DateTimeUtil from '@/util/DateTimeUtil';
// import StorageStatBtn from '../storage/storage-stat-btn.vue';
import AppRunningUtil from '@/util/AppRunningUtil';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
// import { useLocale } from 'vuetify';

// import { getInstalledInstanceVer } from '@/api/install-instance';
import router from "@/router"
import { AppPageName } from '@/router/AppPagePath';
// import StorageSimpleBtn from '@/components/storage/storage-simple-btn.vue';
import { openPath } from '@/client-api/config-file';
import { AppScriptType } from '@/constant/AppScriptType';

// const { t } = useLocale()
// const currentInstanceVersion = ref('')
// onMounted(() => {
//   checkVer()
// })

const props = defineProps<{
  appNameVisible: boolean,
  iconVisible: boolean,
  appVersionVisible: boolean,
  appIconUrl?: string,
  cardColorStyleClass?: string,
  instanceData: InstalledInstanceDTO
}>()

const instanceCardHoverClass = ref('')

// const mainIconType = ref<string>('')
// const emit = defineEmits(['deleted', 'refresh'])

// interface IconInfo {
//   type: string | 'icon' | 'img'
//   value: string
//   installMethodStr: string
// }

const onRunBtnHover = () => {
  if(props.cardColorStyleClass === 'instance-card-gray') {
    instanceCardHoverClass.value = 'instance-card-gray-hover'
  }
}

const onRunBtnMoveOut = () => {
  instanceCardHoverClass.value = ''
}


// const installInstanceIcon = computed((): IconInfo | null => {
//   const lmdLogoPath = './images/icons/lmd-logo.png'
//   const iconInfo = {} as IconInfo
//   if (!props.instanceData) {
//     return null
//   }
//   const installMethod = props.instanceData.installMethod
//   if(installMethod==='import') {
//     iconInfo.type = 'icon'
//     iconInfo.value = 'mdi-application-import'
//     iconInfo.installMethodStr = t('InstalledApps.Imported')
//   } else {
//     iconInfo.type = 'img'
//     iconInfo.value = lmdLogoPath
//     iconInfo.installMethodStr = t('InstalledApps.InstalledByLMD')
//   }
//   return iconInfo
// })

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
  AppRunningUtil.openAppRunningWindow(instanceId, AppScriptType.START)
}

// const onDeleted = () => {
//   emit('deleted')
// }

// const refreshData = () => {
//   emit('refresh')
// }

const openFolder = () => {
  // console.log(props.installedInstance.appInstallPath)
  const appInstallPath = props.instanceData.appInstallPath
  if (appInstallPath) {
    openPath(props.instanceData.appInstallPath)
  }
}

</script>
