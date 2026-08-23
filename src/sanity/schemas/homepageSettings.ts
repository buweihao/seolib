import { defineArrayMember, defineField, defineType } from "sanity";

const isWebLink = (value: string | undefined) => {
  if (!value) return true;
  return value.startsWith("/") || value.startsWith("#") || /^https:\/\//i.test(value)
    ? true
    : "请输入站内路径（以 / 或 # 开头）或 HTTPS 完整网址";
};

export const homepageSettings = defineType({
  name: "homepageSettings",
  title: "网站设置",
  type: "document",
  groups: [
    { name: "identity", title: "公司信息", default: true },
    { name: "homepage", title: "首页 Hero" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "公司名称",
      description: "全站 Header、Footer 和页面配置统一使用此名称。",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "公司 Logo / 图标",
      description: "显示在页面左上角公司名称前面。建议上传透明背景的正方形 PNG 或 WebP 图片，不建议使用 SVG。",
      type: "image",
      group: "identity",
      options: { hotspot: true, accept: "image/jpeg,image/png,image/webp,image/avif" },
    }),
    defineField({
      name: "heroSlides",
      title: "Hero 轮播图",
      description: "每项使用一张横向大图。建议上传 1920 × 900 像素以上的 JPG、PNG、WebP 或 AVIF 图片；网站会自动生成适合不同屏幕的压缩版本。",
      type: "array",
      group: "homepage",
      validation: (rule) => rule.required().min(1).max(6),
      of: [
        defineArrayMember({
          name: "heroSlide",
          title: "Hero 图片",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "背景大图",
              type: "image",
              options: { hotspot: true, accept: "image/jpeg,image/png,image/webp,image/avif" },
              validation: (rule) => rule.required(),
              fields: [
                defineField({
                  name: "alt",
                  title: "图片替代文字",
                  description: "简要说明图片内容，供无障碍访问和图片加载失败时使用。纯装饰图可填写“品牌主视觉”。",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: "title",
              title: "中间文字（可留空）",
              description: "留空时，图片中央不显示文字。",
              type: "string",
            }),
            defineField({
              name: "buttonLabel",
              title: "按钮文字（可留空）",
              description: "留空时不显示按钮；即使不显示按钮，填写跳转链接后整张图片仍可点击。",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "点击图片跳转链接（可留空）",
              description: "支持站内路径，例如 /products/；也支持以 https:// 开头的完整网址。",
              type: "string",
              validation: (rule) => rule.custom(isWebLink),
            }),
          ],
          preview: {
            select: { title: "title", buttonLabel: "buttonLabel", media: "image" },
            prepare: ({ title, buttonLabel, media }) => ({
              title: title || "仅显示图片",
              subtitle: buttonLabel ? `按钮：${buttonLabel}` : "不显示按钮",
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { companyName: "companyName", media: "logo" },
    prepare: ({ companyName, media }) => ({ title: companyName || "网站设置", subtitle: "公司名称、Logo 与首页 Hero", media }),
  },
});
