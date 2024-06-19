// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/eslint'],
  devServer: {
    host: '0.0.0.0',
  },
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
