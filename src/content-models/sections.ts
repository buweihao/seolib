export interface ActionContent {
  href: string;
  label: string;
  ariaLabel?: string;
}

export interface MediaContent {
  src: string;
  srcset?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  aspect?: "portrait" | "landscape" | "square";
}

export interface SectionIntroContent {
  eyebrow?: string;
  title: string;
  description?: string;
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: ActionContent;
  secondaryAction?: ActionContent;
  media: MediaContent;
  proofItems?: readonly string[];
}

export interface ProductFamilyContent {
  name: string;
  description: string;
  media?: MediaContent;
  action?: ActionContent;
}

export interface ProductFamiliesContent extends SectionIntroContent {
  families: readonly ProductFamilyContent[];
}

export interface CatalogProductContent {
  slug: string;
  categorySlug: string;
  name: string;
  summary: string;
  media: MediaContent;
  format: string;
  routineRole: string;
  highlights: readonly string[];
  customizationOptions: readonly string[];
  packagingOptions: readonly string[];
  evaluationItems: readonly string[];
  isHot?: boolean;
}

export interface ProductCatalogCategoryContent {
  slug: string;
  name: string;
  description: string;
  media: MediaContent;
}

export interface ProductCatalogContent {
  categories: readonly ProductCatalogCategoryContent[];
  products: readonly CatalogProductContent[];
  reviewNote: string;
}

export interface EvidencePointContent {
  title: string;
  description?: string;
}

export interface EvidenceContent extends SectionIntroContent {
  points: readonly EvidencePointContent[];
  media: MediaContent;
  action?: ActionContent;
}

export interface ProcessStepContent {
  title: string;
  description: string;
  buyerAction?: string;
  supplierAction?: string;
}

export interface ResponsibilityLabelsContent {
  buyer: string;
  supplier: string;
}

export interface ProcessContent extends SectionIntroContent {
  steps: readonly ProcessStepContent[];
  responsibilityLabels?: ResponsibilityLabelsContent;
}

export interface PathwayContent {
  title: string;
  description: string;
  decisionCue?: string;
  action?: ActionContent;
}

export interface PathwaysContent extends SectionIntroContent {
  pathways: readonly PathwayContent[];
}

export interface FacilityAreaContent {
  name: string;
  description: string;
  evidenceNote?: string;
}

export interface FacilityContent extends SectionIntroContent {
  media: MediaContent;
  areas: readonly FacilityAreaContent[];
  verificationNote?: string;
  primaryAction?: ActionContent;
  secondaryAction?: ActionContent;
}

export interface QualityCheckpointContent {
  stage: string;
  controlPurpose: string;
  evidenceType?: string;
}

export interface QualityContent extends SectionIntroContent {
  checkpoints: readonly QualityCheckpointContent[];
  evidenceLabel?: string;
  verificationAction?: ActionContent;
}

export interface InquiryContent extends SectionIntroContent {
  preparationItems: readonly string[];
  primaryAction: ActionContent;
  secondaryAction?: ActionContent;
}

export interface RecognitionHeroSlideContent {
  title?: string;
  media: MediaContent;
  href?: string;
  action?: ActionContent;
}

export interface RecognitionHeroContent {
  eyebrow?: string;
  slides: readonly RecognitionHeroSlideContent[];
  autoplayMs?: number;
}

export interface TrustItemContent {
  title: string;
  detail?: string;
}

export interface TrustBarContent {
  label: string;
  items: readonly TrustItemContent[];
}

export interface ServiceChapterContent extends SectionIntroContent {
  media: MediaContent;
  items: readonly {
    title: string;
    description: string;
    points?: readonly string[];
    action?: ActionContent;
  }[];
}

export interface BuyerMatrixContent extends SectionIntroContent {
  buyers: readonly {
    name: string;
    description: string;
    typicalNeed: string;
    deliverable: string;
  }[];
  action?: ActionContent;
  note?: string;
}

export interface CommercialConditionsContent extends SectionIntroContent {
  columns: readonly string[];
  rows: readonly {
    label: string;
    values: readonly string[];
  }[];
  note?: string;
}

export interface ResourceHubContent extends SectionIntroContent {
  resources: readonly {
    title: string;
    description: string;
    action: ActionContent;
  }[];
  note?: string;
}

export interface MediaRouteContent {
  title: string;
  media: MediaContent;
  action: ActionContent;
}

export interface DualMediaRoutesContent extends SectionIntroContent {
  routes: readonly MediaRouteContent[];
}

export interface TimelineContent extends SectionIntroContent {
  milestones: readonly {
    label: string;
    title: string;
    description: string;
  }[];
  metrics?: readonly {
    value: string;
    label: string;
  }[];
}

export interface StandardsRowContent extends SectionIntroContent {
  standards: readonly {
    name: string;
    detail?: string;
  }[];
  note?: string;
}

export interface ResourceCTAContent extends SectionIntroContent {
  preparationItems?: readonly string[];
  primaryAction: ActionContent;
  secondaryAction?: ActionContent;
  note?: string;
}

export interface ImmersiveMediaContent extends SectionIntroContent {
  media: MediaContent;
  action: ActionContent;
  actionLabel?: string;
}

export interface MarqueeContent {
  label: string;
  items: readonly string[];
  speedSeconds?: number;
}

export interface PrinciplesContent extends SectionIntroContent {
  media?: MediaContent;
  principles: readonly {
    title: string;
    description: string;
  }[];
}

export interface ProductSKUContent {
  name: string;
  media: MediaContent;
  category?: string;
  detail?: string;
  action?: ActionContent;
}

export interface ProductShelfContent extends SectionIntroContent {
  products: readonly ProductSKUContent[];
  action?: ActionContent;
  note?: string;
}

export interface GatedProductContent extends SectionIntroContent {
  product: ProductSKUContent;
  accessLabel: string;
  accessAction: ActionContent;
  note?: string;
}

export interface TestimonialsContent extends SectionIntroContent {
  testimonials: readonly {
    quote: string;
    attribution: string;
    role?: string;
    organization?: string;
    rating?: number;
    verificationStatus: string;
  }[];
  note?: string;
}
