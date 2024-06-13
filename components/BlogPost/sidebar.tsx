'use client';
import React from 'react';
import { TocItem } from 'remark-flexible-toc';
import styles from './sidebar.module.css';
import useActiveHeadings from '@/hooks/useActiveHeadings';
import { ScrollArea } from '../ui/scroll-area';

const classes = {
  base: 'm-0 list-none',
  listItem: 'mt-0 pt-2 pl-2',
  link: 'inline-block no-underline text-sm cursor-pointer hover:text-teal-600',
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
    <div className="hidden text-sm xl:block">
      <div className="sticky top-16 -mt-10 pt-4">
        <ScrollArea className="pb-10">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
            <ul className={classes.base}>
              {data.map((item, index) => {
                const isActive = activeItem === item.href.replace('#', '');
                return (
                  <li
                    key={index}
                    className={`${classes.listItem} ${
                      styles[`indent--${item.depth}`]
                    }`}
                    onClick={handleClick(item.href)}
                  >
                    <span
                      className={`${classes.link} ${
                        isActive ? 'font-bold' : ''
                      }`}
                    >
                      {item.numbering.slice(1).join('.')}.{item.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
