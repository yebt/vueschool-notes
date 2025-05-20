<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Home view</h1>
    <ul>
      <li>
        <RouterLink :to="{ name: '/projects/' }">Go to projects</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: '/tasks/' }">Go to tasks</RouterLink>
      </li>
    </ul>
  </div>
</template>
