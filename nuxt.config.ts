// eslint-disable-next-line import/no-extraneous-dependencies, import/no-extraneous-dependencies
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  typescript: { shim: false, strict: true },

  meta: {
    title: "Nuxt 3 Template",

    meta: [
      { charset: "utf-8" },
      { name: "description", content: "Nuxt 3 starter template." },
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

      { rel: "preconnect", href: "https://fonts.googleapis.com" },

      // prettier-ignore
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true, },
      // prettier-ignore
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap", },
    ],
  },

  css: [
    "~/assets/styles/core/index.scss",
    "~/assets/styles/variables/index.scss",
    "~/assets/styles/base/index.scss",
    "~/assets/styles/utilities/index.scss",
  ],

  buildModules: ["@pinia/nuxt"],
});
