import { getPost, getPostList } from '@/libs/markdown';
import { ScrollArea } from '@/components/ui/scroll-area';
import PostContents from '@/components/BlogPost/postContents';
import SideToc from '@/components/BlogPost/sidebar';
import { BASE_URL } from '@/constants';
import Comments from '@/components/Comments';
import { InsertComment, SelectComment, postComment } from '@/db/schema';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface Params {
  slug: string;
}
export async function generateStaticParams() {
  const posts = await getPostList();
  return posts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Params }) {
  const data = await getPost(`${params.slug}.mdx`);
  if (!data) return { title: 'My Blog Post 📝' };

  const {
    title,
    date: publishedTime,
    description,
    thumbnail,
  } = data.frontmatter;
  const ogImage = thumbnail
    ? thumbnail
    : `${BASE_URL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${BASE_URL}/blog/${params.slug}`,
      images: [{ url: ogImage }],
    },
    metadataBase: new URL('https://blog.jisung.pro'),
  };
}

async function getCommentsById(slug: SelectComment['postId']) {
  return db.select().from(postComment).where(eq(postComment.postId, slug));
}
async function createComment(data: InsertComment) {
  'use server';
  try {
    await db.insert(postComment).values(data);
    revalidatePath('/blog/[slug]', 'page');
  } catch (e) {
    console.error(e);
  }
}
export default async function Page({ params }: { params: Params }) {
  const postData = await getPost(`${params.slug}.mdx`);
  const commentData = await getCommentsById(params.slug);

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
              name: 'Jisung Blog',
            },
          }),
        }}
      />
      <PostContents
        source={postData.source}
        slug={params.slug}
        comments={commentData}
        createComment={createComment}
      />

      <SideToc data={postData.toc} />
    </article>
  );
}
