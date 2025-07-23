<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects page'

const projectsLoader = useProjectsStore()
const { projectsList } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollabs, groupedCollabs }  = useCollabs()

await getGroupedCollabs(projectsList.value)

const columnsWithCollabs = columns(groupedCollabs)

</script>

<template>
  <DataTable v-if="projectsList" :columns="columnsWithCollabs" :data="projectsList" />
</template>
