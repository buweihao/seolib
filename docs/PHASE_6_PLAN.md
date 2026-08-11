# Phase 6 计划 — Launch Homepage

状态：已完成；`LaunchHomepage-001` 已于 2026-08-11 通过人工审核并获准复用。

实施结果：按批准边界完成一个 composition、一个独立 review fixture 和五张原创抽象 SVG；未新增 primitive、section、依赖、客户端脚本或正式页面。八个 Approved sections 按计划顺序复用，局部 Launch Token 未影响全局、Premium 或 Manufacturing。390px、768px、1440px 视觉与响应式检查、语义/键盘/焦点/媒体/溢出/对比度检查、四向 Token 隔离检查、`astro check` 与生产构建均已通过，并已获得人工批准。

## 一、三个首页方向的职责

- **Premium Homepage：** 用宽松、编辑感和科学可信表达品牌与研发价值。
- **Manufacturing Homepage：** 用工厂、能力、质量和责任证据支持采购判断。
- **Launch Homepage：** 用清楚的路径、准备事项和较低认知负担帮助新品牌或新项目开始对话。

三个方向是同一组件库的不同 composition，不是三套独立模板。Launch 的差异来自区段顺序、信息密度、CTA 层级和局部 Token 映射，而不是组件副本。

## 二、阶段目标

在不复制参考站点、不创建客户专属组件、不实施正式多页面网站的前提下，完成第一套可复用的 Launch Homepage composition。

本阶段重点验证：现有 Approved 组件能否直接形成一种“易理解、现代、友好、行动清楚、适合早期买家”的 B2B 护肤品项目启动首页。页面不能把“低 MOQ”或“快速上市”写成默认承诺，而应解释哪些产品、包装、证据和决策因素会影响最小量、时间和项目复杂度。

Review fixture 继续使用中性、虚构、可替换的英文数据，不出现真实公司名称、MOQ 数字、交期、价格、免费服务、配方数量、认证、渠道保证或结果承诺。

## 三、组件复用结论

Phase 6 不新增 primitive，也不新增 section。计划直接复用：

- `Container-001`
- `ActionLink-001`
- `SectionHeading-001`
- `MediaFrame-001`
- `StatementHero-001`
- `ProofStrip-001`
- `BuyerPathways-001`
- `ProductFamilies-001`
- `CapabilityMatrix-001`
- `EvidenceFeature-001`
- `ProcessSteps-001`
- `InquiryCTA-001`

其中 `CapabilityMatrix-001` 在 Launch composition 中通过 props 表达“项目准备因素”，而不是制造产能矩阵。它已有通用的 buyer input、supplier output 和 evidence 字段，因此没有理由再创建 `LaunchReadinessCards` 或 `MOQTimelineTable`。

如果实施时发现现有接口无法表达批准的内容目的，必须停止并修改计划，不能临时新增 section。

## 四、参考依据与原创性边界

- **Laeyo：** 买家类型、合作路径、MOQ/交期影响因素和双方准备责任；只提取决策问题，不复制数字、承诺或高密度页面。
- **Vitelle：** 对初次品牌买家的引导、产品集合和清楚的启动步骤；不使用其品牌、视频、奖项或市场地位。
- **RainShadow Labs：** 早期区分现成方向、私标和定制路线；不引入商城、融资、购物车或促销逻辑。
- **Romano：** 基于项目成熟度的服务路径和 concept-to-shelf 流程；不复制表单、指标、认证或视觉系统。
- **Créer：** 对需要创意指导的创业买家表达端到端可能性；不采用促销赠品、超大跑马灯、品牌服务承诺或具体视觉语言。

所有实现必须使用原创 Astro/CSS、原创 review media 和中性示例内容。参考图片、包装、logo、认证图标、文案、完整布局和公司事实不得进入生产源码。

## 五、唯一新增条目

### `LaunchHomepage-001`

- 计划文件：`src/components/compositions/LaunchHomepage.astro`
- 类别：Composition
- 内容目的：接收八组 Approved section props，按 Launch 买家决策顺序组合页面并提供局部 Launch Token 作用域。
- 计划接口：从八个子组件公开接口推导 `hero`、`proof`、`pathways`、`products`、`readiness`、`evidence`、`process` 和 `inquiry` prop groups，以及可选 `class`。
- 边界：不保存客户事实、不读取 CMS、不定义客户配置 schema、不修改子组件接口。

## 六、计划页面顺序

1. **Statement Hero**：说明适合买家、可开始的项目方向和主要下一步；最多一个 primary 与一个 secondary CTA。
2. **Proof Strip**：说明继续评估时应关注的支持方式或验证类别，不展示虚构数字和认证。
3. **Buyer Pathways**：尽早帮助买家按项目成熟度选择起点，降低首次访问的判断负担。
4. **Product Families**：用少量产品方向帮助形成初步范围，不创建电商目录或 SKU 瀑布流。
5. **Capability Matrix / Launch Readiness**：通过通用矩阵解释哪些输入会影响范围、最小量、时间和下一步，不提供默认商业承诺。
6. **Evidence Feature**：解释如何通过明确决策、样品标准或包装准备降低后续返工和不确定性。
7. **Process Steps**：用较短流程展示从初始 brief 到可评估项目范围的双方责任。
8. **Inquiry CTA**：告诉买家首次沟通前准备哪些最小信息，不实现表单提交。

叙事链为：**启动可能性 → 初步信任 → 路径选择 → 产品范围 → 准备因素 → 方法证据 → 简明流程 → 询盘**。

## 七、Launch Token 与视觉策略

Launch 是 composition 级映射，不修改全局、Premium 或 Manufacturing Token：

