// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "~/assets/styles/keyframes.scss",
    "~/assets/styles/global.scss",
    "~/assets/styles/variables.scss",
    "~/assets/styles/helper-classes.scss",
  ],
});
