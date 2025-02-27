<template>
  <div class="all-cats-list-container my-4">
    <template :key="navItem.name" v-for="(navItem, index) in navCatsData">
      <AppListOfCat :catetory="navItem"></AppListOfCat>
    </template>
  </div>
</template>
<style>
.all-cats-list-container {
  border-radius: 16px;
  border: 1px solid #EBEBF7;
}
</style>
<script lang="ts" setup>
import { UniversalAICategoryDTO } from '@/types/universal-app/UniversalAICategoryDTO';
import AppListOfCat from './app-list-of-cat.vue';

const props = defineProps<{
  modelValue: number,
  navCatsData: UniversalAICategoryDTO[],
}>()

</script>
