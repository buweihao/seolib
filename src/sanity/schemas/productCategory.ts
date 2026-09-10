import { defineField, defineType } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "产品分类",
  type: "document",
  fields: [
    defineField({ name: "name", title: "分类名称", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "网址别名（Slug）",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "分类简介",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "分类图片",
      type: "image",
      options: { hotspot: true, accept: "image/jpeg,image/png,image/webp,image/avif" },
      fields: [
        defineField({ name: "alt", title: "图片替代文字", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "显示顺序", type: "number", initialValue: 0 }),
    defineField({ name: "locale", title: "内容语言", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({
      name: "publicationStatus",
      title: "网站显示状态",
      type: "string",
      initialValue: "published",
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
  groups: [{ name: "seo", title: "搜索引擎优化（SEO）" }],
  orderings: [{ title: "按显示顺序", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "slug.current", media: "image" },
  },
});
