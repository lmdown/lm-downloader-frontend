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
  <v-container class="universal-app-cat mt-0 px-2 py-0">
    <div class="all-app-list-container my-4 mx-6">
      <AppListOfCat v-if="currentCatetory" :is-app-list-homepage="false"
        :catetory="currentCatetory"></AppListOfCat>
    </div>
  </v-container>
</template>
<script lang="ts" setup>

import { getUAppsByCatId } from '@/api/universal-app';
import TopRightControls from '@/components/common/top-right-controls.vue';
import AppListOfCat from '@/components/universal-app/app-list-of-cat.vue';
import SingleAppItem from '@/components/universal-app/single-app-item.vue';
import router from '@/router';
import { UniversalAIAppDTO } from '@/types/universal-app/UniversalAIAppDTO';
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';

const route = useRoute()
// const appsOfCat = ref<UniversalAIAppDTO[]>([])
const currentCatetory = ref<UniversalAICategoryDTO>()

onMounted( async () => {
  const id = route.params.id as string
  const name_en = route.params.name_en as string
  const name_zh = route.params.name_zh as string
  console.log('current cat', id, name_en)
  currentCatetory.value = {
    id: id,
    name_en: name_en,
    name_zh: name_zh
  }
  // const apps = await getUAppsByCatId(id)
  // appsOfCat.value = apps
})

const goBack = () => {
  router.go(-1)
}

</script>
<style>
.universal-app-cat {
  max-width: unset;
}

.all-app-list-container {
  border-radius: 16px;
  border: 1px solid #EBEBF7;
  padding: 16px 24px;
}

</style>
