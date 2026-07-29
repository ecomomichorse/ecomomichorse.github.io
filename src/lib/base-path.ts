/**
 * URL path prefix the site is served under (e.g. `/mars` for a GitHub Pages
 * project site at `user.github.io/mars`). Empty string for root deployments.
 * Shared between `next.config.ts` (routing) and client code that builds
 * asset URLs Next can't prefix automatically, like the Pagefind import.
 */
export const BASE_PATH = "/mars";

/**
 * Prefixes a public-asset path with `BASE_PATH`. Needed anywhere `next/image`
 * is used with `images.unoptimized: true` — unlike the optimized loader, the
 * unoptimized one passes `src` straight through without adding `basePath`.
 * Leaves absolute URLs (http/https) untouched.
 */
export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
