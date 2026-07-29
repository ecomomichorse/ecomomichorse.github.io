import { notFound } from "next/navigation";
import Script from "next/script";
import { setRequestLocale } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { TableOfContents } from "@/features/blog/components/table-of-contents";
import { buildMetadata } from "@/lib/metadata";
import { compileMdxComponent } from "@/lib/mdx";
import { jsonLdScript, buildBreadcrumbSchema } from "@/features/seo/lib/json-ld";

const STATIC_SLUGS = ["about", "contact", "privacy-policy", "terms"];

export function generateStaticParams() {
  return STATIC_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await content.getStaticPageBySlug(slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.title, pathname: `/${slug}` });
}

export default async function StaticContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!STATIC_SLUGS.includes(slug)) notFound();

  const page = await content.getStaticPageBySlug(slug);
  if (!page) notFound();

  const MDXContent = await compileMdxComponent(page.body);

  return (
    <Container className="max-w-3xl py-16">
      <Script
        id="ld-json-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={jsonLdScript(
          buildBreadcrumbSchema([
            { name: "首頁", path: "/" },
            { name: page.title, path: `/${slug}` },
          ]),
        )}
      />
      <header className="mb-8">
        <h1 className="text-2xl font-semibold sm:text-3xl">{page.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Date(page.publishedAt).toLocaleDateString("zh-TW")}
          {page.updatedAt && ` · 更新於 ${new Date(page.updatedAt).toLocaleDateString("zh-TW")}`}
        </p>
      </header>

      {page.toc.length > 0 && (
        <div className="mb-8">
          <TableOfContents toc={page.toc} />
        </div>
      )}

      <div className="prose-content">
        <MDXContent />
      </div>
    </Container>
  );
}
