import { useState, useEffect, useRef } from 'react';

const useActiveHeadings = () => {
  const [activeHeadingIds, setActiveHeadingIds] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeadingIds((prevIds) => [...prevIds, entry.target.id]);
        } else {
          setActiveHeadingIds((prevIds) =>
            prevIds.filter((id) => id !== entry.target.id)
          );
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 1.0,
    });

    const headings = Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    );
    headings.forEach((heading) => observer.current?.observe(heading));

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return activeHeadingIds;
};

export default useActiveHeadings;
