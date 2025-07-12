import type { CustomError, ExtendedPostgrestError } from "@/types/Error"
import type { PostgrestError } from "@supabase/supabase-js"

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null)

  const setError = ({
    error,
    customCode
  }: {
    error: string | PostgrestError,
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = new Error(error)
      activeError.value.customCode = customCode
      return
    }

    const ePostgrestErr = error as ExtendedPostgrestError;
    ePostgrestErr.statusCode = customCode
    activeError.value = ePostgrestErr
  }

  return {
    activeError,
    setError
  }
})
