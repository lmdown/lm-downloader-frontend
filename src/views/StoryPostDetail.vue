<template>
  <v-app-bar elevation="0" class="window-drag pt-4">
    <template v-slot:prepend>
      <v-btn class="window-no-drag" @click="goBack" variant="plain">
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
      <top-right-controls></top-right-controls>
    </template>
  </v-app-bar>
  <v-container style="max-width: none" class="mx-8 mt-4">
    <v-row class="story-post-content flex-column align-content-center">
      <v-card-title class="text-center pt-8 pb-6 px-8" width="100%" style="flex: 1; font-weight: bold">
        {{ appStory.title }}
      </v-card-title>

      <v-img
        :src="appStory.coverImageUrl"
        width="80%"
        class="mx-auto"
        aspect-ratio="16/9"
        cover
      ></v-img>
      <VCardText class="px-8 py-8">
        <div v-html="appStory.content"></div>
      </VCardText>
      <!-- <v-card-text class="responsive-iframe-container">
        <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=113882819465634&bvid=BV1QdfnYwEFc&cid=28053735497&p=1&autoplay=0" scrolling="no" border="2" frameborder="no"
          framespacing="0" allowfullscreen="true"></iframe>
      </v-card-text> -->
    </v-row>
    <v-row v-if="appStory.relatedAppIds" class="flex-column">
      <v-card-title class="text-left py-6 px-0" width="100%" style="flex: 1; font-weight: bold">
        {{ $t('StoryPost.RelatedApps') }}
      </v-card-title>
      <AppList :apps="relatedApps"></AppList>
      <!-- <VCardText v-html="appStory.relatedAppIds">
      </VCardText> -->
      <div height="12px" class="mb-7"></div>
      <!-- <iframe src="//player.bilibili.com/player.html?aid=375588815&bvid=BV1so4y1m7U5&cid=339262048&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe> -->

      <!-- <iframe src="//player.bilibili.com/player.html?aid=375588815&bvid=BV1so4y1m7U5&cid=339262048&page=1&high_quality=1&danmaku=0" allowfullscreen="allowfullscreen" width="100%" height="500" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe> -->


    </v-row>
  </v-container>
</template>
<style>
.lmd-back-icon {
  background-color: rgba(251, 108, 0, 0.1);
  border-radius: 100%;
  font-size: 9px;
}
.story-post-content {
  border-radius: 16px;
  border: 1px solid #ebebf7;
}

.responsive-iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 50%;
    overflow: hidden;
    margin: 20px 0;
}

.responsive-iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* 媒体查询：小屏幕设备 */
@media (max-width: 768px) {
    .article-container {
        padding: 15px;
    }

    .responsive-iframe-container {
        max-width: 100%; /* 在小屏幕上占满整个宽度 */
    }
}

</style>
<script lang="ts" setup>
import { getRelatedAppList } from '@/api/app-info'
import { getAppStory } from '@/api/app-story'
import AppList from '@/components/common/app-list.vue'
import { AIAppDTO } from '@/types/AIAppDTO'
import { AppStoryDTO } from '@/types/AppStoryDTO'
import TopRightControls from '@/components/common/top-right-controls.vue'

const appStory = ref<AppStoryDTO>({} as AppStoryDTO)
const relatedApps = ref<AIAppDTO[]>([])

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const id = route.params.id as string
  const data = await getAppStory(id)
  appStory.value = data

  const relatedAppIds = appStory.value.relatedAppIds
  if (relatedAppIds) {
    const data = await getRelatedAppList(relatedAppIds)
    relatedApps.value = data
  }
})

const goBack = () => {
  router.go(-1)
}
</script>
