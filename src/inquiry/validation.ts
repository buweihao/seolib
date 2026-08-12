import { inquiryTypes, type InquiryFieldErrors, type InquiryPayload } from "./types.ts";

const LIMITS = {
  name: 160,
  email: 254,
  company: 200,
  phone: 80,
  productInterest: 240,
  destinationMarket: 160,
  quantityRange: 120,
  message: 4000,
  metadata: 700,
} as const;

const text = (value: unknown, maxLength: number) => String(value ?? "").trim().slice(0, maxLength);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface InquiryValidationResult {
  payload: InquiryPayload;
  fieldErrors: InquiryFieldErrors;
  isBot: boolean;
}

export const normalizeInquiryPayload = (input: Record<string, unknown>): InquiryPayload => ({
  inquiryType: inquiryTypes.includes(input.inquiryType as InquiryPayload["inquiryType"])
    ? input.inquiryType as InquiryPayload["inquiryType"]
    : "general",
  name: text(input.name, LIMITS.name),
  email: text(input.email, LIMITS.email).toLowerCase(),
  company: text(input.company, LIMITS.company),
  phone: text(input.phone, LIMITS.phone),
  productInterest: text(input.productInterest, LIMITS.productInterest),
  destinationMarket: text(input.destinationMarket, LIMITS.destinationMarket),
  quantityRange: text(input.quantityRange, LIMITS.quantityRange),
  message: text(input.message, LIMITS.message),
  privacyAccepted: input.privacyAccepted === true || input.privacyAccepted === "true" || input.privacyAccepted === "on",
  privacyPolicyVersion: text(input.privacyPolicyVersion, 80),
  sourceUrl: text(input.sourceUrl, LIMITS.metadata),
  locale: text(input.locale, 20),
  submittedAt: text(input.submittedAt, 40),
  website: text(input.website, 240),
  firstLandingPage: text(input.firstLandingPage, LIMITS.metadata),
  firstReferrer: text(input.firstReferrer, LIMITS.metadata),
  firstTouchAt: text(input.firstTouchAt, 40),
  lastLandingPage: text(input.lastLandingPage, LIMITS.metadata),
  lastReferrer: text(input.lastReferrer, LIMITS.metadata),
  lastTouchAt: text(input.lastTouchAt, 40),
  utmSource: text(input.utmSource, 200),
  utmMedium: text(input.utmMedium, 200),
  utmCampaign: text(input.utmCampaign, 200),
  utmContent: text(input.utmContent, 200),
  utmTerm: text(input.utmTerm, 200),
});

export const validateInquiryPayload = (input: Record<string, unknown>): InquiryValidationResult => {
  const payload = normalizeInquiryPayload(input);
  const fieldErrors: InquiryFieldErrors = {};
  if (!payload.name) fieldErrors.name = "Name is required.";
  if (!payload.email) fieldErrors.email = "Email is required.";
  else if (!emailPattern.test(payload.email)) fieldErrors.email = "Enter a valid email address.";
  if (!payload.message) fieldErrors.message = "Project details are required.";
  if (!payload.privacyAccepted) fieldErrors.privacyAccepted = "Privacy consent is required.";
  if (!payload.privacyPolicyVersion) fieldErrors.privacyAccepted = "Privacy policy version is missing.";
  return { payload, fieldErrors, isBot: Boolean(payload.website) };
};
