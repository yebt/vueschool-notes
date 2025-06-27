<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const route = useRoute() as RouteLocationNormalizedLoaded<'/tasks/[id]'>

usePageStore().pageData.title = `Task #${route.params?.id}`
</script>

<template>
  <div>
    task <span>{{ route.params?.id }}</span>
  </div>
</template>
