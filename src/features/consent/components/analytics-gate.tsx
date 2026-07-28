"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getStoredConsent, type ConsentValue } from "@/features/consent/lib/consent-storage";
import { CookieConsentBanner } from "@/features/consent/components/cookie-consent-banner";
import { siteConfig } from "@/lib/constants";

export function AnalyticsGate() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  if (!siteConfig.gaId) return null;

  return (
    <>
      <CookieConsentBanner onDecision={setConsent} />
      {consent === "granted" && <GoogleAnalytics gaId={siteConfig.gaId} />}
    </>
  );
}
