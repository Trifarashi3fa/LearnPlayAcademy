"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MvpButtonLink, MvpProgressBar, MvpSurface, mvpFocusRing } from "@/components/mvp/MvpUi";

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
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
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
      <Link href="/" className={`flex items-center gap-3 rounded-3xl ${mvpFocusRing}`}>
        <Image
          src="/learnplay-academy-logo.png"
          alt="LearnPlay Academy logo"
          width={56}
          height={56}
          className="h-14 w-14 rounded-2xl object-contain"
          priority
        />
        <span>
          <span className="block text-xl font-black">LearnPlay Academy</span>
          <span className="block text-sm font-bold text-[#0B63F6]">Forest World MVP</span>
        </span>
      </Link>
      <nav className="flex flex-wrap gap-2" aria-label="MVP navigation">
        {[
          ["Home", "/"],
          ["Subjects", "/subjects"],
          ["Mathematics", "/mvp/world-map"],
          ["Forest World", "/mvp/world-map"],
          ["Rewards", "/mvp/rewards"],
          ["Parent Dashboard", "/mvp/parent-dashboard"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-black text-[#082B80] transition hover:bg-[#EAF6FF] hover:text-[#0B63F6] ${mvpFocusRing}`}
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
  return <MvpButtonLink href={href} tone={tone}>{children}</MvpButtonLink>;
}

export function ProgressBar({ value }: { value: number }) {
  return <MvpProgressBar value={value} />;
}

export function MvpCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <MvpSurface as="article" className={className}>{children}</MvpSurface>;
}
