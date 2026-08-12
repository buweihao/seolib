# Phase 8 计划 — Client Configuration System

Implementation checkpoint: the first typed procurement-evidence configuration is implemented and in technical review on 2026-08-12.

## 一、输入与边界

本阶段以用户确认的结构清单为第一个客户配置输入：

- 方向：采购证据型；
- Hero：`RecognitionBackdropHero-001`；
- Products：`ProductFamilies-001`；
- Evidence：`ProofColumns-001`；
- Pathways：`BuyerPathways-001`；
- Quality：`QualityEvidenceMatrix-001`；
- Process：`ProcessSteps-001`；
- Facility：`FacilityGallery-001`；
- Inquiry：`SplitInquiry-001`；
- `FloatingTrustBar-001` 已关闭；
- `CommercialConditionsTable-001` 等待客户数据；
- `AuditProofHub-001` 延后决定；
- `VerifiedTestimonialCards-001` 不采用。

本阶段不虚构真实客户的公司名、联系方式、MOQ、交期、认证、产能、厂房或客户案例。缺失项保持 `pending` 并阻止发布模式。

## 二、架构

```text
ClientSiteConfig
├── identity / contact
├── theme
├── required pattern selection
├── optional pattern status
├── homepage content models
├── optional content
├── media rights registry
└── evidence registry
        ↓
validateClientSiteConfig
        ↓
ClientHomepage composition
        ↓
noindex review route or approved public route
```

`ClientHomepage-001` 只负责 Pattern 解析、顺序、主题 token 映射和 review 警告。它不复制 section 实现，也不保存客户事实。

## 三、发布安全

- `review` 模式允许 `pending`，但在页面顶部显示验证警告；
- `publish` 模式下，待核验身份、联系方式、证据或媒体权利会成为构建错误；
- 启用可选 Pattern 时必须同时提供对应内容；
- 未启用 Pattern 即使误放入内容，也会产生配置警告；
- 所有首页媒体必须在 media registry 中登记。

## 四、审核路由

`/library/client-previews/procurement-evidence/`

该客户配置现在提供五个始终 `noindex` 的审核路由：

- Home：`/library/client-previews/procurement-evidence/`
- Products：`/library/client-previews/procurement-evidence/products/`
- Capabilities：`/library/client-previews/procurement-evidence/capabilities/`
- About：`/library/client-previews/procurement-evidence/about/`
- Contact：`/library/client-previews/procurement-evidence/contact/`

五页共享客户身份、导航、页脚、主题、验证状态与媒体登记，并使用仓库原创 review SVG，不表示任何真实供应商。

## 五、验收标准

- 客户内容、联系方式、媒体、主题和 Pattern 选择完全离开共享组件；
- 用户选择的 8 个必选 Pattern 由强类型 ID 解析；
- Home 与四个内页都由同一份 `ClientSiteConfig` 提供路由和内容；
- 4 个特殊零件的状态与用户清单一致；
- 任何 `publish` 配置不能携带待核验客户事实；
- 390px、768px 和 1440px 布局无横向溢出；
- 页面保持一个 `main`、一个 h1、正确 section 标题、跳转链接和可见 focus；
- `astro check` 和静态生产构建通过。
