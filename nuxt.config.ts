// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  imports: {
    dirs: ['stores'],
  },
  runtimeConfig: {
    pocketbaseHost: process.env.NUXT_POCKETBASE_HOST || '',
    pocketbaseEmail: process.env.NUXT_POCKETBASE_EMAIL || '',
    pocketbasePassword: process.env.NUXT_POCKETBASE_PASSWORD || '',
    pocketbasePrefix: process.env.NUXT_POCKETBASE_PREFIX || '',
    public: {
      version: '1.0.2',
      pocketbaseHost: process.env.NUXT_POCKETBASE_HOST || '',
    },
  },
});
