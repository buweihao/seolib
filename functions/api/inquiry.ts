import { buildInquiryEmail, isAllowedOrigin, sendInquiryWithResend, validateInquiryEnvironment, type InquiryEnvironment } from "../../src/inquiry/server.ts";
import { validateInquiryPayload } from "../../src/inquiry/validation.ts";
import type { InquiryResponse } from "../../src/inquiry/types.ts";

interface FunctionContext {
  request: Request;
  env: InquiryEnvironment;
}

const responseHeaders = (origin?: string | null) => ({
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Vary": "Origin",
  ...(origin ? { "Access-Control-Allow-Origin": origin } : {}),
});

const json = (body: InquiryResponse, status = 200, origin?: string | null) =>
  new Response(JSON.stringify(body), { status, headers: responseHeaders(origin) });

const readInput = async (request: Request): Promise<Record<string, unknown>> => {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return await request.json() as Record<string, unknown>;
  if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries((await request.formData()).entries());
  }
  throw new Error("Unsupported content type");
};

export const onRequestOptions = async ({ request, env }: FunctionContext) => {
  const origin = request.headers.get("Origin");
  if (!isAllowedOrigin(origin, env.INQUIRY_ALLOWED_ORIGINS)) return json({ ok: false, error: "Origin not allowed." }, 403);
  return new Response(null, {
    status: 204,
    headers: {
      ...responseHeaders(origin),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "600",
    },
  });
};

export const onRequestPost = async ({ request, env }: FunctionContext) => {
  const origin = request.headers.get("Origin");
  if (!isAllowedOrigin(origin, env.INQUIRY_ALLOWED_ORIGINS)) return json({ ok: false, error: "Origin not allowed." }, 403);

  const missingEnvironment = validateInquiryEnvironment(env);
  if (missingEnvironment.length > 0) {
    console.error("[inquiry] Required delivery configuration is missing.");
    return json({ ok: false, error: "Inquiry delivery is not configured." }, 503, origin);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const userAgent = (request.headers.get("User-Agent") ?? "unknown").slice(0, 120);
  const rate = await env.INQUIRY_RATE_LIMITER!.limit({ key: `${ip}|${userAgent}` });
  if (!rate.success) return json({ ok: false, error: "Too many requests. Please try again later." }, 429, origin);

  let input: Record<string, unknown>;
  try {
    input = await readInput(request);
  } catch {
    return json({ ok: false, error: "Unable to process the inquiry." }, 400, origin);
  }

  const { payload, fieldErrors, isBot } = validateInquiryPayload(input);
  if (isBot) return json({ ok: true }, 200, origin);
  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, error: "Please review the highlighted fields.", fieldErrors }, 400, origin);
  }

  const inquiryId = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const country = request.headers.get("CF-IPCountry") ?? undefined;
  const email = buildInquiryEmail(payload, inquiryId, receivedAt, country);
  try {
    const sent = await sendInquiryWithResend(env, payload, email);
    if (!sent) {
      console.error("[inquiry] Resend rejected the delivery request.");
      return json({ ok: false, error: "Unable to deliver the inquiry right now." }, 502, origin);
    }
    return json({ ok: true, inquiryId }, 200, origin);
  } catch {
    console.error("[inquiry] Resend delivery request failed.");
    return json({ ok: false, error: "Unable to deliver the inquiry right now." }, 502, origin);
  }
};

export const onRequestGet = () => json({ ok: false, error: "Method not allowed." }, 405);
