// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap",
        },
        { rel: "icon", href: "/images/favicon-dark.svg", type: "image/svg+xml" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width" },

        { name: "theme-color", content: "#1b1b1b" },

        { property: "description", content: "A links shortener for links associated to or used by Omar Eloui." },

        { property: "og:title", content: "omareloui links" },
        { property: "og:description", content: "A links shortener for links associated to or used by Omar Eloui." },
        { property: "og:url", content: "https://links.omareloui.com" },
        { property: "og:type", content: "website" },
        { property: "og:site:name", content: "omar eloui links" },
        { property: "og:image", content: "/images/heading.png" },
        { property: "og:image:url", content: "/images/heading.png" },
        { property: "og:image:width", content: 1200 },
        { property: "og:image:height", content: 630 },
        { property: "og:image:alt", content: "Heading image of omar eloui links' site." },

        { property: "twitter:creator", content: "@omareloui" },
        { property: "twitter:title", content: "omareloui links" },
        {
          property: "twitter:description",
          content: "A links shortener for links associated to or used by Omar Eloui.",
        },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:image", content: "/images/heading.png" },
        { property: "twitter:image:alt", content: "Heading image of omar eloui links' site." },
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
