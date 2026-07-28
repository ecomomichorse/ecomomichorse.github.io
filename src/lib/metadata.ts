import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/constants";

export function absoluteUrl(pathname: string, locale: string = routing.defaultLocale) {
  const path = getPathname({ locale, href: pathname });
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  locale = routing.defaultLocale,
  image,
}: {
  title: string;
  description?: string;
  pathname: string;
  locale?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(pathname, locale);
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
