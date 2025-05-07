<script setup lang="ts">
import HeaderSection from './components/sections/HeaderSection.vue';
</script>

<template>
  <HeaderSection />
  <main class="container flexer">

    <!-- <router-view class="view left-sidebar" name="LeftSidebar"></router-view> -->
    <router-view v-slot="{ Component }" class="left-sidebar" name="LeftSidebar">
      <!-- The mode is when apply the effect -->
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>

    <!-- <router-view :key="$route.path"></router-view> -->
    <router-view v-slot="{ Component }" class="main-view">
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

.flexer {
  display: flex;
}

.left-sidebar {
  width: 20%;
}

.main-view {
  width: 100%;
}
</style>
