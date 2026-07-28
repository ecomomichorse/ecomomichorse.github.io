import { routing } from "@/i18n/routing";

/**
 * Pagefind records each result's URL as the crawled file's path relative to
 * `.next/server/app` (e.g. `/zh-TW/blog/my-first-post.html`) —
 * it has no knowledge of Next's actual routing, which strips the `.html`
 * extension and, under `localePrefix: "as-needed"`, the default locale's
 * prefix. This maps a raw Pagefind URL back to a real, navigable app URL.
 */
export function normalizePagefindUrl(rawUrl: string): string {
  let path = rawUrl.replace(/\.html$/i, "").replace(/\/index$/i, "");

  const segments = path.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (first && (routing.locales as readonly string[]).includes(first) && first === routing.defaultLocale) {
    path = `/${rest.join("/")}`;
  }

  return path === "" ? "/" : path;
}
