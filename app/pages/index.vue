<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  title: "Dashboard",
});

const { user, fetchCurrentUser } = useCurrentUser();
onMounted(() => {
  fetchCurrentUser();
});
</script>

<template>
  <div>
    <h1>Welcome, {{ user?.name ?? "Loading..." }}</h1>
    <NuxtLink to="/users"> Users </NuxtLink>
  </div>
</template>
