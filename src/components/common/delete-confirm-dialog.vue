<template>
  <v-dialog v-model="dialogVisible" max-width="400">
    <v-card>
      <v-card-title class="headline">
        {{ $t('AppRunningWindow.ConfirmDelete') }}
      </v-card-title>
      <v-card-text>
        {{ $t('AppRunningWindow.ConfirmDeleteMsg') }}
        {{itemName}}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn variant="outlined" @click="closeDialog">
          {{ $t('AppRunningWindow.Cancel') }}
        </v-btn>
        <v-btn variant="elevated" color="#F2313F" @click="confirmDelete">
          {{ $t('AppRunningWindow.ModelDeleteBtnLabel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean,
  itemName: string
}>()

const emit = defineEmits(
  ['update:modelValue', 'confirm']
)

const dialogVisible = ref(false);

watch(
  () => props.modelValue,
  (newValue) => {
    dialogVisible.value = newValue;
  }
);

const closeDialog = () => {
  dialogVisible.value = false;
  emit('update:modelValue', false);
};

const confirmDelete = async () => {
  emit('confirm');
  closeDialog();
};

</script>

<style scoped>
/* .headline {
  font-size: 1.25rem;
  font-weight: bold;
} */
</style>
