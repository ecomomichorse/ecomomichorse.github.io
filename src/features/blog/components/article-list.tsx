import type { Article } from "@/content/types";
import { ArticleCard } from "@/features/blog/components/article-card";

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
