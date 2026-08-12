import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL ?? "https://example.invalid";

export default defineConfig({
  output: "static",
  site,
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith("/library/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
