import type { HomepagePatternSelection } from "../components/compositions/FlexibleHomepage.astro";
import type { EvidenceContent, HeroContent, InquiryContent, PathwaysContent, ProcessContent, ProductFamiliesContent } from "../content-models/sections";
import { capabilitiesPage, homePage, productsPage } from "./baseSite";

export const compositionContent = {
  hero: { ...homePage.hero, proofItems: homePage.proof.items.map((item) => item.title) } satisfies HeroContent,
  products: productsPage.products satisfies ProductFamiliesContent,
  evidence: homePage.evidence satisfies EvidenceContent,
  process: capabilitiesPage.process satisfies ProcessContent,
  pathways: homePage.pathways satisfies PathwaysContent,
  inquiry: productsPage.inquiry satisfies InquiryContent,
};

export const brandLedPatterns = {
  hero: "centeredProof",
  pathways: "split",
  products: "mosaic",
  evidence: "mediaSplit",
  process: "cards",
  inquiry: "split",
} satisfies HomepagePatternSelection;

export const procurementLedPatterns = {
  hero: "statement",
  pathways: "cards",
  products: "categoryList",
  evidence: "proofColumns",
  process: "horizontal",
  inquiry: "dark",
} satisfies HomepagePatternSelection;
