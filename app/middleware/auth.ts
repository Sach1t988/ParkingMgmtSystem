export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return
  if (!useCookie<string | null>('parking_session_state').value) return navigateTo('/login')
})
