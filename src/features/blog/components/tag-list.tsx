import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
          <Badge>#{tag}</Badge>
        </Link>
      ))}
    </div>
  );
}
