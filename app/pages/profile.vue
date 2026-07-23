<<template>
    <div>
        <h2>this is the profile page
            
        </h2>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware:"auth",
    title:"Profile"
})
</script>

<style scoped>

</style>