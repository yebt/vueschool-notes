<script setup lang="ts">
const { slug } = useRoute('/projects/[slug]').params

const projectLoader = useProjectsStore()
const { singleProjectWithDetails } = storeToRefs(projectLoader)
const { getProjetWithDetails, updateProject } = projectLoader

// WARNING: this way not reload the title cause is not a watch
// usePageStore().pageData.title = `Project: ${singleProjectWithDetails.value?.name || ''}`

// NOTE: ok way
watch(
  () => singleProjectWithDetails.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${singleProjectWithDetails.value?.name || ''}`
  },
)

await getProjetWithDetails(slug)
</script>

<template>
  <Table v-if="singleProjectWithDetails">
    <TableRow>
      <TableHead> Name </TableHead>
      <!-- <TableCell> {{ singleProjectWithDetails.name }} </TableCell> -->
      <TableCell>
        <AppInPlaceEditText v-model="singleProjectWithDetails.name" @commit="updateProject"  />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell> {{ singleProjectWithDetails.description }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ singleProjectWithDetails.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-3 border border-primary hover:scale-110 hover:z-2 transition-transform"
            v-for="collab in singleProjectWithDetails.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section
    v-if="singleProjectWithDetails"
    class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
  >
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="task in singleProjectWithDetails.tasks" :key="task.id">
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> In progress </TableCell>
              <TableCell> 22/08/2024 </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2>Documents</h2>
      <div class="table-container">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/main.css";

th {
  @apply w-[100px];
}

td {
  @apply text-wrap;
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-gray-200 dark:bg-slate-900 h-80;
}
</style>
