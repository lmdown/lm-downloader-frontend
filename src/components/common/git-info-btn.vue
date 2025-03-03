<template>
  <a href="#" class="d-flex"
    target="_blank" @click="showDialog"
    style="align-items: center;">
    <v-img src="./images/icons/icon-github.png" :transition="false"
      width="36" height="36" class="github-icon mr-4"></v-img>
      {{$t('App.AppName')}} Github &gt;
  </a>
  <v-dialog v-model="dialogVisible" min-width="200" max-width="560">
    <v-card
      class="mx-auto px-0 py-0 window-no-drag"
      width="100%"
      :title="$t('GitDialog.DialogTitle')"
    >
      <template v-slot:append>
        <v-btn
          icon="mdi-close"
          class="ms-auto"
          size="compact"
          text="Ok"
          elevation="0"
          @click="dialogVisible = false"
        ></v-btn>
      </template>
      <v-card-text>
        <h3>{{ $t('GitDialog.CardTitle') }}</h3>
        <div>Github: <a href="https://github.com/lmdown" target="_blank">https://github.com/lmdown</a>
        </div>
        <div>
        Gitee: <a href="https://gitee.com/lmdown" target="_blank">https://gitee.com/lmdown</a>
        </div>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>
<style>
</style>
<script lang="ts" setup>
const dialogVisible = ref(false)

const showDialog = (event) => {
  event.preventDefault()
  dialogVisible.value = true
}

</script>
