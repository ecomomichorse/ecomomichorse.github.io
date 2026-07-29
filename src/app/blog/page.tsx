import { getTranslations } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { ArticleList } from "@/features/blog/components/article-list";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const t = await getTranslations("blog");
  return buildMetadata({ title: t("title"), description: t("title"), pathname: "/blog" });
}

export default async function BlogIndexPage() {
  const t = await getTranslations("blog");
  const articles = await content.getAllArticles();

  return (
    <Container className="max-w-5xl py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold sm:text-3xl">{t("title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("count", { count: articles.length })}</p>
      </header>
      <ArticleList articles={articles} />
    </Container>
  );
}
