<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <!-- Note: the timeout is used to wait to resolve the component before show the fallback -->
      <Suspense v-if="Component" :timeout="0">
        <Component :is="Component" :key="route.name" />

        <template #fallback>
          <span>Loading ...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>
