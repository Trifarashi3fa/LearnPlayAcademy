import Link from "next/link";

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
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sunshine text-xl font-black text-ink shadow-md">
            LP
          </span>
          <span>
            <span className="block text-xl font-black text-ink">
              LearnPlay Academy
            </span>
            <span className="block text-sm font-bold text-coral">
              Play. Learn. Grow.
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
