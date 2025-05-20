<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<template>
  <div>
    <h1>This is a projct: {{route.params?.slug}}</h1>
  </div>
</template>
