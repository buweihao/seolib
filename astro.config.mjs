import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import { fileURLToPath } from "node:url";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
const site = env.SITE_URL || "https://example.invalid";
const projectId = env.PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = env.PUBLIC_SANITY_DATASET?.trim() || "production";
const apiVersion = env.PUBLIC_SANITY_API_VERSION?.trim() || "2026-08-01";
const sanityEntry = fileURLToPath(new URL("./node_modules/sanity/lib/index.js", import.meta.url));
const styledComponentsEntry = fileURLToPath(
  new URL("./node_modules/styled-components/dist/styled-components.esm.js", import.meta.url),
);
const syncExternalStoreShimEntry = fileURLToPath(
  new URL("./src/lib/sanity-dev-use-sync-external-store-shim.ts", import.meta.url),
);

const sanityDevEntryAlias = {
  name: "sanity-dev-entry-alias",
  apply: "serve",
  enforce: "post",
  config() {
    return {
      resolve: {
        alias: [
          { find: /^sanity$/, replacement: sanityEntry },
          { find: /^styled-components$/, replacement: styledComponentsEntry },
          {
            find: /^use-sync-external-store\/shim(?:\/index\.js)?$/,
            replacement: syncExternalStoreShimEntry,
          },
        ],
      },
    };
  },
};

export default defineConfig({
  output: "static",
  site,
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith("/library/"),
    }),
    ...(projectId
      ? [
          sanity({
            projectId,
            dataset,
            apiVersion,
            useCdn: false,
            studioBasePath: "/admin",
            studioRouterHistory: "hash",
          }),
          react(),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss(), sanityDevEntryAlias],
    server: {
      headers: {
        "Cache-Control": "no-store",
      },
    },
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
        "use-sync-external-store/shim",
        "use-sync-external-store/shim/with-selector",
        "debug",
      ],
    },
  },
});
