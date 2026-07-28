import { veliteRepository } from "@/content/velite-repository";
import type { ContentRepository } from "@/content/repository.interface";

export const content: ContentRepository = veliteRepository;
export type { Article, StaticPage, ContentSummary, TaxonomyTerm } from "@/content/types";
