<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

const login = () => {
  // Login using API
  //...
  // NOTE:Using an store here
  globalThis.user = username.value
  const redirectPath = route.query.redirect as string
  const redirectDest = redirectPath ?? { name: 'protected' }
  router.push(redirectDest)
}
</script>
<template>
  <section class="login-wrapper">
    <article class="login-card">
      <header>
        <h2>Welcome</h2>
      </header>
      <form @submit.prevent="login">
        <fieldset>
          <label>
            First name
            <input v-model="username" name="first_name" placeholder="First name" autocomplete="given-name" />
          </label>
          <label>
            Password
            <input v-model="password" type="password" name="password" placeholder="Password" aria-label="Password">
          </label>
        </fieldset>

        <input type="submit" value="Login" />
      </form>
    </article>
  </section>
</template>

<style lang="scss">
.container:has(.login-card) {
  display: grid;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    text-align: center;
    margin: 0;
  }
}
</style>

<style scoped></style>
