import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.url).toString();
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
  const ogImage = image ? new URL(image, siteConfig.url).toString() : undefined;
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
