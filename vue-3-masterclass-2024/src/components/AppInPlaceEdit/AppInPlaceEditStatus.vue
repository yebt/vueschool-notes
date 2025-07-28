<script setup lang="ts">
import type { Tables } from '@database/types'

// interface Props {
//   readonly?: boolean
// }
// const props = withDefaults(defineProps<Props>(), {
//   readonly: false,
// })

const { readonly = false } = defineProps<{
  readonly?: boolean
}>()

type ProjectStatus = Tables<'projects'>['status']

const value = defineModel<ProjectStatus>()

const toggleValue = () => {
  if (readonly) return

  value.value = value.value === 'completed' ? 'in-progress' : 'completed'
  // NOTE: call defined commit event
  emit('commit')
}

const emit = defineEmits(['commit'])
</script>

<template>
  <div class="text-2xl cursor-pointer" @click="toggleValue">
    <!-- NOTE: transtion apply when el component is removed and es completed when enter new -->
    <Transition mode="out-in">
      <iconify-icon
        v-if="value === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      ></iconify-icon>
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500"></iconify-icon>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.1s;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.3);
}
</style>
