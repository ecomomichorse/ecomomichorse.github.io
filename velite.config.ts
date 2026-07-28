import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import readingTime from "reading-time";
import { siteConfig } from "./src/lib/constants";

const tocSchema = () => s.toc({ maxDepth: siteConfig.tocMaxDepth });

const taxonomy = {
  tags: s.array(s.string()).default([]),
  categories: s.array(s.string()).default([]),
};

/** Word count of the raw MDX body, for JSON-LD `wordCount`. */
const wordCountSchema = () =>
  s.custom<number | undefined>((v) => v === undefined || typeof v === "number").transform((_value, { meta }) => {
    return readingTime(meta.content ?? "").words;
  });

const blog = defineCollection({
  name: "Blog",
  pattern: "blog/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(200),
      excerpt: s.string().max(400),
      coverImage: s.string().optional(),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      draft: s.boolean().default(false),
      ...taxonomy,
      body: s.mdx(),
      wordCount: wordCountSchema(),
      toc: tocSchema(),
    })
    .transform((data) => ({
      ...data,
      type: "blog" as const,
      slug: data.slug.split("/").pop()!,
    })),
});

const pages = defineCollection({
  name: "Page",
  pattern: "*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(200),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      body: s.mdx(),
      toc: tocSchema(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug.split("/").pop()!,
    })),
});

export default defineConfig({
  root: "content",
  collections: { blog, pages },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, { theme: "github-light" }],
    ],
  },
});
