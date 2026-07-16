"use client";

import Image from "next/image";
import { MvpButtonLink, MvpSurface } from "@/components/mvp/MvpUi";

export function LockedLevelNotice({
  level,
  requiredLevel,
  checking = false,
}: {
  level: number;
  requiredLevel?: number | null;
  checking?: boolean;
}) {
  const title = checking ? "Checking your Forest trail..." : `Level ${level} is still locked`;
  const description = checking
    ? "LearnBot is checking your saved progress before opening this mission."
    : `Complete Level ${requiredLevel ?? Math.max(1, level - 1)} first to open Level ${level}.`;

  return (
    <section className="min-h-[100dvh] bg-[#FFFDF7] p-4 text-[#082B80] sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100dvh-2rem)] max-w-5xl items-center justify-center">
        <MvpSurface className="relative w-full overflow-hidden border-[#BDE7D0] bg-gradient-to-br from-[#F0FDF4] via-white to-[#EAF6FF] p-6 text-center sm:p-8">
          <span className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#66CC00]/15" aria-hidden />
          <span className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#FFC83D]/20" aria-hidden />
          <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40">
            <Image
              src="/mascots/learnbot-thinking.webp"
              alt="LearnBot thinking about the next mission"
              fill
              sizes="160px"
              className="object-contain"
              priority
            />
          </div>
          <p className="relative mt-4 text-sm font-black uppercase tracking-wide text-[#15803D]">
            Forest World
          </p>
          <h1 className="relative mt-2 text-3xl font-black leading-tight text-[#082B80] sm:text-4xl">
            {title}
          </h1>
          <p className="relative mx-auto mt-3 max-w-2xl text-base font-bold leading-7 text-[#5B6B94] sm:text-lg">
            {description}
          </p>
          {!checking ? (
            <div className="relative mx-auto mt-5 max-w-xl rounded-[1.25rem] border border-[#FFD76A] bg-[#FFF7D6] p-4 text-left">
              <p className="text-sm font-black uppercase text-[#9A6700]">LearnBot says</p>
              <p className="mt-2 text-base font-bold leading-7 text-[#082B80]">
                Follow the path one mission at a time. You will be ready for this level soon.
              </p>
            </div>
          ) : null}
          <div className="relative mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <MvpButtonLink href="/mvp/world-map" tone="blue" size="lg">
              Back to Forest World Map
            </MvpButtonLink>
            {!checking ? (
              <MvpButtonLink href={`/mvp/level/${requiredLevel ?? Math.max(1, level - 1)}`} tone="white" size="lg">
                Go to Level {requiredLevel ?? Math.max(1, level - 1)}
              </MvpButtonLink>
            ) : null}
          </div>
        </MvpSurface>
      </div>
    </section>
  );
}
