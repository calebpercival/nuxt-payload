// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: "%s",
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["@/assets/scss/main.scss"],
  modules: ["@nuxtjs/seo", "nuxt-gtag", "@nuxtjs/turnstile"],
  runtimeConfig: {
    public: {
      payloadUrl: process.env.NUXT_PAYLOAD_URL || "http://localhost:3000",
      payloadApiRoute: process.env.NUXT_PAYLOAD_API_ROUTE || "/payload-api",
    },
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    sendgridFrom: process.env.SENDGRID_FROM_EMAIL,
    sendgridTo: process.env.SENDGRID_TO_EMAIL,
    siteUrl: process.env.NUXT_SITE_URL,
    turnstile: {
      secretKey:
        process.env.NUXT_TURNSTILE_SECRET_KEY ||
        "1x0000000000000000000000000000000AA",
    },
    revalidationSecret: process.env.REVALIDATION_SECRET,
  },
  turnstile: {
    siteKey: process.env.NUXT_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
    addValidateEndpoint: false,
  },
  gtag: {
    id: process.env.GTAG || "",
    initCommands: [
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
  },
  site: {
    url: process.env.NUXT_SITE_URL || "http://localhost:3000",
    name: "nuxt site",
    trailingSlash: false,
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  components: {
    dirs: [
      {
        path: "~/components/Block",
        prefix: "Block",
        global: true,
      },
      "~/components",
    ],
  },
  nitro: {
    storage: {
      cache: process.env.REDIS_URL
        ? {
            driver: "redis",
            url: process.env.REDIS_URL,
          }
        : {
            driver: "memory",
          },
    },
  },
});
