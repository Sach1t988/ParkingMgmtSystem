export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return;
  const token = localStorage.getItem("authorization");
  if (token != null) {
    return navigateTo("/");
  }
});
