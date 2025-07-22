import type { LoginForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

interface RealtimeErrorForm {
  email: string[]
  password: string[]
}
//
export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeError = ref<RealtimeErrorForm | null>()

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.code == 'invalid_credentials' ? 'Incorrect email or password' : error.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeError.value = {
      email: [],
      password: [],
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) realtimeError.value.email = emailErrors

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeError.value.password = passwordErrors
  }

  return {
    serverError,
    handleServerError,
    realtimeError,
    handleLoginForm,
  }
}
