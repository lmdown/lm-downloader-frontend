<template>
    <v-app-bar elevation="0" class="px-6 running-app-bar" density="compact"
      style=" background-color: #F3F3FA;" >
      <div class="d-flex flex-row">
        <v-img :src="icon"
            width="36" height="36"></v-img>
        <div class="d-flex flex-row justify-center" style="align-items: center;">
          <v-card-title class="pt-1 pb-0" style="font-size: 1rem;">
            {{ name }}
          </v-card-title>
          <v-card-subtitle class="mt-1" >
            {{ currentUrl }}
          </v-card-subtitle>
        </div>
      </div>
    </v-app-bar>
</template>
<script lang="ts" setup>
const route = useRoute()

const name = ref('');
const icon = ref('');
const currentUrl = ref('');

onMounted(() => {
  // /:name/:icon/:url
  name.value = route.params.name as string
  icon.value = route.params.icon as string
  currentUrl.value = route.params.url as string
  document.title = name.value
})

</script>

<style>

</style>
