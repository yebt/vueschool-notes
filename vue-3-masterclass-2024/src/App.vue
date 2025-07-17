<script setup lang="ts">
import { supabase } from './lib/supabaseClient'


const errorStore = useErrorStore()
const authStore = useAuthStore()

// NOTE: vue lifecicle hook to catch errors from any component
// https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured
onErrorCaptured((error) => {
  errorStore.setError({ error })
})

</script>

<template>
  <AuthLayout>
    <AppErrorShower v-if="errorStore.activeError"></AppErrorShower>

    <RouterView v-else v-slot="{ Component, route }">
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
