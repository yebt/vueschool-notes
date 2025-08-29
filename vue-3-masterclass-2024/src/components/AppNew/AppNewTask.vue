<script setup lang="ts">
import type { CreateNewTask } from '@/types/CreateNewForm'

const sheetOpen = defineModel<boolean>()

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
            :options="[{ label: 'Item name', value: 1 }]"
          />
          <FormKit
            type="textarea"
            name="description"
            id="description"
            label="Description"
            placeholder="Task description"
          />
          <FormKit
            type="select"
            name="project"
            id="project"
            label="Project"
            placeholder="Select a
          project"
            :options="[{ label: 'Item name', value: 1 }]"
          />
        </FormKit>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
