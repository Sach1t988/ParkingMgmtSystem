<script setup lang="ts">
const user = {
  name: "John Doe",
  role: "Admin"
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"> 
     <!-- <header
    class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8"
  > -->
    <div class="h-16 px-8 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex items-center gap-3">

        <div
          class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"
        >
          <UIcon
            name="i-lucide-square-parking"
            class="text-white w-5 h-5"
          />
        </div>

        <div>
          <h1 class="font-semibold text-gray-900">
            Parking Management
          </h1>

          <p class="text-xs text-gray-500">
            Administration Panel
          </p>
        </div>

      </div>

      <!-- Profile -->
      <UDropdownMenu
        :items="[
          [
            {
              label: 'Profile',
              icon: 'i-lucide-user'
            },
            {
              label: 'Logout',
              icon: 'i-lucide-log-out'
            }
          ]
        ]"
      >

        <button
          class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
        >

          <UAvatar
            src="https://i.pravatar.cc/100"
            alt="John Doe"
          />

          <div class="text-left">
            <p class="font-medium text-gray-900">
              {{ user.name }}
            </p>

            <p class="text-xs text-gray-500">
              {{ user.role }}
            </p>
          </div>

          <UIcon
            name="i-lucide-chevron-down"
            class="w-4 h-4 text-gray-500"
          />

        </button>

      </UDropdownMenu>

    </div>
  </header>
</template>