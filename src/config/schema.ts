import type {
  CommercialConditionsContent,
  EvidenceContent,
  FacilityContent,
  HeroContent,
  InquiryContent,
  MediaContent,
  PathwaysContent,
  ProcessContent,
  ProductFamiliesContent,
  ProductCatalogContent,
  QualityContent,
  RecognitionHeroContent,
  ResourceHubContent,
  TestimonialsContent,
  TrustBarContent,
} from "../content-models/sections";
import type { ClientInquiryConfig } from "../inquiry/types";
import type { ComponentProps } from "astro/types";
import type AboutPage from "../components/compositions/AboutPage.astro";
import type CapabilitiesPage from "../components/compositions/CapabilitiesPage.astro";
import type ContactPage from "../components/compositions/ContactPage.astro";
import type ProductsPage from "../components/compositions/ProductsPage.astro";

export type SiteDirection = "brand-led" | "procurement-evidence";
export type SiteMode = "review" | "publish";
export type VerificationStatus = "pending" | "verified" | "not-applicable";
export type OptionalPatternStatus = "enabled" | "awaiting-client-data" | "deferred" | "excluded";

export type HeroPatternId = "StatementHero-001" | "CenteredProofHero-001" | "ArcFactoryHero-001" | "RecognitionBackdropHero-001";
export type ProductPatternId = "ProductFamilies-001" | "ProductMosaic-001" | "ProductCategoryList-001";
export type EvidencePatternId = "EvidenceFeature-001" | "ProofColumns-001";
export type PathwayPatternId = "BuyerPathways-001" | "SplitPathways-001";
export type QualityPatternId = "QualityFramework-001" | "QualityEvidenceMatrix-001";
export type ProcessPatternId = "ProcessSteps-001" | "HorizontalProcess-001" | "ProcessCards-001";
export type FacilityPatternId = "FacilityOverview-001" | "FacilityGallery-001";
export type InquiryPatternId = "InquiryCTA-001" | "SplitInquiry-001";
export type NavigationPatternId = "NavigationDropdown-001";
export type ContactPatternId = "ContactWorkspace-001";
export type FloatingContactPatternId = "FloatingContactBar-001";

export interface RequiredPatternSelection {
  hero: HeroPatternId;
  products: ProductPatternId;
  evidence: EvidencePatternId;
  pathways: PathwayPatternId;
  quality: QualityPatternId;
  process: ProcessPatternId;
  facility: FacilityPatternId;
  inquiry: InquiryPatternId;
  navigation: NavigationPatternId;
  contact: ContactPatternId;
  floatingContact: FloatingContactPatternId;
}

export interface OptionalPatternSelection {
  floatingTrustBar: { pattern: "FloatingTrustBar-001"; status: OptionalPatternStatus };
  commercialConditions: { pattern: "CommercialConditionsTable-001"; status: OptionalPatternStatus };
  auditProofHub: { pattern: "AuditProofHub-001"; status: OptionalPatternStatus };
  testimonials: { pattern: "VerifiedTestimonialCards-001"; status: OptionalPatternStatus };
}

export interface VerifiedValue<T> {
  value: T;
  status: VerificationStatus;
  source?: string;
  note?: string;
}

export interface ClientIdentityConfig {
  displayName: VerifiedValue<string>;
  logo?: MediaContent;
  legalName?: VerifiedValue<string>;
  summary: VerifiedValue<string>;
}

export interface ClientContactConfig {
  inquiryHref: string;
  inquiryLabel: string;
  email?: VerifiedValue<string>;
  phone?: VerifiedValue<string>;
  whatsapp?: VerifiedValue<string>;
  location?: VerifiedValue<string>;
}

export interface ClientThemeConfig {
  id: string;
  colors: {
    canvas: string;
    surface: string;
    surfaceSubtle: string;
    ink: string;
    muted: string;
    accent: string;
    accentContrast: string;
    border: string;
  };
}

export interface ClientMediaAsset {
  id: string;
  src: string;
  alt: string;
  rightsStatus: VerificationStatus;
  source?: string;
}

export interface ClientEvidenceRecord {
  id: string;
  label: string;
  status: VerificationStatus;
  source?: string;
  note?: string;
}

export interface ClientSeoConfig {
  siteUrl: VerifiedValue<string>;
  siteName: VerifiedValue<string>;
  defaultTitle: VerifiedValue<string>;
  defaultDescription: VerifiedValue<string>;
  defaultLocale: string;
  locales: readonly string[];
  defaultOgImage?: VerifiedValue<string>;
  googleSiteVerification?: VerifiedValue<string>;
}

export interface ClientHomepageContent {
  hero: HeroContent | RecognitionHeroContent;
  products: ProductFamiliesContent;
  evidence: EvidenceContent;
  pathways: PathwaysContent;
  quality: QualityContent;
  process: ProcessContent;
  facility: FacilityContent;
  inquiry: InquiryContent;
}

export interface ClientSiteRoutes {
  home: string;
  products: string;
  capabilities: string;
  about: string;
  contact: string;
}

export interface ClientInnerPagesContent {
  products: Omit<ComponentProps<typeof ProductsPage>, "class">;
  capabilities: Omit<ComponentProps<typeof CapabilitiesPage>, "class">;
  about: Omit<ComponentProps<typeof AboutPage>, "class">;
  contact: Omit<ComponentProps<typeof ContactPage>, "class">;
}

export interface OptionalPatternContent {
  floatingTrustBar?: TrustBarContent;
  commercialConditions?: CommercialConditionsContent;
  auditProofHub?: ResourceHubContent;
  testimonials?: TestimonialsContent;
}

export interface ClientSiteConfig {
  schemaVersion: "1.0";
  siteId: string;
  mode: SiteMode;
  direction: SiteDirection;
  identity: ClientIdentityConfig;
  contact: ClientContactConfig;
  seo: ClientSeoConfig;
  inquiry: ClientInquiryConfig;
  theme: ClientThemeConfig;
  patterns: RequiredPatternSelection;
  optionalPatterns: OptionalPatternSelection;
  routes: ClientSiteRoutes;
  homepage: ClientHomepageContent;
  pages: ClientInnerPagesContent;
  catalog: ProductCatalogContent;
  optionalContent: OptionalPatternContent;
  media: readonly ClientMediaAsset[];
  evidence: readonly ClientEvidenceRecord[];
}
