<script setup lang="ts">
const { profile } = storeToRefs(useAuthStore())
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
  </nav>
</template>
