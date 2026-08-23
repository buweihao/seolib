import type { ClientSiteConfig, VerificationStatus } from "./schema";

export interface ConfigIssue {
  path: string;
  message: string;
  severity: "error" | "warning";
}

const isBlank = (value: string) => value.trim().length === 0;

const heroMediaSources = (config: ClientSiteConfig) => {
  const { hero } = config.homepage;
  return "slides" in hero
    ? hero.slides.map((slide) => slide.media.src)
    : [hero.media.src];
};

const mediaSources = (config: ClientSiteConfig) => [
  ...heroMediaSources(config),
  config.homepage.evidence.media.src,
  config.homepage.facility.media.src,
  ...config.homepage.products.families.flatMap((family) => family.media?.src ? [family.media.src] : []),
  ...config.pages.products.products.families.flatMap((family) => family.media?.src ? [family.media.src] : []),
  ...config.catalog.categories.map((category) => category.media.src),
  ...config.catalog.products.map((product) => product.media.src),
  config.pages.about.facility.media.src,
  config.pages.about.evidence.media.src,
];

const addPendingIssue = (
  issues: ConfigIssue[],
  path: string,
  status: VerificationStatus,
  publishMode: boolean,
) => {
  if (status !== "pending") return;
  issues.push({
    path,
    message: publishMode ? "Pending verification blocks publish mode." : "Pending client verification; review preview only.",
    severity: publishMode ? "error" : "warning",
  });
};

