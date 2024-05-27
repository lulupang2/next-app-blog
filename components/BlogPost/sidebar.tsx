'use client';
import React from 'react';
import { TocItem } from 'remark-flexible-toc';
import styles from './sidebar.module.css';
import useActiveHeadings from '@/hooks/useActiveHeadings';

const classes = {
  base: 'm-0 list-none',
  listItem: 'mt-0 pt-2 pl-2',
  link: 'inline-block no-underline text-primary text-muted-foreground text-sm',
};

export default function SideToc({ data }: { data: TocItem[] }) {
  const activeItem = useActiveHeadings();

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById(href.replace('#', ''));
    if (targetElement) {
      window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <ul className={classes.base}>
      {data.map((item, index) => {
        const isActive = activeItem === item.href.replace('#', '');
        return (
          <li
            key={index}
            className={`${classes.listItem} ${styles[`indent--${item.depth}`]}`}
            onClick={handleClick(item.href)}
          >
            <span className={`${classes.link} ${isActive ? 'font-bold' : ''}`}>
              {item.numbering.slice(1).join('.')}.{item.value}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
