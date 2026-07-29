import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

/**
 * `siteConfig.url` may include a path (e.g. GitHub Pages project sites like
 * `https://user.github.io/repo`). `new URL(pathname, base)` would discard
 * that path for any absolute `pathname`, so URLs are built by concatenation
 * instead.
 */
export function absoluteUrl(pathname: string) {
  if (/^https?:\/\//.test(pathname)) return pathname;
  const base = siteConfig.url.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function buildMetadata({
  title,
  description,
  pathname,
  locale = siteConfig.locale,
  image,
}: {
  title: string;
  description?: string;
  pathname: string;
  locale?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(pathname);
  const ogImage = image ? absoluteUrl(image) : undefined;
  const resolvedDescription = description ?? siteConfig.description;

  return {
    title,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      locale,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
