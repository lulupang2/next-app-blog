import { getPostList } from '@/libs/markdown';
import { cn } from '@/libs/utils';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import { PostCard } from '@/components/BlogList/post-card';
import PostList from '@/components/BlogList/postList';

export default async function Page() {
  const posts: PostData[] = await getPostList();
  const postData = [...posts];
  const recentlyPost = postData.shift();
  const subPosts = postData.slice(0, 4);
  const morePosts = postData.slice(5);

  if (!posts) return <div>not found post!</div>;
  return (
    <section className="">
      <h1 className="text-4xl font-bold text-center my-8">Blog Posts</h1>
      <div className={cn(styles.container, '')}>
        <div className={cn(styles.recently, '')}>
          <span className={cn(styles.recently_title)}>Recently Post</span>
          <PostCard post={recentlyPost} />
        </div>
        <div className={cn(styles.cardList, '')}>
          {subPosts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </div>
      <div>
        <PostList allPosts={morePosts} />
      </div>
      <div></div>
    </section>
  );
}
