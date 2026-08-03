import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { ArticleList } from "@/features/blog/components/article-list";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";
import { withBasePath } from "@/lib/base-path";
import { compileMdxSource, mdxComponents } from "@/lib/mdx";

export async function generateMetadata() {
  const t = await getTranslations("home");
  return buildMetadata({
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    pathname: "/",
  });
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const latest = await content.getLatestArticles(siteConfig.homepageLatestArticlesLimit);
  const AboutBlogContent = siteConfig.aboutBlog ? await compileMdxSource(siteConfig.aboutBlog) : null;

  return (
    <>
      {siteConfig.heroImage ? (
        <section className="relative flex h-[calc(100vh-var(--header-height)-10px)] w-full items-center overflow-hidden text-center">
          <Image
            src={withBasePath(siteConfig.heroImage)}
            alt={t("heroTitle")}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0" />
          <div className="relative mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
            <h1 className="text-left text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-right text-balance text-[#bee9e7]">{t("heroSubtitle")}</p>
          </div>
        </section>
      ) : null}

      <Container className="max-w-5xl py-16">
        {!siteConfig.heroImage ? (
          <section className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("heroTitle")}</h1>
            <p className="mt-4 text-balance text-muted-foreground">{t("heroSubtitle")}</p>
          </section>
        ) : null}

        <section className={siteConfig.heroImage ? undefined : "mt-16"}>
          <h2 className="mb-6 text-xl font-semibold text-[#d8b4ac]">{t("latest")}</h2>
          <ArticleList articles={latest} />
          <div className="mt-8 text-center">
            <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
              {t("viewAllArticles")}
            </Link>
          </div>
        </section>

        {AboutBlogContent ? (
          <section className="prose-content mt-16 max-w-none! [&_h2]:bg-[#f0f7f9] [&_h2]:text-[#add2e1]">
            <AboutBlogContent components={mdxComponents} />
          </section>
        ) : null}
      </Container>
    </>
  );
}