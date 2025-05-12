import HomeView from '@/views/HomeView.vue';
import { h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
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
  },
  // NOTE: 404
  {
    path: '/:catchAll(.*)*',
    name: '404',
    // NOTE: HyperScript, making html from routes
    component: h('p', { style: 'color: red;' }, '404 Not Found'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
