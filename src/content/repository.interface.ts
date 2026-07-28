import type { Article, ContentSummary, StaticPage, TaxonomyTerm } from "@/content/types";

/**
 * The only interface pages/components should depend on. Swapping the content
 * source (e.g. to a headless CMS) means implementing this interface again and
 * changing the single export in `src/content/index.ts` — no page changes.
 */
export interface ContentRepository {
  getAllArticles(): Promise<Article[]>;
  getLatestArticles(limit?: number): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;

  getStaticPageBySlug(slug: string): Promise<StaticPage | null>;

  /** Cross-content-type taxonomy: sorted by publishedAt desc. */
  getByTag(tag: string): Promise<ContentSummary[]>;
  getByCategory(category: string): Promise<ContentSummary[]>;
  getAllTags(): Promise<TaxonomyTerm[]>;
  getAllCategories(): Promise<TaxonomyTerm[]>;
}
