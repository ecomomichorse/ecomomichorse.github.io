import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 p-4 sm:gap-x-6 sm:p-5">
      {article.coverImage && (
        <Link
          href={`/blog/${article.slug}`}
          className="relative row-span-2 block size-24 shrink-0 overflow-hidden bg-muted sm:size-28"
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
      <CardHeader className="col-start-2 gap-1 p-0">
        <CardTitle>
          <Link href={`/blog/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-1">{article.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="col-start-2 p-0">
        <time dateTime={article.updatedAt ?? article.publishedAt} className="text-xs text-muted-foreground">
          {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("zh-TW")}
        </time>
      </CardContent>
    </Card>
  );
}
