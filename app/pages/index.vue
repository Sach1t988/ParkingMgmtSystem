<script setup lang="ts">
definePageMeta({
  middleware:"auth",
  title:"Dashboard"
})

const {user, fetchCurrentUser} = useCurrentUser()
</script>


<template>
    <div>
        <h1>this is the index page</h1>
        <NuxtLink to="/users">
            Users
        </NuxtLink>
    </div>
</template>