- 使用明亮但不过度消费品牌化的 canvas/surface；
- 使用现代、易读的系统 sans-serif，不引入外部字体；
- 使用友好但高对比的 teal、blue-green 或 warm accent，具体值在实施时确定；
- section spacing 介于 Premium 和 Manufacturing 之间；
- card/media radius 可比 Manufacturing 稍柔和，但不能形成儿童化或 SaaS 仪表盘风格；
- 使用清楚的表面分组、有限的色块和明显 CTA，不使用发光、夸张渐变或促销标签；
- 保持一个局部 primary CTA，其他动作使用 text/secondary 层级；
- 所有映射重新验证 WCAG 2.2 AA、focus-visible 和三种 composition 的 Token 隔离。

## 八、Review fixture 与媒体策略

- 计划创建 `src/pages/library/launch-homepage.astro`，不覆盖 `/`。
- 使用明确标注为 internal review 的中性英文数据。
- 使用仓库内原创抽象 SVG，表达路径、选择、组合和准备步骤；不使用参考站点或真实客户资产。
- 所有有意义媒体提供有效 `alt` 和固有尺寸；纯装饰媒体使用空 `alt`。
- Fixture 必须明确说明所有产品方向和商业条件均为结构示例，不代表供应商事实。
- 不引入视频、轮播、灯箱、图标包、动画库或客户端图片脚本。

## 九、接口与事实边界

- “低 MOQ”只能作为买家希望核验的议题，不能作为组件默认值或 fixture 承诺。
- “快速上市”必须拆成影响因素，例如 brief 完整度、产品方向、包装状态、验证需求和决策速度。
- 所有 MOQ、交期、费用、市场、认证、样品次数和响应时间均由未来客户 props/config 提供，并要求事实依据。
- Buyer Pathways 不预设哪条路线更优，也不写死 private label、ODM、OEM 等名称。
- Product Families 不包含价格、库存、SKU、购买或购物车行为。
- Inquiry CTA 保持纯链接，不定义表单字段或提交逻辑。
- Phase 8 之前不建立通用客户配置、CMS schema 或内容迁移层。

## 十、批准后的实施顺序

1. 创建 `LaunchHomepage-001`，只组合现有 Approved sections，不修改其接口。
2. 加入局部 Launch Token 作用域，保持 Premium、Manufacturing 和全局默认值不变。
3. 创建独立 Launch review fixture 与原创 SVG，不修改 `/`、Premium 或 Manufacturing fixture。
4. 在约 390px、768px 和 1440px 检查买家路径优先级、标题节奏、矩阵密度、CTA 层级、媒体比例和横向溢出。
5. 检查 main、单一 h1、section/heading/list/definition-list 语义、键盘、focus-visible、alt、对比度和 reduced-motion。
6. 验证 Launch、Premium、Manufacturing 和全局 Token 相互隔离，Approved 组件没有接口或视觉回归。
7. 运行 `npm.cmd run check` 和 `npm.cmd run build`。
8. 更新 `COMPONENT_LIBRARY.md`、`DESIGN_SYSTEM.md`、`DECISIONS.md` 和 `ROADMAP.md`；`LaunchHomepage-001` 通过检查后进入 `Review`，然后停止等待人工审核。

## 十一、明确不做

- 不新增 primitive 或 section
- 不覆盖或发布正式 `/` 首页
- 不修改已批准的 Premium 或 Manufacturing composition
- 不实现 Header、Footer、多页面导航或 Phase 7 的五个正式基础页面
- 不实现价格、MOQ 计算器、交期估算器、在线下单、购物车或支付
- 不实现询盘表单、文件上传、后端、邮件、WhatsApp、CRM 或聊天
- 不引入 Sanity、内容集合、Cloudflare、部署、环境变量或客户配置 schema
- 不实现 testimonials、blog、social feed、marquee、carousel、倒计时或促销模块
- 不引入 React、Vue、Svelte、图标包、外部字体或新增运行时依赖
- 不复制参考站点的版式、色板、文案、图片、视频、品牌或促销表达

`b2b-site-launcher` 中的 CMS 和发布流程在本阶段不启用，因为当前批准边界仅是本地静态 composition review。

## 十二、验收标准

- 只实现 `LaunchHomepage-001`、局部 Token、独立 fixture、必要原创 review SVG 和文档更新。
- 八个 section 全部来自 Approved 共享组件，不产生 Launch 副本。
- 全页只有一个 h1；区段标题连续，landmarks 和数据结构语义清楚。
- 新买家可以快速理解“从哪里开始、哪些因素影响项目、下一步准备什么”。
- 页面不把低 MOQ、快速上市、价格或结果作为未经验证的供应商承诺。
- 390px、768px、1440px 无横向溢出，内容顺序和 CTA 优先级在移动端保持清楚。
- 所有链接满足 44px 目标或有合理可点击区域，focus-visible 清晰。
- 媒体尺寸和 alt 正确，不造成布局偏移，不使用第三方受保护素材。
- Launch Token 达到 WCAG 2.2 AA，不泄漏到 Premium、Manufacturing 或全局页面。
- 输出为静态 HTML，无 hydration 指令和不必要 JavaScript。
- `astro check` 为 0 errors、0 warnings、0 hints，生产构建成功。
- `LaunchHomepage-001` 进入 `Review` 后立即停止，不自动进入 Phase 7。

## 十三、批准边界

批准本计划仅授权：`LaunchHomepage-001`、局部 Launch Token 映射、原创 review SVG、独立 review fixture 和必要文档更新。任何新 section/primitive、正式首页替换、真实客户数据、CMS、部署、导航、表单、计算器或新增依赖都需要另行批准。
