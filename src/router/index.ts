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
    name: 'app-detail',
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
    meta: { requiresSidebar: false } // 特定页面不显示左侧菜单
  },
  // {
  //   path: "/about",
  //   name: 'about',
  //   component: About,
  // },
];

// 路由器
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;

