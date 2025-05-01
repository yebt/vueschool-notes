<script setup lang="ts">
import sourceData from '@/data/destinations.json'
import type { Destination } from '@/types/Destinations';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const destinationId = computed(() => {
  return parseInt(route.params.id as string)
})

// NOTE: just useful if use json file like DB
// const destinationObj = computed(() => {
//   return sourceData.destinations.find(
//     destinationEl => destinationEl.id === destinationId.value
//   )
// })

// NOTE: Fetch the destination form the server
const destinationObj = ref<Destination | null>(null)

// use the API issue
const fetchData = async () => {
  // console.log('call')
  // await new Promise(resolve => setTimeout(resolve, 300))
  // console.log('end wait')
  const response = await fetch(`http://localhost:3000/api/v1/destinations/${route.params.slug}`)
  const dataJson: Destination = await response.json() as Destination
  destinationObj.value = dataJson
}

// WARNING: ISSUE in the case of just call it, need call each of change route params
fetchData()

// NOTE: fetch when change the params
watch(() => route.params, fetchData)

</script>

<!--NOTE: when use the same instance of the component, is more efficient that create a new-->
<template>
  <section v-if="destinationObj">
    <h1 class="destination-title">{{ destinationObj?.name }}</h1>
    <article class="destination-card">
      <img :src="`/images/${destinationObj?.image}`" :alt="destinationObj?.name">
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
