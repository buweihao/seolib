# Phase 4 计划 — Premium Homepage

状态：已完成；`PremiumHomepage-001` 与本阶段新增组件已于 2026-08-10 通过人工审核并获准复用。

实施结果：批准范围内的 1 个 primitive、4 个共享 section、1 个 composition、5 个原创 review SVG 与独立 fixture 均已完成。390px、768px、1440px 视觉与响应式检查、语义和键盘检查、对比度检查、`astro check` 及静态生产构建均通过，并已获得人工批准；未开始 Phase 5。

## 一、阶段目标

在不复制参考站点、不建立客户专属分支、不开始 Manufacturing 或 Launch 方向的前提下，完成第一套可复用的 Premium Homepage composition。

本阶段验证的不是某个真实客户网站，而是共享组件库能否组合出一种“宽松、编辑感、科学可信、克制、高端”的 B2B 护肤品制造商首页方向。页面内容继续使用中性、虚构、可替换的 review data，不出现真实公司名称、认证、MOQ、交期、工厂规模、配方数量或市场承诺。

## 二、已批准基础

Phase 4 直接复用以下 Approved 组件，不创建 Premium 专属副本：

- `Container-001`
- `ActionLink-001`
- `SectionHeading-001`
- `ProofStrip-001`
- `BuyerPathways-001`
- `ProcessSteps-001`

这些组件只能通过 props 和 composition 级 Token 映射改变表达，不允许复制为 `PremiumProofStrip`、`PremiumProcessSteps` 等平行实现。

## 三、Premium 设计原则

- **宽松：** 使用较大的 section spacing、受控阅读宽度和明显的内容停顿，不靠堆叠卡片制造“丰富感”。
- **编辑感：** 使用不对称但可预测的排版、清晰的标题节奏和有限的重点切换；不复制 Créer 的字体、黑白布局或超大跑马灯。
- **科学可信：** 将证据、研发过程、可验证能力和决策边界放在视觉装饰之前；不使用无依据的实验室术语或认证图标。
- **高端：** 依靠比例、留白、材料感和克制的色彩建立品质感，不使用夸张渐变、发光效果或密集促销标签。
- **转化克制：** 首屏保留一个主要动作和一个次要动作，页面末尾提供明确的询盘入口；中间区段不重复强推 CTA。
- **共享优先：** Premium 是一个 composition 和 Token 映射，不是一套独立组件库。

## 四、建议新增范围

### 4.1 新增 Primitive

| ID | 计划文件 | 内容目的 | 计划接口 |
| --- | --- | --- | --- |
| `MediaFrame-001` | `src/components/primitives/MediaFrame.astro` | 保留响应式媒体比例、尺寸和替代文本，供多个 section 共享 | `src`、`alt`、`width`、`height`、可选 `loading`、`aspect`、`class` |

`MediaFrame-001` 只处理媒体语义和几何，不决定图片内容、焦点、Premium 色彩或 section 布局。

### 4.2 新增共享 Sections

| ID | 计划文件 | 回答的买家问题 | 参考依据 |
| --- | --- | --- | --- |
| `StatementHero-001` | `src/components/sections/StatementHero.astro` | “这家公司为哪类品牌创造什么价值，我下一步能做什么？” | Créer 的编辑式定位、Vitelle 的专业结果导向、YG 的经验型定位；只提取结构原则 |
| `EvidenceFeature-001` | `src/components/sections/EvidenceFeature.astro` | “这个定位背后有什么研发、团队、设施或方法证据？” | Vitelle 的团队/设施证明、Romano 的实验室证明、Laeyo 的可审计能力 |
| `ProductFamilies-001` | `src/components/sections/ProductFamilies.astro` | “供应商能支持哪些产品方向，我应该从哪里继续了解？” | Vitelle、Romano、RainShadow 和 Laeyo 的产品分类逻辑 |
| `InquiryCTA-001` | `src/components/sections/InquiryCTA.astro` | “联系前需要准备什么，提交后会发生什么？” | Laeyo 的 RFQ 输入/输出说明、Romano 的咨询转化路径 |

所有新增 section 必须保持跨方向可复用。Premium 的差异由 composition 顺序和 Token 映射提供，而不是写入组件名称、默认文案或条件分支。

### 4.3 新增 Composition

| ID | 计划文件 | 类别 | 目的 |
| --- | --- | --- | --- |
| `PremiumHomepage-001` | `src/components/compositions/PremiumHomepage.astro` | Composition | 接收结构化 section props，按批准顺序组合共享组件并提供 Premium Token 作用域 |

Composition 只负责区段顺序、局部节奏和方向级 Token 作用域。它不保存客户事实，不读取 CMS，也不定义 Phase 8 的最终客户配置 schema。

## 五、计划页面顺序

1. **Statement Hero**：一句清晰价值主张、简短说明、一个主要动作、一个次要动作，以及原创 review media。
2. **Proof Strip**：用四个短证据类型快速回答“为什么值得继续看”；不出现真实认证。
3. **Evidence Feature**：将品牌承诺连接到研发方法、团队协作或质量决策逻辑。
4. **Product Families**：用克制的产品方向展示回答“能做什么”，避免电商式商品瀑布流。
5. **Buyer Pathways**：说明不同准备程度或定制深度对应的合作路径。
6. **Process Steps**：展示从 brief 到确认准备度的有序流程和双方责任。
7. **Inquiry CTA**：说明建议准备的信息和下一步动作，不在本阶段实现表单提交。

