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
    <main className="fixed inset-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden overscroll-none bg-[#FFFDF7] text-[#082B80]">
      <header className="shrink-0 border-b border-[#DDE8F5] bg-white px-3 py-2 sm:px-5">
        <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/learnplay-academy-logo.png"
              alt="LearnPlay Academy"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-xl object-contain"
              priority
            />
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">
                Forest World - Level {level} - {nodeType}
              </p>
              <h1 className="truncate text-lg font-black sm:text-xl">{title}</h1>
            </div>
          </div>
          <Link
            href="/mvp/world-map"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border-2 border-[#DDE8F5] bg-white px-4 text-sm font-black transition hover:border-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            Exit lesson
          </Link>
        </div>
      </header>

      <div className="min-h-0 shrink-0">{progress}</div>

      <div className="mx-auto grid min-h-0 w-full max-w-[96rem] flex-1 gap-3 overflow-hidden p-3 lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-4 xl:grid-cols-[minmax(0,1fr)_25rem]">
        <section className="min-h-0 touch-pan-y overflow-y-auto overscroll-contain rounded-[1.5rem]" style={{ WebkitOverflowScrolling: "touch" }} aria-label="Current question">
          {children}
        </section>
        <div className="contents">{support}</div>
      </div>

      {actionBar}
    </main>
  );
}