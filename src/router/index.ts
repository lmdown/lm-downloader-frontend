import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { AppPageName, AppPagePath } from "./AppPagePath";

const routes: Array<RouteRecordRaw> = [
  {
    path: AppPagePath.Home,
    name: AppPageName.Home,
    component: () => import('@/views/UniversalAppHome.vue'),
    // In the client app, sidebar should display.
    meta: { requiresSidebar: true }
  },
  {
    path: AppPagePath.FastDownload,
    name: AppPageName.FastDownload,
    // component: Home,
    component: () => import('@/views/Home.vue'),
    meta: { requiresSidebar: true }
  },
  {
    path: "/app/:id",
    name: AppPageName.AppDetail,
    // component: AppDetail,
    component: () => import('@/views/AppDetail.vue'),
    meta: { requiresSidebar: true }
  },
  {
    path: AppPagePath.StoryPostDetail,
    name: AppPageName.StoryPostDetail,
    component: () => import('@/views/StoryPostDetail.vue'),
    meta: { requiresSidebar: true }
  },
  {
    path: AppPagePath.InstalledApps,
    name: AppPageName.InstalledApps,
    component: () => import('@/views/InstalledApps.vue'),
    meta: { requiresSidebar: true }
  },
  {
    path: AppPagePath.MyResource,
    name: AppPageName.MyResource,
    component: () => import('@/views/MyResource.vue'),
    meta: { requiresSidebar: true }
  },
  {
    path: AppPagePath.AppRunning,
    name: AppPageName.AppRunning,
    component: () => import('@/views/AppRunningWindow.vue'),
    meta: { requiresSidebar: false } // sidebar dose not display.
  },
  {
    path: AppPagePath.UniversalAppCat,
    name: AppPageName.UniversalAppCat,
    component: () => import('@/views/UniversalAppCat.vue'),
    meta: { requiresSidebar: true }
  },
  {
    path: AppPagePath.UniversalAppRunning,
    name: AppPageName.UniversalAppRunning,
    component: () => import('@/views/UniversalAppRunningWindow.vue'),
    meta: { requiresSidebar: false }
  },
];

// 路由器
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;

