<template>
  <div class="app-item" @click.prevent="onAppClick">
    <v-img class="downloadable-icon" v-if="downloadableVisible"
      width="36" height="36" src="./images/icons/downloadable.png">
      <v-tooltip
          activator="parent" location="top" transition="false">
          {{ $t('UniversalApps.Downloadable') }}
        </v-tooltip>
    </v-img>

    <div style="width: 40px; height: 40px; display: block;">
      <v-img width="40" height="40" :src="appData.icon"></v-img>
    </div>

    <div class="app-title-container">
      <div class="app-title">
        {{ appData.name }}
        <v-tooltip open-delay="1200"
          activator="parent" location="top" transition="false">
          {{ appData.name }}
        </v-tooltip>
      </div>
      <div class="app-short-desc" v-if="desc">
        {{ desc }}
        <v-tooltip open-delay="1000"
          activator="parent" location="bottom" transition="false">
          {{ desc }}
        </v-tooltip>
      </div>
    </div>
  </div>
</template>
<style>
.cat-item-container .app-list .app-item {
  border-radius: 0.5rem;
  cursor: pointer;
  /* border: 1px solid rgb(var(--v-theme-surface-light)); */
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.1);
  /* margin: 8px; */
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  /* width: 220px; */
  width: 100%;
  height: 72px;
  position: relative;
}

.cat-item-container .app-list .app-item .downloadable-icon {
  position: absolute;
  top: 0;
  right: 0;
}

.cat-item-container .app-list .app-item .app-title-container {
  flex: 1;
}
.cat-item-container .app-list .app-item .app-title {
  font-weight: bold;
  font-size: 1rem;
  width: 100%;
  overflow: hidden;
  word-break: break-all;
  height: 1.5rem;
}

.cat-item-container .app-list .app-item .app-short-desc {
  font-size: 14px;
  color: #424254;
  overflow:hidden;
  word-break:break-all;
  /* text-overflow:ellipsis; */
  height: 1.3rem;
  /* text-wrap: nowrap; */
}

</style>
<script lang="ts" setup>
import { getAIAppInfoByInstallName } from '@/api/app-info';
import { checkSupportUAppWin, checkSupportWebview } from '@/client-api/lmd-system';
import router from '@/router';
import { AppPageName } from '@/router/AppPagePath';
import { AIAppDTO } from '@/types/AIAppDTO';
import { UniversalAIAppDTO } from '@/types/universal-app/UniversalAIAppDTO';
import AppRunningUtil from '@/util/AppRunningUtil';
import UAppUtil from '@/util/universal-app/UAppUtil';


const props = defineProps<{
  appData: UniversalAIAppDTO
}>()

const desc = computed(() => {
  return UAppUtil.getLocaleDesc(props.appData)
})

const downloadableVisible = computed(() => {
  return UAppUtil.checkIsDownloadable(props.appData)
})

const onAppClick = async () => {
  const {refLinks, url} = props.appData
  let targetUrl

  if(props.appData.alias) {
    gotoDetailPage()
    return
  } else if(refLinks) {
    const refLinksArr = JSON.parse(refLinks)
    targetUrl = refLinksArr[0].homepage
  } else if(url) {
    targetUrl = url
  }
  const isSupportWebview = await checkSupportWebview()
  const isSupportUAppWin = await checkSupportUAppWin()
  console.log('isSupportWebview', isSupportWebview)
  console.log('isSupportUAppWin', isSupportWebview)
  if (isSupportUAppWin) {
    openUAppLiteWindow(targetUrl)
  } else if (isSupportWebview) {
    openRunningWinWebview(targetUrl)
  } else {
    simulateAnchorClick(targetUrl)
  }
}

const gotoDetailPage = async () => {
  const aiAppDTO: AIAppDTO = await getAIAppInfoByInstallName(props.appData.alias)
  const appId = aiAppDTO.id
  router.push({
    name: AppPageName.AppDetail,
    params: { id: appId }
  })
}

const openRunningWinWebview = (targetUrl: string) => {
  const appData = Object.assign({}, props.appData)
  appData.url = targetUrl
  AppRunningUtil.openUniversalAppWebview(appData)
}

const openUAppLiteWindow = (targetUrl: string) => {
  const appData = Object.assign({}, props.appData)
  appData.url = targetUrl
  AppRunningUtil.openUAppLiteWindow(appData)
}

const simulateAnchorClick = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


</script>
