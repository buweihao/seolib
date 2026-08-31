import assert from "node:assert/strict";
import test from "node:test";

import { onRequestPost } from "../functions/api/inquiry.ts";

const env = {
  RESEND_API_KEY: "re_test",
  INQUIRY_TO_EMAIL: "sales@example.com",
  INQUIRY_FROM_EMAIL: "Website <inquiry@example.com>",
  INQUIRY_ALLOWED_ORIGINS: "https://client.example",
  INQUIRY_RATE_LIMITER: { limit: async () => ({ success: true }) },
};

const request = (body: Record<string, unknown>, origin = "https://client.example") => new Request("https://client.example/api/inquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Origin": origin, "CF-Connecting-IP": "192.0.2.1" },
  body: JSON.stringify(body),
});

const validBody = {
  inquiryType: "project",
  name: "Buyer",
  email: "buyer@example.com",
  message: "Project details",
  privacyAccepted: true,
  privacyPolicyVersion: "2026-08-12",
};

test("endpoint rejects origins outside the exact allowlist", async () => {
  const response = await onRequestPost({ request: request(validBody, "https://evil.example"), env });
  assert.equal(response.status, 403);
});

test("endpoint returns structured validation errors", async () => {
  const response = await onRequestPost({ request: request({ ...validBody, email: "bad" }), env });
  const body = await response.json() as { fieldErrors?: Record<string, string> };
  assert.equal(response.status, 400);
  assert.equal(body.fieldErrors?.email, "Enter a valid email address.");
});

test("endpoint can deliver on Pages without a Worker-only rate-limit binding", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ id: "email-1" }), { status: 200 });
  try {
    const { INQUIRY_RATE_LIMITER: _unused, ...pagesEnv } = env;
    const response = await onRequestPost({ request: request(validBody), env: pagesEnv });
    assert.equal(response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("endpoint honors an optional rate-limit binding", async () => {
  const response = await onRequestPost({
    request: request(validBody),
    env: { ...env, INQUIRY_RATE_LIMITER: { limit: async () => ({ success: false }) } },
  });
  assert.equal(response.status, 429);
});

test("endpoint sends a sanitized Resend request", async () => {
  const originalFetch = globalThis.fetch;
  let captured: Record<string, unknown> | undefined;
  globalThis.fetch = async (_input, init) => {
    captured = JSON.parse(String(init?.body));
    return new Response(JSON.stringify({ id: "email-1" }), { status: 200 });
  };
  try {
    const response = await onRequestPost({ request: request({
      ...validBody,
      message: "<b>Project</b>",
      productCategory: "facial-skincare",
      cooperationModel: "odm",
    }), env });
    const body = await response.json() as { ok: boolean; inquiryId?: string };
    assert.equal(response.status, 200);
    assert.equal(body.ok, true);
    assert.equal(typeof body.inquiryId, "string");
    assert.equal(captured?.reply_to, "buyer@example.com");
    assert.equal(String(captured?.html).includes("<b>Project</b>"), false);
    assert.equal(String(captured?.html).includes("&lt;b&gt;Project&lt;/b&gt;"), true);
    assert.equal(String(captured?.html).includes("facial-skincare"), true);
    assert.equal(String(captured?.html).includes("odm"), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("endpoint returns a delivery error when Resend is unavailable", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("network unavailable"); };
  try {
    const response = await onRequestPost({ request: request(validBody), env });
    const body = await response.json() as { ok: boolean; error?: string };
    assert.equal(response.status, 502);
    assert.equal(body.ok, false);
    assert.equal(body.error, "Unable to deliver the inquiry right now.");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
