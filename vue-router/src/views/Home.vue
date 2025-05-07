<script setup lang="ts">
import sourceData from '@/data/destinations.json'
import { isNavigationFailure, NavigationFailureType, useRouter } from 'vue-router'

const destinations = sourceData.destinations
const router = useRouter()

const triggerRouterError = async () => {
  // BUG: Error when travel to the same actual page
  const navigationFailure = await router.push('/')
  // ERRORS like: .duplicated, .aborted, etc
  if (isNavigationFailure(navigationFailure, NavigationFailureType.cancelled)) {
    // ERROR
    // make some

  }
}
</script>

<template>
  <div>
    <section class="">
      <hgroup>
        <h1>All Destinations</h1>
        <p>This is the home view</p>
      </hgroup>
      <button @click="triggerRouterError">Trigger Router Error</button>
    </section>
    <hr />
    <section class="gridder">
      <!-- hope -->
      <router-link class="" v-for="destiny in destinations" :key="destiny.id"
        :to="{ name: 'destination.show', params: { id: destiny.id, slug: destiny.slug } }">
        <article class="linker-card">
          <header>
            <h4>{{ destiny.name }}</h4>
          </header>
          <img :src="`/images/${destiny.image}`" :alt="destiny.name" />
        </article>
      </router-link>
    </section>
  </div>
</template>
