# Phase 7.5 计划 — UI Pattern Component Library

Implementation checkpoint: completed and moved to `Review` on 2026-08-12. Technical checks pass; human approval remains required.

状态：已批准实施；新增 pattern 完成技术审核后进入 `Review`，等待人工批准。

## 一、问题与目标

Phase 3–7 已证明多个 B2B 内容目的可以跨方向复用，但多数内容目的只有一种 UI 实现。Token 能改变颜色、字体、间距和圆角，却不能把分栏 Hero 变成居中证明 Hero、全幅媒体 Hero 或工厂采购 Hero。

Phase 7.5 增加独立 UI pattern 层，使系统形成：

```text
Content Model → UI Pattern → Composition → Client Configuration
```

- Content Model 定义“讲什么”，不包含布局和主题。
- UI Pattern 定义“怎样展示”，可以由多个参考站的 UI 证据支持，但必须原创实现。
- Composition 定义“哪些区段按什么顺序形成买家旅程”，并选择推荐 pattern。
- Phase 8 Client Configuration 保存客户最终内容、pattern、顺序和主题选择。

## 二、批准范围

### 2.1 独立内容模型

在 `src/content-models/sections.ts` 定义并导出：

- `HeroContent`
- `ProductFamiliesContent`
- `EvidenceContent`
- `ProcessContent`
- `PathwaysContent`
- `FacilityContent`
- `QualityContent`
- `InquiryContent`

现有相关 sections 改为消费这些模型；DOM id、class、heading level、media position 等保持为 pattern props，不进入内容模型。

### 2.2 UI pattern 数量

| 内容目的 | 现有 pattern | Phase 7.5 新增 | 完成后 |
| --- | --- | --- | --- |
| Hero | Statement Split | Editorial Split、Centered Proof、Factory Evidence | 4 |
| Products | Equal Card Grid | Image Mosaic、Category List | 3 |
| Evidence | Media Split | Proof Columns | 2 |
| Process | Vertical Responsibility | Horizontal Steps、Numbered Cards | 3 |
| Pathways | Route Cards | Split Routes | 2 |
| Facility | Media + Area List | Facility Gallery | 2 |
| Quality | Checkpoint List | Evidence Matrix | 2 |
| Inquiry | Dark Preparation CTA | Split Inquiry | 2 |

累计新增 27 个 UI patterns。只有 DOM、信息层级或响应式行为具有实质差异时才新增 pattern；小差异继续使用 typed props 和 semantic tokens。

### 2.3 Pattern browser

建立 `/library/patterns/` 及按内容目的分类的 review routes。同一类别的所有 patterns 使用同一份内容，便于只比较 UI。每项显示：

- Pattern ID 和状态；
- 适用场景与约束；
- Content Evidence；
- UI Pattern Evidence；
- Original Treatment。

### 2.4 可替换 composition 示例

建立一个 `FlexibleHomepage.astro` composition，通过 typed pattern IDs 选择 Hero、Products、Evidence、Process、Pathways 和 Inquiry 实现。它证明 pattern 可替换，但不取代三套 Approved homepage presets，也不成为 Phase 8 客户 schema。

## 三、证据与原创边界

- Content Evidence 只证明买家问题和稳定字段。
- UI Pattern Evidence 只证明布局模型、信息密度、图文关系和 CTA 层级值得研究。
- 不复制参考站的 HTML、CSS、文案、图片、品牌、字体组合、精确比例或完整视觉系统。
- Romano Hero 捕获为空，不作为 Hero UI pattern 证据。
- 只有桌面参考证据；所有移动行为由原创实现和本地审核确定。

## 四、明确不做

- 不为每个参考网站机械创建一套组件；
- 不建立万能组件或大量条件分支；
- 不创建真实客户配置、CMS、拖拽编辑器或可视化后台；
- 不覆盖公开 `/` 或 Phase 7 五页 review routes；
- 不新增框架、运行时依赖、动画库、图标包或外部字体；
- 不创建尚未研究的产品详情、包装图库、认证中心或 RFQ 表单 patterns。

## 五、验收标准

- 八个内容模型与具体 UI 组件解耦；同一内容对象可传给同类多个 patterns。
- Hero、Products 和 Process 至少三种 UI；其余批准内容目的至少两种 UI。
- Pattern browser 能独立比较所有新增和现有 patterns。
- Flexible Homepage 至少展示两套由相同内容模型产生的不同 pattern 组合。
- 所有 patterns 有 typed props、语义结构、有效 alt、可见 focus，且无 hydration。
- 390px、768px、1440px 无横向溢出，内容顺序合理。
- `astro check` 为 0 errors、0 warnings、0 hints；生产构建成功。
- 文档明确区分 Content Evidence、UI Pattern Evidence 和 Original Treatment。
- 新增条目进入 `Review` 后停止，不自动开始 Phase 8。

## 六、2026-08-12 PNG 扩展修订

用户批准扩大原范围：不再因参考图中出现奖项、认证、媒体、产品成果或案例素材而放弃其 UI 骨架。具体第三方事实与素材仍不得复制，但这些内容类别可成为 typed、可替换、待核验的客户字段。

- `Editorial Split` 曾降级为视觉变体，后经人工审核确认仍与 Statement Split 同质化，已删除；
- `Factory Evidence` 经人工审核确认与 Statement Split 同质化，已删除；
- 新增 Vitelle 衍生的 `RecognitionBackdropHero-001`；
- 重新审计六站 66 张 section PNG，结果记录于 `docs/PNG_PATTERN_AUDIT.md`；
- 新增悬浮信任条、服务章节手风琴、买家类型矩阵、商业条件表、审核证据中心、双媒体入口、公司时间线、标准证明行和资源转化面板；
- Phase 7.5 当前共 35 个独立 UI patterns；同质化的 `CinematicTypeHero-001` 已删除，保留并修复响应式行为的 `ArcFactoryHero-001`；
- `/library/patterns/png-derived/` 用于审核新增的 17 个 PNG 高差异结构，包括产品剪影架、受控目录商品和可核验客户引语卡。
