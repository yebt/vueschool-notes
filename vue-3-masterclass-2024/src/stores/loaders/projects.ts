import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('project-store', () => {
  const projectsList = ref<Projects>([])

  // wrap promise or composable
  const loadProjects = useMemoize(async (_: string) => await projectsQuery)

  const validateCache = () => {
    if (projectsList.value?.length) {
      projectsQuery.then(({ data, error }) => {
        if (JSON.stringify(projectsList.value) === JSON.stringify(data)) {
          return
        } else {
          loadProjects.delete('projects')
          if (!error && data) projectsList.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    // NOTE: not need cause useMemoize
    // if (projectsList.value?.length) return
    // const { data, error, status } = await projectsQuery

    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) projectsList.value = data

    validateCache()
  }
  return {
    projectsList,
    getProjects,
  }
})
