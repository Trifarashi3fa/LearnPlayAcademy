"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { primaryNavigation, signedInNavigation, type NavigationLink } from "@/data/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getVisibleNavigation(isSignedIn: boolean): NavigationLink[] {
  return isSignedIn ? signedInNavigation : primaryNavigation;
}

export function Navbar() {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setReady(true);
      return;
    }

    const supabase = createClient();
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setIsSignedIn(Boolean(data.session));
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session));
      setReady(true);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const visibleNavigation = getVisibleNavigation(isSignedIn);

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
            src="/learnplay-academy-logo.webp"
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
        <div className="flex flex-wrap items-center gap-2">
          {visibleNavigation.map((link) => {
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
          {ready && isSignedIn ? <LogoutButton /> : null}
        </div>
      </nav>
    </header>
  );
}
