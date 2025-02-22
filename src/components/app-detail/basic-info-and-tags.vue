<template>
  <v-row class="mt-1 mx-1">
    <div>
      <v-img :src="lmAppData.icon" width="7.5rem" height="7.5rem"
      style="border-radius: 8px; "></v-img>
    </div>
    <div style="flex: 1;">
      <!-- class="d-flex flex-column ga-2 pt-4" -->
      <VCardTitle class="" style="font-size: 1.375rem; font-weight: bold;">{{ lmAppData.name }}</VCardTitle>
      <v-card-subtitle class="" style="font-size: 1rem; color: #111; opacity: 1;">
        {{ lmAppData.shortDesc }}
      </v-card-subtitle>
      <SimpleInstallBtn :lm-app-data="lmAppData"></SimpleInstallBtn>
    </div>
  </v-row>
  <v-row>
    <v-col>
      <v-divider class="mt-2 mb-3 mx-4" style="opacity: 1;" color="#EBEBF7"></v-divider>
      <v-card-title primary-title style="font-weight: bold;">
        {{$t('LMAppDetail.AppFeatures')}}
      </v-card-title>
      <div v-if="lmAppData.tags" class="d-flex ga-3 mx-4">
        <div class="app-feature-tag px-4"
          v-for="(tag, index) in lmAppData.tags" :key="index">
          {{ tag }}
        </div>
      </div>
      <!-- <div v-if="lmAppData.tags" class="d-flex ga-3">
        <v-chip variant="tonal" size="x-small"
          v-for="(tag, index) in installLimitList" :key="index">
          {{ tag?.trim() }}
        </v-chip>
      </div> -->
      <v-divider class="mt-6 mb-2 mx-4" style="opacity: 1;" color="#EBEBF7"></v-divider>
    </v-col>
  </v-row>

</template>
<script lang="ts" setup>
import { AIAppDTO } from '@/types/AIAppDTO';
import SimpleInstallBtn from './simple-install-btn.vue';

const props = defineProps<{
  lmAppData: AIAppDTO
}>()

// 切换展开状态的方法
// const toggleExpand = () => {
//   isExpanded.value = !isExpanded.value;
// };

const installLimitList = computed(() => {
  if(!props.lmAppData.installLimit) {
    return []
  }
  const osLimit = props.lmAppData.installLimit.os
  const hardwareLimit = props.lmAppData.installLimit.hardware
  return [...osLimit, ...hardwareLimit]
})

</script>
<style scoped>
.app-feature-tag {
  color: #946541;
  border-radius: 0.7rem;
  line-height: 200%;
  background-color: #FEF7F1;
  height: 2rem;
  font-size: 1rem;
}


</style>
