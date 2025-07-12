import type { CustomError, ExtendedPostgrestError } from "@/types/Error"
import type { PostgrestError } from "@supabase/supabase-js"

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  const setError = ({
    error,
    customCode
  }: {
    error: string | PostgrestError | Error,
    customCode?: number
  }) => {
    // string error for navigation
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? new Error(error) : error
      // For default is a 501 error for javascript errors
      activeError.value.customCode = customCode || 501
      return
    }

    const ePostgrestErr = error as ExtendedPostgrestError;
    ePostgrestErr.statusCode = customCode || 500
    activeError.value = ePostgrestErr
  }

  return {
    activeError,
    setError
  }
})
