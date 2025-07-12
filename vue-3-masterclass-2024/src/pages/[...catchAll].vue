<script setup lang="ts">

// call the store to make available an error of not found
useErrorStore().setError({ error: 'Page not found', customCode: 404 })
</script>

<template>
  <div></div>
</template>
