// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_API_BASE in .env or the deployment environment.
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
