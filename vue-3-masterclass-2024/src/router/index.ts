import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory  } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'project',
    component: () => import('@/views/ProjectsView.vue')
  },
  {
    // /project/id
    // path: '/projects/:id',
    path: '/projects/:id(\\d*)',
    name: 'single-project',
    component: () => import('@/views/SingleProject.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
