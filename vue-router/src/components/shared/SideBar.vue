<script setup lang="ts">

</script>

<template>
  <aside>
    <ul>
      <li>
        <AppLink to="/about">About</AppLink>
      </li>
      <li>
        <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
      </li>
      <li>
        <AppLink :to="{ name: 'invoices' }">Invoices</AppLink>
      </li>
      <li>
        <AppLink to="https://github.com/yebt">GitHub</AppLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
ul {
  padding: 10px;
  list-style: none;
  margin-right: 20px;
  & > li {
    margin: 10px;
  }
}
</style>
