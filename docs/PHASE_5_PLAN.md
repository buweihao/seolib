# Phase 5 计划 — Manufacturing Homepage

状态：已完成；`ManufacturingHomepage-001` 与本阶段新增组件已于 2026-08-10 通过人工审核并获准复用。

实施结果：批准范围内的 3 个共享 section、1 个 composition、5 个原创 review SVG 与独立 fixture 均已完成。390px、768px、1440px 视觉与响应式检查、信息密度、语义、键盘、媒体、对比度、控制台和 Token 隔离检查，以及 `astro check` 与静态生产构建均通过，并已获得人工批准。

## 一、Phase 4 与 Phase 5 的区别

Phase 4 规划并验证的是 **Premium Homepage composition**：它强调宽松、编辑感、科学可信、克制和高端，通过留白、叙事节奏、原创抽象媒体与局部 Token 映射，证明共享组件可以形成偏品牌与研发表达的首页。

Phase 5 规划的是 **Manufacturing Homepage composition**：它强调可信、能力明确、专业、层级清楚，通过工厂验证、制造能力、产品范围、质量控制、合作路径和双方责任，帮助采购方判断“这家供应商是否真实、适配、可审计、可执行”。

两者不是两个独立网站模板，也不复制两套组件。它们共享结构组件，只在内容顺序、信息密度和 composition 级 Token 映射上形成差异。

## 二、阶段目标

在不复制参考站点、不建立客户专属组件、不开始 Launch 方向或正式多页面网站的前提下，完成第一套可复用的 Manufacturing Homepage composition。

本阶段验证的不是某个真实工厂网站，而是共享组件库能否组合出一种“可信、能力明确、专业、采购友好、层级清楚”的 B2B 护肤品制造商首页方向。Review fixture 继续使用中性、虚构、可替换的数据，不出现真实公司名称、认证、MOQ、交期、产能、厂房面积、设备数量、配方数量、出口市场或响应时间承诺。

## 三、已批准并直接复用的基础

Phase 5 直接复用以下 Approved 组件，不创建 Manufacturing 专属副本：

- `Container-001`
- `ActionLink-001`
- `SectionHeading-001`
- `MediaFrame-001`
- `StatementHero-001`
- `ProofStrip-001`
- `EvidenceFeature-001`
- `ProductFamilies-001`
- `BuyerPathways-001`
- `ProcessSteps-001`
- `InquiryCTA-001`

这些组件通过 props、排列顺序和 Manufacturing composition 的 Token 作用域改变表达。不得复制为 `ManufacturingHero`、`FactoryProofStrip`、`ManufacturingProcessSteps` 等平行实现。

## 四、参考依据与原创性边界

- **Laeyo：** 工厂验证、买家类型、合作模式、MOQ/交期透明度、采样责任、能力与审计证据；只提取采购问题和信息层级。
- **Vitelle：** 团队、设施、产品集合和私标流程之间的信任递进；只提取“实体证据先于流程承诺”的原则。
- **Romano：** 服务路径、产品范围、实验室/质量证据和 concept-to-shelf 流程；不采用其具体声明、指标或视觉系统。
- **RainShadow Labs：** 早期区分现货、私标和定制路径；不引入商城、融资或消费电商逻辑。
- **YG Laboratories：** 紧凑的实验室经验表达；不使用未经验证的历史或科学声明。

所有实现必须使用原创结构、原创 CSS 和原创 review media。参考图片、产品包装、logo、认证图标、文案、完整布局和公司事实不得进入生产源码。

## 五、建议新增范围

Phase 5 不新增 primitive，只建议新增 3 个跨方向可复用的 section 和 1 个 composition。

### 5.1 `FacilityOverview-001`

- 计划文件：`src/components/sections/FacilityOverview.astro`
- 内容目的：说明产品在哪里、通过哪些生产区域或协作环节完成，以及买家可以如何验证。
- 买家问题：工厂是否真实？哪些区域与我的项目有关？我能看到什么证据？
- 计划接口：section heading 字段、媒体配置、二至六个 facility area、可选 verification note、最多两个验证动作。
- 边界：不内置厂房面积、设备数量、洁净级别、地址、认证或参观承诺。

