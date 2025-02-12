<template>
  <v-footer class="footer-status-bar"
    height="48"
    app>
    <span class="running-label mr-3">
      {{ $t('Common.labelRunningApps') }}
    </span>
    <template v-if="runningApps">
      <a href="#" @click="onAppItemClick"
        class="app-link mx-1"
        v-for="(app,index) in runningApps">
        {{ app.name }}
      </a>
    </template>
  </v-footer>
</template>
<script lang="ts" setup>
import { RunningInstanceVO } from '@/types/vo/RunningInstanceVO';

const runningApps = ref<RunningInstanceVO[] | null>([
  {id: '1', name:"Ollama", status: 'running', appId: '1'},
  {id: '2', name:"Ollama", status: 'running', appId: '2'},
])

const onAppItemClick = (event: Event) => {
  event.preventDefault()
}

</script>
<style scoped>
.footer-status-bar {
  font-size: 16px;
  border-top: 1px solid #D8D8EA;
}
.running-label {
  color: #18BF3F
}
.app-link::after {
  content: ',';
}
.app-link:last-child::after {
  content: none;
}

.app-link {
  display: inline-block;
  color: rgba(0,0,0,0.75);
  text-decoration: none;
}
.app-link:hover {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
}
.app-link:active {
  color: rgb(var(--v-theme-primary));
}
</style>
