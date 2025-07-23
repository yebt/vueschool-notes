import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('project-store', () => {
  const projectsList = ref<Projects | null>(null)

  // wrap promise or composable
  const loadProjects = useMemoize(async (_: string) => await projectsQuery)

  const getProjects = async () => {
    // NOTE: not need cause useMemoize
    // if (projectsList.value?.length) return
    // const { data, error, status } = await projectsQuery

    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })
    projectsList.value = data ?? []
  }
  return {
    projectsList,
    getProjects,
  }
})
