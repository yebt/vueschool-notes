import type { Tables } from '@database/types'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth-store', () => {
  // states
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)

  const setAuth = (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      return
    }

    user.value = userSession.user
  }

  return {
    setAuth,
    user,
    profile,
  }
})
