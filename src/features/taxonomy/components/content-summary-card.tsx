import { Link } from "@/i18n/navigation";
import type { ContentSummary } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function ContentSummaryCard({ item }: { item: ContentSummary }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/blog/${item.slug}`} className="hover:text-primary">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-1">{item.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <time dateTime={item.updatedAt ?? item.publishedAt} className="text-xs text-muted-foreground">
          {new Date(item.updatedAt ?? item.publishedAt).toLocaleDateString("zh-TW")}
        </time>
      </CardContent>
    </Card>
  );
}
