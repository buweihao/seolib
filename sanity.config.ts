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
      .id("content-management")
      .title("内容管理")
      .items([
        S.listItem()
          .title("网站设置")
          .id("homepageSettings")
          .child(S.document().schemaType("homepageSettings").documentId("homepageSettings")),
        S.divider(),
        S.listItem()
          .title("关于我们 — 公司信息")
          .id("aboutPage")
          .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
        S.listItem()
          .title("关于我们 — 主推内容")
          .id("aboutRecommendation")
          .child(S.document().schemaType("aboutRecommendation").documentId("aboutRecommendation")),
        S.listItem()
          .title("关于我们 — 附加图片")
          .id("aboutImageGallery")
          .child(S.document().schemaType("aboutImageGallery").documentId("aboutImageGallery")),
        S.listItem()
          .title("关于我们 — 公司轮播")
          .id("aboutCompanyCarousel")
          .child(S.document().schemaType("aboutCompanyCarousel").documentId("aboutCompanyCarousel")),
        S.divider(),
        S.documentTypeListItem("product").title("产品"),
        S.documentTypeListItem("productCategory").title("产品分类"),
      ]),
  })],
  schema: { types: schemaTypes },
});
