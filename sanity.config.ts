import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("PUBLIC_SANITY_PROJECT_ID is required to load the embedded Sanity Studio.");
}

export default defineConfig({
  name: "b2b-skincare-catalogue",
  title: "Product catalogue",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
