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
  <hr>
  <section class="gridder">
    <router-link class="linker-card" v-for="destiny in destinations" :key="destiny.id" :to="destiny.slug">
      <h4>{{ destiny.name }}</h4>
      <img :src="`/images/${destiny.image}`" :alt="destiny.name" />
    </router-link>
  </section>
</template>
