import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="flex items-start gap-4 py-4 sm:gap-6 sm:py-5">
      {article.coverImage && (
        <Link
          href={`/blog/${article.slug}`}
          className="relative block size-24 shrink-0 overflow-hidden bg-muted sm:size-28"
        >
          <Image
            src={article.coverImage}
            alt={article.slug}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 112px, 96px"
          />
        </Link>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <CardHeader className="gap-1 p-0">
          <CardTitle>
            <Link href={`/blog/${article.slug}`} className="hover:text-primary">
              {article.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-1">{article.excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <time dateTime={article.updatedAt ?? article.publishedAt} className="text-xs text-muted-foreground">
            {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("zh-TW")}
          </time>
        </CardContent>
      </div>
    </Card>
  );
}
