"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { normalizePagefindUrl } from "@/features/search/lib/normalize-pagefind-url";

interface PagefindResult {
  id: string;
  data: () => Promise<{ url: string; meta: { title?: string }; excerpt: string }>;
}

interface PagefindApi {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("search");
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ url: string; title: string; excerpt: string }>
  >([]);
  const [ready, setReady] = useState(false);
  const pagefindRef = useRef<PagefindApi | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();

    async function loadPagefind() {
      try {
        // @ts-expect-error -- generated at build time, not present during dev/type-check
        const mod = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
        pagefindRef.current = mod as PagefindApi;
        setReady(true);
      } catch {
        setReady(false);
      }
    }
    void loadPagefind();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!ready || !pagefindRef.current || query.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    async function run() {
      const { results: rawResults } = await pagefindRef.current!.search(query);
      const items = await Promise.all(
        rawResults.slice(0, 8).map(async (r) => {
          const data = await r.data();
          const url = normalizePagefindUrl(data.url);
          return { url, title: data.meta.title ?? url, excerpt: data.excerpt };
        }),
      );
      if (!cancelled) setResults(items);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [query, ready]);

  return createPortal(
    <div className="fixed inset-0 z-50 h-screen flex items-center justify-center bg-background/50 p-4 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("placeholder")}
        className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-border bg-background shadow-lg"
      >
        <div className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b border-border bg-background p-4">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {query.trim().length >= 2 && (
            <ul className="w-full space-y-1">
              {results.length === 0 ? (
                <li className="p-3 text-sm text-muted-foreground">{t("noResults")}</li>
              ) : (
                results.map((result) => (
                  <li key={result.url}>
                    <a
                      href={result.url}
                      className="block rounded-lg p-3 hover:bg-muted"
                      onClick={onClose}
                    >
                      <p className="text-sm font-medium">{result.title}</p>
                      <p
                        className="mt-0.5 line-clamp-2 text-xs text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </a>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
