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
      <!-- height="200" width="320" -->
    </v-card>
  </v-slide-group-item>
</v-slide-group>

<v-dialog class="mx-10 my-16" v-model="previewVisible" width="auto" min-width="1200px" max-width="1800px">
  <v-card >
    <v-img :src="selectedImgUrl"></v-img>
    <!-- max-width="800" -->
    <!-- <v-carousel height="auto" >
      <v-carousel-item :value="selectedIndex" v-for="(url, index) in snapshots" :key="index"
        :src="url"
        min-width="600" width="100%" min-height="600"  height="100%"
      ></v-carousel-item>
    </v-carousel>
    <template v-slot:actions>
      <v-btn class="ms-auto" text="关闭" @click="previewVisible = false"></v-btn>
    </template> -->
  </v-card>
</v-dialog>
<!-- </v-container> -->
</template>
<style>
.snapshots-slider-group {
  /* width: 300px; */
}
</style>
<script lang="ts" setup>
import { ref } from 'vue';

const previewVisible = ref(false)
// const selectedIndex = ref(0)
const selectedImgUrl = ref('')
const selectedItem = ref(0)

const props = defineProps<{
  snapshots: string[]
}>()

// const snapshots = ref([
//   // 'https://via.placeholder.com/300x200?text=App+Icon',
//   // 'https://via.placeholder.com/300x200?text=App+Icon',
//   // 'https://via.placeholder.com/300x200?text=App+Icon'
//   './story-assets/images/stories/chatbox/chatbox1.png',
//   './story-assets/images/stories/chatbox/chatbox2.png',
//   './story-assets/images/stories/chatbox/chatbox3.jpg',
//   './story-assets/images/stories/chatbox/chatbox4.jpg',
// ])

watch(selectedItem, (newVal) => {
  // console.log('selectedItem', newVal, oldVal)
  if(newVal === undefined) {
    newVal = 0
  }
  // console.log('snapshots.value[newVal]', snapshots.value[newVal])
  const url = props.snapshots[newVal]
  openPreviewDialog(url)
})

const openPreviewDialog = (newVal: string | null) => {
  if (newVal !== null) {
    previewVisible.value = true
    selectedImgUrl.value = newVal
  }
  // console.log('selectedImgUrl.value', selectedImgUrl.value)
}
</script>
