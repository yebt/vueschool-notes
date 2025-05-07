import sourceData from '@/data/destinations.json'
import { createRouter, createWebHistory } from 'vue-router'
import type {
  RouteLocationNormalized,
  RouteRecordRaw,
  RouteLocationNormalizedGeneric,
} from 'vue-router'
import HomeView from '@/views/Home.vue'

// NOTE: All sync router will be downloaded when load the application initialy, all is in the same js
// NOTE: when is async, the js is separared of main js file, the home js is separete of other, etc
const routes: RouteRecordRaw[] = [
  // NOTE: when use aliases, load the same route of the path, but, not remove the /home like
  // redirect
  { path: '/', name: 'Home', component: HomeView, alias: '/home' },
  // NOTE: alternative redirect if not use aliases
  // { path: '/home', redirect: '/' },
  // { path: '/home', redirect: {name: 'Home'} },
  // { path: '/home', redirect: to=> '/'},

  // { path: '/about', name: 'About', component: AboutView },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') }, // This is downloaded just when is needed
  // { path: '/zephyros-floating-isles', name: 'Zephyros', component: ZephyrosView },
  {
    path: '/protected',
    name: 'protected',
    // component: () => import('@/views/ProtectedView.vue'),
    components: {
      default: () => import('@/views/ProtectedView.vue'),
      LeftSidebar: () => import('@/components/shared/SideBar.vue'),
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/invoices',
    name: 'invoices',
    components: {
      default: () => import('@/views/invoices/IndexView.vue'),
      LeftSidebar: () => import('@/components/shared/SideBar.vue'),
    },
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/example/:id(\\d+)+", // this make that id is a digit and required the id
    // NOTE: use regural expression
    component: () => import('@/views/auth/LoginView.vue'),
  },
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
    // Guard in route
    beforeEnter(to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedGeneric) {
      // check if the destination exist
      const exists = sourceData.destinations.find(
        (destEl) => destEl.id === parseInt(to.params.id as string),
      )
      if (!exists)
        return {
          name: 'NotFound',
          // pass the same current page data like url, etc
          params: { pathMatch: to.path.split('/').slice(1) },
          query: to.query,
          hash: to.hash,
        } // redirect to not found
    },
    children: [
      // Child routes
      {
        path: ':experienceSlug',
        name: 'experience.show',
        component: () => import('@/views/places/ExperienceShow.vue'),
        props: (route: RouteLocationNormalized) => ({
          ...route.params,
          id: parseInt(route.params.id as string),
        }), // Pass all params from the route to the component
      },
    ],
  },
  // 404 Error page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errors/NotFoundView.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // use a normal router, not #
  // history: createWebHashHistory(import.meta.env.BASE_URL),// use a /#/... like a base
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // WARNING: this cause go to top inmediatly after change the route
    // return savedPosition || { top: 0 }
    // NOTE: cause I use fade effect to hidden last page, this effect has a duration of 300ms
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              top: 0,
              // behavior: 'smooth' // NOTE: Smooth effect, is to much for me
            }),
          300,
        )
      })
    )
  },
})

// Navigation Global Guards
// Cause is called every time when navigate
router.beforeResolve((to, from) => {
  if (to.meta.requiresAuth && !window.user) {
    // need a login
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
