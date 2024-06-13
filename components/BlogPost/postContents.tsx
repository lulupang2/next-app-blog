import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { CompileOptions } from '@mdx-js/mdx';
import { mdxComponents } from '../markdown';
import Comments from '../Comments';
import { InsertComment } from '@/db/schema';
import { Suspense } from 'react';

export default function PostContents({
  source,
  slug,
  comments,
  createComment,
}: {
  source: string;
  slug: string;
  comments: any[];
  createComment(data: InsertComment): Promise<void>;
}) {
  const mdxOptions: Omit<
    CompileOptions,
    'outputFormat' | 'providerImportSource'
  > = {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'dark-plus' }]],
  };

  const options: MDXRemoteProps['options'] = {
    mdxOptions,
  };

  return (
    <section>
      <MDXRemote source={source} options={options} components={mdxComponents} />
      <Suspense fallback={<div>Loading...</div>}>
        <Comments data={comments} createComment={createComment} postId={slug} />
      </Suspense>
    </section>
  );
}
