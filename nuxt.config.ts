// eslint-disable-next-line import/no-extraneous-dependencies, import/no-extraneous-dependencies
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  typescript: { shim: false, strict: true },

  meta: {
    title: "Links | Omar Eloui",

    meta: [
      { charset: "utf-8" },
      { name: "description", content: "A links shortener for Omar Eloui." },

      { name: "theme-color", content: "#5216d1" },

      // { property: "og:url", content: "https://l.omareloui.com" },
      { property: "og:title", content: "Links | Omar Eloui" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Links | Omar Eloui" },
      {
        property: "og:description",
        content: "A links shortener for Omar Eloui.",
      },

      { property: "og:image", content: "/images/heading.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "640" },

      {
        property: "og:update_time",
        content: Math.floor(Number(new Date()) / 1000),
      },

      { name: "twitter:card", content: "summary_large_image" },
      // { property: "twitter:domain", content: "l.omareloui.com" },
      // { property: "twitter:url", content: "https://l.omareloui.com" },
      { name: "twitter:title", content: "Links | Omar Eloui" },
      {
        name: "twitter:description",
        content: "A links shortener for Omar Eloui.",
      },
      { name: "twitter:image", content: "/images/heading.png" },
    ],

    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/images/icons/logo_x16.png",
        size: "16x16",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/images/icons/logo_x32.png",
        size: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/images/icons/logo_x96.png",
        size: "96x96",
      },

      { rel: "preconnect", href: "https://fonts.googleapis.com" },

      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
      },

      {
        hid: "apple-touch-icon",
        rel: "apple-touch-icon",
        href: "/images/icons/logo_x180.png",
      },
      { rel: "apple-mobile-web-app-status-bar", content: "#5216d1" },

      { rel: "manifest", href: "/site.webmanifest" },
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
