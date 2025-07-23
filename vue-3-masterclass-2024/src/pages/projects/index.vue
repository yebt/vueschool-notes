<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects page'

const projectsLoader = useProjectsStore()
const { projectsList } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()
</script>

<template>
  <DataTable v-if="projectsList" :columns="columns" :data="projectsList" />
</template>
