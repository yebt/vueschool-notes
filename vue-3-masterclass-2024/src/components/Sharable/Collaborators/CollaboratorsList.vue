<script setup lang="ts">
import type { Collabs } from '@/utils/supaQueries'

const { collaboratorsInTask } = defineProps<{
  collaboratorsInTask?: Collabs
}>()
</script>

<template>
  <div class="text-left font-medium h-20 flex items-center">
    <template v-if="collaboratorsInTask">
      <RouterLink
        v-for="collab in collaboratorsInTask"
        :key="collab.id"
        :to="`/users/${collab.username}`"
      >
        <Avatar class="hover:scale-110 transition-transform">
          <AvatarImage :src="collab.avatar_url ?? ''" />
        </Avatar>
      </RouterLink>
    </template>
    <Avatar v-else class="animate-pulse">
      <AvatarFallback />
    </Avatar>
  </div>
</template>
