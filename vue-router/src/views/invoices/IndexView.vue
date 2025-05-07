<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';


onBeforeRouteLeave((to, from) => {
  const answer = globalThis.confirm('Are you sure you want to leave? Invoices are super Awesome')
  if (!answer) return false
})

</script>

<template>
  <section>
    <h1>Invoices</h1>
  </section>
</template>

<style scoped></style>
