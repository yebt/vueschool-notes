<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const route = useRoute() as RouteLocationNormalizedLoaded<'/projects/[slug]'>

usePageStore().pageData.title = `Project ${route.params?.slug}`
</script>

<template>
  <div>
    <h1>This is a projct: {{ route.params?.slug }}</h1>
  </div>
</template>
