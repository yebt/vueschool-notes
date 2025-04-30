<script setup lang="ts">
import sourceData from '@/data/destinations.json'

const destinations = sourceData.destinations
</script>

<template>
  <section class="">
    <hgroup>
      <h1>All Destinations</h1>
      <p>This is the home view</p>
    </hgroup>
  </section>
  <hr />
  <section class="gridder">
    <!-- hope -->
    <router-link class="" v-for="destiny in destinations" :key="destiny.id"
      :to="{ name: 'destination.show', params: { id: destiny.id } }">
      <article class="linker-card">
        <header>
          <h4>{{ destiny.name }}</h4>
        </header>
        <img :src="`/images/${destiny.image}`" :alt="destiny.name" />
      </article>
    </router-link>
  </section>
</template>
