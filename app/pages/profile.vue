<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  title: "Profile",
});

const { user, fetchCurrentUser } = useCurrentUser();

onMounted(() => {
  fetchCurrentUser();
});

const initials = computed(() => {
  if (!user.value?.name) return "?";

  return user.value.name
    .trim()
    .split(/\s+/)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
});
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <h2 class="text-xl font-semibold text-emerald-800">My Profile</h2>

    <!-- Profile summary card -->
    <div class="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
      <UAvatar
        :text="initials"
        size="xl"
        class="bg-emerald-100 text-emerald-800 font-semibold shrink-0"
      />

      <div>
        <p class="text-emerald-800 font-semibold text-base">
          {{ user?.name ?? "Loading..." }}
        </p>
        <p class="text-sm text-gray-500">
          {{ user?.role?.name ?? "—" }}
        </p>
      </div>
    </div>

    <!-- Personal information card -->
    <div class="bg-white rounded-2xl shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-emerald-800 font-semibold text-base">
          Personal Information
        </h3>

        <button
          type="button"
          class="flex items-center gap-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition rounded-lg px-4 py-1.5"
        >
          Edit
          <UIcon name="i-lucide-pencil" class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p class="text-xs text-gray-500 mb-1">Name</p>
          <p class="text-sm font-medium text-gray-900">
            {{ user?.name ?? "—" }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-1">Phone Number</p>
          <p class="text-sm font-medium text-gray-900">
            {{ user?.phoneNumber ?? "—" }}
          </p>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-1">User Role</p>
          <p class="text-sm font-medium text-gray-900">
            {{ user?.role?.name ?? "—" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
