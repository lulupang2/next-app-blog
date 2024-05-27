import { getPost, getPostList } from '@/libs/markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import PostContents from '@/components/BlogPost/postContents';
import SideToc from '@/components/BlogPost/sidebar';

interface Params {
  slug: string;
}
export async function generateStaticParams() {
  const posts = await getPostList();
  return posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Partial<Frontmatter>> {
  const data = await getPost(`${params.slug}.mdx`);

  if (!data)
    return {
      title: 'My Blog Post 📝',
    };

  return {
    title: data.frontmatter.title ?? 'My Blog Post 📝',
  };
}
export default async function Page({ params }: { params: Params }) {
  const postData = await getPost(`${params.slug}.mdx`);

  if (!postData.source) {
    return <div>No posts found for {params.slug}</div>;
  }

  return (
    <article className="relative container bg-white text-black dark:bg-black dark:text-white py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <PostContents source={postData.source} />
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <ScrollArea className="pb-10">
            <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
              <SideToc data={postData.toc} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </article>
  );
}
