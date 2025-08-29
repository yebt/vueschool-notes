// NOTE: this is a global state in all the application
const menuOpen = ref(false)

export const useMenu = () => {
  // NOTE: this state is just local for the components that use this composable
  // const menuOpen = ref(false)

  const toggleMenu = () => (menuOpen.value = !menuOpen.value)

  return {
    menuOpen,
    toggleMenu,
  }
}
