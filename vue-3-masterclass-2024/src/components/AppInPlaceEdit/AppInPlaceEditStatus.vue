<script setup lang="ts">
import type { Tables } from '@database/types'

type ProjectStatus = Tables<'projects'>['status']

const value = defineModel<ProjectStatus>()

</script>

<template>
  <div class="text-2xl cursor-pointer">
    <iconify-icon v-if="value === 'completed' " icon="lucide:circle-check" class="text-green-500"></iconify-icon>
    <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500"></iconify-icon>
  </div>
</template>
