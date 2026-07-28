import type { ContentSummary } from "@/content/types";
import { ContentSummaryCard } from "@/features/taxonomy/components/content-summary-card";

export function TaxonomyList({ items }: { items: ContentSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ContentSummaryCard key={`${item.type}-${item.slug}`} item={item} />
      ))}
    </div>
  );
}
