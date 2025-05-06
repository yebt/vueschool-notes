<script setup lang="ts">
import HeaderSection from './components/sections/HeaderSection.vue';
</script>

<template>
  <HeaderSection />
  <main class="container">

    <!-- <router-view :key="$route.path"></router-view> -->
    <router-view v-slot="{ Component }">
      <!-- The mode is when apply the effect -->
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </main>
</template>

<style scoped lang="scss">
.fade {
  $slide-time: 0.3s;

  &-enter-active,
  &-leave-active {
    transition: opacity $slide-time;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
