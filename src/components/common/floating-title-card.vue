<template>
  <v-card class="floating-title-card mt-4" variant="outlined">
    <div class="d-flex">
      <v-card-title class="floating-title mx-1" style="flex: 1;">
        {{ title }}
      </v-card-title>
      <slot name="append"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>
<style>
.floating-title-card {
  border-radius: 0.5rem;
  border: 1px solid #DFDFEC;
}

.floating-title {
  padding-bottom: 0px;
  font-size: 1rem;
  font-weight: bold;
}
</style>
