<script setup lang="ts">
definePageMeta({ layout: false })
const { login } = useAuth()
const toast = useToast()
const pending = ref(false)
const showPassword = ref(false)
const form = reactive({ phoneNumber: '', password: '' })
async function submit() {
  if (!form.phoneNumber || !form.password) return
  pending.value = true
  try { await login(form); await navigateTo('/dashboard') }
  catch { toast.add({ title: 'Login failed', description: 'Use valid administrator credentials.', color: 'error' }) }
  finally { pending.value = false }
}
</script>
<template>
  <main class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <UCard class="w-full max-w-md">
      <template #header><h1 class="text-xl font-semibold">Parking Management</h1></template>
      <p class="mb-6 text-sm text-gray-500">Sign in with your administrator account.</p>
      <form class="space-y-4" @submit.prevent="submit">
        <UFormField label="Phone number" required><UInput v-model="form.phoneNumber" type="tel" autocomplete="tel" class="w-full" placeholder="9800000000" /></UFormField>
        <UFormField label="Password" required><UInput v-model="form.password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" class="w-full"><template #trailing><UButton :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'" variant="link" color="neutral" :padded="false" @click="showPassword = !showPassword" /></template></UInput></UFormField>
        <UButton type="submit" block :loading="pending">Sign in</UButton>
      </form>
    </UCard>
  </main>
</template>
