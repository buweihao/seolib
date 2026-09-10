export const inquiryTypes = ["general", "project", "product", "sample"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export interface InquiryPayload {
  inquiryType: InquiryType;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  productInterest?: string;
  productCategory?: string;
  cooperationModel?: string;
  destinationMarket?: string;
  quantityRange?: string;
  message: string;
  privacyAccepted: boolean;
  privacyPolicyVersion: string;
  sourceUrl?: string;
  locale?: string;
  submittedAt?: string;
  website?: string;
  firstLandingPage?: string;
  firstReferrer?: string;
  firstTouchAt?: string;
  lastLandingPage?: string;
  lastReferrer?: string;
  lastTouchAt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export interface InquiryFieldErrors {
  [field: string]: string;
}

export interface InquiryResponse {
  ok: boolean;
  inquiryId?: string;
  error?: string;
  fieldErrors?: InquiryFieldErrors;
}

export interface ClientInquiryConfig {
  enabled: boolean;
  delivery: "disabled" | "resend";
  endpoint: string;
  formType: InquiryType;
  privacyPolicyHref: string;
  privacyPolicyVersion: string;
  recipientEnvKey: "INQUIRY_TO_EMAIL";
  fromEnvKey: "INQUIRY_FROM_EMAIL";
  resendKeyEnvKey: "RESEND_API_KEY";
  allowedOrigins?: readonly string[];
  attributionEnabled: boolean;
}
