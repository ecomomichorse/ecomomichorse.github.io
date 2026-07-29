import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { setRequestLocale } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { ShareArticle } from "@/features/blog/components/share-article";
import { TableOfContents } from "@/features/blog/components/table-of-contents";
import { TagList } from "@/features/blog/components/tag-list";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import { compileMdxComponent } from "@/lib/mdx";
import { jsonLdScript, buildArticleSchema, buildBreadcrumbSchema } from "@/features/seo/lib/json-ld";

const FALLBACK_COVER = "/images/blog/_fallback.svg";

export async function generateStaticParams() {
  const articles = await content.getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await content.getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    pathname: `/blog/${slug}`,
    image: article.coverImage,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await content.getArticleBySlug(slug);
  if (!article) notFound();

  const MDXContent = await compileMdxComponent(article.body);

  return (
    <Container className="max-w-3xl py-16">
      <Script
        id="ld-json-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(buildArticleSchema(article))}
      />
      <Script
        id="ld-json-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(
          buildBreadcrumbSchema([
            { name: "首頁", path: "/" },
            { name: "文章", path: "/blog" },
            { name: article.title, path: `/blog/${slug}` },
          ]),
        )}
      />

      <header className="mb-8">
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={article.coverImage || FALLBACK_COVER}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{article.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(article.publishedAt).toLocaleDateString("zh-TW")}
          {article.updatedAt &&
            ` · 更新於 ${new Date(article.updatedAt).toLocaleDateString("zh-TW")}`}
        </p>
        <div className="mt-4">
          <TagList tags={article.tags} categories={article.categories} />
        </div>
      </header>

      {article.toc.length > 0 && (
        <div className="mb-8">
          <TableOfContents toc={article.toc} />
        </div>
      )}

      <div className="prose-content">
        <MDXContent />
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center">
        <ShareArticle title={article.title} url={`${siteConfig.url}/blog/${slug}`} />
      </div>
    </Container>
  );
}
