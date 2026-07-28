"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function ShareArticle({ title, url }: { title: string; url: string }) {
  const t = useTranslations("blog");
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard access denied or unavailable — nothing more we can do.
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Button type="button" variant="outline" onClick={handleShare}>
        <Share2 className="size-4" aria-hidden="true" />
        {t("share")}
      </Button>
      <p className="text-sm text-success" aria-live="polite">
        {copied ? t("linkCopied") : ""}
      </p>
    </div>
  );
}
