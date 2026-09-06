"use client";

import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { analyticsEnabled } from "@/lib/analytics";

export function SiteAnalytics() {
  if (!analyticsEnabled) return null;

  return (
    <>
      <Analytics />
      <GoogleAnalytics gaId="G-T91ZN1PS7M" />
    </>
  );
}
