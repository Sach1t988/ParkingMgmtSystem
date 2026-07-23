<script setup lang="ts">
const route = useRoute()

const menuItems = [
  {
    label: "Dashboard",
    icon: "i-lucide-layout-dashboard",
    to: "/"
  },
  {
    label: "Users",
    icon: "i-lucide-users",
    to: "/users"
  }
]
</script>

<template>
   <aside
  class="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col"
>
    <div class="p-5">

      <nav class="space-y-2">

        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition"
          :class="
            route.path === item.to
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'text-gray-600 hover:bg-gray-100'
          "
        >

          <UIcon
            :name="item.icon"
            class="w-5 h-5"
          />

          {{ item.label }}

        </NuxtLink>

      </nav>

    </div>
  </aside>
</template>