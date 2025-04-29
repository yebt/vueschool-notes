<script setup lang="ts"></script>

<template>
  <header class="container">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <!-- <li><router-link to="/zephyros">Zephyros</router-link></li> -->
      </ul>
    </nav>
  </header>
  <main class="container">
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
