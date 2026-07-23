<script setup lang="ts">
definePageMeta({
  middleware:"auth"
})
</script>


<template>
    <div>
        <h1>this is the index page</h1>
        <NuxtLink to="/users">
            Users
        </NuxtLink>
    </div>
</template>




