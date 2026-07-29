/**
 * Pagefind records each result's URL as the crawled file's path relative to
 * `.next/server/app` (e.g. `/blog/my-first-post.html`) — it has no knowledge
 * of Next's actual routing, which strips the `.html` extension. This maps a
 * raw Pagefind URL back to a real, navigable app URL.
 */
export function normalizePagefindUrl(rawUrl: string): string {
  const path = rawUrl.replace(/\.html$/i, "").replace(/\/index$/i, "");
  return path === "" ? "/" : path;
}
