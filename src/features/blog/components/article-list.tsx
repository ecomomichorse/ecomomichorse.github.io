import type { Article } from "@/content/types";
import { ArticleCard } from "@/features/blog/components/article-card";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
