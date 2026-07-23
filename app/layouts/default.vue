<script setup lang="ts">
import Appsidebar from '~/components/appsidebar.vue';
import Footer from '~/components/footer.vue';
import Header from '~/components/header.vue';


</script>

<template>
    <div class="min-h-screen bg-[#F4F6FB]">
       
    
    
    <div class="flex flex-col flex-1 overflow-hidden">
    <Header/><Appsidebar class="shink-0"/>
    <main class="flex-1 overflow-y-auto p-8"><slot/>  </main>
    
    <Footer/>
    </div></div>
</template>



