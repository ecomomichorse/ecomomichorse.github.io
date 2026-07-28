import { BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ContentSummary } from "@/content/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const typeMeta = {
  blog: { icon: BookOpen, label: "文章", href: (slug: string) => `/blog/${slug}` },
} as const;

export function ContentSummaryCard({ item }: { item: ContentSummary }) {
  const meta = typeMeta[item.type];
  const Icon = meta.icon;
  const href = meta.href(item.slug);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Icon className="size-3.5" aria-hidden="true" />
            <span>{meta.label}</span>
          </div>
        </div>
        <CardTitle>
          <Link href={href} className="hover:text-primary">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">{item.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <time dateTime={item.updatedAt ?? item.publishedAt} className="text-xs text-muted-foreground">
          {new Date(item.updatedAt ?? item.publishedAt).toLocaleDateString("zh-TW")}
        </time>
      </CardContent>
    </Card>
  );
}
