import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("footer");
  const year = "2026";

  return (
    <footer className="border-t border-border">
      <Container className="flex max-w-5xl flex-col items-center gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {year} {siteConfig.name}. {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy-policy" className="hover:text-foreground">
            {t("privacyPolicy")}
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            {t("terms")}
          </Link>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
