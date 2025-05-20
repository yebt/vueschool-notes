export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: '',
  })

  return {
    // ... global statte
    pageData,
  }
})

// support HMR in dev
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
