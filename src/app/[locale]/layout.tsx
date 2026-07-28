import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { notoSansTC, inter } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";
import { themeScript } from "@/features/theme/lib/theme-script";
import { ThemeProvider } from "@/features/theme/providers/theme-provider";
import { AnalyticsGate } from "@/features/consent/components/analytics-gate";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import {
  buildOrganizationSchema,
  buildPersonSchema,
  buildWebsiteSchema,
  jsonLdScript,
} from "@/features/seo/lib/json-ld";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={`${notoSansTC.variable} ${inter.variable}`}>
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          id="ld-json-root"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={jsonLdScript({
            "@graph": [buildOrganizationSchema(), buildPersonSchema(), buildWebsiteSchema()],
          })}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <SkipLink />
            <Header />
            <main id="main-content" data-pagefind-body>
              {children}
            </main>
            <Footer />
            <AnalyticsGate />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
