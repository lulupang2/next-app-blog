import { PostListLoading } from "@/components/post-list";
import { getPostList } from "@/libs/markdown";
import dynamic from "next/dynamic";

const PostList = dynamic(() => import("@/components/post-list"), {
  loading: () => <PostListLoading />,
});

export default async function Page() {
  const posts = await getPostList();
  const postData = posts
    .filter((date) => date)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  if (!posts) return <div>not found post!</div>;
  return (
    <section>
      <PostList posts={postData} />
    </section>
  );
}
