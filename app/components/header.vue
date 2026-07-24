<script setup lang="ts">
const route = useRoute()
const {   user, fetchCurrentUser } = useCurrentUser()
const { logout } = useAuth()

const pageTitle = computed(() => {
  return (route.meta.title as string) || "Parking Management"
})

onMounted(() => {
  fetchCurrentUser()
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"> 
    <div class="h-16 px-8 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex flex-col">
  <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
    {{ pageTitle }}
  </h1>
</div>

      <!-- Profile -->
      <UDropdownMenu
        :items="[
          [
            {
              label: 'Profile',
              icon: 'i-lucide-user',
              to: '/profile'
            },
            {
              label: 'Logout',
              icon: 'i-lucide-log-out',
              onSelect: () => logout()
            }
          ]
        ]"
      >

        <button
          class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >

          <UAvatar
            src="https://i.pravatar.cc/100"
            alt="John Doe"
          />

          <div class="text-left">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ user?.name ?? 'Unknown User'}}
            </p>

            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ user?.role }}
            </p>
          </div>

          <UIcon
            name="i-lucide-chevron-down"
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
          />

        </button>

      </UDropdownMenu>

    </div>
  </header>
</template>