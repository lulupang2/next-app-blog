type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  thumbnail: string;
  category: string;
};
type PostData = {
  slug: string;
  frontmatter: Frontmatter;
  source?: string;
};
