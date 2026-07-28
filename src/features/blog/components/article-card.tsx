import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FALLBACK_COVER = "/images/blog/_fallback.svg";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <Link href={`/blog/${article.slug}`}>
        <div className="relative aspect-video w-full bg-muted">
          <Image
            src={article.coverImage || FALLBACK_COVER}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle>
          <Link href={`/blog/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <time dateTime={article.updatedAt ?? article.publishedAt} className="text-xs text-muted-foreground">
          {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("zh-TW")}
        </time>
      </CardContent>
    </Card>
  );
}
