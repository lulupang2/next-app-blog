
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { MDXRemote, MDXRemoteProps,  } from "next-mdx-remote/rsc";
import { CompileOptions } from '@mdx-js/mdx';
import { components } from "./md/components";

export default function PostContents({ source }: { source: string }) {
  const mdxOptions: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> = {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "dark-plus" }]],
  };

  const options: MDXRemoteProps["options"] = {
    mdxOptions,
    scope: components,
    
  };

  return (
    <section>
      <MDXRemote source={source} options={options} components={components} />
      </section>
  );
}
