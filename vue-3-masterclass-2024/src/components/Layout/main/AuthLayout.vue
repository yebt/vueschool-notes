<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())
</script>

<template>
  <AsideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main class="flex flex-col flex-1 gap-4 p-4 lb:gap-6 lg:p-6">
      <section class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </section>
      <slot />
    </main>
  </div>
</template>
