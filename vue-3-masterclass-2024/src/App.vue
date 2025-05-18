<script setup lang="ts">
import AsideBar from './components/Layout/AsideBar.vue';
import TopNavbar from './components/Layout/TopNavbar.vue';

</script>

<template>
  <AsideBar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
