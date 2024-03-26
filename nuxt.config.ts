import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["nuxt-primevue", "@nuxtjs/tailwindcss", "@nuxtjs/supabase"],

  css: ["primeicons/primeicons.css"],

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL,
    },
  },

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: "lara",
      from: path.resolve(__dirname, "./assets/presets/lara/"),
    },
  },
});
