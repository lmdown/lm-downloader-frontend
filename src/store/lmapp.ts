import { defineStore } from 'pinia';
import { AIAppDTO } from '@/types/AIAppDTO';
import api from '@/api/axios';

export const useLMAppStore = defineStore('lmAIApp', {
  state: () => ({
    lmApps: [] as AIAppDTO[],
    currentLmApp: {} as AIAppDTO,
  }),
  actions: {
    async fetchLMApps() {
      try {
        const response = await api.get('/app-store/ai-app-info');
        this.lmApps = response.data.data;
      } catch (error) {
        console.error('Failed to fetch apps:', error);
      }
    },
    async fetchApp(appId: string) {
      try {
        const response = await api.get(`/app-store/ai-app-info/${appId}`);
        this.currentLmApp = response.data;
      } catch (error) {
        console.error('Failed to fetch app:', error);
      }
    },
    // 通过appId，查询在设备上安装的信息，可能会查出多条信息
    // async fetchInstallationInfo(appId: string) {
    //   try {
    //     const response = await api.get(`/app-store/installed-ai-app/${appId}`);
    //     this.currentLmApp = response.data;
    //   } catch (error) {
    //     console.error('Failed to fetch app:', error);
    //   }
    // }
  },
});
