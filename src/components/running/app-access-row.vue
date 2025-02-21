<template>
  <!-- <v-sheet class="my-1 py-1 mx-3"
    v-if="lmAppData && accessRowVisible">
    {{ $t('AppRunningWindow.Access') }}:
    <template v-if="accessUrls && accessUrls.length > 0">
      <a v-for="url in accessUrls" class="mx-2"
        :key="url" :href="url" target="_blank">
        {{url}}
      </a>
    </template>
  </v-sheet> -->
  <FloatingTitleCard v-if="lmAppData && accessRowVisible"
    :title="$t('AppRunningWindow.Access')">
    <template v-if="accessUrls && accessUrls.length > 0">
      <v-list class="pt-1 pb-2">
        <v-list-item v-for="(url, index) in accessUrls" :key="index" density="compact" min-height="1.1rem" class="px-5">
          <template v-slot:prepend>
            <v-img width="16" height="16" src="./images/icons/link.png"></v-img>
          </template>
          <a class="mx-2" :key="url" :href="url" target="_blank">
            {{url}}
          </a>
        </v-list-item>
      </v-list>
    </template>
  </FloatingTitleCard>
</template>
<style>
</style>
<script lang="ts" setup>
import { OLLAMA_HOST_KEY } from '@/app-config/apps/ollama';
import { AIAppDTO } from '@/types/AIAppDTO';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';
import AppInfoUtil from '@/util/app-settings/AppInfoUtil';
import OllamaSettingUtil from '@/util/app-settings/OllamaSettingUtil';
import FloatingTitleCard from '../common/floating-title-card.vue';

const props = defineProps<{
  lmAppData: AIAppDTO | null
  installedInstance: InstalledInstanceDTO | null
  appEnv: object | null
}>()

// const singleAccessUrl = ref('')
const accessUrls = ref<string[]>([])

const accessRowVisible = ref(false)

const checkVisibility = async (): Promise<boolean> => {
  if(props.lmAppData?.accessInfo ) {
    const accessInfo = props.lmAppData.accessInfo
    const { accessType } = accessInfo
    if(!accessType) {
      return false
    }

    if(accessType === 'browser') {
      accessUrls.value.push(props.lmAppData.accessInfo?.webUrl || '')
      return true
    } else if (accessType === 'exec') {
      if(AppInfoUtil.appIsOllama(props.installedInstance?.installName)) {
        if(props.appEnv) {
          const hostValue = props.appEnv[OLLAMA_HOST_KEY]
          accessUrls.value = await OllamaSettingUtil.getAccessHosts(hostValue)
        }
        return true
      }
    }
  }
  return false
}

onMounted(async () => {
  accessRowVisible.value = await checkVisibility()
})

watch( () => props.appEnv, async () => {
  accessRowVisible.value = await checkVisibility()
})

// const get

</script>
