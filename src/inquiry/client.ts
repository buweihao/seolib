import type { InquiryFieldErrors, InquiryResponse } from "./types";

const STORAGE_KEY = "seolib_inquiry_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

interface Touchpoint {
  landingPage: string;
  referrer: string;
  capturedAt: string;
  utm: Record<(typeof UTM_KEYS)[number], string>;
}

interface AttributionState {
  first: Touchpoint;
  last: Touchpoint;
}

const currentTouchpoint = (): Touchpoint => {
  const url = new URL(window.location.href);
  return {
    landingPage: `${url.pathname}${url.search}`.slice(0, 700),
    referrer: document.referrer.slice(0, 700),
    capturedAt: new Date().toISOString(),
    utm: Object.fromEntries(
      UTM_KEYS.map((key) => [key, url.searchParams.get(key)?.slice(0, 200) || ""]),
    ) as Touchpoint["utm"],
  };
};

const readAttribution = (): AttributionState | null => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as AttributionState | null;
  } catch {
    return null;
  }
};

const updateAttribution = () => {
  const touchpoint = currentTouchpoint();
  const existing = readAttribution();
  const value: AttributionState = existing
    ? { ...existing, last: touchpoint }
    : { first: touchpoint, last: touchpoint };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Attribution is optional when browser storage is unavailable.
  }
  return value;
};

const attributionPayload = () => {
  const state = readAttribution();
  if (!state) return {};
  return {
    firstLandingPage: state.first?.landingPage || "",
    firstReferrer: state.first?.referrer || "",
    firstTouchAt: state.first?.capturedAt || "",
    lastLandingPage: state.last?.landingPage || "",
    lastReferrer: state.last?.referrer || "",
    lastTouchAt: state.last?.capturedAt || "",
    utmSource: state.last?.utm?.utm_source || state.first?.utm?.utm_source || "",
    utmMedium: state.last?.utm?.utm_medium || state.first?.utm?.utm_medium || "",
    utmCampaign: state.last?.utm?.utm_campaign || state.first?.utm?.utm_campaign || "",
    utmContent: state.last?.utm?.utm_content || state.first?.utm?.utm_content || "",
    utmTerm: state.last?.utm?.utm_term || state.first?.utm?.utm_term || "",
  };
};

const prefillFromQuery = (form: HTMLFormElement) => {
  const params = new URL(window.location.href).searchParams;
  for (const name of ["productInterest", "productCategory", "destinationMarket", "quantityRange"]) {
    const value = params.get(name)?.trim();
    const control = form.elements.namedItem(name);
    if (!value || !(control instanceof HTMLInputElement || control instanceof HTMLSelectElement) || control.value) continue;
    if (control instanceof HTMLSelectElement && !Array.from(control.options).some((option) => option.value === value)) continue;
    control.value = value.slice(0, 240);
  }
};

const payloadFromForm = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim() || [firstName, lastName].filter(Boolean).join(" ");
  return {
    ...Object.fromEntries(formData.entries()),
    name,
    privacyAccepted: formData.get("privacyAccepted") === "on",
    sourceUrl: window.location.href.slice(0, 700),
    locale: document.documentElement.lang,
    submittedAt: new Date().toISOString(),
    ...(form.dataset.attributionEnabled === "false" ? {} : attributionPayload()),
  };
};

const clearErrors = (form: HTMLFormElement) => {
  form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((node) => { node.textContent = ""; });
  form.querySelectorAll<HTMLElement>("[aria-invalid='true']").forEach((node) => { node.removeAttribute("aria-invalid"); });
};

const fieldControl = (form: HTMLFormElement, field: string) => {
  const direct = form.elements.namedItem(field);
  if (direct instanceof HTMLElement) return direct;
  if (field === "name") {
    const firstName = form.elements.namedItem("firstName");
    if (firstName instanceof HTMLElement) return firstName;
  }
  return null;
};

const showFieldErrors = (form: HTMLFormElement, fieldErrors: InquiryFieldErrors = {}) => {
  for (const [field, message] of Object.entries(fieldErrors)) {
    const error = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
    const control = fieldControl(form, field);
    if (error) error.textContent = message;
    control?.setAttribute("aria-invalid", "true");
  }
  form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
};

const initializeForm = (form: HTMLFormElement) => {
  if (form.dataset.ready === "true") return;
  form.dataset.ready = "true";
  prefillFromQuery(form);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.deliveryDisabled === "true") return;

    const status = form.querySelector<HTMLElement>("[data-inquiry-status]");
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    clearErrors(form);
    if (status) status.textContent = "Sending your inquiry…";
    if (button) button.disabled = true;

    try {
      const response = await fetch(form.dataset.endpoint || form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payloadFromForm(form)),
      });
      const result = await response.json().catch(() => ({ ok: false })) as InquiryResponse;
      if (!response.ok || !result.ok) {
        showFieldErrors(form, result.fieldErrors);
        throw new Error(result.error || "Please review the form and try again.");
      }
      form.reset();
      prefillFromQuery(form);
      if (status) status.textContent = result.inquiryId
        ? `Inquiry sent. Reference: ${result.inquiryId}`
        : "Inquiry sent successfully.";
    } catch (error) {
      if (status) status.textContent = error instanceof Error ? error.message : "Unable to send the inquiry.";
    } finally {
      if (button) button.disabled = false;
    }
  });
};

export const initializeInquiryForms = () => {
  updateAttribution();
  document.querySelectorAll<HTMLFormElement>("[data-inquiry-form]").forEach(initializeForm);
};
