<script setup lang="ts">
const route = useRoute()
usePageStore().pageData.title = `Task #${route.params?.id}`
</script>

<template>
  <div>
    task <span>{{ $route.params?.id }}</span>
  </div>
</template>
