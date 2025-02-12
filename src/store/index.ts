import { createPinia } from 'pinia';
// import { useUserStore } from './user';
import { useMainStore } from './main';
import { useLMAppStore } from './lmapp';
import { useInstalledInstanceStore } from './installed-instance';

// 创建 Pinia 实例
export const pinia = createPinia();

// 导出所有 store
export {
  useMainStore,
  useLMAppStore,
  useInstalledInstanceStore,
};
