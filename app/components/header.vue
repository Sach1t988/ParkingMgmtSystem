<script setup lang="ts">
//  import type {User} from "~/types/user"
// const {getUserByID} = useUsers()
const route = useRoute();
const { user, fetchCurrentUser } = useCurrentUser();
const router = useRouter();

const pageTitle = computed(() => {
  return (route.meta.title as string) || "Parking Management";
});

const logout = () => {
  console.log("logout clickied");
  localStorage.removeItem("token");
  router.push("/login");
};

const menuItems = [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
      to: "/profile",
    },
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      onSelect: logout,
    },
  ],
];

const userInitials = computed(() => {
  if (!user.value?.name) return "?";

  return user.value.name
    .trim()
    .split(/\s+/)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
});

onMounted(async () => {
  fetchCurrentUser();
});
</script>

<template>
  <header class="sticky top-0 z-50 bg-white">
    <div class="h-16 px-8 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex flex-col">
        <h1 class="text-2xl font-semibold text-gray-900">
          {{ pageTitle }}
        </h1>
      </div>

      <!-- Profile -->
      <UDropdownMenu :items="menuItems">
        <button
          class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
        >
          <UAvatar :text="userInitials" />

          <div class="text-left">
            <p class="font-medium text-gray-900">
              {{ user?.name ?? "Unknown User" }}
            </p>

            <p class="text-xs text-gray-500">
              {{ user?.role?.name }}
            </p>
          </div>

          <UIcon name="i-lucide-chevron-down" class="w-4 h-4 text-gray-500" />
        </button>
      </UDropdownMenu>
    </div>
  </header>
</template>
