import type { ContentSummary } from "@/content/types";
import { ContentSummaryCard } from "@/features/taxonomy/components/content-summary-card";

export function TaxonomyList({ items }: { items: ContentSummary[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      {items.map((item) => (
        <ContentSummaryCard key={`${item.type}-${item.slug}`} item={item} />
      ))}
    </div>
  );
}
