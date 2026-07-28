"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/content/types";

// Fixed indentation added per heading level below the top level (H1).
const INDENT_STEP_REM = 1;

type FlatTocItem = TocItem & { level: number };

function flatten(items: TocItem[], level = 1): FlatTocItem[] {
  return items.flatMap((item) => [
    { ...item, level },
    ...(item.items ? flatten(item.items, level + 1) : []),
  ]);
}

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  const t = useTranslations("blog");
  const items = flatten(toc);
  const [open, setOpen] = useState(true);

  if (items.length === 0) return null;

  return (
    <nav aria-label={t("tableOfContents")} className="rounded-2xl border border-border p-4">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold">{t("tableOfContents")}</span>
        <ChevronDown
          className={cn("size-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul className="mt-2 space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.url} style={{ paddingInlineStart: `${(item.level - 1) * INDENT_STEP_REM}rem` }}>
              <a href={item.url} className="text-muted-foreground hover:text-primary">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
