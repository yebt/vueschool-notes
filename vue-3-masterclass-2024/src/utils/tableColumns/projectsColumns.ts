import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '../supaQueries'
import type { Ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { GroupedCollabs } from '@/types/GroupCollabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns = (collabs: Ref<GroupedCollabs>): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      // NOTE: when use a custom component in the first parameter and not just a string
      // the final argument should be a funciton like coallback that resolvees the value to to
      // show in the children
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'slug',
    header: () => h('div', { class: 'text-left' }, 'Slug'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('slug'))
    },
  },
  // {
  //   accessorKey: 'status',
  //   header: () => h('div', { class: 'text-left' }, 'Status'),
  //   cell: ({ row }) => {
  //     return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
  //   },
  // },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, { modelValue: row.original.status, readonly: true }),
      )
    },
  },

  // {
  //   accessorKey: 'collaborators',
  //   header: () => h('div', { class: 'text-left' }, 'Collaborators'),
  //   cell: ({ row }) => {
  //     return h(
  //       'div',
  //       { class: 'text-left font-medium' },
  //       JSON.stringify(row.getValue('collaborators')),
  //     )
  //   },
  // },

  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium h-20 flex items-center' },
        // NOTE: error cause collaborators is not ready
        collabs.value[row.original.id]
          ? collabs.value[row.original.id].map((collab) => {
              return h(RouterLink, { to: `/users/${collab.username}` }, () => {
                // render de avatar
                return h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
                  h(AvatarImage, { src: collab.avatar_url || '' }),
                )
              })
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback, () => ''))
            }),
      )
    },
  },
]
