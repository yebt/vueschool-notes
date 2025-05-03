import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/Home.vue'

// NOTE: All sync router will be downloaded when load the application initialy, all is in the same js
// NOTE: when is async, the js is separared of main js file, the home js is separete of other, etc
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  // { path: '/about', name: 'About', component: AboutView },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') }, // This is downloaded just when is needed
  // { path: '/zephyros-floating-isles', name: 'Zephyros', component: ZephyrosView },

  // NOTE: Dynamic routes with parameter
  {
    path: '/destination/:id/:slug',
    name: 'destination.show',
    component: () => import('@/views/places/DestinationShow.vue'),
    // props: true // with this flag, the params is passed to the component through component props
    // props: { someprop: soveval} // Like an obj
    // props : route =>({someprop: someExpression? someVal: someElseVal}) // like a function
    // props: route => ({id: parseInt(route.params.id)})
    props: (route: RouteLocationNormalized) => {
      return { id: parseInt(route.params.id as string) }
    },
  },
  {
    path: '/destination/:id/:slug/:experienceSlug',
    name: 'experience.show',
    component: () => import("@/views/places/ExperienceShow.vue"),
    props: (route: RouteLocationNormalized) => ({ ...route.params, id: parseInt(route.params.id as string) }) // Pass all params from the route to the component
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // use a normal router, not #
  // history: createWebHashHistory(import.meta.env.BASE_URL),// use a /#/... like a base
  routes,
})

export default router
