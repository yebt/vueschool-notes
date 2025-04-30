import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import HomeView from '@/views/Home.vue'
import AboutView from '@/views/About.vue'

import ZephyrosView from '@/views/places/Zephyros.vue'

// NOTE: All sync router will be downloaded when load the application initialy, all is in the same js
// NOTE: when is async, the js is separared of main js file, the home js is separete of other, etc
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  // { path: '/about', name: 'About', component: AboutView },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') }, // This is downloaded just when is needed
  // { path: '/zephyros-floating-isles', name: 'Zephyros', component: ZephyrosView },

  // NOTE: Dynamic routes with parameter
  { path: '/destination/:id', name: 'destination.show', component: () => import('@/views/DestinationShow.vue') },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // use a normal router, not #
  // history: createWebHashHistory(import.meta.env.BASE_URL),// use a /#/... like a base
  routes,
})

export default router
