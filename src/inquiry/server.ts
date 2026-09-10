import type { InquiryPayload } from "./types";

export interface InquiryEnvironment {
  RESEND_API_KEY?: string;
  INQUIRY_TO_EMAIL?: string;
  INQUIRY_FROM_EMAIL?: string;
  INQUIRY_ALLOWED_ORIGINS?: string;
  INQUIRY_RATE_LIMITER?: {
    limit(input: { key: string }): Promise<{ success: boolean }>;
  };
}

export interface InquiryEmailContent {
  subject: string;
  text: string;
  html: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const escapeHtml = (value: string) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

export const parseAllowedOrigins = (value: string | undefined) =>
  new Set((value ?? "").split(",").map((item) => item.trim()).filter(Boolean));

export const isAllowedOrigin = (origin: string | null, configured: string | undefined) => {
  if (!origin) return false;
  const allowed = parseAllowedOrigins(configured);
  return allowed.has(origin);
};

export const validateInquiryEnvironment = (env: InquiryEnvironment) => {
  const missing: string[] = [];
  if (!env.RESEND_API_KEY?.trim()) missing.push("RESEND_API_KEY");
  if (!env.INQUIRY_TO_EMAIL?.trim() || !emailPattern.test(env.INQUIRY_TO_EMAIL.trim())) missing.push("INQUIRY_TO_EMAIL");
  if (!env.INQUIRY_FROM_EMAIL?.trim() || !env.INQUIRY_FROM_EMAIL.includes("@")) missing.push("INQUIRY_FROM_EMAIL");
  if (parseAllowedOrigins(env.INQUIRY_ALLOWED_ORIGINS).size === 0) missing.push("INQUIRY_ALLOWED_ORIGINS");
  return missing;
};

const rowEntries = (payload: InquiryPayload, inquiryId: string, receivedAt: string, country?: string) => [
  ["Inquiry ID", inquiryId],
  ["Inquiry type", payload.inquiryType],
  ["Name", payload.name],
  ["Email", payload.email],
  ["Company", payload.company],
  ["Phone", payload.phone],
  ["Product interest", payload.productInterest],
  ["Product category", payload.productCategory],
  ["Cooperation model", payload.cooperationModel],
  ["Destination market", payload.destinationMarket],
  ["Quantity range", payload.quantityRange],
  ["Source page", payload.sourceUrl],
  ["Language", payload.locale],
  ["Country", country],
  ["Submitted at", payload.submittedAt],
  ["Received at", receivedAt],
  ["Privacy policy version", payload.privacyPolicyVersion],
  ["First landing page", payload.firstLandingPage],
  ["First referrer", payload.firstReferrer],
  ["First touch at", payload.firstTouchAt],
  ["Last landing page", payload.lastLandingPage],
  ["Last referrer", payload.lastReferrer],
  ["Last touch at", payload.lastTouchAt],
  ["UTM source", payload.utmSource],
  ["UTM medium", payload.utmMedium],
  ["UTM campaign", payload.utmCampaign],
  ["UTM content", payload.utmContent],
  ["UTM term", payload.utmTerm],
].filter((entry): entry is [string, string] => Boolean(entry[1]));

export const buildInquiryEmail = (
  payload: InquiryPayload,
  inquiryId: string,
  receivedAt: string,
  country?: string,
): InquiryEmailContent => {
  const subject = `[${inquiryId}] ${payload.inquiryType} inquiry from ${payload.company || payload.name}`;
  const rows = rowEntries(payload, inquiryId, receivedAt, country);
  const text = [subject, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", "Project details:", payload.message].join("\n");
  const htmlRows = rows.map(([label, value]) =>
    `<tr><th align="left" style="padding:6px 16px 6px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
  ).join("");
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.55;color:#14212b"><h1 style="font-size:20px">New website inquiry</h1><table style="border-collapse:collapse">${htmlRows}</table><h2 style="margin-top:24px;font-size:14px;text-transform:uppercase">Project details</h2><p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p></div>`;
  return { subject, text, html };
};

export const sendInquiryWithResend = async (
  env: InquiryEnvironment,
  payload: InquiryPayload,
  email: InquiryEmailContent,
) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.INQUIRY_FROM_EMAIL,
      to: [env.INQUIRY_TO_EMAIL],
      reply_to: payload.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });
  return response.ok;
};
