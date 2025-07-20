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

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  // wait that check the session stateform the browser
  await authStore.getSession()

  const isAuthPage = ['/login', '/register'].includes(to.path)

  // redirect to loin page if is not in login for the pages that need login
  if (!authStore.user && !isAuthPage) {
    return {
      name: '/login',
    }
  }

  // redirect to home if try logined with a auth session already exist
  if (authStore.user && isAuthPage) {
    return {
      name: '/',
    }
  }
})

export default router
