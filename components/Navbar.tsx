import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-sky/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/learnplay-academy-logo.png"
            alt="LearnPlay Academy logo"
            width={56}
            height={56}
            className="h-14 w-14 rounded-2xl object-contain"
            priority
          />
          <span>
            <span className="block text-xl font-black text-ink">
              LearnPlay Academy
            </span>
            <span className="block text-sm font-bold text-sky">
              Learn Through Play
            </span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-extrabold text-ink transition hover:bg-sky/10 hover:text-sky"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
