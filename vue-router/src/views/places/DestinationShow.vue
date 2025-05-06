<script setup lang="ts">
import sourceData from '@/data/destinations.json'
import { computed } from 'vue'
import type { Experience } from '@/types/Destinations'
import ExperienceCard from '@/components/places/ExperienceCard.vue'
import GoBack from '@/components/shared/GoBack.vue'

// NOTE: the component never know from is the info
const props = defineProps<{
  id: Number // required by default
}>()

const destinationObj = computed(() => {
  return sourceData.destinations.find((desEl) => desEl.id === props.id)
})

const singleName = computed(() => {
  return destinationObj.value?.name.split(' ')[0].split(',')['0']
})
</script>

<template>
  <div>
    <section>
      <h1 class="destination-title">{{ destinationObj?.name }}</h1>
      <GoBack />
      <article class="destination-card">
        <!-- <div class="destination-cover"> -->
        <img :src="`/images/${destinationObj?.image}`" :alt="destinationObj?.name" />
        <!-- </div> -->
        <p>{{ destinationObj?.description }}</p>
      </article>
    </section>
    <hr />
    <section class="">
      <h3>Experiences in {{ singleName }}</h3>
      <div class="gridder">
        <router-link v-for="experienceObj in destinationObj?.experiences as Experience[]" :key="experienceObj.slug"
          :to="{ name: 'experience.show', params: { experienceSlug: experienceObj.slug } }">
          <ExperienceCard :experience="experienceObj" />
        </router-link>
      </div>
      <router-view />
    </section>
  </div>
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
    /* align-self: stretch; */
    aspect-ratio: 4/3;
  }

  & img {
    object-fit: cover;
    border-radius: 8px;
    aspect-ratio: 4/3;
    height: 20rem;

  }

  &>p {
    padding: 1.5rem;
    margin: 0;
    max-height: 100%;
    overflow: hidden;
  }
}
</style>
