import { projectDetailsQuery, projectsQuery } from '@/utils/supaQueries'
import type { ProjectDetails, Projects } from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'
import type { Ref } from 'vue'

export const useProjectsStore = defineStore('project-store', () => {
  // States
  const projectsList = ref<Projects | null>(null)
  const singleProjectWithDetails = ref<ProjectDetails | null>(null)

  // wrap promise or composable, to cache it
  const loadProjects = useMemoize(async (_: string) => await projectsQuery)
  const loadProjectWithDetails = useMemoize(async (slug: string) => await projectDetailsQuery(slug))

  interface ValidateCacheParams {
    ref: typeof projectsList | typeof singleProjectWithDetails
    supaQuery: typeof projectsQuery | typeof projectDetailsQuery
    loaderKey: string
    loaderFn: typeof loadProjects | typeof loadProjectWithDetails
  }

  const validateCache = ({ ref, supaQuery, loaderKey, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof supaQuery === 'function' ? supaQuery(loaderKey) : supaQuery

      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete(loaderKey)
          if (!error && data) ref.value = data
        }
      })
    }
  }

  const getProjects = async () => {
    // NOTE: not need cause useMemoize
    // if (projectsList.value?.length) return
    // const { data, error, status } = await projectsQuery

    // NOTE: force watch detect the changes
    projectsList.value = null // empty first to get from cache

    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) projectsList.value = data

    validateCache({
      ref: projectsList,
      supaQuery: projectsQuery,
      loaderKey: 'projects',
      loaderFn: loadProjects,
    })
  }

  const getProjetWithDetails = async (slug: string) => {
    // NOTE: force watch detect the changes
    singleProjectWithDetails.value = null // Reset the state to trigger the watchs

    const { data, error, status } = await loadProjectWithDetails(slug)

    if (error) useErrorStore().setError({ error, customCode: status })

    if (data) singleProjectWithDetails.value = data

    validateCache({
      ref: singleProjectWithDetails,
      supaQuery: projectDetailsQuery,
      loaderKey: slug,
      loaderFn: loadProjectWithDetails,
    })
  }

  return {
    projectsList,
    getProjects,
    getProjetWithDetails,
    singleProjectWithDetails,
  }
})
