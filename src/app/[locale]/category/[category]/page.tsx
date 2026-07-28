import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { TaxonomyList } from "@/features/taxonomy/components/taxonomy-list";
import { buildMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const categories = await content.getAllCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const t = await getTranslations("taxonomy");
  return buildMetadata({
    title: t("categoryTitle", { category }),
    description: t("categoryTitle", { category }),
    pathname: `/category/${category}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: rawCategory } = await params;
  setRequestLocale(locale);
  const category = decodeURIComponent(rawCategory);
  const t = await getTranslations("taxonomy");
  const items = await content.getByCategory(category);
  if (items.length === 0) notFound();

  return (
    <Container className="max-w-5xl py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold sm:text-3xl">{t("categoryTitle", { category })}</h1>
      </header>
      <TaxonomyList items={items} />
    </Container>
  );
}
