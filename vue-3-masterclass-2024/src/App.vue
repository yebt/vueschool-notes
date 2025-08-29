<script setup lang="ts">
const errorStore = useErrorStore()

// NOTE: vue lifecicle hook to catch errors from any component
// https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured
onErrorCaptured((error) => {
  errorStore.setError({ error })
})

onMounted(() => {
  useAuthStore().trackAuthChanges()
})

// NOTE: select the layout

const { user } = storeToRefs(useAuthStore())

const ACompAuthLayout = defineAsyncComponent(
  () => import('@/components/Layout/main/AuthLayout.vue'),
)
const ACompGuestLayout = defineAsyncComponent(
  () => import('@/components/Layout/main/GuestLayout.vue'),
)
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Component :is="user ? ACompAuthLayout : ACompGuestLayout" :key="user?.id">
      <AppErrorShower v-if="errorStore.activeError"></AppErrorShower>

      <RouterView v-else v-slot="{ Component, route }">
        <!-- Note: the timeout is used to wait to resolve the component before show the fallback -->

        <Transition name="fade" mode="out-in">
          <div class="w-full" :key="route.path">
            <Suspense v-if="Component" :timeout="0">
              <Component :is="Component" />

              <template #fallback>
                <!-- <span>Loading ...</span> -->
                <div
                  class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center items-center w-full h-screen bg-background bg-opacity-90 z-50"
                >
                  <iconify-icon icon="lucide:loader-circle" class="text-6xl animate-spin" />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>
