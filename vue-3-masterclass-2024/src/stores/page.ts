export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
  })

  return {
    // ... global statte
    pageData,
  }
})

// NOTE: support HMR in dev
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(
      usePageStore, // store
      import.meta.hot
    )
  )
}
