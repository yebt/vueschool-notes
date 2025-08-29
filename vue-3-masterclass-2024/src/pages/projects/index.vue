<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'
import { title } from 'node:process'

usePageStore().pageData.title = 'Projects page'

const projectsLoader = useProjectsStore()
const { projectsList } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs }  = useCollabs()

getGroupedCollabs(projectsList.value ?? [])

const columnsWithCollabs = columns(groupedCollabs)

useMeta({
  title: 'Projects | Pulse',
  description: {
    name: 'description',
    content: 'Pulse ...'
  }
})
</script>

<template>
  <DataTable v-if="projectsList" :columns="columnsWithCollabs" :data="projectsList" />
</template>
