<script setup lang="ts">
import type { LinkProp } from '@/types/Generals/Aside'

defineProps<{
  links: LinkProp[]
}>()

const emits = defineEmits<{
  actionClicked: [string]
}>()

const emitActionClicked = (linkTitle: string) => {
  // NOTE: here $emit not exist
  emits('actionClicked', linkTitle)
}
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <!-- -->
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exactActiveClass="text-primary bg-muted"
      class="nav-link"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <!-- -->
    <button v-else class="nav-link w-full cursor-pointer" @click="emitActionClicked(link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </button>
  </template>
</template>

<style scoped>
@reference '@/assets/main.css';

.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>