### 5.2 `CapabilityMatrix-001`

- 计划文件：`src/components/sections/CapabilityMatrix.astro`
- 内容目的：将研发、打样、生产、灌装、包装或交付等能力组织成可比较、可验证的信息结构。
- 买家问题：供应商能覆盖哪些阶段？每个阶段需要我提供什么，会产出什么？
- 计划接口：section heading 字段、三至八个 capability item；每项包含名称、范围说明、可选 buyer input、supplier output 和 evidence note。
- 边界：不硬编码工艺、配方数量、批量范围、产能、交期或设备清单；是否使用表格语义由实施时的响应式验证决定。

### 5.3 `QualityFramework-001`

- 计划文件：`src/components/sections/QualityFramework.astro`
- 内容目的：解释质量检查发生在哪些阶段、控制什么风险、可以提供哪类记录。
- 买家问题：质量如何被控制？哪些记录可以在下单前或生产过程中核验？
- 计划接口：section heading 字段、三至六个 checkpoint；每项包含阶段、控制目的、可选 evidence type；可选 verification action。
- 边界：只表达质量框架，不声称持有 GMP、ISO、FDA、ECOCERT 或任何具体认证，不捆绑认证 logo。

### 5.4 `ManufacturingHomepage-001`

- 计划文件：`src/components/compositions/ManufacturingHomepage.astro`
- 类别：Composition
- 内容目的：接收结构化 section props，按批准顺序组合共享组件，并提供 Manufacturing Token 作用域。
- 边界：只负责区段顺序、局部节奏和 Token 映射；不保存客户事实、不读取 CMS、不定义 Phase 8 客户配置 schema。

## 六、计划页面顺序

1. **Statement Hero**：直接说明制造合作范围、适合买家和主要下一步；一个 primary CTA、一个 secondary CTA。
2. **Proof Strip**：列出值得进一步验证的证据类别，而不放置虚构认证或数字。
3. **Facility Overview**：展示生产环境、关键区域和验证入口，优先回答“是否为真实制造现场”。
4. **Capability Matrix**：把研发到交付的能力拆成采购方可以理解和比较的阶段。
5. **Product Families**：说明可讨论的产品方向，保持询盘式 B2B 表达，不转成电商目录。
6. **Quality Framework**：解释检查点、风险控制与可提供的证据类型。
7. **Buyer Pathways**：帮助买家在现成方向、私标调整和深度定制等合作路径间自我选择，但不写死路径名称或商业条件。
8. **Process Steps**：呈现从需求确认到生产准备的流程、Review gate 和双方责任。
9. **Inquiry CTA**：告诉买家联系前应准备的信息，不实现表单提交。

叙事链为：**制造定位 → 初步信任 → 实体验证 → 能力匹配 → 产品适配 → 质量控制 → 合作选择 → 执行流程 → 询盘**。

## 七、Manufacturing Token 与视觉策略

Manufacturing 是 composition 级映射，不修改全局 Token，也不改写共享组件内部样式：

- 使用中性偏冷的 canvas/surface 与深色 ink，强调清晰和稳定；
- 使用克制的工业蓝或矿物色 accent，不复制参考站点色板；
- display 与 body 均优先使用系统 sans-serif，降低 Premium 的杂志感；
- section spacing 比 Premium 更紧凑，但必须保持扫描和阅读空间；
- 使用较少装饰、更明确的边框、分组、编号和信息对齐；
- radius 保持中小尺度，避免过度柔和或消费品牌化；
- CTA 层级、focus token 和 WCAG 2.2 AA 要求保持不变。

具体数值只在实施时通过对比度、内容密度和响应式检查确定。Manufacturing 映射不得成为新的全局默认值，也不得泄漏到 Premium fixture。

## 八、Review fixture 与媒体计划

