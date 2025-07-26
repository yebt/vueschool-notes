<script setup lang="ts">
const value = defineModel()
</script>


<template>
  <input
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-stone-200 dark:focus:bg-gray-800 focus:rounded-md"
    type="text"
    v-model="value"
  />
</template>

<style scoped></style>
