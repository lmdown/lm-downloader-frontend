import { defineStore } from 'pinia';
import api from '@/api/axios';
import { InstalledInstanceDTO } from '@/types/InstalledInstanceDTO';

export const useInstalledInstanceStore = defineStore('installedInstance', {
  state: () => ({
    //installedAIApps: [] as InstalledInstanceDTO[],
    // 对于某个应用商店的App的安装实例
    instancesForApp: [] as InstalledInstanceDTO[],
    // 运行窗口中使用的安装实例数据
    instanceForRunning: {} as InstalledInstanceDTO,
  }),
  actions: {
    // 通过appId，查询在设备上安装的信息，可能会查出多条信息
    async getInstalledInstanceForApp(appId: string) {
      try {
        const response = await api.get(`/self-manage/installed-instance/app/${appId}`);
        this.instancesForApp = response.data;
      } catch (error) {
        console.error('Failed to fetch app:', error);
      }
    },
    async getInstalledInstanceForRunning(id: string) {
      try {
        const response = await api.get(`/self-manage/installed-instance/${id}`);
        this.instanceForRunning = response.data;
      } catch (error) {
        console.error('Failed to fetch app:', error);
      }
    }
  },
});
