<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'
import { profilesQuery, projectsQuery } from '@/utils/supaQueries'

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

const createtask = async (formData: CreateNewTask) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log(formData))
    }, 2000)
  })
}
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle> Create new Task </SheetTitle>
        <SheetDescription> Just create some new task</SheetDescription>

        <FormKit type="form" @submit="createtask" submit-label="Create task">
          <FormKit
            type="text"
            name="name"
            id="name"
            label="Name of task"
            placeholder="My new tasks"
          />
          <FormKit
            type="select"
            name="for"
            id="for"
            label="For"
            placeholder="Select a user"
            :options="selectOptions.profiles"
          />
          <FormKit
            type="select"
            name="project"
            id="project"
            label="Project"
            placeholder="Select a
          project"
            :options="selectOptions.projects"
          />
        </FormKit>
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
        />
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
