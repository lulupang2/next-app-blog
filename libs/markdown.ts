import { readFile, readdir } from "fs/promises";
import matter from 'gray-matter';
import path from "path";
import { remark } from "remark";
import remarkFlexibleToc, { TocItem } from "remark-flexible-toc";

const getPostData = async (
  filename: string,
  includeSource = false
): Promise<PostData> => {
  // const fileData = await getFileSource(filename);
  const fileData = await readFile(path.join(process.cwd(), "posts", filename), "utf-8");
  const { content, data } = matter(fileData);
  const slug = filename.replace(/\.mdx?$/, "");
  const result: PostData = {
    slug,
    frontmatter: data as Frontmatter,
    source: includeSource ? content : undefined,
  };
  return result;
};
export const getPostList = async () => {
  const postList = await readdir(path.join(process.cwd(), "posts"));
  const files = postList.filter((filename) => path.extname(filename) === ".mdx")
  const result = Promise.all(files.map((filename) => getPostData(filename)));
  return result
};

export const getPost = async (filename: string) => {
  const { frontmatter, slug, source } = await getPostData(filename, true);
  const toc = (await remark().use(remarkFlexibleToc).process(source)).data.toc;
  const result = {
    slug,
    frontmatter,
    toc: toc as TocItem[],
    source,
  };
  return result;
};
