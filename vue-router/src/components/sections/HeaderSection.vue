<script setup lang="ts">
import sourceData from '@/data/destinations.json'

const destinations = sourceData.destinations
</script>

<template>
  <header class="container">
    <nav>
      <ul>
        <li>
          <!-- Home -->
          <router-link to="/">
            <h3>Vue Router</h3>
          </router-link>
        </li>
        <!-- About -->
        <li><router-link to="/about">About</router-link></li>
      </ul>
      <!---->
      <ul>
        <!-- <li><router-link to="/zephyros">Zephyros</router-link></li> -->
        <!-- Dynamic route destination -->
        <li v-for="destiny in destinations" :key="destiny.id">
          <router-link
            class="outline"
            :to="{
              name: 'destination.show',
              params: {
                id: destiny.id,
                slug: destiny.slug,
              },
            }"
          >
            {{ destiny.name.split(' ')[0].split(',')[0] }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav .router-link-active {
  text-decoration: underline;
}
nav {
  display: flex;
  flex-wrap: wrap;
  & h3 {
    margin: 0;
  }
  & ul {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
