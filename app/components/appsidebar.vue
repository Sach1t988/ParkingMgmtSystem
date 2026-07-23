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
  class="w-64 h-screen sticky top-0 bg-white flex flex-col">


<!-- <div
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
        </div> -->

<div class="flex items-center gap-3 px-5 pt-6 pb-8">

  <div
    class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0"
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

    <div class="px-5">

      <nav class="space-y-2">

        <NuxtLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class=" relative flex items-center gap-3 px-4 py-3 rounded-xl transition"
          :class="
            route.path === item.to
              ? 'bg-blue-50 text-blue-600 font-semibold'
              : 'text-gray-600 hover:bg-gray-100'
          "
        >
        <span
  v-if="route.path === item.to"
  class="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-600"
/>

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