export type ComponentKind = "primitive" | "section" | "pattern" | "utility" | "composition";
export type ComponentStatus = "Approved" | "Review";

export interface ComponentRegistration {
  id: `${string}-001`;
  name: string;
  kind: ComponentKind;
  family: string;
  status: ComponentStatus;
  source: `src/components/${string}.astro`;
  reviewHref: `/library/${string}`;
  reviewMode: "isolated" | "in-context";
}

const png = "/library/patterns/png-derived/" as const;
const hero = "/library/patterns/hero/" as const;
const products = "/library/patterns/products/" as const;
const evidence = "/library/patterns/evidence/" as const;
const process = "/library/patterns/process/" as const;
const pathways = "/library/patterns/pathways/" as const;
const facility = "/library/patterns/facility/" as const;
const quality = "/library/patterns/quality/" as const;
const inquiry = "/library/patterns/inquiry/" as const;

export const componentRegistry = [
  { id: "Container-001", name: "Container", kind: "primitive", family: "Primitives", status: "Approved", source: "src/components/primitives/Container.astro", reviewHref: `${products}#ProductFamilies-001`, reviewMode: "in-context" },
  { id: "ActionLink-001", name: "Action Link", kind: "primitive", family: "Primitives", status: "Approved", source: "src/components/primitives/ActionLink.astro", reviewHref: `${hero}#StatementHero-001`, reviewMode: "in-context" },
  { id: "SectionHeading-001", name: "Section Heading", kind: "primitive", family: "Primitives", status: "Approved", source: "src/components/primitives/SectionHeading.astro", reviewHref: `${products}#ProductFamilies-001`, reviewMode: "in-context" },
  { id: "MediaFrame-001", name: "Media Frame", kind: "primitive", family: "Primitives", status: "Approved", source: "src/components/primitives/MediaFrame.astro", reviewHref: "/library/premium-homepage/", reviewMode: "in-context" },

  { id: "StatementHero-001", name: "Statement Hero", kind: "section", family: "Hero", status: "Approved", source: "src/components/sections/StatementHero.astro", reviewHref: `${hero}#StatementHero-001`, reviewMode: "isolated" },
  { id: "CenteredProofHero-001", name: "Centered Proof Hero", kind: "pattern", family: "Hero", status: "Review", source: "src/components/patterns/hero/CenteredProofHero.astro", reviewHref: `${hero}#CenteredProofHero-001`, reviewMode: "isolated" },
  { id: "ArcFactoryHero-001", name: "Arc Factory Hero", kind: "pattern", family: "Hero", status: "Review", source: "src/components/patterns/hero/ArcFactoryHero.astro", reviewHref: `${hero}#ArcFactoryHero-001`, reviewMode: "isolated" },
  { id: "RecognitionBackdropHero-001", name: "Full-image Carousel Hero", kind: "pattern", family: "Hero", status: "Approved", source: "src/components/patterns/hero/RecognitionBackdropHero.astro", reviewHref: `${hero}#RecognitionBackdropHero-001`, reviewMode: "isolated" },

  { id: "ProductFamilies-001", name: "Product Families", kind: "section", family: "Products", status: "Approved", source: "src/components/sections/ProductFamilies.astro", reviewHref: `${products}#ProductFamilies-001`, reviewMode: "isolated" },
  { id: "ProductMosaic-001", name: "Product Mosaic", kind: "pattern", family: "Products", status: "Review", source: "src/components/patterns/products/ProductMosaic.astro", reviewHref: `${products}#ProductMosaic-001`, reviewMode: "isolated" },
  { id: "ProductCategoryList-001", name: "Product Category List", kind: "pattern", family: "Products", status: "Approved", source: "src/components/patterns/products/ProductCategoryList.astro", reviewHref: `${products}#ProductCategoryList-001`, reviewMode: "isolated" },
  { id: "ProductCutoutShelf-001", name: "Product Cutout Shelf", kind: "pattern", family: "Products", status: "Review", source: "src/components/patterns/products/ProductCutoutShelf.astro", reviewHref: `${png}#ProductCutoutShelf-001`, reviewMode: "isolated" },
  { id: "GatedProductSpotlight-001", name: "Gated Product Spotlight", kind: "pattern", family: "Products", status: "Review", source: "src/components/patterns/products/GatedProductSpotlight.astro", reviewHref: `${png}#GatedProductSpotlight-001`, reviewMode: "isolated" },
  { id: "CategoryProductGrid-001", name: "Category Product Grid", kind: "section", family: "Products", status: "Review", source: "src/components/sections/CategoryProductGrid.astro", reviewHref: "/library/client-previews/procurement-evidence/products/facial-skincare/", reviewMode: "in-context" },
  { id: "ProductDetailProfile-001", name: "Product Detail Profile", kind: "section", family: "Products", status: "Review", source: "src/components/sections/ProductDetailProfile.astro", reviewHref: "/library/client-previews/procurement-evidence/products/facial-skincare/gentle-gel-cleanser/", reviewMode: "in-context" },
  { id: "ProductInquiryPanel-001", name: "Product Inquiry Panel", kind: "section", family: "Inquiry", status: "Review", source: "src/components/sections/ProductInquiryPanel.astro", reviewHref: "/library/client-previews/procurement-evidence/products/facial-skincare/gentle-gel-cleanser/", reviewMode: "in-context" },
  { id: "PageResourceRail-001", name: "Page Resource Rail", kind: "section", family: "Resources", status: "Review", source: "src/components/sections/PageResourceRail.astro", reviewHref: "/library/client-previews/procurement-evidence/capabilities/", reviewMode: "in-context" },
  { id: "CompanyFactMatrix-001", name: "Company Fact Matrix", kind: "section", family: "About", status: "Review", source: "src/components/sections/CompanyFactMatrix.astro", reviewHref: "/library/client-previews/procurement-evidence/about/", reviewMode: "in-context" },
  { id: "SamplingWorkflowCards-001", name: "Sampling Workflow Cards", kind: "section", family: "Process", status: "Review", source: "src/components/sections/SamplingWorkflowCards.astro", reviewHref: "/library/client-previews/procurement-evidence/capabilities/", reviewMode: "in-context" },

  { id: "EvidenceFeature-001", name: "Evidence Feature", kind: "section", family: "Evidence", status: "Approved", source: "src/components/sections/EvidenceFeature.astro", reviewHref: `${evidence}#EvidenceFeature-001`, reviewMode: "isolated" },
  { id: "ProofColumns-001", name: "Proof Columns", kind: "pattern", family: "Evidence", status: "Approved", source: "src/components/patterns/evidence/ProofColumns.astro", reviewHref: `${evidence}#ProofColumns-001`, reviewMode: "isolated" },
  { id: "VerifiedTestimonialCards-001", name: "Verified Testimonial Cards", kind: "pattern", family: "Evidence", status: "Review", source: "src/components/patterns/evidence/VerifiedTestimonialCards.astro", reviewHref: `${png}#VerifiedTestimonialCards-001`, reviewMode: "isolated" },
  { id: "ProofStrip-001", name: "Proof Strip", kind: "section", family: "Evidence", status: "Approved", source: "src/components/sections/ProofStrip.astro", reviewHref: "/library/premium-homepage/", reviewMode: "in-context" },

  { id: "ProcessSteps-001", name: "Process Steps", kind: "section", family: "Process", status: "Approved", source: "src/components/sections/ProcessSteps.astro", reviewHref: `${process}#ProcessSteps-001`, reviewMode: "isolated" },
  { id: "HorizontalProcess-001", name: "Horizontal Process", kind: "pattern", family: "Process", status: "Review", source: "src/components/patterns/process/HorizontalProcess.astro", reviewHref: `${process}#HorizontalProcess-001`, reviewMode: "isolated" },
  { id: "ProcessCards-001", name: "Process Cards", kind: "pattern", family: "Process", status: "Review", source: "src/components/patterns/process/ProcessCards.astro", reviewHref: `${process}#ProcessCards-001`, reviewMode: "isolated" },

  { id: "BuyerPathways-001", name: "Buyer Pathways", kind: "section", family: "Pathways", status: "Approved", source: "src/components/sections/BuyerPathways.astro", reviewHref: `${pathways}#BuyerPathways-001`, reviewMode: "isolated" },
  { id: "SplitPathways-001", name: "Split Pathways", kind: "pattern", family: "Pathways", status: "Review", source: "src/components/patterns/pathways/SplitPathways.astro", reviewHref: `${pathways}#SplitPathways-001`, reviewMode: "isolated" },
  { id: "BuyerTypeMatrix-001", name: "Buyer Type Matrix", kind: "pattern", family: "Audience", status: "Review", source: "src/components/patterns/audience/BuyerTypeMatrix.astro", reviewHref: `${png}#BuyerTypeMatrix-001`, reviewMode: "isolated" },

  { id: "FacilityOverview-001", name: "Facility Overview", kind: "section", family: "Facility", status: "Approved", source: "src/components/sections/FacilityOverview.astro", reviewHref: `${facility}#FacilityOverview-001`, reviewMode: "isolated" },
  { id: "FacilityGallery-001", name: "Facility Gallery", kind: "pattern", family: "Facility", status: "Approved", source: "src/components/patterns/facility/FacilityGallery.astro", reviewHref: `${facility}#FacilityGallery-001`, reviewMode: "isolated" },

  { id: "QualityFramework-001", name: "Quality Framework", kind: "section", family: "Quality", status: "Approved", source: "src/components/sections/QualityFramework.astro", reviewHref: `${quality}#QualityFramework-001`, reviewMode: "isolated" },
  { id: "QualityEvidenceMatrix-001", name: "Quality Evidence Matrix", kind: "pattern", family: "Quality", status: "Approved", source: "src/components/patterns/quality/QualityEvidenceMatrix.astro", reviewHref: `${quality}#QualityEvidenceMatrix-001`, reviewMode: "isolated" },
  { id: "CapabilityMatrix-001", name: "Capability Matrix", kind: "section", family: "Capabilities", status: "Approved", source: "src/components/sections/CapabilityMatrix.astro", reviewHref: "/library/manufacturing-homepage/", reviewMode: "in-context" },

  { id: "InquiryCTA-001", name: "Inquiry CTA", kind: "section", family: "Inquiry", status: "Approved", source: "src/components/sections/InquiryCTA.astro", reviewHref: `${inquiry}#InquiryCTA-001`, reviewMode: "isolated" },
  { id: "SplitInquiry-001", name: "Split Inquiry", kind: "pattern", family: "Inquiry", status: "Approved", source: "src/components/patterns/inquiry/SplitInquiry.astro", reviewHref: `${inquiry}#SplitInquiry-001`, reviewMode: "isolated" },
  { id: "FloatingInquiryPanel-001", name: "Floating Inquiry Panel", kind: "pattern", family: "Inquiry", status: "Review", source: "src/components/patterns/inquiry/FloatingInquiryPanel.astro", reviewHref: `${inquiry}#FloatingInquiryPanel-001`, reviewMode: "isolated" },
  { id: "FloatingContactBar-001", name: "Floating Contact Bar", kind: "pattern", family: "Inquiry", status: "Approved", source: "src/components/patterns/inquiry/FloatingContactBar.astro", reviewHref: `${inquiry}#FloatingContactBar-001`, reviewMode: "isolated" },
  { id: "ContactWorkspace-001", name: "Contact Workspace", kind: "pattern", family: "Inquiry", status: "Approved", source: "src/components/patterns/inquiry/ContactWorkspace.astro", reviewHref: `${inquiry}#ContactWorkspace-001`, reviewMode: "isolated" },
  { id: "StructuredRequestForm-001", name: "Structured Request Form", kind: "pattern", family: "Inquiry", status: "Review", source: "src/components/patterns/inquiry/StructuredRequestForm.astro", reviewHref: `${inquiry}#StructuredRequestForm-001`, reviewMode: "isolated" },
  { id: "GuidedProjectInquiry-001", name: "Guided Project Inquiry", kind: "pattern", family: "Inquiry", status: "Review", source: "src/components/patterns/inquiry/GuidedProjectInquiry.astro", reviewHref: `${inquiry}#GuidedProjectInquiry-001`, reviewMode: "isolated" },
  { id: "OfficeResourceContact-001", name: "Office Resource Contact", kind: "pattern", family: "Inquiry", status: "Review", source: "src/components/patterns/inquiry/OfficeResourceContact.astro", reviewHref: `${inquiry}#OfficeResourceContact-001`, reviewMode: "isolated" },
  { id: "ContactFAQ-001", name: "Contact FAQ", kind: "pattern", family: "Inquiry", status: "Review", source: "src/components/patterns/inquiry/ContactFAQ.astro", reviewHref: `${inquiry}#ContactFAQ-001`, reviewMode: "isolated" },
  { id: "ConfigurableForm-001", name: "Configurable Form", kind: "utility", family: "Inquiry", status: "Review", source: "src/components/inquiry/ConfigurableForm.astro", reviewHref: `${inquiry}#StructuredRequestForm-001`, reviewMode: "in-context" },
  { id: "InquiryForm-001", name: "Inquiry Form", kind: "utility", family: "Inquiry", status: "Review", source: "src/components/inquiry/InquiryForm.astro", reviewHref: `${inquiry}#InquiryForm-001`, reviewMode: "isolated" },
  { id: "ContactOptions-001", name: "Contact Options", kind: "section", family: "Inquiry", status: "Review", source: "src/components/sections/ContactOptions.astro", reviewHref: "/library/base-site/contact/", reviewMode: "in-context" },

  { id: "FloatingTrustBar-001", name: "Floating Trust Bar", kind: "pattern", family: "Proof", status: "Approved", source: "src/components/patterns/proof/FloatingTrustBar.astro", reviewHref: `${png}#FloatingTrustBar-001`, reviewMode: "isolated" },
  { id: "StandardsProofRow-001", name: "Standards Proof Row", kind: "pattern", family: "Proof", status: "Review", source: "src/components/patterns/proof/StandardsProofRow.astro", reviewHref: `${png}#StandardsProofRow-001`, reviewMode: "isolated" },
  { id: "CommercialConditionsTable-001", name: "Commercial Conditions Table", kind: "pattern", family: "Commercial", status: "Review", source: "src/components/patterns/commercial/CommercialConditionsTable.astro", reviewHref: `${png}#CommercialConditionsTable-001`, reviewMode: "isolated" },
  { id: "ServiceChapterAccordion-001", name: "Service Chapter Accordion", kind: "pattern", family: "Services", status: "Review", source: "src/components/patterns/services/ServiceChapterAccordion.astro", reviewHref: `${png}#ServiceChapterAccordion-001`, reviewMode: "isolated" },
  { id: "ServiceMarquee-001", name: "Service Marquee", kind: "pattern", family: "Navigation", status: "Review", source: "src/components/patterns/navigation/ServiceMarquee.astro", reviewHref: `${png}#ServiceMarquee-001`, reviewMode: "isolated" },
  { id: "NavigationDropdown-001", name: "Navigation Dropdown", kind: "pattern", family: "Navigation", status: "Approved", source: "src/components/patterns/navigation/NavigationDropdown.astro", reviewHref: "/library/patterns/navigation/#NavigationDropdown-001", reviewMode: "isolated" },
  { id: "ImmersiveMediaStage-001", name: "Immersive Media Stage", kind: "pattern", family: "Media", status: "Review", source: "src/components/patterns/media/ImmersiveMediaStage.astro", reviewHref: `${png}#ImmersiveMediaStage-001`, reviewMode: "isolated" },
  { id: "DualMediaRoutes-001", name: "Dual Media Routes", kind: "pattern", family: "Media", status: "Review", source: "src/components/patterns/media/DualMediaRoutes.astro", reviewHref: `${png}#DualMediaRoutes-001`, reviewMode: "isolated" },
  { id: "PrinciplesLedger-001", name: "Principles Ledger", kind: "pattern", family: "Story", status: "Review", source: "src/components/patterns/story/PrinciplesLedger.astro", reviewHref: `${png}#PrinciplesLedger-001`, reviewMode: "isolated" },
  { id: "CompanyTimeline-001", name: "Company Timeline", kind: "pattern", family: "Story", status: "Review", source: "src/components/patterns/story/CompanyTimeline.astro", reviewHref: `${png}#CompanyTimeline-001`, reviewMode: "isolated" },
  { id: "AuditProofHub-001", name: "Audit Proof Hub", kind: "pattern", family: "Resources", status: "Review", source: "src/components/patterns/resources/AuditProofHub.astro", reviewHref: `${png}#AuditProofHub-001`, reviewMode: "isolated" },
  { id: "ResourceConversionPanel-001", name: "Resource Conversion Panel", kind: "pattern", family: "Resources", status: "Review", source: "src/components/patterns/resources/ResourceConversionPanel.astro", reviewHref: `${png}#ResourceConversionPanel-001`, reviewMode: "isolated" },

  { id: "SiteHeader-001", name: "Site Header", kind: "section", family: "Site shell", status: "Review", source: "src/components/sections/SiteHeader.astro", reviewHref: "/library/base-site/", reviewMode: "in-context" },
  { id: "SiteFooter-001", name: "Site Footer", kind: "section", family: "Site shell", status: "Review", source: "src/components/sections/SiteFooter.astro", reviewHref: "/library/base-site/", reviewMode: "in-context" },
  { id: "PageIntro-001", name: "Page Intro", kind: "section", family: "Inner pages", status: "Review", source: "src/components/sections/PageIntro.astro", reviewHref: "/library/base-site/products/", reviewMode: "in-context" },

  { id: "PremiumHomepage-001", name: "Premium Homepage", kind: "composition", family: "Compositions", status: "Approved", source: "src/components/compositions/PremiumHomepage.astro", reviewHref: "/library/premium-homepage/", reviewMode: "in-context" },
  { id: "ManufacturingHomepage-001", name: "Manufacturing Homepage", kind: "composition", family: "Compositions", status: "Approved", source: "src/components/compositions/ManufacturingHomepage.astro", reviewHref: "/library/manufacturing-homepage/", reviewMode: "in-context" },
  { id: "LaunchHomepage-001", name: "Launch Homepage", kind: "composition", family: "Compositions", status: "Approved", source: "src/components/compositions/LaunchHomepage.astro", reviewHref: "/library/launch-homepage/", reviewMode: "in-context" },
  { id: "FlexibleHomepage-001", name: "Flexible Homepage", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/FlexibleHomepage.astro", reviewHref: "/library/patterns/compositions/", reviewMode: "in-context" },
  { id: "ClientHomepage-001", name: "Client Homepage", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/ClientHomepage.astro", reviewHref: "/library/client-previews/procurement-evidence/", reviewMode: "in-context" },
  { id: "ProductsPage-001", name: "Products Page", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/ProductsPage.astro", reviewHref: "/library/base-site/products/", reviewMode: "in-context" },
  { id: "CategoryProductsPage-001", name: "Category Products Page", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/CategoryProductsPage.astro", reviewHref: "/library/client-previews/procurement-evidence/products/facial-skincare/", reviewMode: "in-context" },
  { id: "ProductDetailPage-001", name: "Product Detail Page", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/ProductDetailPage.astro", reviewHref: "/library/client-previews/procurement-evidence/products/facial-skincare/gentle-gel-cleanser/", reviewMode: "in-context" },
  { id: "CapabilitiesPage-001", name: "Capabilities Page", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/CapabilitiesPage.astro", reviewHref: "/library/base-site/capabilities/", reviewMode: "in-context" },
  { id: "AboutPage-001", name: "About Page", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/AboutPage.astro", reviewHref: "/library/base-site/about/", reviewMode: "in-context" },
  { id: "ContactPage-001", name: "Contact Page", kind: "composition", family: "Compositions", status: "Review", source: "src/components/compositions/ContactPage.astro", reviewHref: "/library/base-site/contact/", reviewMode: "in-context" },
] as const satisfies readonly ComponentRegistration[];

export type ComponentId = typeof componentRegistry[number]["id"];

export const componentChineseNames: Record<ComponentId, string> = {
  "Container-001": "内容容器", "ActionLink-001": "行动链接", "SectionHeading-001": "章节标题", "MediaFrame-001": "媒体框架",
  "StatementHero-001": "主张式双栏首屏", "CenteredProofHero-001": "居中证明首屏", "ArcFactoryHero-001": "弧形工厂全景首屏", "RecognitionBackdropHero-001": "认可证据拼贴首屏",
  "ProductFamilies-001": "等权产品分类卡", "ProductMosaic-001": "产品图片拼贴", "ProductCategoryList-001": "产品分类目录", "ProductCutoutShelf-001": "产品剪影货架", "GatedProductSpotlight-001": "受控产品聚焦展示", "CategoryProductGrid-001": "分类产品网格", "ProductDetailProfile-001": "产品详情资料区", "ProductInquiryPanel-001": "产品询盘行动区", "PageResourceRail-001": "页面资源路线栏",
  "EvidenceFeature-001": "媒体分栏证据", "ProofColumns-001": "证明信息列", "VerifiedTestimonialCards-001": "已核验客户评价卡", "ProofStrip-001": "证明摘要条",
  "CompanyFactMatrix-001": "公司事实矩阵", "SamplingWorkflowCards-001": "采样评估流程卡",
  "ProcessSteps-001": "纵向责任流程", "HorizontalProcess-001": "横向时间流程", "ProcessCards-001": "流程阶段卡片",
  "BuyerPathways-001": "合作路线卡片", "SplitPathways-001": "分区合作路线", "BuyerTypeMatrix-001": "买家类型矩阵",
  "FacilityOverview-001": "工厂设施总览", "FacilityGallery-001": "工厂设施图库",
  "QualityFramework-001": "质量检查点", "QualityEvidenceMatrix-001": "质量证据矩阵", "CapabilityMatrix-001": "能力责任矩阵",
  "InquiryCTA-001": "深色询盘行动区", "SplitInquiry-001": "分栏询盘准备区", "FloatingInquiryPanel-001": "悬浮询盘面板", "FloatingContactBar-001": "悬浮联系栏", "ContactWorkspace-001": "联系信息与表单工作区", "StructuredRequestForm-001": "结构化请求表单", "GuidedProjectInquiry-001": "分步项目询盘", "OfficeResourceContact-001": "办公室与资料联系区", "ContactFAQ-001": "联系页常见问题", "ConfigurableForm-001": "可配置表单字段组", "InquiryForm-001": "安全项目询盘表单", "ContactOptions-001": "联系方式选项",
  "FloatingTrustBar-001": "悬浮信任证明条", "StandardsProofRow-001": "标准证明横排", "CommercialConditionsTable-001": "商业条件表",
  "ServiceChapterAccordion-001": "服务章节折叠面板", "ServiceMarquee-001": "服务关键词跑马灯", "NavigationDropdown-001": "导航下拉面板",
  "ImmersiveMediaStage-001": "沉浸式媒体舞台", "DualMediaRoutes-001": "双媒体路线入口",
  "PrinciplesLedger-001": "企业原则台账", "CompanyTimeline-001": "公司发展时间线", "AuditProofHub-001": "审核证明中心", "ResourceConversionPanel-001": "资源转化面板",
  "SiteHeader-001": "网站页眉", "SiteFooter-001": "网站页脚", "PageIntro-001": "内页引导区",
  "PremiumHomepage-001": "高端品牌首页组合", "ManufacturingHomepage-001": "制造能力首页组合", "LaunchHomepage-001": "新品启动首页组合", "FlexibleHomepage-001": "灵活模式首页组合", "ClientHomepage-001": "客户配置首页组合",
  "ProductsPage-001": "产品分类入口页组合", "CategoryProductsPage-001": "分类产品列表页组合", "ProductDetailPage-001": "产品详情页组合", "CapabilitiesPage-001": "能力内页组合", "AboutPage-001": "关于我们内页组合", "ContactPage-001": "联系内页组合",
};

export const componentRegistrationById = new Map<ComponentId, typeof componentRegistry[number]>(
  componentRegistry.map((entry) => [entry.id, entry]),
);

export const getComponentRegistration = (id: ComponentId) => componentRegistrationById.get(id)!;
