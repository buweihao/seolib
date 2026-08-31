/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_SANITY_API_VERSION?: string;
  readonly PUBLIC_INQUIRY_DELIVERY?: "disabled" | "resend";
  readonly PUBLIC_INQUIRY_ALLOWED_ORIGINS?: string;
  readonly PUBLIC_INQUIRY_PRIVACY_POLICY_URL?: string;
  readonly PUBLIC_INQUIRY_PRIVACY_POLICY_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
