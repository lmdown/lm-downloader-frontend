<template>
  <FloatingTitleCard :title="$t('AppRunningWindow.EnvVars')">
    <v-sheet class="my-1 pt-1 pb-5 mx-5">
      <v-chip
        variant="tonal"
        size="x-small"
        style="min-width: 50px; max-width: 120px; margin-left: 4px"
        v-for="(value, key) in lmdGlobalEnv"
        :key="key">
        {{ key }}
        <v-tooltip activator="parent" location="bottom">{{ value }}</v-tooltip>
      </v-chip>

      <v-chip
        variant="tonal"
        size="x-small" color="orange-darken-4"
        style="min-width: 50px; max-width: 120px; margin-left: 4px"
        v-for="(value, key) in appEnv"
        :key="key">
        {{ key }}
        <v-tooltip activator="parent" location="bottom">{{ value }}</v-tooltip>
      </v-chip>
    </v-sheet>
  </FloatingTitleCard>
</template>
<style>
</style>
<script lang="ts" setup>
import { getEnvVariables } from '@/client-api/config-file';
import LMDGlobalEnv from '@/types/config/LMDGlobalEnv'
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import FloatingTitleCard from '../common/floating-title-card.vue';

const lmdGlobalEnv = ref<LMDGlobalEnv | null>(null)

defineProps<{
  installedInstance: InstalledInstanceDTO | null,
  appEnv: object | null
}>()

onMounted(async () => {
  lmdGlobalEnv.value = await getEnvVariables()
})

</script>
