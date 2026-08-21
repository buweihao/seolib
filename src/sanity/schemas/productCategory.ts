import { defineField, defineType } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product category",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Category image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0 }),
    defineField({ name: "locale", title: "Locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({
      name: "publicationStatus",
      title: "Website status",
      type: "string",
      initialValue: "published",
      options: {
        layout: "radio",
        list: [
          { title: "Published", value: "published" },
          { title: "Review", value: "review" },
          { title: "Draft", value: "draft" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, group: "seo" }),
  ],
  groups: [{ name: "seo", title: "SEO" }],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "slug.current", media: "image" },
  },
});
