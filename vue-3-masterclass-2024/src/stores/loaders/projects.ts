import { projectsQuery, type Projects } from '@/utils/supaQueries'

export const useProjectsStore = defineStore('project-store', () => {
  const projectsList = ref<Projects | null>(null)

  const getProjects = async () => {

    if (projectsList.value?.length) return

    const { data, error, status } = await projectsQuery

    if (error) useErrorStore().setError({ error, customCode: status })
    projectsList.value = data ?? []
  }
  return {
    projectsList,
    getProjects,
  }
})
