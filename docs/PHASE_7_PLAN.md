# Phase 7 计划 — Five Base Pages

状态：已实施；Phase 7 新增条目已进入 `Review`，等待人工审核。

实施结果：已完成 4 个共享站点 sections、4 个内页 compositions、`SiteLayout.astro`、metadata 扩展、共享 neutral fixture data 与五个互联 review routes。首页复用 `LaunchHomepage-001`，三套已批准 homepage compositions 仅增加向后兼容的可选 `id` 以支持 skip-link 目标。未引入依赖、hydration、客户事实、CMS、部署或 Phase 8 配置 schema。

## 一、阶段目标

建立一套适用于中国护肤品、化妆品、private-label、OEM 与 ODM 制造商的五页基础信息架构，让不同成熟度的 B2B 买家可以完成四个核心任务：

1. 判断供应商方向是否与项目匹配；
2. 浏览可讨论的产品范围；
3. 核验制造、质量与合作能力；
4. 理解公司背景并进入准备充分的询盘路径。

Phase 7 验证的是跨页面结构和导航，不是某个真实客户网站。所有 review data 必须保持中性、虚构、可替换，不出现真实公司名称、地址、联系方式、认证、MOQ、交期、产能、设备、配方数量、市场或结果承诺。

## 二、五页信息架构

| 页面 | Review 路径 | 主要买家问题 | 计划内容顺序 |
| --- | --- | --- | --- |
| Home | `/library/base-site/` | 这类供应商是否值得继续评估，我下一步去哪里？ | 一套已 Approved homepage composition，由 fixture 明确选择；页面级主 CTA 指向 Contact |
| Products | `/library/base-site/products/` | 可以讨论哪些产品方向，如何缩小范围？ | Page Intro → Product Families → Evidence Feature → Inquiry CTA |
| Capabilities | `/library/base-site/capabilities/` | 从 brief 到交付可支持哪些阶段，如何核验？ | Page Intro → Capability Matrix → Quality Framework → Process Steps → Inquiry CTA |
| About | `/library/base-site/about/` | 团队、设施和工作方法是否足以建立信任？ | Page Intro → Facility Overview → Evidence Feature → Quality Framework → Inquiry CTA |
| Contact | `/library/base-site/contact/` | 应通过什么渠道联系，首次沟通准备什么？ | Page Intro → Contact Options |

选择 `Products` 而不是 ecommerce `Shop/Catalog`，选择 `Capabilities` 而不是含糊的 `Services`，以保持 B2B 评估语义。质量、流程与设施分别作为 Capabilities/About 的证据，不再增加顶级页面。Blog、认证中心、单个产品详情和 SEO landing pages 不属于本阶段。

内部 review 路径用于验证五页系统，不覆盖公开 `/` 基础页。Phase 8 在引入经过批准的客户配置后，才把相同 compositions 接到正式公开路由，避免在生产入口硬编码虚构公司数据。

## 三、导航与询盘旅程

全站主导航顺序固定为 `Home → Products → Capabilities → About → Contact`，但所有标签与 URL 通过 typed props 传入，不在组件中写死。Header 提供一个明确的 inquiry action；Footer 提供同一核心页面的冗余入口和联系动作，不增加没有对应页面的死链接。

三条主要旅程：

- **产品优先：** Home → Products → Capabilities → Contact
- **验证优先：** Home → Capabilities → About → Contact
- **准备询盘：** 任意页面 Inquiry CTA/Header action → Contact

每个页面必须提供当前位置：Header 当前项使用 `aria-current="page"`。跳至主内容的 skip link、可见 focus、稳定的页面标题和一致的 Contact 目的地共同保证键盘与辅助技术用户可以完成同一旅程。

移动导航优先使用原生 `<details>/<summary>`，不引入 hydration 或客户端菜单脚本。实现时必须检查展开状态、Escape/焦点预期、44px 目标和桌面断点；若原生方案无法满足验收标准，应暂停并修订计划，而不是临时加入框架。

## 四、已批准并直接复用的基础

Phase 7 直接复用全部必要的 Approved primitives/sections，以及三套 Approved homepage compositions：

