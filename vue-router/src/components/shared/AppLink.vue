<script setup lang="ts">
import { computed } from 'vue'
import type { RouterLinkProps } from 'vue-router'

const props = defineProps<RouterLinkProps>()
const isExternal = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<template>
  <a v-if="isExternal" target="_blank" :href="props.to as string" class="secondary">
    <slot />
  </a>
  <router-link v-else v-bind="props">
    <slot />
  </router-link>
</template>

<style scoped></style>
