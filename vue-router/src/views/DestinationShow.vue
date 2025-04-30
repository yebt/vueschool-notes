<script setup lang="ts">
import sourceData from '@/data/destinations.json'
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const destinationId = computed(() => {
  return parseInt(route.params.id as string)
})

const destinationObj = computed(() => {
  return sourceData.destinations.find(
    destinationEl => destinationEl.id === destinationId.value
  )
})
</script>

<template>
  <section>
    <h1>{{ destinationObj?.name }}</h1>
    <article class="destination-card">
      <img :src="`/images/${destinationObj?.image}`" :alt="destinationObj?.name">
      <p>{{ destinationObj?.description }}</p>
    </article>
  </section>
</template>

<style scoped>
.destination-card {
  align-items: center;
  padding: 0;
  display: flex;

  &>img {
    object-fit: cover;
    border-radius: 8px;
    max-height: 20rem;
    aspect-ratio: 4/3;
  }

  &>p {
    padding: 1.5rem;
    margin: 0;
    max-height: 100%;
    overflow: hidden;
  }

}
</style>
