<script setup lang="ts">
import { tasksWithProjectsQuery  } from '@/utils/supaQueries'
import { RouterLink } from 'vue-router'
import type {TasksWithProjects} from '@/utils/supaQueries'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'Tasks page'


const tasksList = ref<TasksWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) console.log('ERROR', error)
  tasksList.value = data ?? []
}

await getTasks()

// DATA ____________________________________________________________

// Columns Definition ____________________________________________________________
const columns: ColumnDef<TasksWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      // return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
      return row.original.projects ? h(
        RouterLink,
        {
          to: `/projects/${row.original.projects.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        // () => row.getValue<>('projects').name, // Not work ok with complex types form complex
        // queries
        () => row.original.projects?.name
      ) : '--'
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<template>
  <DataTable v-if="tasksList" :columns="columns" :data="tasksList" />
</template>
