import * as runtime from "react/jsx-runtime";
import { run } from "@mdx-js/mdx";
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
 * MDX authors write image paths relative to the site root (e.g.
 * `![alt](/images/foo.png)`), with no knowledge of `basePath` — this
 * prefixes them the same way `withBasePath` does for `next/image` src props.
 */
export const mdxComponents = {
  img: ({ src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} src={typeof src === "string" ? withBasePath(src) : src} />
  ),
  YouTube: ({ id }: { id: string }) => (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  ),
};
