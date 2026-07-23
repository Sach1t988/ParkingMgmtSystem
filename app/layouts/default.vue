<script setup lang="ts">
import Appsidebar from "~/components/appsidebar.vue"
import Header from "~/components/header.vue"
</script>

<template>
  <div class="flex h-screen bg-[#F4F6FB]">

    <!-- Sidebar -->
    <Appsidebar class="w-64 shrink-0" />

    <!-- Right Section -->
    <div class="flex flex-col flex-1 overflow-hidden">

      <!-- Header -->
      <Header />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-8">
        <slot />
      </main>

    </div>

  </div>
</template>

