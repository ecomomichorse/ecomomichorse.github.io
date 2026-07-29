import { BASE_PATH } from "@/lib/base-path";

/**
 * Pagefind records each result's URL as the crawled file's path relative to
 * the static export root (e.g. `/blog/my-first-post.html`) — it has no
 * knowledge of Next's actual routing (which strips the `.html` extension) or
 * `basePath` (the export folder on disk never contains it). This maps a raw
 * Pagefind URL back to a real, navigable app URL.
 */
export function normalizePagefindUrl(rawUrl: string): string {
  const path = rawUrl.replace(/\.html$/i, "").replace(/\/index$/i, "");
  return `${BASE_PATH}${path === "" ? "/" : path}`;
}
