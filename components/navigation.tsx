import Link from "next/link";

export default function Navigation() {
  return (
    <header className="w-full sticky top-0 p-4 border-b-2 shadow bg-white z-50">
      <div className="container flex items-center justify-between">
        <span>My Blog</span>
        <nav className="text-sm font-medium space-x-6">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
