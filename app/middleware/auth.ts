export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/dashboard')) return
  if (!useCookie<string | null>('parking_session').value) return navigateTo('/login')
})
