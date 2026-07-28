import { blog, pages } from "#content";
import type { ContentRepository as ContentRepositoryType } from "@/content/repository.interface";
import type { Article, ContentSummary, StaticPage, TaxonomyTerm } from "@/content/types";

function byPublishedDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

/** An item is published once it isn't a draft and its publish date has arrived. */
function isPublished(item: { draft: boolean; publishedAt: string }): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return !item.draft && new Date(item.publishedAt).getTime() <= Date.now();
}

function toSummary(item: Article): ContentSummary {
  const { type, slug, title, excerpt, coverImage, publishedAt, updatedAt, draft, tags, categories } = item;
  return { type, slug, title, excerpt, coverImage, publishedAt, updatedAt, draft, tags, categories };
}

function countTerms(items: ContentSummary[], key: "tags" | "categories"): TaxonomyTerm[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const term of item[key]) {
      counts.set(term, (counts.get(term) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

class VeliteRepository implements ContentRepositoryType {
  async getAllArticles(): Promise<Article[]> {
    return blog.filter(isPublished).sort(byPublishedDesc);
  }

  async getLatestArticles(limit = 6): Promise<Article[]> {
    return (await this.getAllArticles()).slice(0, limit);
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const post = blog.find((post) => post.slug === slug) ?? null;
    return post && isPublished(post) ? post : null;
  }

  async getStaticPageBySlug(slug: string): Promise<StaticPage | null> {
    return pages.find((page) => page.slug === slug) ?? null;
  }

  private async getAllSummaries(): Promise<ContentSummary[]> {
    return (await this.getAllArticles()).map(toSummary).sort(byPublishedDesc);
  }

  async getByTag(tag: string): Promise<ContentSummary[]> {
    return (await this.getAllSummaries()).filter((item) => item.tags.includes(tag));
  }

  async getByCategory(category: string): Promise<ContentSummary[]> {
    return (await this.getAllSummaries()).filter((item) => item.categories.includes(category));
  }

  async getAllTags(): Promise<TaxonomyTerm[]> {
    return countTerms(await this.getAllSummaries(), "tags");
  }

  async getAllCategories(): Promise<TaxonomyTerm[]> {
    return countTerms(await this.getAllSummaries(), "categories");
  }
}

export const veliteRepository = new VeliteRepository();
