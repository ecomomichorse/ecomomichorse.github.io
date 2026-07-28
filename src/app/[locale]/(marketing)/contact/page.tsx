import { ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  return buildMetadata({ title: t("title"), description: t("description"), pathname: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Container className="max-w-2xl py-16 text-center">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <a
        href={siteConfig.contactFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "mt-8")}
      >
        {t("cta")}
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </Container>
  );
}
