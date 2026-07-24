<script setup lang="ts">
import type { ToasterProps } from "@nuxt/ui";
const toaster: ToasterProps = { position: "top-right" };
const colorMode = useColorMode();
colorMode.preference = "light";
//colorMode.value = 'light'
</script>
<template>
  <div>
    <UApp :toaster="toaster">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
