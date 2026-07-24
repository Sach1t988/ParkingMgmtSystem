<script setup lang="ts">
import type { User } from "~/types/user";
const { getUsers } = useUsers();
const { getRoles } = useRoles();


const fetchUsers = async () => {
  let isActive: boolean | undefined;

  if (selectedStatus.value === "Active") {
    isActive = true;
  } else if (selectedStatus.value === "Inactive") {
    isActive = false;
  }

  users.value = await getUsers(isActive);

  console.log(users.value);
};



onMounted(fetchUsers);

definePageMeta({
  middleware: "auth",
  title: "Users",
});

const { createUser } = useUsers();
const toast = useToast();


import type { Role } from "~/types/roles";
const roles = ref<Role[]>([]);
const roleOptions = computed(() =>
  roles.value.map(role => role.name)
);

const fetchRoles = async () => {
  roles.value = await getRoles();
};

onMounted(async () => {
  await fetchUsers();
  await fetchRoles();
});
const users = ref<User[]>([]);
const selectedStatus = ref("All Status");

const isAddModalOpen = ref(false);
const showPassword = ref(false);

import type { CreateUserRequest } from "~/types/user";

const form = reactive<CreateUserRequest>({
  name: "",
  phoneNumber: "",
  password: "",
  role: "",
  isActive: true,
});

function resetForm() {
  form.name = "";
  form.phoneNumber = "";
  form.password = "";
  form.role = "";
  form.isActive = true;
}

async function handleAddUser() {
  const success = await createUser(form);

  if (success) {
    await fetchUsers();
    isAddModalOpen.value = false;
    resetForm();
  } else {
    toast.add({
      title: "Failed to add user",
      description: "Something went wrong. Please try again.",
      color: "error",
    });
  }
}
</script>

<!-- <template>
  <pre>{{ users }}</pre>
</template> -->

<template>
  <div class="flex flex-col gap-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
    >
      <div class="flex flex-col sm:flex-row gap-3 flex-1">
        <UInput
          icon="i-lucide-search"
          placeholder="Search PhoneNumber"
          size="lg"
          class="w-full sm:w-64"
        />
        <USelectMenu
          :items="['All Status', 'Active', 'Inactive']"
          size="lg"
          class="w-full sm:w-40"
          @update:model-value="fetchUsers"
        />
      </div>

      <div class="flex gap-3">
        <UButton
          icon="i-lucide-plus"
          color="primary"
          size="lg"
          class="rounded-xl font-semibold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25"
          @click="isAddModalOpen = true"
        >
          Add User
        </UButton>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th class="w-16 px-6 py-3 text-left">S.N.</th>
            <th class="px-4 py-3 text-left">Full Name</th>
            <th class="px-4 py-3 text-left">Phone Number</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-left">Role</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(user, index) in users"
            :key="user.phoneNumber"
            class="hover:bg-blue-50/40 transition-colors"
          >
            <td class="px-6 py-4 text-grey-500">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-4 font-medium text-gray-900">
              {{ user.name }}
            </td>

            <td class="px-4 py-4 text-gray-500">
              {{ user.phoneNumber }}
            </td>

            <td class="px-4 py-4">
              <span
                class="inline-flex items-center gap-1.5 text-sm font-medium"
                :class="user.isActive ? 'text-emerald-600' : 'text-red-500'"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="user.isActive ? 'bg-emerald-500' : 'bg-red-500'"
                />
                {{ user.isActive ? "Active" : "Inactive" }}
              </span>
            </td>

            <td class="px-4 py-4 text-gray-700">
              {{ user.role.name }}
            </td>

            <td class="px-4 py-4">
              <div class="flex items-center justify-end gap-1 text-gray-400">
                <UButton
                  icon="i-lucide-eye"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                />
                <UButton
                  icon="i-lucide-pencil"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                />
                <UButton
                  icon="i-lucide-trash-2"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        class="flex items-center justify-between px-6 py-4 border-t border-gray-100 text-sm text-gray-400"
      >
        <span>Show 10 from {{ users.length }} data</span>
        <div class="flex items-center gap-1">
          <UButton
            label="Previous"
            color="neutral"
            variant="outline"
            size="sm"
            disabled
          />
          <UButton label="1" color="primary" variant="soft" size="sm" />
          <UButton
            label="Next"
            color="neutral"
            variant="outline"
            size="sm"
            disabled
          />
        </div>
      </div>
    </div>

    <UModal v-model:open="isAddModalOpen" title="Add User">
      <template #body>
        <div class="flex flex-col gap-5">
          <UFormField
            label="Name"
            :ui="{ label: 'text-gray-700 font-medium mb-2 text-sm' }"
          >
            <UInput
              v-model="form.name"
              placeholder="Full name"
              size="xl"
              icon="i-lucide-user"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Phone Number"
            :ui="{ label: 'text-gray-700 font-medium mb-2 text-sm' }"
          >
            <UInput
              v-model="form.phoneNumber"
              type="tel"
              placeholder="Phone number"
              size="xl"
              icon="i-lucide-phone"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Password"
            :ui="{ label: 'text-gray-700 font-medium mb-2 text-sm' }"
          >
            <UInput
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Set a password"
              size="xl"
              icon="i-lucide-lock"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  color="neutral"
                  variant="link"
                  size="sm"
                  :padded="false"
                  class="text-gray-400 hover:text-gray-600"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField
            label="Role"
            :ui="{ label: 'text-gray-700 font-medium mb-2 text-sm' }"
          >
            <USelectMenu
              v-model="form.role"
              :items="roleOptions"
              placeholder="Select a role"
              size="xl"
              icon="i-lucide-shield"
              class="w-full"
            />
          </UFormField>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-3 w-full">
          <UButton
            color="neutral"
            variant="soft"
            size="lg"
            class="rounded-xl font-medium"
            @click="isAddModalOpen = false"
          >
            Cancel
          </UButton>
          <UButton
            size="lg"
            color="primary"
            class="rounded-xl font-semibold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25"
            @click="handleAddUser"
          >
            Save
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
