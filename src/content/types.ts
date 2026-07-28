export type ContentType = "blog";

export interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

/**
 * Shared shape every content type reduces to for tag/category (taxonomy) purposes.
 * Any future content type should map onto this to automatically participate in
 * the cross-type /tag/[tag] and /category/[category] pages.
 */
export interface ContentSummary {
  type: ContentType;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  draft: boolean;
  tags: string[];
  categories: string[];
}

export interface Article extends ContentSummary {
  type: "blog";
  body: string;
  wordCount: number;
  toc: TocItem[];
}

export interface StaticPage {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  body: string;
  toc: TocItem[];
}

export interface TaxonomyTerm {
  slug: string;
  count: number;
}
