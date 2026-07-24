<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
interface Overview { total: number; active: number; admins: number }
const { data: overview } = await useAsyncData('dashboard-overview', () => $fetch<Overview>('/api/users', { query: { page: 1, pageSize: 1 } }))
const cards = computed(() => [{ label: 'Registered users', value: overview.value?.total ?? 0 }, { label: 'Active users', value: overview.value?.active ?? 0 }, { label: 'Administrators', value: overview.value?.admins ?? 0 }])
</script>
<template>
  <main class="min-h-screen bg-gray-50 p-6 md:p-10"><header class="mb-8 flex items-center justify-between"><div><h1 class="text-2xl font-bold">Dashboard</h1><p class="text-gray-500">Parking management overview</p></div><UButton to="/dashboard/users" icon="i-lucide-users">Manage users</UButton></header><section class="grid gap-4 sm:grid-cols-3"><UCard v-for="card in cards" :key="card.label"><p class="text-sm text-gray-500">{{ card.label }}</p><p class="mt-2 text-3xl font-bold">{{ card.value }}</p></UCard></section></main>
</template>
