<script setup lang="ts">

</script>

<template>
  <div>
    <h1>Home view</h1>
    <!-- <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Go to project 1</RouterLink> -->
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
