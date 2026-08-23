import { defineArrayMember, defineField, defineType } from "sanity";

const stringList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    group: "details",
    of: [defineArrayMember({ type: "string" })],
    options: { layout: "list" },
  });

export const product = defineType({
  name: "product",
  title: "产品",
  type: "document",
  groups: [
    { name: "content", title: "产品内容", default: true },
    { name: "details", title: "采购信息" },
    { name: "seo", title: "搜索引擎优化（SEO）" },
  ],
  fields: [
    defineField({ name: "name", title: "产品名称", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "网址别名（Slug）",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "产品分类",
      type: "reference",
      to: [{ type: "productCategory" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", title: "产品简介", type: "text", rows: 4, group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "mainImage",
      title: "产品主图",
      type: "image",
      group: "content",
      options: { hotspot: true, accept: "image/jpeg,image/png,image/webp,image/avif" },
      fields: [
        defineField({ name: "alt", title: "图片替代文字", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "format", title: "产品剂型", type: "string", group: "details", validation: (rule) => rule.required() }),
    defineField({ name: "routineRole", title: "护肤步骤", type: "string", group: "details", validation: (rule) => rule.required() }),
    stringList("highlights", "产品亮点"),
    stringList("customizationOptions", "可定制内容"),
    stringList("packagingOptions", "包装选择"),
    stringList("evaluationItems", "确认前评估项目"),
    defineField({ name: "isHot", title: "设为 Hot 产品", description: "开启后，此产品会显示在首页 Hero 下方的 Hot Products 区域。", type: "boolean", initialValue: false, group: "content" }),
    defineField({ name: "order", title: "显示顺序", type: "number", initialValue: 0, group: "content" }),
    defineField({ name: "locale", title: "内容语言", type: "string", initialValue: "en", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "publicationStatus",
      title: "网站显示状态",
      type: "string",
      initialValue: "published",
      group: "content",
      options: {
        layout: "radio",
        list: [
          { title: "已发布", value: "published" },
          { title: "审核中", value: "review" },
          { title: "草稿", value: "draft" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seoTitle", title: "SEO 标题", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO 描述", type: "text", rows: 3, group: "seo" }),
  ],
  orderings: [{ title: "按显示顺序", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", category: "category.name", media: "mainImage" },
    prepare: ({ title, category, media }) => ({ title, subtitle: category, media }),
  },
});
