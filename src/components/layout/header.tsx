import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchButton } from "@/features/search/components/search-button";
import { siteConfig } from "@/lib/constants";

export function Header() {
  const t = useTranslations("nav");

  const links = [
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <Container className="relative flex h-(--header-height) max-w-5xl items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchButton />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
