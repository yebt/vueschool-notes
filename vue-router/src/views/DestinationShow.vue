<script setup lang="ts">
import type { Destination } from '@/types/Destinations';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const destinationObj = ref<Destination | null>(null)

const fetchData = async () => {
  const response = await fetch(`http://localhost:3000/api/v1/destinations/${route.params.slug}`)
  const dataJson: Destination = await response.json() as Destination
  destinationObj.value = dataJson
}

fetchData()

</script>

<template>
  <section v-if="destinationObj">
    <h1 class="destination-title">{{ destinationObj?.name }}</h1>
    <article class="destination-card">
      <div class="destination-cover">
        <img :src="`/images/${destinationObj?.image}`" :alt="destinationObj?.name">
      </div>
      <p>{{ destinationObj?.description }}</p>
    </article>
  </section>
</template>

<style scoped>
.destination-title {
  margin-bottom: 2rem;
}

.destination-card {
  align-items: center;
  padding: 0;
  display: flex;

  @media screen and (width < 1024px) {
    flex-direction: column;
    align-items: stretch;
  }

  &>.destination-cover {
    /* height: 100%; */
    align-self: stretch;
  }

  & img {
    object-fit: cover;
    border-radius: 8px;
    /* max-height: 20rem; */
    aspect-ratio: 4/3;
    height: 100%;
  }

  &>p {
    padding: 1.5rem;
    margin: 0;
    max-height: 100%;
    overflow: hidden;
  }

}
</style>
