"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/subjects", label: "Subjects" },
  { href: "/games", label: "Games" },
  { href: "/life-skills", label: "Life Skills" },
  { href: "/parents", label: "Parents" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-sky/10 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-3 rounded-3xl focus:outline-none focus:ring-4 focus:ring-sky/25"
        >
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
              Learning Through Play
            </span>
          </span>
        </Link>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-extrabold transition focus:outline-none focus:ring-4 focus:ring-sky/25 ${
                  active
                    ? "bg-sky text-white"
                    : "text-ink hover:bg-sky/10 hover:text-sky"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}