<script setup lang="ts">
import sourceData from '@/data/destinations.json'
import { computed } from 'vue'
import ExperienceCard from './ExperienceCard.vue'
import type { Experience } from '@/types/Destinations'

// NOTE: the component never know from is the info
const props = defineProps<{
  id: Number // required by default
}>()

const destinationObj = computed(() => {
  return sourceData.destinations.find((desEl) => desEl.id === props.id)
})

const singleName = computed(()=>{
  return destinationObj.value?.name.split(' ')[0].split(',')['0']
})

// NOTE: whan call in the server endpoint
// const destinationObj = ref<Destination | null>(null)
// const fetchData = async () => {
//   const response = await fetch(`http://localhost:3000/api/v1/destinations/${route.params.slug}`)
//   const dataJson: Destination = await response.json() as Destination
//   destinationObj.value = dataJson
// }
//
// fetchData()
</script>

<template>
  <section>
    <h1 class="destination-title">{{ destinationObj?.name }}</h1>
    <article class="destination-card">
      <div class="destination-cover">
        <img :src="`/images/${destinationObj?.image}`" :alt="destinationObj?.name" />
      </div>
      <p>{{ destinationObj?.description }}</p>
    </article>
  </section>
  <hr>
  <section class="">
    <h3>Experiences in {{ destinationObj?.name }}</h3>
    <div class="gridder" v-if="destinationObj">
      <ExperienceCard
        v-for="experienceObj in destinationObj.experiences as Experience[]"
        :key="experienceObj.slug"
        :experience="experienceObj"
      />
    </div>
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

  & > .destination-cover {
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

  & > p {
    padding: 1.5rem;
    margin: 0;
    max-height: 100%;
    overflow: hidden;
  }
}
</style>
