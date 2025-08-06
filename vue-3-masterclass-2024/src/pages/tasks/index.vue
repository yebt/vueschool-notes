<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import type { TasksWithProjects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks page'

// const tasksList = ref<TasksWithProjects | null>(null)
// const getTasks = async () => {
//   const { data, error, status } = await tasksWithProjectsQuery
//
//   if (error) {
//     useErrorStore().setError({ error, customCode: status })
//   }
//   tasksList.value = data ?? []
// }

// NOTE: use tasks loaders store
const tasksLoader = useTasksStore()
// NOTE: use store ref to see the tasks list
const { tasksList } = storeToRefs(tasksLoader)
const { getTasksList } = tasksLoader
// NOTE: fetch tasks from loader store
await getTasksList()

// NOTE: group collaborators
const { getGroupedCollabs, groupedCollabs } = useCollabs()
getGroupedCollabs(tasksList.value ?? [])
const columnsWithCollabs = columns(groupedCollabs)

</script>

<template>
  <div>
    <DataTable v-if="tasksList" :columns="columnsWithCollabs" :data="tasksList" />
  </div>
</template>
