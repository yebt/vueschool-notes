<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries'
import { RouterLink } from 'vue-router'
import type { TasksWithProjects } from '@/utils/supaQueries'
import type { ColumnDef } from '@tanstack/vue-table'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks page'

const tasksList = ref<TasksWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) console.log('ERROR', error)
  tasksList.value = data ?? []
}

await getTasks()

</script>

<template>
  <DataTable v-if="tasksList" :columns="columns" :data="tasksList" />
</template>
