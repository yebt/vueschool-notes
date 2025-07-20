import { supabase } from '@/lib/supabaseClient'
import { profileQuery } from '@/utils/supaQueries'
import type { Tables } from '@database/types'
import type { Session, User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth-store', () => {
  // states
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)
  const isTrackingAuthChanges = ref(false)

  // Private
  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
      return
    }

    if (!profile.value || profile.value.id !== user.value.id) {
      //.. fetch the profile
      const { data, error } = await profileQuery(user.value.id)

      if (error) return console.log(error)

      profile.value = data || null
    }
  }

  // Sets
  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  // Try get session
  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session?.user) await setAuth(data.session)
  }

  // Track the functions
  const trackAuthChanges = () => {
    // Suscribe only once
    if (isTrackingAuthChanges.value) return
    isTrackingAuthChanges.value = true

    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
