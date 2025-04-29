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
</template>

<style scoped>
nav .router-link-active {
  text-decoration: underline;
}
</style>
