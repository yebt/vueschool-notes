<script setup lang="ts">
import { useRouter } from 'vue-router'


const router = useRouter()
const username = window.user ?? "unknow"
const logout = ()=>{
  window.user = null
  router.push({name: 'Home'})
}
</script>

<template>
  <section>
    <header>
      <hgroup>
        <h1>Greetig {{ username }}</h1>
        <p>This is a protected route</p>
      </hgroup>
      <button @click="logout" class="secondary">Log out</button>
    </header>
  </section>

</template>
