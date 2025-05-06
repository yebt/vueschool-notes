<script setup lang="ts">
import { computed } from 'vue';
import sourceData from '@/data/destinations.json'

// import type { Experience } from '@/types/Destinations'
//
const props = defineProps<{
  id: number,
  experienceSlug: string
}>()

const destinationObj = computed(() => {
  return sourceData.destinations.find(destinationEl => destinationEl.id === props.id)
})
const experienceObj = computed(() => {
  return destinationObj.value?.experiences.find(experienceEl => experienceEl.slug ===
    props.experienceSlug)
})
</script>

<template>
  <article v-if="experienceObj" class="experience-card">
    <header>
      <h2>{{ experienceObj.name }}</h2>
    </header>
    <img :src="`/images/experiences/${experienceObj.image}`" :alt="experienceObj.name">
    <footer>
      {{ experienceObj.description }}
    </footer>
  </article>
</template>

<style lang="scss" scoped>
.experience-card {
  aspect-ratio: 4/3;
}

img {
  aspect-ratio: 4/3;
}
</style>
