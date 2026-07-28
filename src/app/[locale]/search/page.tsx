"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Input } from "@/components/ui/input";
import { normalizePagefindUrl } from "@/features/search/lib/normalize-pagefind-url";

interface PagefindResult {
  id: string;
  data: () => Promise<{ url: string; meta: { title?: string }; excerpt: string }>;
}
interface PagefindApi {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

export default function SearchPage() {
  const t = useTranslations("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ url: string; title: string; excerpt: string }>>(
    [],
  );
  const pagefindRef = useRef<PagefindApi | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!ready || !pagefindRef.current || query.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    async function run() {
      const { results: rawResults } = await pagefindRef.current!.search(query);
      const items = await Promise.all(
        rawResults.map(async (r) => {
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

  return (
    <Container className="max-w-2xl py-16">
      <Input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
      />
      <ul className="mt-6 space-y-3">
        {query.trim().length >= 2 && results.length === 0 && (
          <li className="text-sm text-muted-foreground">{t("noResults")}</li>
        )}
        {results.map((result) => (
          <li key={result.url} className="rounded-2xl border border-border p-4">
            <a href={result.url} className="text-sm font-medium hover:text-primary">
              {result.title}
            </a>
            <p
              className="mt-1 text-xs text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: result.excerpt }}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
}
