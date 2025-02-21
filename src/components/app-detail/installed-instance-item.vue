<template>
  <v-card rounded="lg" v-if="instanceData"
      class="common-instance-card rounded-lg mx-auto"
      >
      <template v-slot:prepend v-if="iconVisible && appIconUrl">
        <v-img width="68" height="68" cover style="border-radius: 8px; cursor: pointer;" @click="gotoDetailPage"
          :alt="instanceData.name" :src="appIconUrl"></v-img>
      </template>

      <template v-slot:append v-if="installInstanceIcon">
        <v-tooltip :text="installInstanceIcon.installMethodStr" location="top">
          <template v-slot:activator="{ props }">
            <v-icon size="30" color="primary" :icon="installInstanceIcon.value"
              v-if="installInstanceIcon.type==='icon'"></v-icon>
            <v-img v-else  width="30" v-bind="props" style="border-radius: 8px;"
              :alt="instanceData.name" :src="installInstanceIcon?.value"></v-img>
          </template>
        </v-tooltip>
      </template>

      <template v-slot:title>
      <v-card-title v-if="appNameVisible" @click="gotoDetailPage">
        {{ instanceData.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('LMAppDetail.version') }} {{ instanceData.version }}
        &nbsp;

        <v-tooltip :text="$t('LMAppDetail.installedAt')"
          location="top">
          <template v-slot:activator="{ props }">
          <v-icon color="secondary"
            v-bind="props"
              icon="mdi-clock-time-ten-outline">

          </v-icon>
          </template>
        </v-tooltip>

        {{ DateTimeUtil.format(instanceData.createTime) }}
      </v-card-subtitle>
    </template>
    <template v-slot:actions>
      <v-spacer></v-spacer>
      <StorageSimpleBtn @deleted="onDeleted" :installed-instance="instanceData"></StorageSimpleBtn>
      <!-- <StorageStatBtn :installedInstance="instanceData"></StorageStatBtn> -->
      <!-- <v-btn variant="flat" color="grey-lighten-3" @click="startApp()"
        prepend-icon="mdi-folder-alert-outline">
        {{ prettyBytes(item.fileStorageTotalSize) }}
      </v-btn> -->
      <!-- <v-icon>mdi-folder-alert-outline</v-icon> -->

      <v-btn variant="flat" color="light-green-lighten-5"
        v-if="!instanceData.appInstallPath"
        prepend-icon="mdi-folder-refresh-outline"
        @click="refreshData()">
        {{ $t('StorageDialog.Refresh') }}
      </v-btn>

      <v-btn variant="flat" color="light-green-lighten-5"
        prepend-icon="mdi-application-brackets-outline"
        @click="startApp(instanceData.id)">
        {{ $t('LMAppDetail.RunApp') }}
      </v-btn>
    </template>

  </v-card>
</template>
<style>
</style>
<script lang="ts" setup>
import DateTimeUtil from '@/util/DateTimeUtil';
// import StorageStatBtn from '../storage/storage-stat-btn.vue';
import AppRunningUtil from '@/util/AppRunningUtil';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import { useLocale } from 'vuetify';
import StorageSimpleBtn from '../storage/storage-simple-btn.vue';
// import { getInstalledInstanceVer } from '@/api/install-instance';
import router from "@/router"
import { AppPageName } from '@/router/AppPagePath';
import { AppScriptType } from '@/constant/AppScriptType';

const { t } = useLocale()

// const currentInstanceVersion = ref('')

// onMounted(() => {
//   checkVer()
// })

const props = defineProps<{
  appNameVisible: boolean,
  iconVisible: boolean,
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
  AppRunningUtil.openAppRunningWindow(instanceId, AppScriptType.START)
}

const onDeleted = () => {
  emit('deleted')
}

const refreshData = () => {
  emit('refresh')
}

</script>
