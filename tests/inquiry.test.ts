import assert from "node:assert/strict";
import test from "node:test";

import { buildInquiryEmail, escapeHtml, isAllowedOrigin, validateInquiryEnvironment } from "../src/inquiry/server.ts";
import { validateInquiryPayload } from "../src/inquiry/validation.ts";

const validInput = {
  inquiryType: "project",
  name: "Buyer Name",
  email: "buyer@example.com",
  message: "We need a serum project.",
  privacyAccepted: true,
  privacyPolicyVersion: "2026-08-12",
};

test("inquiry validation normalizes valid input", () => {
  const result = validateInquiryPayload(validInput);
  assert.deepEqual(result.fieldErrors, {});
  assert.equal(result.payload.email, "buyer@example.com");
  assert.equal(result.isBot, false);
});

test("inquiry validation rejects invalid required fields and consent", () => {
  const result = validateInquiryPayload({ name: "", email: "bad", message: "", privacyAccepted: false });
  assert.equal(result.fieldErrors.name, "Name is required.");
  assert.equal(result.fieldErrors.email, "Enter a valid email address.");
  assert.equal(result.fieldErrors.message, "Project details are required.");
  assert.equal(result.fieldErrors.privacyAccepted, "Privacy policy version is missing.");
});

test("honeypot submissions are detected without exposing bot handling", () => {
  const result = validateInquiryPayload({ ...validInput, website: "spam.example" });
  assert.equal(result.isBot, true);
});

test("origin checks require an exact allowlist match", () => {
  assert.equal(isAllowedOrigin("https://client.example", "https://client.example,https://www.client.example"), true);
  assert.equal(isAllowedOrigin("https://evil.example", "https://client.example"), false);
  assert.equal(isAllowedOrigin(null, "https://client.example"), false);
});

test("delivery environment validation fails closed", () => {
  assert.deepEqual(validateInquiryEnvironment({}), [
    "RESEND_API_KEY",
    "INQUIRY_TO_EMAIL",
    "INQUIRY_FROM_EMAIL",
    "INQUIRY_ALLOWED_ORIGINS",
  ]);
  assert.deepEqual(validateInquiryEnvironment({
    RESEND_API_KEY: "re_test",
    INQUIRY_TO_EMAIL: "sales@example.com",
    INQUIRY_FROM_EMAIL: "Website <inquiry@example.com>",
    INQUIRY_ALLOWED_ORIGINS: "https://example.com",
    INQUIRY_RATE_LIMITER: { limit: async () => ({ success: true }) },
  }), []);
});

test("inquiry fields retain product and cooperation context", () => {
  const result = validateInquiryPayload({
    ...validInput,
    productInterest: "Barrier serum",
    productCategory: "facial-care",
    cooperation: "odm",
  });
  assert.equal(result.payload.productInterest, "Barrier serum");
  assert.equal(result.payload.productCategory, "facial-care");
  assert.equal(result.payload.cooperationModel, "odm");
});

test("email content escapes visitor-controlled HTML", () => {
  const payload = validateInquiryPayload({ ...validInput, name: "<script>alert(1)</script>", message: "<b>unsafe</b>" }).payload;
  const email = buildInquiryEmail(payload, "id-1", "2026-08-12T00:00:00.000Z");
  assert.equal(email.html.includes("<script>"), false);
  assert.equal(email.html.includes("&lt;script&gt;"), true);
  assert.equal(escapeHtml('A&B<"'), "A&amp;B&lt;&quot;");
});
