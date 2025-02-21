<template>
<v-slide-group show-arrows class="pa-0 snapshots-slider-group"
  style="margin-left: 0rem; margin-right: 0;"
  selected-class="bg-success" v-model="selectedItem">
  <v-slide-group-item v-for="(url, index) in snapshots" :key="index"
    v-slot="{ isSelected, toggle, selectedClass }">
    <v-card class="my-3 ma-4" width="265" height="160"
      @click="toggle">
      <v-img cover
        width="100%" height="100%"
        :src="url"
      ></v-img>
    </v-card>
  </v-slide-group-item>
</v-slide-group>

<v-dialog class="mx-10 my-16" v-model="previewVisible" width="auto" min-width="1200px" max-width="1800px">
  <v-card >
    <v-img :src="selectedImgUrl"></v-img>
  </v-card>
  <v-fab
    icon="mdi-close"
    location="bottom center"
    absolute elevation="6"
    offset
    @click="previewVisible = false"
  ></v-fab>
</v-dialog>

  <vue-easy-lightbox class="window-no-drag"
    :visible="largePhotoVisible"
    :imgs="snapshots"
    :index="selectedItem"
    @hide="largePhotoVisible = false"
  />

</template>
<style>
.snapshots-slider-group {
  /* width: 300px; */
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';

const previewVisible = ref(false)
const largePhotoVisible = ref(false)

const selectedImgUrl = ref('')
const selectedItem = ref(0)

const props = defineProps<{
  snapshots: string[]
}>()

watch(selectedItem, (newVal) => {
  if(newVal === undefined) {
    newVal = 0
  }
  const url = props.snapshots[newVal]
  openPreviewDialog(url)
})

const openPreviewDialog = (newVal: string | null) => {
  if (newVal !== null) {
    // previewVisible.value = true
    largePhotoVisible.value = true
    selectedImgUrl.value = newVal
  }
  // console.log('selectedImgUrl.value', selectedImgUrl.value)
}
</script>
