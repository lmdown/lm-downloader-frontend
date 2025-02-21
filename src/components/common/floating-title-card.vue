<template>
  <v-card class="floating-title-card" variant="outlined">
    <v-card-title class="floating-title">
      {{ title }}
    </v-card-title>
    <div style="margin-top: -1.2rem;">
      <slot>

      </slot>
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
  border: 1px solid #DFDFEC;;
  position: relative;
  padding-top: 2rem;
  margin-top: 1rem;
  overflow:visible;
}

.floating-title {
  position: absolute;
  top: -0.8rem;
  margin-bottom: -0.8rem;
  left: 1rem;
  background-color: white;
  padding: 0 4px;
  font-size: 1rem;
  font-weight: bold;
}
</style>
