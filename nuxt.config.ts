// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/image", "@nuxt/ui", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiHost: "http://192.168.1.133:6767",
    },
  },
  css: ["~/assets/css/main.css"],
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
});
