import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="max-w-xl py-24 text-center">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        {t("backHome")}
      </Link>
    </Container>
  );
}
