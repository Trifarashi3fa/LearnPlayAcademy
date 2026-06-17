import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function MvpPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="bg-[#EAF6FF]">
        <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
          <MvpTopBar />
          <p className="mt-8 text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
            {eyebrow}
          </p>
          <h1 className="mt-2 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">
            {description}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">{children}</section>
    </main>
  );
}

export function MvpTopBar() {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <Link href="/mvp" className="flex items-center gap-3 rounded-3xl focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">
        <Image
          src="/learnplay-academy-logo.png"
          alt="LearnPlay Academy logo"
          width={56}
          height={56}
          className="h-14 w-14 rounded-2xl object-contain"
          priority
        />
        <span>
          <span className="block text-xl font-black">LearnPlay MVP</span>
          <span className="block text-sm font-bold text-[#0B63F6]">Local learning game</span>
        </span>
      </Link>
      <nav className="flex flex-wrap gap-2" aria-label="MVP navigation">
        {[
          ["Home", "/mvp"],
          ["Subjects", "/mvp/subjects"],
          ["World Map", "/mvp/world-map"],
          ["Rewards", "/mvp/rewards"],
          ["Parent Dashboard", "/mvp/parent-dashboard"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-full px-4 py-2 text-sm font-black text-[#082B80] transition hover:bg-[#EAF6FF] hover:text-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
  tone = "blue",
}: {
  href: string;
  children: ReactNode;
  tone?: "blue" | "pink" | "green" | "white";
}) {
  const classes = {
    blue: "bg-[#0B63F6] text-white hover:bg-[#084fc5]",
    pink: "bg-[#FF4FA0] text-white hover:bg-[#e83d8e]",
    green: "bg-[#66CC00] text-[#082B80] hover:bg-[#58b800]",
    white: "bg-white text-[#082B80] ring-2 ring-[#DDE8F5] hover:ring-[#0B63F6]",
  }[tone];

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-black shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${classes}`}
    >
      {children}
    </Link>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-[#EAF6FF]">
      <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function MvpCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm ${className}`}>
      {children}
    </article>
  );
}