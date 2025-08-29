<script setup lang="ts">
import type { LinkProp } from '@/types/Generals/Aside'
import { useWindowSize } from '@vueuse/core';


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

const { menuOpen } = useMenu()

const windowWidth = useWindowSize().width

watchEffect(()=>{
  if (windowWidth.value > 1024){
    menuOpen.value = true
  }else {
    menuOpen.value = false
  }
})
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <!-- -->
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exactActiveClass="text-primary bg-muted"
      class="nav-link"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.title
      }}</span>
    </RouterLink>

    <!-- -->
    <button
      v-else
      class="nav-link cursor-pointer"
      :class="{ 'justify-normal': menuOpen, 'justify-center': !menuOpen }"
      @click="emitActionClicked(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: menuOpen, hidden: !menuOpen }">{{
        link.title
      }}</span>
    </button>
  </template>
</template>

<style scoped>
@reference '@/assets/main.css';

.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary
  text-muted-foreground;
}
</style>
