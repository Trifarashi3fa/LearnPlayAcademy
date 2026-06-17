"use client";

import Image from "next/image";
import Link from "next/link";
import { forestLevels } from "@/data/mvp-forest-world";
import { ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

export function MathematicsMvpPage() {
  const { completedCount, totalLevels, worldProgress, progress } = useMvpProgress();

  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="bg-[#EAF6FF]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1fr_360px] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
              Mathematics
            </p>
            <h1 className="mt-3 text-5xl font-black leading-tight md:text-6xl">
              Forest World is ready.
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">
              Forest World is the active MVP world for LearnPlay Mathematics. Complete 10 levels, answer 100 local questions, earn XP, collect stars, and unlock rewards.
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
          <div className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful">
            <Image
              src="/worlds/level 1-forest-world.png"
              alt="Forest World mathematics map"
              width={360}
              height={280}
              className="h-60 w-full rounded-[1.5rem] object-cover"
              priority
            />
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-black">
                <span>Forest World Progress</span>
                <span>{worldProgress}%</span>
              </div>
              <ProgressBar value={worldProgress} />
              <p className="mt-3 text-sm font-black text-[#5B6B94]">
                {completedCount} of {totalLevels} levels complete. Total XP: {progress.xp}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
            Forest World Levels
          </p>
          <h2 className="mt-2 text-3xl font-black">10 guided steps</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {forestLevels.map((level) => (
            <div key={level.level} className="rounded-[1.5rem] border border-[#DDE8F5] bg-white p-4 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B63F6] text-lg font-black text-white">
                {level.level}
              </span>
              <p className="mt-4 text-sm font-black uppercase text-[#FF4FA0]">{level.nodeType}</p>
              <h3 className="mt-1 text-lg font-black">{level.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}