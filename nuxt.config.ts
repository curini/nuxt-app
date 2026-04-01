// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  runtimeConfig: {
    navitiaToken: "",
  },
  devtools: { enabled: true },
  app: {
    pageTransition: { mode: "in-out", duration: 0.7 },
    layoutTransition: { mode: "in-out", duration: 0.3 },
  },
});
