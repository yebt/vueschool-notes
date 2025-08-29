<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())

const taskSheetOpen = ref(false)

const { menuOpen } = useMenu()
</script>

<template>
  <AsideBar @new-task-clicked="taskSheetOpen = true" />
  <AppNewTask v-model="taskSheetOpen" />

  <div class="flex flex-col  transition-[margin]"
    :class="{ 'ml-52': menuOpen, 'ml-24': !menuOpen }"
  >
    <TopNavbar />
    <main class="flex flex-col flex-1 gap-4 p-4 lb:gap-6 lg:p-6">
      <section class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </section>
      <slot />
    </main>
  </div>
</template>
