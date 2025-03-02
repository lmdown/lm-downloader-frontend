import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { AppPageName, AppPagePath } from "./AppPagePath";


// 路由信息
const routes: Array<RouteRecordRaw> = [
  {
    path: AppPagePath.Home,
    name: AppPageName.Home,
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
    path: AppPagePath.UniversalAppHome,
    name: AppPageName.UniversalAppHome,
    component: () => import('@/views/UniversalAppHome.vue'),
    // In the client app, sidebar should display.
    meta: { requiresSidebar: true }
  },
  // {
  //   path: AppPagePath.UniversalAppList,
  //   name: AppPageName.UniversalAppList,
  //   component: () => import('@/views/UniversalAppList.vue'),
  //   meta: { requiresSidebar: true }
  // },
  // {
  //   path: AppPagePath.UniversalAppDetail,
  //   name: AppPageName.UniversalAppDetail,
  //   component: () => import('@/views/UniversalAppDetail.vue'),
  //   meta: { requiresSidebar: true }
  // },

];

// 路由器
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;

