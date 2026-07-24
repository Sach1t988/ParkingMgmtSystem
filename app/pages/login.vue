
<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"
import { useAuthStore } from "~/store/auth"

definePageMeta({
  layout: "login",
  middleware:"guest"  
})

const authStore = useAuthStore();

const { login } = useAuth()
const toast = useToast()

const router = useRouter();

function showToast() {
  toast.add({
    title: "Login Failed",
    description: "Entered incorrect information",
    color: "error"
  })
}

// Zod validation schema
const schema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required"),

  password: z
    .string()
    .min(1, "Password is required")
})

type Schema = z.output<typeof schema>

// Form state
const state = reactive({
  phoneNumber: "",
  password: "",
  rememberMe: false
})

// Not part of the form
const showPassword = ref(false)

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  event.preventDefault();
  console.log("Login button clicked")

  const payload = {
    phoneNumber: event.data.phoneNumber,
    password: event.data.password,
  };

  await authStore.login(payload);
  router.push('/');
}
</script>

 
<template>
  <div class="min-h-screen relative flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-[#F4F6FB]">
    <!-- ambient background glow -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-blue-200/40 blur-3xl" />
      <div class="absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-indigo-200/40 blur-3xl" />
    </div>

    <div
      class="relative w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_20px_60px_-15px_rgba(30,58,138,0.25)] ring-1 ring-black/5 overflow-hidden grid grid-cols-1 md:grid-cols-2"
      style="font-family: 'Inter', sans-serif;"
    >

      <!-- Left: form -->
      <div class="flex flex-col justify-center px-8 py-14 sm:px-14 sm:py-16">

        <!-- brand mark -->
        <div class="flex items-center gap-2 mb-10">
          <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <UIcon name="i-lucide-square-parking" class="w-5 h-5 text-white" />
          </div>
          <span
            class="text-xs font-semibold tracking-[0.18em] text-blue-600 uppercase"
            style="font-family: 'Space Grotesk', sans-serif;"
          >
            Parking Management System
          </span>
        </div>

        <h1
          class="text-4xl sm:text-[2.75rem] leading-[1.1] font-semibold text-gray-900 mb-3"
          style="font-family: 'Space Grotesk', sans-serif;"
        >
          Welcome back
        </h1>
        <p class="text-gray-400 mb-10">
          Sign in to manage your parking operations.
        </p>

            <UForm
  :schema="schema"
  :state="state"
  class="flex flex-col gap-5"
  @submit="handleLogin"
>
          <UFormField label="Phone Number" name="phoneNumber" :ui="{ label: 'text-gray-700 font-medium mb-2 text-sm' }">
            <UInput
              v-model="state.phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              size="xl"
              icon="i-lucide-phone"
              class="w-full"
              :ui="{
                base: 'bg-gray-50/80 rounded-xl border border-gray-200 placeholder:text-gray-400 transition-all duration-200 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100'
              }"
            />
          </UFormField>

          <UFormField label="Password" name="password" :ui="{ label: 'text-gray-700 font-medium mb-2 text-sm' }">
            <UInput
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              size="xl"
              icon="i-lucide-lock"
              class="w-full"
              :ui="{
                base: 'bg-gray-50/80 rounded-xl border border-gray-200 placeholder:text-gray-400 transition-all duration-200 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100'
              }"
            >
              <template #trailing>
                <UButton
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  color="error"
                  variant="link"
                  size="sm"
                  :padded="false"
                  class="text-gray-400 hover:text-gray-600"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>

          <div class="flex items-center justify-between pt-1">
            <UCheckbox
              v-model="state.rememberMe"
              label="Remember me"
              :ui="{ label: 'text-gray-500 text-sm', base: 'ring-gray-300' }"
            />
          </div>
          <UButton
          type="submit"
  block
  size="xl"
  color="primary"
  class="font-semibold rounded-xl mt-3 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200"
>
  <span class="flex items-center justify-center gap-2 w-full">
    <span>Sign in</span>
    <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
  </span>
</UButton>
       </UForm>
      </div>
      <div class="hidden md:block relative p-3">
        <div class="relative w-full h-full rounded-[22px] overflow-hidden">
          <NuxtImg
            src="/image/loginpage_second.jpg"
            alt="Parking management illustration"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-linear-to-t from-blue-950/70 via-blue-950/0 to-blue-950/10" />
        </div>
      </div>

    </div>
  </div>
</template>
