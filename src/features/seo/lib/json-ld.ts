import { siteConfig } from "@/lib/constants";
import { absoluteUrl } from "@/lib/metadata";
import type { Article } from "@/content/types";

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function buildPersonSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}#person`,
    name: siteConfig.author.name,
    description: siteConfig.author.bio,
    url: siteConfig.url,
  };
}

export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleSchema(article: Article) {
  return {
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    wordCount: article.wordCount,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    image: article.coverImage ? absoluteUrl(article.coverImage) : undefined,
    author: buildPersonSchema(),
    publisher: buildOrganizationSchema(),
  };
}

export function jsonLdScript(schema: object) {
  return {
    __html: JSON.stringify({ "@context": "https://schema.org", ...schema }),
  };
}
