<script setup lang="ts">
import HeaderSection from './components/sections/HeaderSection.vue';
</script>

<template>
  <HeaderSection />
  <main class="container">
    <!--NOTE: this approach force rebuild the component when the 'key' change-->
    <!-- WARNING: This causes the component to be destroyed and redered again -->
    <router-view :key="$route.path"></router-view>
  </main>
</template>

<style scoped></style>
