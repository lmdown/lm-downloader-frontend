<template>
  <v-app-bar density="default" height="84"
    elevation="0" class="window-drag">
    <template v-slot:prepend>
      <div class="lmd-logo-and-app-title">
        <v-img width="48" height="48" class="ml-7 mr-4" src="./images/icons/lmd-logo.png">
          <v-tooltip activator="parent" location="bottom">
            {{ $t('App.title') }}
          </v-tooltip>
        </v-img>
        <VDivider vertical style="opacity: 1;" color="#EBEBF7"></VDivider>
        <VCard elevation="0" class="ml-0">
          <VCardTitle class="lmd-app-title">{{ mainTitle || $t('App.TitleFastDownload') }}</VCardTitle>
          <VCardSubtitle class="lmd-app-subtitle">{{ subTitle || $t('App.subtitle') }}</VCardSubtitle>
        </VCard>
      </div>
    </template>
    <template v-slot:append>
      <top-right-controls></top-right-controls>
    </template>
  </v-app-bar>
</template>
<script setup lang="ts">
import TopRightControls from '@/components/common/top-right-controls.vue';
defineProps<{
  mainTitle?: string,
  subTitle?: string,
}>()
</script>
<style>
.v-card .v-card-title {
  line-height: 120%;
}

.lmd-logo-and-app-title {
  display: flex;
  align-items: center;
  align-content: center;
}
.lmd-app-title {
  /* font-size: 1.5rem; */
  font-size: 22px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
  padding-top: 4px;
  padding-bottom: 0;
}

.lmd-app-subtitle {
  font-size: 14px;
  line-height: 105%;
  color: #424254;
  opacity: 1;
  padding-top: 2px;
}
</style>
