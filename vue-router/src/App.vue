<script setup lang="ts">
import HeaderSection from './components/sections/HeaderSection.vue';
</script>

<template>
  <HeaderSection />
  <main class="container">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>

    </router-view>
  </main>
</template>

<style scoped lang="scss">
.slide {
  $slide-time: 0.5s;

  &-enter-active,
  &-leave-active {
    transition: opacity $slide-time, transform $slide-time;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(-30%);
  }
}
</style>
