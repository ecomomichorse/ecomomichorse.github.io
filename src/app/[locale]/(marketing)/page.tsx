import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { content } from "@/content";
import { Container } from "@/components/layout/container";
import { ArticleList } from "@/features/blog/components/article-list";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("home");
  return buildMetadata({
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    pathname: "/",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const latest = await content.getLatestArticles(siteConfig.homepageLatestArticlesLimit);

  return (
    <Container className="max-w-5xl py-16">
      {siteConfig.heroImage ? (
        <section className="relative mx-auto max-w-2xl overflow-hidden rounded-lg text-center">
          <Image src={siteConfig.heroImage} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative px-6 py-20 sm:py-24">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-balance text-white/90">{t("heroSubtitle")}</p>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("heroTitle")}</h1>
          <p className="mt-4 text-balance text-muted-foreground">{t("heroSubtitle")}</p>
        </section>
      )}

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold">{t("latest")}</h2>
        <ArticleList articles={latest} />
        <div className="mt-8 text-center">
          <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
            {t("viewAllArticles")}
          </Link>
        </div>
      </section>
    </Container>
  );
}