export default defineNuxtRouteMiddleware(()=>{
    if(import.meta.server)  return 
    const token = localStorage.getItem("token")
    if(token == null){
        return navigateTo("/login")
    }
})