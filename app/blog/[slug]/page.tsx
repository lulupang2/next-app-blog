import { getPost, getPostList } from '@/libs/markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import PostContents from '@/components/BlogPost/postContents';
import SideToc from '@/components/BlogPost/sidebar';
import { BASE_URL } from '@/constants';

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
export async function generateMetadata({ params }: { params: Params }) {
  const data = await getPost(`${params.slug}.mdx`);

  if (!data)
    return {
      title: 'My Blog Post 📝',
    };

  let { title, date: publishedTime, description, thumbnail } = data.frontmatter;
  let ogImage = thumbnail
    ? thumbnail
    : `${BASE_URL}/og?title=${encodeURIComponent(title)}`;

  return {
    title: data.frontmatter.title ?? 'My Blog Post 📝',
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${BASE_URL}/blog/${params.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
  };
}
export default async function Page({ params }: { params: Params }) {
  const postData = await getPost(`${params.slug}.mdx`);

  if (!postData.source) {
    return <div>No posts found for {params.slug}</div>;
  }

  return (
    <article className="relative container bg-white text-black dark:bg-black dark:text-white py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: postData.frontmatter.title,
            datePublished: postData.frontmatter.date,
            dateModified: postData.frontmatter.date,
            description: postData.frontmatter.description,
            image: postData.frontmatter.thumbnail
              ? `${BASE_URL}${postData.frontmatter.thumbnail}`
              : `/og?title=${encodeURIComponent(postData.frontmatter.title)}`,
            url: `${BASE_URL}/blog/${params.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
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
