import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { TaxonomyList } from "@/features/taxonomy/components/taxonomy-list";
import { buildMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const tags = await content.getAllTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const t = await getTranslations("taxonomy");
  return buildMetadata({
    title: t("tagTitle", { tag }),
    description: t("tagTitle", { tag }),
    pathname: `/tag/${tag}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag: rawTag } = await params;
  setRequestLocale(locale);
  const tag = decodeURIComponent(rawTag);
  const t = await getTranslations("taxonomy");
  const items = await content.getByTag(tag);
  if (items.length === 0) notFound();

  return (
    <Container className="max-w-5xl py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold sm:text-3xl">{t("tagTitle", { tag })}</h1>
      </header>
      <TaxonomyList items={items} />
    </Container>
  );
}
