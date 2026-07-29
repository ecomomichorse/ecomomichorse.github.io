"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/features/theme/providers/theme-provider";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("theme");
  // The server always renders "light" (it can't know the client's stored
  // preference or OS setting) — gate on mount so the first client render
  // matches SSR exactly, then swap to the real value post-hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? t("light") : t("dark")}
      title={isDark ? t("light") : t("dark")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      suppressHydrationWarning
      className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border bg-muted transition-colors duration-[var(--animate-duration)]"
    >
      <span
        aria-hidden="true"
        suppressHydrationWarning
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-transform duration-[var(--animate-duration)]",
          isDark ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      >
        {isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
      </span>
    </button>
  );
}
