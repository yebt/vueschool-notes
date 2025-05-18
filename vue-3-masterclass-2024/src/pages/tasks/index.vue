<script setup lang="ts">
// import { supabase } from '@/lib/supabaseClient';
import DataTable from '@/components/ui/data-table/DataTable.vue';
import type { Tables } from '@database/types';
import type { ColumnDef } from '@tanstack/vue-table';
import { h, ref } from 'vue';


// const tasksList = ref<Tables<'tasks'>[] | null>(null)
//
// // NOTE: IIFE: Inmediatly Invoke Function Expression
// ; (async () => {
//   const { data, error } = await supabase
//     .from('tasks')
//     .select()
//
//   if (error) console.log('ERROR', error)
//
//   tasksList.value = data ?? []
//
//   // console.log('projects:', tasksList.value)
// })()

// DATA ____________________________________________________________
interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
// Columns Definition ____________________________________________________________
const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]


</script>

<template>
  <DataTable :columns="columns" :data="payments" />
</template>
