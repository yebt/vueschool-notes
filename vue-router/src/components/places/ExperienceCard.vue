<script setup lang="ts">
import type { Experience } from '@/types/Destinations';

const props = defineProps<{
  experience: Experience
}>()
const { experience } = props
</script>

<template>
  <article class="experience-card">
    <img :src="`/images/experiences/${experience.image}`" :alt="experience.name">
    <span class="experience-card__name"> {{ experience.name }}</span>
  </article>
</template>

<style scoped lang="scss">
.experience-card {
  position: relative;
  padding: 0;
  display: flex;
  overflow: hidden;
}

.experience-card__name {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 0.5lh;
  background-color: oklch(from var(--pico-card-background-color) l c h/0.8);
  backdrop-filter: blur(8px);
}
</style>
