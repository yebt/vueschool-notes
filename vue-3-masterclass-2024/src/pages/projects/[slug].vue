<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>This is a projct: {{route.params?.slug}}</h1>
  </div>
</template>
