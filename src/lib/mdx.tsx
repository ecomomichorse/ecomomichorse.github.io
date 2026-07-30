import * as runtime from "react/jsx-runtime";
import { run, evaluate } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { YouTubeEmbed } from "@next/third-parties/google";
import { withBasePath } from "@/lib/base-path";

/**
 * Velite's `s.mdx()` field compiles MDX into a function-body string; this
 * evaluates it back into a renderable React component at request time.
 */
export async function compileMdxComponent(code: string) {
  const { default: MDXContent } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });
  return MDXContent;
}

/**
 * For MDX fields that don't go through velite (e.g. rich-text in
 * `data/site.json`, which is a plain JSON import, not a content collection)
 * this compiles raw MDX source directly, with the same plugins velite.config.ts
 * uses for content collections so rendering stays consistent site-wide.
 */
export async function compileMdxSource(source: string) {
  const { default: MDXContent } = await evaluate(source, {
    ...runtime,
    baseUrl: import.meta.url,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, { theme: "github-light" }],
    ],
  });
  return MDXContent;
}

/**
 * MDX authors write image paths relative to the site root (e.g.
 * `![alt](/images/foo.png)`), with no knowledge of `basePath` — this
 * prefixes them the same way `withBasePath` does for `next/image` src props.
 */
export const mdxComponents = {
  img: ({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} src={typeof src === "string" ? withBasePath(src) : src} />
  ),
  YouTube: ({ id }: { id: string }) => <YouTubeEmbed videoid={id} params="rel=0" />,
};
