<script setup lang="ts">
import { taskDetailsQuery, type TaskDetailsQuery } from '@/utils/supaQueries';


const route = useRoute('/tasks/[id]')

// usePageStore().pageData.title = `Task #${route.params?.id}`

// check: define a ref to store the task data
// check: write the funciton ot fetch the task
// check: settings the supabase query and define the query type
// CHECK: Use watch to update the page tittle
// TODO: update the template with the fetchd data

const currenTask = ref<TaskDetailsQuery | null>(null)

watch(
  () => currenTask.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${currenTask.value?.name ?? ''}`
  }
)

const getTaskDetails = async () => {
  const { data, error, status } = await taskDetailsQuery(route.params.id)
  if (error)
    useErrorStore().setError({ error, customCode: status })

  currenTask.value = data
}

getTaskDetails()

</script>

<template>
  <Table v-if="currenTask">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ currenTask.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell> {{ currenTask.description }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Assignee </TableHead>
      <TableCell> {{ currenTask.collaborators }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell> {{ currenTask.projects?.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>{{ currenTask.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collaborator in currenTask.collaborators" :key="collaborator">
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
    <TableRow class="hover:bg-transparent">
      <TableHead class="align-top pt-4"> Comments </TableHead>

      <TableCell>
        Comments cards goes in here..

        <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
          <textarea placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3">
          </textarea>
          <div class="flex justify-between mt-3">
            <Button> Comment </Button>
            <div class="flex gap-4">
              <button variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:paperclip"></iconify-icon>
                <span class="sr-only">Attach file</span>
              </button>
              <button variant="ghost" @click.prevent>
                <iconify-icon icon="lucide:image-up"></iconify-icon>

                <span class="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  </Table>
</template>

<style scoped>
@reference "@/assets/main.css";

th {
  @apply w-[100px];
}

td {
  @apply text-wrap;
}
</style>