- `Container-001`、`ActionLink-001`、`SectionHeading-001`、`MediaFrame-001`
- `StatementHero-001`、`ProofStrip-001`、`BuyerPathways-001`、`ProcessSteps-001`
- `EvidenceFeature-001`、`ProductFamilies-001`、`InquiryCTA-001`
- `FacilityOverview-001`、`CapabilityMatrix-001`、`QualityFramework-001`
- `PremiumHomepage-001`、`ManufacturingHomepage-001`、`LaunchHomepage-001`

不会创建 `ProductsGrid`、`AboutEvidence`、`CapabilitiesProcess` 等页面专属副本。Homepage 方向由 review fixture 显式选择；Phase 8 再把该选择移入 client configuration。

## 五、建议新增条目

### 5.1 `SiteHeader-001`

- 计划文件：`src/components/sections/SiteHeader.astro`
- 内容目的：提供站点身份、五页主导航、当前位置和主要询盘入口。
- 计划接口：`brand`、`homeHref`、typed navigation items、`currentPath`、可选 inquiry action、可选 utility text、可选 `class`。
- 边界：不内置公司名、页面标签、联系方式或 route；不实现 mega menu、搜索、语言切换、账户或 sticky 行为。

### 5.2 `SiteFooter-001`

- 计划文件：`src/components/sections/SiteFooter.astro`
- 内容目的：在页面末尾重复关键路径、说明站点身份并提供联系入口。
- 计划接口：`brand`、可选 description、typed link groups、可选 contact actions、copyright label、可选 `class`。
- 边界：不内置年份、地址、邮箱、社交链接、隐私/条款页面或 newsletter 表单。

### 5.3 `PageIntro-001`

- 计划文件：`src/components/sections/PageIntro.astro`
- 内容目的：用一个紧凑 h1 建立内页范围、买家问题和下一步，而不强制每个内页都使用大幅媒体 hero。
- 计划接口：`id`、可选 eyebrow、`title`、`description`、可选 primary/secondary actions、可选 breadcrumb items、可选 `class`。
- 边界：每页只使用一次；不包含媒体、证明数字、客户事实或 composition token。

### 5.4 `ContactOptions-001`

- 计划文件：`src/components/sections/ContactOptions.astro`
- 内容目的：解释可用联系渠道、每种渠道适合的请求，以及首次联系应准备的信息。
- 计划接口：section heading fields、typed contact options、preparation items、可选 follow-up note、可选 `class`。
- 边界：渠道值和链接全部由 props 提供；不实现表单、上传、邮件发送、WhatsApp API、CRM、响应时间或隐私同意逻辑。

### 5.5 四个内页 compositions

- `ProductsPage-001` → `src/components/compositions/ProductsPage.astro`
- `CapabilitiesPage-001` → `src/components/compositions/CapabilitiesPage.astro`
- `AboutPage-001` → `src/components/compositions/AboutPage.astro`
- `ContactPage-001` → `src/components/compositions/ContactPage.astro`

每个 composition 只从子组件接口推导 prop groups、固定批准的区段顺序并提供可选 `class`。它们不保存客户数据、不读取 URL/CMS、不决定 theme，也不复制 section 样式。Home 直接使用现有三套 homepage composition，因此不新增第四套 homepage。

## 六、站点壳层与 metadata

计划新增 `src/layouts/SiteLayout.astro` 作为应用基础设施，不登记为 buyer-facing library component。它负责：

- 扩展 `BaseLayout.astro` 的 title、description、可选 canonical、Open Graph 基础字段和 `noindex` 能力；
- 渲染 skip link、`SiteHeader-001`、单一 `<main id="main-content">` slot 与 `SiteFooter-001`；
- 接收当前路径和全部 shell props，不读取客户常量；
- 让 `/library/base-site/**` review routes 使用 `noindex`，避免内部虚构内容被索引。

Canonical 的真实 origin、社交分享图片和客户品牌字段在 Phase 8 提供。Phase 9 才处理 sitemap、schema、SEO landing pages 和规模化内部链接规则。

## 七、Review fixture 与媒体策略

