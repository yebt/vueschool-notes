<script setup lang="ts"></script>

<template>
  <div class="error-page">
    <hgroup>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>
        Oops, we couldn't find that page. Try going
        <router-link to="/">Home</router-link>
      </p>
    </hgroup>
  </div>
</template>

<style lang="scss">
.container:has(.error-page) {
  display: grid;
}
</style>

<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;

  &>* {
    text-align: center;

    @media screen and (min-width: 640px) {
      text-align: left;
    }
  }

  & h1 {
    font-size: 30vw;

    @media screen and (min-width: 640px) {
      font-size: 8lh;
    }
  }

  & h2 {
    font-size: 20vw;

    @media screen and (min-width: 640px) {
      font-size: 5lh;
    }
  }
}
</style>
