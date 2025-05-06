<script setup lang="ts">
import sourceData from '@/data/destinations.json'

const destinations = sourceData.destinations
</script>

<template>
  <header class="container-fluid">
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
        <li><router-link :to="{ name: 'protected' }">Dashboard</router-link></li>
      </ul>
      <!---->
      <ul class="destinations-links">
        <!-- <li><router-link to="/zephyros">Zephyros</router-link></li> -->
        <!-- Dynamic route destination -->
        <li v-for="destiny in destinations" :key="destiny.id">
          <router-link class="outline" :to="{
            name: 'destination.show',
            params: {
              id: destiny.id,
              slug: destiny.slug,
            },
          }">
            {{ destiny.name.split(' ')[0].split(',')[0] }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  /* background-color: var(--pico-background-color); */
  background-color: oklab(from var(--pico-background-color) l a b/0.7);
  backdrop-filter: blur(9px);
  z-index: 1;
}


nav .router-link-active {
  text-decoration: underline;
}

nav {
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  top: 0;

  & h3 {
    margin: 0;
  }

  & ul {
    display: flex;
    flex-wrap: wrap;
  }
}

.destinations-links {
  @media screen and (max-width: 786px) {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
