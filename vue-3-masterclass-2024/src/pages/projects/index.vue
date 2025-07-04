<script setup lang="ts">
import { projectsQuery, type Projects } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects page'

const projectsList = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.log('ERROR', error)
  projectsList.value = data ?? []
}
await getProjects()

</script>

<template>
  <DataTable v-if="projectsList" :columns="columns" :data="projectsList" />
</template>
