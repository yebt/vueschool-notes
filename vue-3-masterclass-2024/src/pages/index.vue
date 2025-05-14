<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select()
}

</script>

<template>
  <div>
    <h1>Home view</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 1 } }">Go to project 1</RouterLink>
  </div>
</template>
