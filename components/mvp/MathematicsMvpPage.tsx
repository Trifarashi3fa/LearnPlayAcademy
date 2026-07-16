"use client";

import Image from "next/image";
import Link from "next/link";
import { forestLevels } from "@/data/mvp-forest-world";
import { ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { getForestLevelAccess } from "@/lib/progress/level-access";

const levelTone: Record<string, string> = {
  Learn: "bg-[#0B63F6]",
  Practice: "bg-[#22C55E]",
  "Mini Game": "bg-[#FF9F1C]",
  Review: "bg-[#8B5CF6]",
  Challenge: "bg-[#EF4444]",
  Boss: "bg-[#FF4FA0]",
};

export function MathematicsMvpPage() {
  const { completedCount, totalLevels, worldProgress, progress, worldProgressRecord } = useMvpProgress();

  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="bg-[#EAF6FF]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1fr_420px] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
              LearnPlay Mathematics
            </p>
            <h1 className="mt-3 text-5xl font-black leading-tight md:text-6xl">
              Enter the Free Math Starter World.
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">
              Forest World is a guided path with 10 levels and 100 questions. Children learn numbers, counting, addition, subtraction, and review skills step by step.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mvp/world-map"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-6 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
              >
                Enter Forest World
              </Link>
              <Link
                href="/subjects"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-base font-black text-[#082B80] ring-2 ring-[#DDE8F5] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
              >
                Back to Subjects
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white shadow-playful">
            <Image
              src="/worlds/level 1-forest-world.webp"
              alt="Forest World mathematics adventure"
              width={520}
              height={380}
              className="h-72 w-full object-cover"
              priority
            />
            <div className="p-5">
              <div className="mb-2 flex justify-between text-sm font-black">
                <span>Forest World Progress</span>
                <span>{worldProgress}%</span>
              </div>
              <ProgressBar value={worldProgress} />
              <p className="mt-3 text-sm font-black text-[#5B6B94]">
                {completedCount} of {totalLevels} levels complete. Total XP: {progress.totalXp}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
              Forest World Missions
            </p>
            <h2 className="mt-2 text-3xl font-black">10 guided levels</h2>
            <p className="mt-2 max-w-2xl text-base font-bold leading-7 text-[#5B6B94]">
              Each card opens when the previous level is complete. This keeps learning clear and prevents children from feeling lost.
            </p>
          </div>
          <Link
            href="/mvp/world-map"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF4FA0] px-6 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            Open World Map
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {forestLevels.map((level) => {
            const unlocked = getForestLevelAccess(level.level, worldProgressRecord.completedLevels).accessible;
            const content = (
              <article className={`h-full rounded-[1.5rem] border bg-white p-4 shadow-sm transition ${
                unlocked ? "border-[#0B63F6] hover:-translate-y-1 hover:shadow-playful" : "border-[#DDE8F5] opacity-75"
              }`}>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white ${levelTone[level.nodeType] ?? "bg-[#0B63F6]"}`}>
                  {level.level}
                </span>
                <p className="mt-4 text-sm font-black uppercase text-[#FF4FA0]">{level.nodeType}</p>
                <h3 className="mt-1 text-lg font-black">{level.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">10 questions</p>
                <span className={`mt-4 inline-flex rounded-full px-3 py-2 text-xs font-black ${
                  unlocked ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#EAF6FF] text-[#5B6B94]"
                }`}>
                  {unlocked ? "Open Level" : "Locked"}
                </span>
              </article>
            );

            return unlocked ? (
              <Link
                key={level.level}
                href={`/mvp/level/${level.level}`}
                className="rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
              >
                {content}
              </Link>
            ) : (
              <div key={level.level}>{content}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
