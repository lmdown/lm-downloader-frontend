<template>
  <component :is="layout" v-if="layout"></component>
  <ToastMessage
    :message="toastMessage" ref="toastMsg"
    :color="toastType" variant="flat" :showCloseBtn="false"></ToastMessage>
</template>
<script setup lang="ts">
import AppDefaultLayout from './AppDefaultLayout.vue';
import AppNoSidebarLayout from './AppNoSidebarLayout.vue';
import ToastMessage from './components/common/toast-message.vue';
import router from './router'
import { ShowToastMessage } from '@/types/toast-message-type'
type ToastMessageType = InstanceType<typeof ToastMessage>

const toastMessage = ref<string>('')
const toastMsg = ref<ToastMessageType|null>();
const toastType = ref<string>('primary')

const layout =  computed(() => {
  const requiresSidebar: boolean | undefined | unknown  = router.currentRoute.value?.meta?.requiresSidebar
  if(requiresSidebar === true) {
    return AppDefaultLayout
  } else if(requiresSidebar === false) {
    return AppNoSidebarLayout
  } else {
    return null
  }
})
const showToastMessage: ShowToastMessage = (message: string, type: string) => {
  toastMessage.value = message;
  // snackbarVisible.value = true;
  toastType.value = type;
  toastMsg.value?.show()
};
provide('showToastMessage', showToastMessage)
</script>
<style>

</style>
