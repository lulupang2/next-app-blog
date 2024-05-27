import Image from 'next/image';
import styles from './post-card.module.css';

import Link from 'next/link';
import { cn } from '@/libs/utils';
import { Icons } from '@/components/ui/icon';

export const PostCard = ({ post }) => {
  const [year, month, day] = post.frontmatter.date.split('-');
  const dateObject = new Date(year, month - 1, day);

  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <div className={cn(styles.card)}>
        <div className={cn(styles.thumbnail)}>
          <Image
            fill
            src={post.frontmatter.thumbnail}
            alt={post.frontmatter.title}
          />
        </div>
        <div className={cn(styles.title)}>
          <span className={cn(styles.titleText)}>{post.frontmatter.title}</span>
        </div>
        <div className={cn(styles.date)}>
          <Icons.time />
          <span>
            {dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};
