<template>
  <v-app-bar density="default" height="84"
    elevation="0" class="window-drag">
    <template v-slot:prepend>
      <div class="lmd-logo-and-app-title">
        <v-img width="48" height="48" class="ml-7 mr-4" src="./images/icons/lmd-logo.png"></v-img>
        <VDivider vertical style="opacity: 1;" color="#EBEBF7"></VDivider>
        <VCard elevation="0" class="ml-0">
          <VCardTitle class="lmd-app-title">{{ $t('App.title') }}</VCardTitle>
          <VCardSubtitle class="lmd-app-subtitle">{{ $t('App.subtitle') }}</VCardSubtitle>
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
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
  padding-top: 0;
  padding-bottom: 0;
}

.lmd-app-subtitle {
  font-size: 16px;
  line-height: 105%;
  color: #424254;
}
</style>
