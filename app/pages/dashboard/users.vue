<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
type Role = 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'STAFF'
interface User { id: string; name: string; phoneNumber: string; role: Role; vehiclePlate: string; isActive: boolean }
interface UserResponse { users: User[]; total: number; page: number; pageSize: number }
const roles: Role[] = ['ADMIN', 'MANAGER', 'OPERATOR', 'STAFF']
const searchQuery = ref('')
const selectedRole = ref<Role | undefined>()
const page = ref(1)
const pageSize = 10
const isDrawerOpen = ref(false)
const submitting = ref(false)
const toast = useToast()
const form = reactive({ name: '', phoneNumber: '', password: '', role: 'STAFF' as Role, vehiclePlate: '', isActive: true })
const phonePattern = /^\+?[1-9]\d{7,14}$/
const { data, status, refresh } = await useAsyncData<UserResponse>('managed-users', () => $fetch('/api/users', { query: { search: searchQuery.value, role: selectedRole.value, page: page.value, pageSize } }), { watch: [searchQuery, selectedRole, page], default: () => ({ users: [], total: 0, page: 1, pageSize }) })
watch([searchQuery, selectedRole], () => { page.value = 1 })
const maxPage = computed(() => Math.max(1, Math.ceil(data.value.total / pageSize)))
function resetForm() { Object.assign(form, { name: '', phoneNumber: '', password: '', role: 'STAFF', vehiclePlate: '', isActive: true }) }
async function createUser() {
  if (!phonePattern.test(form.phoneNumber)) { toast.add({ title: 'Invalid phone number', description: 'Use 8–15 digits, optionally prefixed by +.', color: 'error' }); return }
  submitting.value = true
  try { await $fetch('/api/users', { method: 'POST', body: form }); await refresh(); isDrawerOpen.value = false; resetForm(); toast.add({ title: 'User created', color: 'success' }) }
  catch (error: unknown) { toast.add({ title: 'Could not create user', description: error instanceof Error ? error.message : 'Please review the form.', color: 'error' }) }
  finally { submitting.value = false }
}
</script>
<template>
  <main class="min-h-screen bg-gray-50 p-6 md:p-10">
    <header class="mb-8 flex flex-wrap items-center justify-between gap-3"><div><h1 class="text-2xl font-bold">Users</h1><p class="text-gray-500">Manage access to the parking system.</p></div><UButton icon="i-lucide-user-plus" @click="isDrawerOpen = true">Add user</UButton></header>
    <UCard><div class="mb-5 flex flex-wrap gap-3"><UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Search name, phone, or plate" class="w-full sm:w-80" /><USelect v-model="selectedRole" :items="roles" placeholder="All roles" class="w-44" /></div>
      <div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="border-b text-gray-500"><tr><th class="p-3">Name</th><th class="p-3">Phone Number</th><th class="p-3">Role</th><th class="p-3">Vehicle Plate #</th><th class="p-3">Status</th><th class="p-3">Actions</th></tr></thead><tbody><tr v-if="status === 'pending'"><td colspan="6" class="p-6 text-center">Loading users…</td></tr><tr v-for="user in data.users" :key="user.id" class="border-b"><td class="p-3 font-medium">{{ user.name }}</td><td class="p-3">{{ user.phoneNumber }}</td><td class="p-3">{{ user.role }}</td><td class="p-3">{{ user.vehiclePlate }}</td><td class="p-3"><UBadge :color="user.isActive ? 'success' : 'neutral'">{{ user.isActive ? 'Active' : 'Inactive' }}</UBadge></td><td class="p-3"><UButton icon="i-lucide-ellipsis" variant="ghost" color="neutral" aria-label="User actions" /></td></tr><tr v-if="status !== 'pending' && !data.users.length"><td colspan="6" class="p-6 text-center text-gray-500">No users found.</td></tr></tbody></table></div>
      <div class="mt-5 flex items-center justify-between"><span class="text-sm text-gray-500">{{ data.total }} users</span><div class="flex gap-2"><UButton variant="outline" color="neutral" :disabled="page === 1" @click="page--">Previous</UButton><span class="self-center text-sm">Page {{ page }} of {{ maxPage }}</span><UButton variant="outline" color="neutral" :disabled="page >= maxPage" @click="page++">Next</UButton></div></div>
    </UCard>
    <USlideover v-model:open="isDrawerOpen" title="Add user"><template #body><form class="space-y-4" @submit.prevent="createUser"><UFormField label="Name" required><UInput v-model="form.name" class="w-full" /></UFormField><UFormField label="Phone number" required><UInput v-model="form.phoneNumber" type="tel" class="w-full" /></UFormField><UFormField label="Password" required><UInput v-model="form.password" type="password" class="w-full" /></UFormField><UFormField label="Role" required><USelect v-model="form.role" :items="roles" class="w-full" /></UFormField><UFormField label="Vehicle plate #" required><UInput v-model="form.vehiclePlate" class="w-full" /></UFormField><UCheckbox v-model="form.isActive" label="Active user" /><UButton type="submit" block :loading="submitting">Create user</UButton></form></template></USlideover>
  </main>
</template>
