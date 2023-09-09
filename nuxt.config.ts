// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width" }],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap",
        },
        { rel: "icon", href: "/images/favicon-dark.svg", type: "image/svg+xml" },
      ],
    },
  },

  css: [
    "~/assets/styles/keyframes.scss",
    "~/assets/styles/global.scss",
    "~/assets/styles/variables.scss",
    "~/assets/styles/helper-classes.scss",
  ],
});
