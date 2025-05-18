<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'


</script>

<template>
  <header>
    <nav class="h-16 border-b bg-muted/40 flex justify-between px-6 items-center">
      <form class="relative w-full max-w-96 h-fit">
        <iconify-icon class="absolute top-1/2  -translate-y-1/2  left-2.5 text-muted-foreground" icon="lucide:search" ></iconify-icon>
        <Input type="text" class="w-full pl-8 bg-background" placeholder="Search ..."></Input>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <!-- <AvatarImage src="https://github.com/unovue.png" alt="@unovue" /> -->
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
