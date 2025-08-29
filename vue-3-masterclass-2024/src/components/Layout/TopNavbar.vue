<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())

const isDark = useDark()
const toggleTheme = useToggle(isDark)
</script>
<template>
  <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute top-1/2 -translate-y-1/2 left-2.5 text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
    </form>
    <div class="flex justify-center items-center gap-1">
      <Button @click="toggleTheme()" class="w-8 h-8">
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDark" icon="lucide:sun"></iconify-icon>
          <iconify-icon v-else icon="lucide:moon"></iconify-icon>
        </Transition>
      </Button>
      <div class="w-8">
        <DropdownMenu v-if="profile">
          <DropdownMenuTrigger>
            <Avatar>
              <!-- <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" /> -->
              <!-- <AvatarFallback>CN</AvatarFallback> -->
              <AvatarImage
                :src="profile.avatar_url || ''"
                :alt="`${profile.full_name} profile
picture`"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RouterLink
                :to="{
                  name: '/users/[username]',
                  params: { username: profile.username },
                }"
                class="w-full h-full"
              >
                Profile
              </RouterLink>
            </DropdownMenuItem>
            <!-- <DropdownMenuItem>Billing</DropdownMenuItem> -->
            <!-- <DropdownMenuItem>Team</DropdownMenuItem> -->
            <!-- <DropdownMenuItem>Subscription</DropdownMenuItem> -->
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
