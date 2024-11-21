// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@pinia/nuxt'],
  googleFonts: {
    families: {
      Oswald: [400, 700],
      'Open+Sans': true,
    },
    display: 'swap',
  },
})