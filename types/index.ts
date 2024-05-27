type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  thumbnail: string;
  tags: string;
};
type PostData = {
  slug: string;
  frontmatter: Frontmatter;
  source?: string;
};
