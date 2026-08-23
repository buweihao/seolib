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
  title: "网站内容管理后台",
  projectId,
  dataset,
  plugins: [structureTool({
    structure: (S) => S.list()
      .title("内容管理")
      .items([
        S.listItem()
          .title("网站设置")
          .id("homepageSettings")
          .child(S.document().schemaType("homepageSettings").documentId("homepageSettings")),
        S.divider(),
        S.documentTypeListItem("product").title("产品"),
        S.documentTypeListItem("productCategory").title("产品分类"),
      ]),
  })],
  schema: { types: schemaTypes },
});
