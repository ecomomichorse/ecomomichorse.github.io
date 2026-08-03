import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { withBasePath } from "@/lib/base-path";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="flex items-start gap-4 py-4 sm:gap-6 sm:py-5">
      {article.coverImage && (
        <Link
          href={`/blog/${article.slug}`}
          className="relative block size-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:size-28"
        >
          <Image
            src={withBasePath(article.coverImage)}
            alt={article.slug}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 112px, 96px"
          />
        </Link>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <CardHeader className="gap-1">
          <CardTitle>
            <Link href={`/blog/${article.slug}`} className="text-[#73808d] hover:text-primary">
              {article.title}
            </Link>
          </CardTitle>
          <CardDescription className="line-clamp-1 text-[#73808d]">{article.excerpt}</CardDescription>
        </CardHeader>
        <CardContent>
          <time dateTime={article.updatedAt ?? article.publishedAt} className="text-xs text-[#73808d]">
            {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("zh-TW")}
          </time>
        </CardContent>
      </div>
    </Card>
  );
}
