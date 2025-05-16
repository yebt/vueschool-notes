<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient';
import type { Tables } from '@database/types';
import { ref } from 'vue';


const tasksList = ref<Tables<'tasks'>[] | null>(null)

  // NOTE: IIFE: Inmediatly Invoke Function Expression
  ; (async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select()

    if (error) console.log('ERROR', error)

    tasksList.value = data ?? []

    // console.log('projects:', tasksList.value)
  })()
</script>

<template>
  <div>
    <h1>Tasks list</h1>
    <RouterLink to="/">Go to Home</RouterLink>
    <ul v-if="tasksList && tasksList.length > 0">
      <li v-for="(tasksEl) in tasksList" :key="tasksEl.id">
        <b> TSK: </b> <i>{{ tasksEl.name }}</i>
      </li>
    </ul>
    <section v-else>
      -- No tasks --
    </section>
  </div>
</template>
