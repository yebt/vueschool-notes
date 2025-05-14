<script setup lang="ts">

import { supabase } from '@/lib/supabaseClient'
import type { Project } from '@/types/Project';
import { ref } from 'vue';

const projectsList = ref<Project[] | null>(null)

  // NOTE: IIFE: Inmediatly Invoke Function Expression
  ; (async () => {
    const { data, error } = await supabase
      .from('projects')
      .select()

    if (error) console.log('ERROR', error)

    projectsList.value = data ?? []

    console.log('projects:', projectsList.value)
  })()

</script>

<template>
  <div>
    <h1>Projects view</h1>
    <RouterLink to="/">Go to Home</RouterLink>

    <ul v-if="projectsList && projectsList.length > 0">
      <li v-for="(project) in projectsList" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
    <section v-else>
      -- No results --
    </section>
  </div>
</template>
