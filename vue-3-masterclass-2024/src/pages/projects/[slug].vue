<script setup lang="ts">
const route = useRoute()

usePageStore().pageData.title = `Project ${route.params?.slug}`
</script>

<template>
  <div>
    <h1>This is a projct: {{ route.params?.slug }}</h1>
  </div>
</template>
