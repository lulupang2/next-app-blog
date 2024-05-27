import { useState, useEffect, useRef } from 'react';

const useActiveHeading = () => {
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeadingId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 1.0,
    });

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.current?.observe(heading));

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return activeHeadingId;
};

export default useActiveHeading;
