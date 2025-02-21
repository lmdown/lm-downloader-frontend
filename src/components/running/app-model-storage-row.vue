<template>
  <div>
    <v-btn prepend-icon="mdi-folder-file-outline" color="amber-lighten-5" @click="openModelsDir">
      {{ allModelFileSize }}
      <v-tooltip activator="parent" location="top">
        {{ $t('AppRunningWindow.StorageBtnTip') }}
      </v-tooltip>
    </v-btn>
  </div>
</template>
<style>

</style>
<script lang="ts" setup>
const allModelFileSize = ref<string | null>(null)

</script>
