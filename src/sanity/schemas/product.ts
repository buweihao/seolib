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
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Product content", default: true },
    { name: "details", title: "Buyer details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4, group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "format", title: "Format", type: "string", group: "details", validation: (rule) => rule.required() }),
    defineField({ name: "routineRole", title: "Routine role", type: "string", group: "details", validation: (rule) => rule.required() }),
    stringList("highlights", "Product highlights"),
    stringList("customizationOptions", "Customization options"),
    stringList("packagingOptions", "Packaging options"),
    stringList("evaluationItems", "Evaluation before approval"),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 0, group: "content" }),
    defineField({ name: "locale", title: "Locale", type: "string", initialValue: "en", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "publicationStatus",
      title: "Website status",
      type: "string",
      initialValue: "published",
      group: "content",
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
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", category: "category.name", media: "mainImage" },
    prepare: ({ title, category, media }) => ({ title, subtitle: category, media }),
  },
});
