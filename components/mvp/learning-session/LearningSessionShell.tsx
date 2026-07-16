import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type LearningSessionShellProps = {
  level: number;
  title: string;
  nodeType: string;
  progress: ReactNode;
  children: ReactNode;
  support: ReactNode;
  actionBar: ReactNode;
};

export function LearningSessionShell({
  level,
  title,
  nodeType,
  progress,
  children,
  support,
  actionBar,
}: LearningSessionShellProps) {
  return (
    <main className="fixed inset-0 isolate flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-[radial-gradient(circle_at_top_left,#EAF6FF_0,#FFFDF7_42%,#FFFFFF_100%)] text-[#082B80]">
      <div className="pointer-events-none absolute -left-16 top-24 h-40 w-40 rounded-full bg-[#66CC00]/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-12 top-32 h-36 w-36 rounded-full bg-[#FF4FA0]/10 blur-2xl" />

      <header className="relative z-10 shrink-0 border-b border-[#DDE8F5] bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur sm:px-5 sm:py-2">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/learnplay-academy-logo.webp"
              alt="LearnPlay Academy"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 rounded-xl object-contain sm:h-10 sm:w-10"
              priority
            />
            <div className="min-w-0">
              <p className="truncate text-[0.66rem] font-black uppercase tracking-wide text-[#FF4FA0] sm:text-xs">
                Forest World - Level {level} - {nodeType}
              </p>
              <h1 className="truncate text-base font-black leading-tight sm:text-xl">{title}</h1>
            </div>
          </div>
          <Link
            href="/mvp/world-map"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border-2 border-[#DDE8F5] bg-white px-3 text-sm font-black transition hover:border-[#0B63F6] hover:bg-[#EAF6FF] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 sm:min-h-11 sm:px-4"
          >
            Exit lesson
          </Link>
        </div>
      </header>

      <div className="relative z-10 min-h-0 shrink-0">{progress}</div>

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[100rem] flex-1 gap-2 overflow-hidden p-2 sm:gap-3 sm:p-3 lg:grid-cols-[minmax(0,1fr)_minmax(29rem,38rem)] xl:grid-cols-[minmax(0,1fr)_minmax(34rem,42rem)]">
        <section
          className="min-h-0 min-w-0 touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain rounded-[1.5rem] scroll-smooth lg:overflow-visible lg:overscroll-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
          aria-label="Current question"
        >
          <div className="mx-auto min-h-full max-w-6xl pb-2 lg:min-h-0 lg:max-w-none lg:pb-0">{children}</div>
        </section>
        <div className="min-h-0 min-w-0 overflow-hidden lg:overflow-visible">{support}</div>
      </div>

      <div className="relative z-20 shrink-0">{actionBar}</div>
    </main>
  );
}
