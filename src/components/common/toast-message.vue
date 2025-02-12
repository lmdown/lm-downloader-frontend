<template>
  <v-snackbar
    :timeout="3000" :color="color" :variant="variant" v-model="snackbar"
  >{{message}}
  <template v-slot:actions>
        <v-btn v-if="showCloseBtn" color="white" variant="text" @click="hide">
          {{$t('Common.close')}}
        </v-btn>
      </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { ToastType } from '@/types/toast-message-type';

  type VARIANT = "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain" | undefined;
  type COLOR = ToastType;
   defineProps<{
    color: COLOR,
    variant: VARIANT,
    message: string,
    showCloseBtn: boolean,
  }>()

  const snackbar = ref<boolean|undefined>()

  const show = () => {
    snackbar.value = true
  }

  const hide = () => {
    snackbar.value = false
  }

  defineExpose({
    show,
    hide
  })
</script>