- 创建五个互相可导航的 `/library/base-site/**` review routes；不覆盖 `/`。
- 使用同一组明确标注为 internal review 的中性英文 shell data，避免五个页面分别复制导航与联系事实。
- 内页仅在复用组件确有媒体输入时使用新的原创抽象 SVG；优先复用本仓库已有原创 review media，不引入第三方资产。
- 所有链接在构建产物中必须解析到现有 review route 或有效 `mailto:`/`tel:` 示例；不得留下 `#`、空 href 或假外部域名。
- 所有媒体提供固有尺寸与正确 alt；不引入 video、carousel、map、icon library 或客户端图片脚本。

## 八、批准后的实施顺序

1. 实现并单独验证 `SiteHeader-001`、`SiteFooter-001`、`PageIntro-001` 和 `ContactOptions-001`。
2. 扩展 `BaseLayout.astro` metadata 接口并新增 `SiteLayout.astro`，实现 skip link、header/main/footer landmarks。
3. 创建四个 typed inner-page compositions，只组合 Approved/new Review sections。
4. 创建五个互联 review routes 和共享 neutral fixture data；Home 使用一套已 Approved homepage composition。
5. 在 390px、768px、1440px 检查 header/footer、导航展开、页面节奏、内容密度、CTA 层级和横向溢出。
6. 逐页检查唯一 h1、连续 heading、landmarks、`aria-current`、skip link、键盘顺序、focus-visible、alt、metadata 与 noindex。
7. 抓取并检查所有内部链接，确认五页路径和 Inquiry CTA 无断链或循环式无意义动作。
8. 验证 Premium、Manufacturing、Launch 和全局 token 在 SiteLayout 中保持隔离。
9. 运行 `npm.cmd ci --include=optional`、`npm.cmd run check` 和 `npm.cmd run build`。
10. 更新 `COMPONENT_LIBRARY.md`、`DESIGN_SYSTEM.md`、`DECISIONS.md`、`ROADMAP.md` 和 README；通过检查的新条目进入 `Review`，然后停止等待人工审核。

## 九、明确不做

- 不覆盖公开 `/`，不接入真实客户内容或选择最终 homepage 方向
- 不定义 Phase 8 client configuration/content schema
- 不实现单个产品详情、分类路由、站内搜索、过滤、分页或下载中心
- 不实现询盘表单、上传、后端、邮件发送、WhatsApp API、CRM、聊天或地图
- 不引入 Sanity、内容集合、Cloudflare、GitHub 发布、部署或环境变量
- 不实现 blog、认证中心、案例、testimonials、newsletter、账户、购物车或支付
- 不引入 React、Vue、Svelte、动画库、图标包、外部字体或新增运行时依赖
- 不复制参考站点的导航、footer、页面结构、文案、品牌、媒体或视觉设计

`b2b-site-launcher` 的 CMS、Cloudflare 和发布流程在本阶段不启用，因为当前目标仍是共享库中的本地静态五页系统验证。

## 十、验收标准

- 五页 IA 与三条询盘旅程可通过真实内部链接完整走通。
- Home 复用已有 Approved composition；四个内页只组合 Approved/new Review shared sections。
- 所有新增组件有单一内容目的、typed public interface，且没有客户事实硬编码。
- 每页只有一个 h1；header/nav/main/footer landmarks、heading、list、address/contact 语义正确。
- 当前导航项、skip link、移动导航、键盘顺序和 focus-visible 可感知且可操作。
- 每个页面有唯一、描述性的 title/description；review routes 输出 `noindex`。
- 390px、768px、1440px 无横向溢出，导航和 CTA 在移动端保持清楚。
- 所有链接有有效目的地和可理解标签；主要交互目标达到 44px 或记录合理例外。
- 不含第三方受保护材料、unsupported claims、hydration 指令或不必要 JavaScript。
- clean install、`astro check` 与 production build 成功；构建产物包含五个 review routes。
- 新增条目进入 `Review` 后立即停止，不自动进入 Phase 8。

## 十一、批准边界

批准本计划仅授权：4 个新增 shared sections、4 个 inner-page compositions、`SiteLayout.astro`/必要 metadata 扩展、五个内部 review routes、共享 neutral fixture data、必要原创 review SVG 和文档更新。

任何公开 `/` 替换、真实客户数据、Phase 8 schema、CMS、表单/backend、产品详情、SEO landing page、部署、外部服务或新增依赖都需要另行批准。
