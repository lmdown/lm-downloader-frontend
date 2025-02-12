<template>
  <v-row>
    <v-card-title class="mb-0 mx-2" style="font-weight: bold;">
      {{$t('LMAppDetail.AboutTheApp')}}
    </v-card-title>
    <div class="fullDescBlock overflow-y-hidden mx-6 mt-1 mb-4">
      <p ref="visibleText" v-html="lmAppData.desc" ></p>
    </div>
    <v-fab class="mr-4"
        v-if="hasMore"
        :active="true"
        @click="descDialogVisible = true"
        prepend-icon="mdi-unfold-more-horizontal"
        location="bottom end" extended absolute offset
        :text="$t('LMAppDetail.More')"
      ></v-fab>
  </v-row>
  <v-dialog min-width="1000px" max-width="1300px"
      v-model="descDialogVisible"
      width="auto">
      <v-card
        prepend-icon="mdi-text-box-outline"
        :title="lmAppData.name">
        <v-card-text class="mx-6 my-2">
          <p v-html="lmAppData.desc"></p>
        </v-card-text>
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            :text="$t('LMAppDetail.Close')"
            @click="descDialogVisible = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>
<style>
.fullDescBlock {
  max-height: 220px;
}
</style>
<script lang="ts" setup>
import { AIAppDTO } from '@/types/AIAppDTO';

const descDialogVisible = ref(false);

// const isExpanded = ref(false);
const visibleText = ref<HTMLDivElement|null>(null);
const hasMore = ref(false);

let resizeObserver;
const fullDescBlockMaxHeight = 200

const props = defineProps<{
  lmAppData: AIAppDTO
}>()

onMounted(() => {
  // 创建 ResizeObserver 实例
  resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      if (entry.target === visibleText.value) {
        hasMore.value = entry.contentRect.height >= fullDescBlockMaxHeight
      }
    }
  });

  // 开始观察目标元素
  if (visibleText.value) {
    resizeObserver.observe(visibleText.value);
  }

  // 初始检查
  checkForOverflow();
});


onBeforeUnmount(() => {
  // 组件卸载前停止观察
  if (resizeObserver) {
    resizeObserver.unobserve(visibleText.value);
  }
});

// 判断是否有更多内容
function checkForOverflow() {
  if (visibleText.value) {
    hasMore.value = visibleText.value.scrollHeight >= fullDescBlockMaxHeight;
  }
}

</script>
