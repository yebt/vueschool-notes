<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'
import { createNewTaskQuery, profilesQuery, projectsQuery } from '@/utils/supaQueries'

const sheetOpen = defineModel<boolean>()

type SelectOption = { label: string; value: number | string }

const selectOptions = ref({
  projects: [] as SelectOption[],
  profiles: [] as SelectOption[],
})

const getProjectOptions = async () => {
  const { data: allProjects } = await projectsQuery

  if (!allProjects) return

  allProjects.forEach((proj) => {
    selectOptions.value.projects.push({
      label: proj.name,
      value: proj.id,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery

  if (!allProfiles) return

  allProfiles.forEach((prof) => {
    selectOptions.value.profiles.push({
      label: prof.full_name,
      value: prof.id,
    })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectOptions(), getProfilesOptions()])
}

getOptions()

const { profile } = storeToRefs(useAuthStore())

const createtask = async (formData: CreateNewTask) => {
  const taskToAdd = {
    ...formData,
    collaborators: [profile.value!.id], // Not null assertion operator
  }

  const { error } = await createNewTaskQuery(taskToAdd)

  if (error) {
    console.log(error)
  }
  sheetOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle> Create new Task </SheetTitle>
        <SheetDescription> Just create some new task</SheetDescription>

        <FormKit
          type="form"
          @submit="createtask"
          submit-label="Create task"
          :config="{
            validationVisibility: 'submit',
          }"
        >
          <FormKit
            type="text"
            name="name"
            id="name"
            label="Name of task"
            placeholder="My new tasks"
            validation="required|length:5,255"
          />
          <FormKit
            type="select"
            name="profile_id"
            id="profile_id"
            label="User"
            placeholder="Select a user"
            :options="selectOptions.profiles"
            validation="required"
          />
          <FormKit
            type="select"
            name="project_id"
            id="project_id"
            label="Project"
            placeholder="Select a project"
            :options="selectOptions.projects"
            validation="required"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
            validation="length:0,500"
          />
        </FormKit>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
