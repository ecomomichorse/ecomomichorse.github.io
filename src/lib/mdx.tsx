import * as runtime from "react/jsx-runtime";
import { run } from "@mdx-js/mdx";

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
