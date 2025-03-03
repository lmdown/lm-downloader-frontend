<template>
  <top-app-bar :main-title="$t('UniversalApps.MainTitle')"
    :sub-title="$t('UniversalApps.SubTitle')"></top-app-bar>
  <v-container class="universal-app-home mt-0 px-2 py-4">
    <!-- categories nav -->
    <all-catetories-nav
      class="mx-6"
      v-model="selectedIndex" :nav-cats-data="navCatsData"></all-catetories-nav>
    <!-- categories and apps -->
    <app-list-for-home
    class="mx-6"
      v-model="selectedIndex" :nav-cats-data="navCatsData"></app-list-for-home>
  </v-container>
</template>
<script lang="ts" setup>
import { getUAppMainMenu } from '@/api/universal-app';
import TopAppBar from '@/components/home/top-app-bar.vue';
import AllCatetoriesNav from '@/components/universal-app/all-catetories-nav.vue';
import AppListForHome from '@/components/universal-app/app-list-for-home.vue';
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';
const selectedIndex = ref(0)
const navCatsData = ref<UniversalAICategoryDTO[]>([])

onMounted( async () => {
  navCatsData.value = await getUAppMainMenu()
})

</script>
<style>
.universal-app-home {
  max-width: unset;
}
</style>
