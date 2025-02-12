<template>
  <v-row>
    <v-col
      v-for="(app, index) in apps" :key="index"
      cols="4" class="">
      <v-card height="100" class="home-app-card"
        rounded="lg"
        link
        @click="goToPage(app)">
        <template v-slot:prepend>
          <!-- <v-icon color="primary" icon="mdi-account"></v-icon> -->
          <v-img width="68" height="68" cover style="border-radius: 8px;"
            :alt="app.name" :src="app.icon" ></v-img>
        </template>
        <!-- <template v-slot:append v-if="app?.installLimit?.os">
          <v-icon icon="mdi-apple"></v-icon>
        </template> -->
        <template v-slot:title>
          <v-card-title class="home-app-card-title">{{ app.name }}</v-card-title>
          <!-- <v-card-subtitle class="home-app-card-subtitle">
            {{app.currentVersion}}
          </v-card-subtitle> -->
          <div :title="app.shortDesc" class="home-app-card-short-desc">{{ app.shortDesc }}</div>
        </template>
        <!-- <template v-slot:text>
          <v-card-text>{{ app.shortDesc }}</v-card-text>
        </template> -->
      </v-card>
    </v-col>
  </v-row>
</template>
<style >
.home-app-card .v-card__overlay{
  background: none;
}
.home-app-card {
  border: 1px solid transparent;
  /* background-color: blanchedalmond; */
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.08);
}
.home-app-card .v-card-item {
  padding: 1rem;
}
.home-app-card .v-card-item .v-card-item__prepend {
  padding-inline-end: 1.5rem;
}

.home-app-card:hover {
  border-color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.home-app-card:active {
  border-color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.home-app-card .home-app-card-title  {
  font-size: 18px;
}
.home-app-card .home-app-card-subtitle  {
  font-size: 0.75rem;
  line-height: 100%;
  padding: 0;
}

.home-app-card-short-desc {
  font-size: 14px;
  color: #424254;
}
</style>
<script lang="ts" setup>
import { AIAppDTO } from '@/types/AIAppDTO';
import router from "@/router"
import { AppPageName } from '@/router/AppPagePath';

defineProps<{
  apps: AIAppDTO[]
}>()

const goToPage = (app: AIAppDTO) => {
  router.push({
    name: AppPageName.AppDetail,
    params: { id: app.id }
  })
}
</script>
