<template>
<v-carousel hide-delimiters height="auto" cycle class="home-banners-carousel" v-if="banners">
  <template v-slot:prev="{ props }">
    <v-btn
      variant="flat"
      class="switch-button-prev pl-10 pr-6"
      @click="props.onClick"
      icon="mdi-chevron-left"
    ></v-btn>
  </template>
  <template v-slot:next="{ props }">
    <v-btn
      class="switch-button-next pl-6 pr-10"
      variant="flat"
      @click="props.onClick"
      icon="mdi-chevron-right"
    ></v-btn>
  </template>

  <v-carousel-item v-for="(item, index) in banners"
      cover :key="index"
      @click="goToPostPage(item)">
      <v-img class="v-img"
      style="border-radius: 8px;"
      :src="item.coverImageUrl" :aspect-ratio="15/4"
      cover width="100%" ></v-img>
  </v-carousel-item>
</v-carousel>
</template>
<style>
.home-banners-carousel .switch-button-prev {
  color: #FFF;
  background: rgba(60,60,60,0.5);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 1.4rem;
  border-bottom-right-radius: 1.4rem;
}

.home-banners-carousel .switch-button-next {
  color: #FFF;
  background: rgba(60,60,60,0.5);
  border-top-left-radius: 1.4rem;
  border-bottom-left-radius: 1.4rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.home-banners-carousel .v-img {
  width: 100%;
  object-fit: cover;
  cursor: pointer;
}
.home-banners-carousel .v-window__controls {
  padding: 0;
}
</style>
<script lang="ts" setup>
import { HomeBannerDTO } from '@/types/HomeBannerDTO';
import router from "@/router"
import { ref } from 'vue';
import { AppPageName } from '@/router/AppPagePath';
import { getHomeBanners } from '@/api/home-banner';

const banners = ref<HomeBannerDTO[]|null>(null);

const goToPostPage = (item: HomeBannerDTO) => {
  router.push({
    name: AppPageName.StoryPostDetail,
    params: { id: item.id }
  })
}

onMounted(async () => {
  const data = await getHomeBanners()
  banners.value = data
})

// const installApp = (app: { name: any; }) => {
//   alert(`Installing ${app.name}...`);
// };
</script>
