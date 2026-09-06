"use client";

import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

export const analyticsEnabled =
  process.env.NODE_ENV === "production" &&
  (!process.env.NEXT_PUBLIC_VERCEL_ENV ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production");

export function trackConversion(
  event: "subscribe_click" | "namesnap_click",
  source: "newsletter_form" | "newsletter_fallback" | "project_card",
) {
  if (!analyticsEnabled) return;

  // Measurement must never interrupt navigation or the native Substack form.
  try {
    track(event, { source });
  } catch {
    // Ignore unavailable analytics so the visitor can continue.
  }
  try {
    sendGAEvent("event", event, { source });
  } catch {
    // Google Analytics may be blocked or not yet loaded.
  }
}
