// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  css: ['~/assets/main.scss', 'primeflex/primeflex.css'],
  eslint: {
    config: {
      stylistic: {
        semi: false,
        indent: 2,
        quotes: 'single',
        flat: true,
        blockSpacing: true,
      },
    },
  },
})
