"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getStoredConsent, setStoredConsent, type ConsentValue } from "@/features/consent/lib/consent-storage";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner({
  onDecision,
}: {
  onDecision: (value: ConsentValue) => void;
}) {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("consent");

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  function decide(value: ConsentValue) {
    setStoredConsent(value);
    onDecision(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-4 backdrop-blur supports-backdrop-filter:bg-background/80"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-muted-foreground sm:text-left">{t("message")}</p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" onClick={() => decide("denied")}>
            {t("reject")}
          </Button>
          <Button size="sm" onClick={() => decide("granted")}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
