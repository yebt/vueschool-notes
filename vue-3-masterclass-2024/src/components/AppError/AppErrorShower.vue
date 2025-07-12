<script setup lang="ts">


const router = useRouter()

const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}
if (error.value && ('code' in error.value)) {
  message.value = error.value.message
  details.value = error.value.details
  hint.value = error.value.hint
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0;
}

const ErrorTemplate = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./AppErrorDevShowerSection.vue'))
  : defineAsyncComponent(() => import('./AppErrorProdShowerSection.vue'))

// NOTE: hook to clear error
router.afterEach(() => {
  // errorStore.activeError = null; // clear error on navigate a home
  errorStore.clearError()
})

</script>

<template>
  <section class="error">

    <ErrorTemplate :message :hint :details :code :statusCode :customCode :isCustomError="errorStore.isCustomError" />

    <!-- <AppErrorDevShowerSection :message :hint :details :code :statusCode :customCode /> -->
    <!-- <AppErrorProdShowerSection :message :hint :details :code :statusCode :customCode -->
    <!--   :isCustomError="errorStore.isCustomError" /> -->
  </section>
</template>

<style scoped>
@reference '@/assets/main.css';

.error {
  @apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh];
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply font-extrabold text-7xl text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