这是一条“定位 → 证据 → 能力 → 适配 → 流程 → 转化”的 B2B 叙事链。不得为了视觉长度增加 testimonials、blog、social feed、marquee、促销或无证据数字。

## 六、接口和数据边界

- `StatementHero-001` 接收 eyebrow、h1、description、最多两个 ActionLink 配置和一份媒体配置。
- `EvidenceFeature-001` 接收标题、正文、二至四条证据点、媒体配置和可选文字链接。
- `ProductFamilies-001` 接收三至六个产品方向；每项包含名称、短说明、可选媒体和可选链接，不包含价格或 SKU 逻辑。
- `InquiryCTA-001` 接收标题、说明、建议准备项和最多两个联系动作，不包含表单字段或提交逻辑。
- `PremiumHomepage-001` 的 props 从子组件接口组合，不另造一套重复内容类型。
- Review fixture 数据必须明确标注为示例，不暗示真实制造能力。
- Phase 8 之前不创建通用客户配置对象、CMS schema 或内容迁移层。

## 七、Token 与视觉策略

计划增加一个 composition 级 Premium Token 作用域，而不是修改共享组件内部颜色：

- 温暖但接近中性的 canvas/surface；
- 高对比 ink 和克制的植物性深色 accent；
- 系统 serif display stack 与现有 sans body stack，不引入外部字体依赖；
- 较大的 feature/standard spacing；
- 比 Phase 3 更克制的 radius 和边框使用；
- 仍使用全局 focus token，所有映射必须重新验证 WCAG 2.2 AA 对比度。

具体 Token 数值只在实施时通过对比度与响应式检查确定。不得把 Premium 映射设为新的全局默认值。

## 八、媒体策略

- 不使用六个参考站点中的图片、产品包装、logo、认证图标或视频帧。
- Review fixture 只使用仓库内原创的抽象 SVG 几何图形，用于检查比例、裁切和响应式布局；它们不是客户生产资产。
- 所有有意义媒体必须有有效 `alt`，纯装饰媒体使用空 `alt`。
- 不引入图片服务、轮播、灯箱或客户端图片脚本。
- 真实客户图片、焦点信息和版权记录留到客户内容/config 阶段。

## 九、批准后的实施顺序

1. 实现并单独检查 `MediaFrame-001`。
2. 实现 `StatementHero-001`，先验证一个 h1、CTA 层级、媒体比例和移动端顺序。
3. 实现 `EvidenceFeature-001` 和 `ProductFamilies-001`，验证媒体与长文本边界。
4. 实现 `InquiryCTA-001`，保持纯链接转化，不增加表单。
5. 创建 `PremiumHomepage-001`，组合新旧 Approved/Draft section，并加入局部 Premium Token 作用域。
6. 创建 `src/pages/library/premium-homepage.astro` 作为中性 review fixture；不覆盖当前 `/`。
7. 在约 390px、768px 和 1440px 宽度检查整体节奏、CTA 层级、媒体裁切、标题顺序和溢出。
8. 键盘检查所有链接与 focus；检查 main、section、heading、list、figure、alt 和 reduced-motion。
9. 运行 `npm.cmd run check` 和 `npm.cmd run build`。
10. 更新 `COMPONENT_LIBRARY.md` 和 `ROADMAP.md`；通过检查的新增组件进入 `Review`，然后停止等待人工审核。

## 十、明确不做

- 不覆盖或发布正式 `/` 首页
- 不实现 Manufacturing 或 Launch composition/token 映射
- 不实现全局 Header、Footer 或多页面导航；这些依赖 Phase 7 的页面 IA
- 不实现询价表单、后端、邮件发送、WhatsApp 集成或 CRM
- 不引入 Sanity、内容集合、Cloudflare、部署或环境变量
- 不建立 Phase 8 客户配置 schema
- 不实现 testimonials、blog、social feed、marquee、carousel 或动画库
- 不引入 React、Vue、Svelte、图标包、外部字体或新增运行时依赖
- 不复制参考站点的版式、字体、色板、文案、图片或品牌表达

`b2b-site-launcher` 中关于 CMS 和发布的流程在本阶段不启用，因为当前目标是本地静态 composition review，并且用户明确要求暂不实施与发布。

## 十一、验收标准

- 只实现本计划列出的 1 个 primitive、4 个 section、1 个 composition 和内部 fixture。
- Phase 3 的六个 Approved 组件通过复用参与页面，不产生 Premium 副本。
- 全页只有一个 h1；各 section 标题层级连续且 landmarks 清晰。
- Hero 首屏最多一个 primary CTA；全页转化层级清楚且不过度重复。
- 390px、768px、1440px 无横向溢出，内容顺序在移动端仍符合叙事逻辑。
- 所有链接满足 44px 目标或有合理可点击区域，focus-visible 清晰。
- 所有媒体尺寸明确、alt 正确、不造成布局偏移。
- Premium Token 映射达到 WCAG 2.2 AA，并且不会泄漏到其他页面。
- 页面输出为静态 HTML，无 hydration 指令和不必要 JavaScript。
- 没有真实或不可验证的公司事实，没有第三方受保护素材。
- `astro check` 为 0 errors、0 warnings、0 hints，生产构建成功。
- 新组件进入 `Review` 后立即停止，不自动进入 Phase 5。

## 十二、批准边界

批准本计划仅授权：上述 6 个新组件、Premium 局部 Token 映射、原创 review SVG、内部 review fixture 和必要文档更新。任何全局导航、正式首页替换、客户数据、CMS、部署、额外 section 或依赖都需要另行批准。
