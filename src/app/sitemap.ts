import type { MetadataRoute } from "next";
import { content } from "@/content";
import { absoluteUrl } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, tags, categories] = await Promise.all([
    content.getAllArticles(),
    content.getAllTags(),
    content.getAllCategories(),
  ]);

  const staticPaths = ["/", "/blog", "/about", "/privacy-policy", "/terms", "/contact", "/search"];

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      lastModified: article.updatedAt ?? article.publishedAt,
    })),
    ...tags.map((tag) => ({ url: absoluteUrl(`/tag/${tag.slug}`) })),
    ...categories.map((category) => ({ url: absoluteUrl(`/category/${category.slug}`) })),
  ];
}