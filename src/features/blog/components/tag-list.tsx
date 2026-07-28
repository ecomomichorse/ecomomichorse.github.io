import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";

export function TagList({
  tags,
  categories,
}: {
  tags: string[];
  categories: string[];
}) {
  if (tags.length === 0 && categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link key={category} href={`/category/${encodeURIComponent(category)}`}>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{category}</Badge>
        </Link>
      ))}
      {tags.map((tag) => (
        <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
          <Badge>#{tag}</Badge>
        </Link>
      ))}
    </div>
  );
}
