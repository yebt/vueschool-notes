import type { GroupedCollabs } from '@/types/GroupCollabs'
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length)

    const promisesOfProfiles = filteredItems.map((item) => getProfilesByIds(item.collaborators))

    /*
     * [
     *  ['collaborator', 'collaborat', ...],
     *  ['collaborator', 'collaborat', ...],
     * }
     */
    const results = await Promise.all(promisesOfProfiles)

    filteredItems.forEach((item, indx) => {
      groupedCollabs.value[item.id] = results[indx]
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs,
  }
}
