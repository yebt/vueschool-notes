import type { AuthError } from '@supabase/supabase-js'

//
export const useFormErrors = () => {
  const serverError = ref('')

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.code == 'invalid_credentials' ? 'Incorrect email or password' : error.message
  }


  return {
    serverError,
    handleServerError
  }
}
