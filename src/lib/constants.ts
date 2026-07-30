import { env } from "@/lib/env";
import site from "../../data/site.json";

/**
 * Editorial branding (name/description/author/socials) lives in
 * `data/site.json` so clients can edit it via Pages CMS. Deploy-time config
 * (URL, analytics) stays in environment variables.
 */
export const siteConfig = {
  name: site.name,
  url: env.NEXT_PUBLIC_SITE_URL,
  description: site.description,
  heroImage: site.heroImage || undefined,
  locale: "zh-TW",
  author: {
    name: site.author.name,
    bio: site.author.bio,
    avatar: "/images/avatar.png",
  },
  socials: site.socials,
  /** Raw MDX source for the homepage "about this blog" section; see `compileMdxSource`. */
  aboutBlog: site.aboutBlog || undefined,
  gaId: env.NEXT_PUBLIC_GA_ID,
  /**
   * Maximum heading level included in generated tables of contents.
   * Supported range is 1–6 (H1–H6); defaults to 3 (H1–H3) when unset.
   */
  tocMaxDepth: 3,
  /**
   * Number of articles shown in the "latest" section on the homepage.
   */
  homepageLatestArticlesLimit: site.homepageLatestArticlesLimit,
} as const;