- 计划创建 `src/pages/library/manufacturing-homepage.astro`，不覆盖 `/`。
- 使用明确标注为 internal review 的中性英文数据。
- 只使用仓库内原创的抽象工厂/流程 SVG，检查布局和媒体比例；不使用参考站点或真实客户资产。
- 所有有意义媒体提供有效 `alt` 和固有尺寸；纯装饰媒体使用空 `alt`。
- 不引入视频播放器、轮播、灯箱、地图、图表库或客户端图片脚本。
- Review fixture 中的 proof、quality 和 capability 内容只描述“应核验的信息类型”，不冒充真实供应商事实。

## 九、批准后的实施顺序

1. 实现并单独检查 `FacilityOverview-001`。
2. 实现 `CapabilityMatrix-001`，重点验证长文本、责任字段和移动端扫描顺序。
3. 实现 `QualityFramework-001`，重点验证证据类型与认证声明的边界。
4. 创建 `ManufacturingHomepage-001`，只组合 Approved/new Review sections，并加入局部 Manufacturing Token 作用域。
5. 创建独立 Manufacturing review fixture 与原创 SVG，不修改 Premium fixture 和 `/`。
6. 在约 390px、768px、1440px 检查信息密度、标题节奏、能力分组、媒体比例、CTA 层级和横向溢出。
7. 检查键盘、focus-visible、main/section/heading/list/definition-list 或 table 语义、alt、对比度和 reduced-motion。
8. 验证 Premium 与 Manufacturing Token 相互隔离，已 Approved 组件没有视觉或接口回归。
9. 运行 `npm.cmd run check` 和 `npm.cmd run build`。
10. 更新 `COMPONENT_LIBRARY.md`、`DESIGN_SYSTEM.md`、`DECISIONS.md` 和 `ROADMAP.md`；通过检查的新条目进入 `Review`，然后停止等待人工审核。

## 十、明确不做

- 不覆盖或发布正式 `/` 首页
- 不实现 Launch composition 或 Launch Token 映射
- 不修改或重新设计已批准的 Premium composition
- 不实现全局 Header、Footer、多页面导航或五个正式基础页面
- 不实现询价表单、文件上传、后端、邮件、WhatsApp、CRM 或在线聊天
- 不引入 Sanity、内容集合、Cloudflare、部署、环境变量或 Phase 8 客户配置 schema
- 不实现实时产能、ERP、库存、订单状态、实验室数据或认证查询
- 不实现 testimonials、历史时间线、blog、social feed、marquee、carousel 或动画库
- 不引入 React、Vue、Svelte、图表/图标包、外部字体或新增运行时依赖
- 不复制参考站点的版式、色板、文案、图片、视频、认证图标或品牌表达

`b2b-site-launcher` 中的 CMS 和发布流程在本阶段不启用，因为当前批准边界仅是本地静态 composition review。

## 十一、验收标准

- 只实现本计划列出的 3 个共享 section、1 个 composition、内部 fixture 和必要原创 review SVG。
- 所有已 Approved 组件通过复用参与页面，不产生 Manufacturing 副本。
- 全页只有一个 h1；section 标题层级连续，landmarks 和列表/数据结构语义清楚。
- 工厂、能力、产品、质量、合作路径和流程的层级可以在快速扫描中被理解。
- 所有事实、数字、认证、商业条件和联系信息均来自 props；fixture 不包含不可验证声明。
- 390px、768px、1440px 无横向溢出；密集内容在移动端保持合理顺序和可读性。
- 所有链接满足 44px 目标或有合理可点击区域，focus-visible 清晰。
- 媒体尺寸和 alt 正确，不造成布局偏移；不使用第三方受保护素材。
- Manufacturing Token 达到 WCAG 2.2 AA，不泄漏到 Premium 或其他页面。
- 页面输出为静态 HTML，无 hydration 指令和不必要 JavaScript。
- `astro check` 为 0 errors、0 warnings、0 hints，生产构建成功。
- 新增条目进入 `Review` 后立即停止，不自动进入 Phase 6。

## 十二、批准边界

批准本计划仅授权：上述 3 个共享 section、1 个 Manufacturing composition、局部 Token 映射、原创 review SVG、独立 review fixture 和必要文档更新。任何额外 section、正式首页替换、真实客户数据、CMS、部署、全局导航、表单或新增依赖都需要另行批准。
