<template>
  <div class="all-cats-list-container my-4">
    <template :key="index" v-for="(navItem, index) in navCatsData">
      <AppListOfCat :id="'appcat-'+index" :is-app-list-homepage="true" :catetory="navItem"></AppListOfCat>
    </template>
  </div>
</template>
<style>
.all-cats-list-container {
  border-radius: 16px;
  border: 1px solid #EBEBF7;
  padding: 24px;
}
</style>
<script lang="ts" setup>
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';
import AppListOfCat from './app-list-of-cat.vue';

const props = defineProps<{
  modelValue: number,
  navCatsData: UniversalAICategoryDTO[],
}>()

watch(() => props.modelValue, () => {
  scrollToCat(props.modelValue)
})

const scrollToCat = (index: number) => {
  const element = document.getElementById('appcat-'+index);
  if (element) {
    element.scrollIntoView({
       behavior: 'smooth',

      });
  }
}
</script>
