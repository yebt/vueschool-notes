import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // pass the generated routes
  routes,
})

// // NOTE: try to get the session from the browser every time before navigate
// // this is not a fault of perfomance cause the session is getted from the browser
// // just go to the supabase server when expire
//
// router.beforeEach(async () => {
//   // ...getSession
//   const {getSession} = useAuthStore()
//   await getSession()
// })

export default router
