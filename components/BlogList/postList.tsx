'use client';
import { Suspense, useEffect, useState } from 'react';
import { PostCard } from './post-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
interface Post {
  allPosts: {
    slug: string;
    frontmatter: Frontmatter;
  }[];
}
const PostList = ({ allPosts }: Post) => {
  const [posts, setPosts] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  useEffect(() => {
    setHasMorePosts(allPosts.length > 4);
  }, [allPosts.length]);
  useEffect(() => {
    if (loadMore) {
      const newPosts = allPosts.slice(posts.length, posts.length + 4);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoadMore(false);
      setHasMorePosts(allPosts.length > posts.length + newPosts.length);
    }
  }, [loadMore, allPosts, posts.length]);
  return (
    <div className="flex flex-col  items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      {hasMorePosts && (
        <Suspense fallback={<PostListLoading />}>
          <Button className={cn('m-4')} onClick={() => setLoadMore(true)}>
            더 보기
          </Button>
        </Suspense>
      )}
    </div>
  );
};

const PostListLoading = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Card key={index}>
          <div className="aspect-video rounded-t-md overflow-hidden animate-pulse rounded-md bg-muted" />
          <div className="p-4">
            <div className="w-2/3 pb-6 my-4 bg-muted rounded  animate-pulse" />
            <div className="py-2  bg-muted rounded  animate-pulse" />
            <div className="w-1/4 py-2 mt-2 bg-muted rounded animate-pulse" />
            <div className="w-1/3 py-4 mt-4 bg-muted rounded animate-pulse" />
          </div>
        </Card>
      ))}
    </section>
  );
};

export default PostList;
