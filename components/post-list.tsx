import Image from "next/image";
import Link from "next/link";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
interface Post {
  posts: {
    slug: string;
    frontmatter: Frontmatter;
  }[];
}
const PostList = ({ posts }: Post) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <Card key={index}>
          <Link href={`/blog/${post.slug}`} passHref>
            <div className="relative aspect-video rounded-t-md overflow-hidden w-full">
              <Image
                src={post.frontmatter.thumbnail}
                alt={post.frontmatter.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-all hover:scale-105"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/blog/${post.slug}`} passHref>
              <h2 className="text-lg font-semibold">
                {post.frontmatter.title}
              </h2>
              <p className="text-gray-700">{post.frontmatter.description}</p>
              <p className="text-gray-500 text-sm">
                {post.frontmatter.date.toString()}
              </p>
            </Link>
            <Link href={`/blog/${post.slug}`} passHref>
              <Button className="mt-4">Read More</Button>
            </Link>
          </div>
        </Card>
      ))}
    </section>
  );
};

export const PostListLoading = () => {
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
