<script setup lang="ts">
import { taskDetailsQuery, type Collabs, type TaskDetailsQuery } from '@/utils/supaQueries'

const { id } = useRoute('/tasks/[id]').params

const taskLoader = useTasksStore()
const { singleTask } = storeToRefs(taskLoader)
const { getSingleTask, updateTask } = taskLoader

const taskCollabs = ref<Collabs>([])

watch(
  () => singleTask.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${singleTask.value?.name ?? ''}`
  },
)

// const getTaskDetails = async () => {
//   const { data, error, status } = await taskDetailsQuery(route.params.id)
//   if (error) useErrorStore().setError({ error, customCode: status })
//
//   singleTask.value = data
// }
//
// getTaskDetails()

await getSingleTask(id)

const { getProfilesByIds } = useCollabs()

// get collabs async
if (singleTask.value) {
  getProfilesByIds(singleTask.value?.collaborators).then((collabsResult) => {
    taskCollabs.value = collabsResult
  })
}
// const collabs = singleTask.value?.collaborators
//   ? await getProfilesByIds(singleTask.value?.collaborators)
//   : []
</script>

<template>
  <Table v-if="singleTask">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>
        <AppInPlaceEditText v-model="singleTask.name" @commit="updateTask" />
      </TableCell>
      <!-- <TableCell> {{ singleTask.name }} </TableCell> -->
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        <AppInPlaceEditTextarea v-model="singleTask.description" @commit="updateTask" />
        <!-- {{ singleTask.description }} -->
      </TableCell>
    </TableRow>
    <!-- <TableRow> -->
    <!--   <TableHead> Assignee </TableHead> -->
    <!--   <TableCell> {{ singleTask.collaborators }} </TableCell> -->
    <!-- </TableRow> -->
    <TableRow>
      <TableHead> Project </TableHead>
      <TableCell>
        <RouterLink
          v-if="singleTask.projects"
          :to="{ name: '/projects/[slug]', params: { slug: singleTask.projects.slug } }"
          class="hover:underline p-3"
        >
          {{ singleTask.projects.name }}
        </RouterLink>
        <span v-else> .... </span>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>
        <!-- {{ singleTask.status }} -->
        <AppInPlaceEditStatus v-model="singleTask.status" @commit="updateTask" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar v-if="singleTask.collaborators.length > 0 && taskCollabs.length == 0">
            <AvatarFallback class="animate-ping" />
          </Avatar>
          <Avatar
            v-else-if="singleTask.collaborators.length > 0"
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collaborator in taskCollabs"
            :key="collaborator.id"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              :to="{ name: '/users/[username]', params: { username: collaborator.username } }"
            >
              <AvatarImage :src="collaborator.avatar_url || ''" :alt="collaborator.username" />
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
          <textarea
            placeholder="Add your comment.."
            class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
          ></textarea>
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
