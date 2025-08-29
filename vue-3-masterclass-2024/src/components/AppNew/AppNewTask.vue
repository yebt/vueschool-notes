<script setup lang="ts">
const sheetOpen = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="sheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle> Create new Task </SheetTitle>
        <SheetDescription>
          <FormKit type="text" />
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