export const validateClientSiteConfig = (config: ClientSiteConfig): readonly ConfigIssue[] => {
  const issues: ConfigIssue[] = [];
  const publishMode = config.mode === "publish";

  if (isBlank(config.siteId)) issues.push({ path: "siteId", message: "A stable site ID is required.", severity: "error" });
  if (isBlank(config.identity.displayName.value)) issues.push({ path: "identity.displayName", message: "A display name is required.", severity: "error" });
  try {
    const siteUrl = new URL(config.seo.siteUrl.value);
    if (siteUrl.protocol !== "https:") throw new Error("HTTPS required");
  } catch {
    issues.push({ path: "seo.siteUrl", message: "A valid HTTPS site URL is required.", severity: "error" });
  }
  if (!config.seo.locales.includes(config.seo.defaultLocale)) {
    issues.push({ path: "seo.defaultLocale", message: "Default locale must be included in locales.", severity: "error" });
  }
  if (!config.contact.inquiryHref.startsWith("/") && !config.contact.inquiryHref.startsWith("#") && !config.contact.inquiryHref.startsWith("mailto:") && !config.contact.inquiryHref.startsWith("https://")) {
    issues.push({ path: "contact.inquiryHref", message: "Inquiry route must be an internal, mailto, or HTTPS URL.", severity: "error" });
  }
  for (const [routeName, route] of Object.entries(config.routes)) {
    if (!route.startsWith("/")) issues.push({ path: `routes.${routeName}`, message: "Client page routes must be root-relative.", severity: "error" });
  }

  const categorySlugs = new Set(config.catalog.categories.map((category) => category.slug));
  if (categorySlugs.size !== config.catalog.categories.length) issues.push({ path: "catalog.categories", message: "Product category slugs must be unique.", severity: "error" });
  const productKeys = config.catalog.products.map((product) => `${product.categorySlug}/${product.slug}`);
  if (new Set(productKeys).size !== productKeys.length) issues.push({ path: "catalog.products", message: "Product slugs must be unique within each category.", severity: "error" });
  for (const product of config.catalog.products) {
    if (!categorySlugs.has(product.categorySlug)) issues.push({ path: `catalog.products.${product.slug}`, message: `Unknown category slug: ${product.categorySlug}`, severity: "error" });
  }

  const recognitionHeroSelected = config.patterns.hero === "RecognitionBackdropHero-001";
  const recognitionHeroContent = "slides" in config.homepage.hero;
  if (recognitionHeroSelected !== recognitionHeroContent) {
    issues.push({ path: "homepage.hero", message: `${config.patterns.hero} does not match the configured hero content model.`, severity: "error" });
  }
  if ("slides" in config.homepage.hero && config.homepage.hero.slides.length === 0) {
    issues.push({ path: "homepage.hero.slides", message: "RecognitionBackdropHero-001 requires at least one slide.", severity: "error" });
  }

  addPendingIssue(issues, "identity.displayName", config.identity.displayName.status, publishMode);
  addPendingIssue(issues, "identity.summary", config.identity.summary.status, publishMode);
  if (config.identity.legalName) addPendingIssue(issues, "identity.legalName", config.identity.legalName.status, publishMode);
  if (config.contact.email) addPendingIssue(issues, "contact.email", config.contact.email.status, publishMode);
  if (config.contact.phone) addPendingIssue(issues, "contact.phone", config.contact.phone.status, publishMode);
  if (config.contact.location) addPendingIssue(issues, "contact.location", config.contact.location.status, publishMode);
  addPendingIssue(issues, "seo.siteUrl", config.seo.siteUrl.status, publishMode);
  addPendingIssue(issues, "seo.siteName", config.seo.siteName.status, publishMode);
  addPendingIssue(issues, "seo.defaultTitle", config.seo.defaultTitle.status, publishMode);
  addPendingIssue(issues, "seo.defaultDescription", config.seo.defaultDescription.status, publishMode);
  if (config.seo.defaultOgImage) addPendingIssue(issues, "seo.defaultOgImage", config.seo.defaultOgImage.status, publishMode);
  if (config.seo.googleSiteVerification) addPendingIssue(issues, "seo.googleSiteVerification", config.seo.googleSiteVerification.status, publishMode);

  if (config.inquiry.enabled) {
    if (!config.inquiry.endpoint.startsWith("/")) issues.push({ path: "inquiry.endpoint", message: "Inquiry endpoint must be a root-relative path.", severity: "error" });
    if (!config.inquiry.privacyPolicyHref.startsWith("/") && !config.inquiry.privacyPolicyHref.startsWith("https://") && !(config.mode === "review" && config.inquiry.privacyPolicyHref.startsWith("#"))) {
      issues.push({ path: "inquiry.privacyPolicyHref", message: "A local or HTTPS privacy policy URL is required.", severity: "error" });
    }
    if (publishMode && config.inquiry.privacyPolicyHref.startsWith("#")) {
      issues.push({ path: "inquiry.privacyPolicyHref", message: "Publish mode requires a real privacy policy page.", severity: "error" });
    }
    if (publishMode && config.inquiry.delivery !== "resend") {
      issues.push({ path: "inquiry.delivery", message: "An enabled publish-mode inquiry form requires Resend delivery.", severity: "error" });
    }
    if (publishMode && (!config.inquiry.allowedOrigins?.length || config.inquiry.allowedOrigins.includes("*"))) {
      issues.push({ path: "inquiry.allowedOrigins", message: "Publish mode requires an explicit origin allowlist.", severity: "error" });
    }
  }

  for (const record of config.evidence) addPendingIssue(issues, `evidence.${record.id}`, record.status, publishMode);

  const registeredMedia = new Map(config.media.map((asset) => [asset.src, asset]));
  for (const source of mediaSources(config)) {
    const asset = registeredMedia.get(source);
    if (!asset) {
      issues.push({ path: "media", message: `Homepage media is not registered: ${source}`, severity: "error" });
      continue;
    }
    addPendingIssue(issues, `media.${asset.id}`, asset.rightsStatus, publishMode);
  }

  const optionalEntries = Object.entries(config.optionalPatterns) as Array<[
    keyof ClientSiteConfig["optionalPatterns"],
    ClientSiteConfig["optionalPatterns"][keyof ClientSiteConfig["optionalPatterns"]],
  ]>;
  for (const [key, selection] of optionalEntries) {
    const contentKey = key === "testimonials" ? "testimonials" : key;
    const hasContent = config.optionalContent[contentKey] !== undefined;
    if (selection.status === "enabled" && !hasContent) {
      issues.push({ path: `optionalContent.${contentKey}`, message: `${selection.pattern} is enabled but has no content.`, severity: "error" });
    }
    if (selection.status !== "enabled" && hasContent) {
      issues.push({ path: `optionalContent.${contentKey}`, message: `${selection.pattern} content exists but the pattern is not enabled.`, severity: "warning" });
    }
  }

  return issues;
};

export const hasBlockingConfigIssues = (issues: readonly ConfigIssue[]) => issues.some((issue) => issue.severity === "error");
