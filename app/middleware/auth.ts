export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return;
  const route = useRoute();
  const token = localStorage.getItem("authorization");
  if (token == null && route.name !== "login") {
    return navigateTo("/login");
  }

  if (token && route.name === "login") {
    return navigateTo("/");
  }
});
