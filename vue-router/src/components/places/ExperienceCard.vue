<script setup lang="ts">
import type { Experience } from '@/types/Destinations'

const props = defineProps<{
  experience: Experience
}>()
const { experience } = props
</script>

<template>
  <article class="experience-card">
    <img :src="`/images/experiences/${experience.image}`" :alt="experience.name" />
    <span class="experience-card__name"> {{ experience.name }}</span>
  </article>
</template>

<style scoped lang="scss">
.experience-card {
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 0;

  &>img {
    transition-property: transform object-fit width height;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    /* transition: transform 0.2s ease-in-out; */
    aspect-ratio: 5/3;
    object-fit: cover;
  }

  &:hover {
    &>img {
      transform: scale(1.1);
    }
  }
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
