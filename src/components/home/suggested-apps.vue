<template>
<v-container class="pl-0 pr-0 suggested-apps">
  <v-row>
    <v-col cols="12" class="pb-2">
      <v-divider class="mt-2 mb-4" style="opacity: 1;" color="#EBEBF7"></v-divider>
      <h2 style="font-size: 18px">{{$t('Home.SuggestedApps')}}</h2>
    </v-col>
  </v-row>
  <AppList :apps="suggestedApps"></AppList>
</v-container>
</template>
<style>
.suggested-apps {
  max-width: unset;
}
</style>
<script lang="ts" setup>
import { useLMAppStore } from '@/store';
import { AIAppDTO } from '@/types/AIAppDTO';
import AppList from '../common/app-list.vue';
const lmAppStore = useLMAppStore();
const suggestedApps = ref([] as AIAppDTO[])

onMounted(async () => {
  await lmAppStore.fetchLMApps();
  suggestedApps.value = lmAppStore.lmApps
})

</script>
