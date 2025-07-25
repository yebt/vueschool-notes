import { projectDetailsQuery, projectsQuery } from '@/utils/supaQueries'
import type { ProjectDetails, Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('project-store', () => {

  // States
  const projectsList = ref<Projects>([])
  const singleProjectWithDetails = ref<ProjectDetails>()

  // wrap promise or composable, to cache it
  const loadProjects = useMemoize(async (_: string) => await projectsQuery)
  const loadProjectWithDetails = useMemoize(async (slug: string) => await projectDetailsQuery(slug))

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

  const getProjetWithDetails = async (slug: string) => {
    const { data, error, status } = await loadProjectWithDetails(slug)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) singleProjectWithDetails.value = data
  }

  return {
    projectsList,
    getProjects,
    getProjetWithDetails,
    singleProjectWithDetails,
  }
})
