import { defineArrayMember, defineField, defineType } from "sanity";

const imageMember = (withAlt = true) =>
  defineArrayMember({
    type: "image",
    options: { hotspot: true, accept: "image/jpeg,image/png,image/webp,image/avif" },
    ...(withAlt
      ? {
          fields: [
            defineField({
              name: "alt",
              title: "图片替代文字（Alt）",
              type: "string",
              description: "简要描述图片内容，供无障碍访问使用。",
            }),
          ],
        }
      : {}),
  });

export const aboutPage = defineType({
  name: "aboutPage",
  title: "关于我们 — 公司信息",
  type: "document",
  fields: [
    defineField({
      name: "companyVideo",
      title: "公司视频",
      type: "file",
      options: { accept: "video/mp4,video/webm,video/quicktime" },
      description: "上传 MP4、WebM 或 MOV 格式的视频；未上传时页面保留占位区域。",
    }),
    defineField({
      name: "companyImages",
      title: "公司图片",
      type: "array",
      description: "前台按 4 图布局使用：第 3 张为左侧大图，第 1、2、4 张为右侧图片。",
      of: [imageMember(true)],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "companyDescription",
      title: "Company description",
      type: "text",
      rows: 6,
    }),
  ],
  preview: {
    prepare: () => ({
      title: "关于我们 — 公司信息",
      subtitle: "视频、公司介绍与公司图片",
    }),
  },
});

export const aboutRecommendation = defineType({
  name: "aboutRecommendation",
  title: "关于我们 — 主推内容",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "主推内容项目",
      type: "array",
      description: "最多添加 9 项；前台按三列瀑布流展示。",
      of: [
        defineArrayMember({
          name: "recommendationItem",
          title: "图片＋文字",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "图片",
              type: "image",
              options: { hotspot: true, accept: "image/jpeg,image/png,image/webp,image/avif" },
              validation: (rule) => rule.required(),
              fields: [
                defineField({ name: "alt", title: "图片替代文字（Alt）", type: "string" }),
              ],
            }),
            defineField({
              name: "text",
              title: "Caption (optional)",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(9),
    }),
  ],
  preview: {
    prepare: () => ({
      title: "关于我们 — 主推内容",
      subtitle: "最多 9 个图片卡片",
    }),
  },
});

export const aboutImageGallery = defineType({
  name: "aboutImageGallery",
  title: "关于我们 — 附加图片",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "通栏图片",
      type: "array",
      description: "按顺序上传图片；每张图片单独占一行。",
      of: [imageMember(true)],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "关于我们 — 附加图片",
      subtitle: "通栏图片区域",
    }),
  },
});

export const aboutCompanyCarousel = defineType({
  name: "aboutCompanyCarousel",
  title: "关于我们 — 公司轮播",
  type: "document",
  fields: [
    defineField({
      name: "subtitle",
      title: "Carousel subtitle (optional)",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "轮播图片",
      type: "array",
      description: "按顺序上传图片；列表为空时前台不显示轮播。",
      of: [imageMember(true)],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "关于我们 — 公司轮播",
      subtitle: "页面底部的响应式图片轮播",
    }),
  },
});
