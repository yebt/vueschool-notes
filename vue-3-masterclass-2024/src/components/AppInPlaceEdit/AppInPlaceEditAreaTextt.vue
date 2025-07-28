<script setup lang="ts">
const value = defineModel<string | null>()
const emit = defineEmits(['commit'])
</script>

<template>
  <textarea
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-stone-200 dark:focus:bg-gray-800 focus:rounded-md field-sizing-content"
    v-model="value"
    @blur="emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  ></textarea>
</template>

<style scoped></style>
