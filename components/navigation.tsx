import Link from 'next/link';
import { Icons } from './ui/icon';
import { ThemeToggle } from './theme-toggle';

export default function Navigation() {
  return (
    <header className="w-full  sticky top-0 z-10">
      <div className="container p-4 flex items-center justify-between bg-white text-black dark:bg-black dark:text-white">
        <span>My Blog</span>
        <nav className="flex text-sm font-medium space-x-6">
          <ThemeToggle />
          <Link
            href={'https://github.com/lulupang'}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.gitHub className="h-7 w-7" />
            <span className="sr-only">GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
