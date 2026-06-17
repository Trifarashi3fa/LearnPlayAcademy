"use client";

import Link from "next/link";
import Image from "next/image";
import { forestLevels } from "@/data/mvp-forest-world";
import { MvpCard, PrimaryLink, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

export function WorldMapClient() {
  const { progress, worldProgress, nextUnlockedLevel, completedCount } = useMvpProgress();

  return (
    <div className="space-y-8">
      <MvpCard className="overflow-hidden bg-[#EAF6FF]">
        <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#FF4FA0]">World 1</p>
            <h2 className="mt-1 text-3xl font-black">Forest World</h2>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
              Complete 10 levels, answer 100 questions, earn XP, collect stars, and defeat the Forest Guardian boss quiz.
            </p>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-black">
                <span>World Progress</span>
                <span>{worldProgress}%</span>
              </div>
              <ProgressBar value={worldProgress} />
            </div>
            <p className="mt-3 text-sm font-black text-[#5B6B94]">
              {completedCount} of {forestLevels.length} levels complete
            </p>
          </div>
          <Image
            src="/worlds/forest-world.png"
            alt="Forest World"
            width={220}
            height={180}
            className="mx-auto h-44 w-56 rounded-[1.5rem] object-cover shadow-sm"
          />
        </div>
      </MvpCard>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {forestLevels.map((level) => {
          const completed = progress.completedLevels.includes(level.level);
          const unlocked = level.level === 1 || level.level <= nextUnlockedLevel || completed;
          const stars = progress.levelStars[String(level.level)] ?? 0;

          return (
            <MvpCard key={level.level} className={`${completed ? "ring-2 ring-[#22C55E]" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black ${
                  completed
                    ? "bg-[#22C55E] text-white"
                    : unlocked
                      ? "bg-[#0B63F6] text-white"
                      : "bg-[#EAF6FF] text-[#5B6B94]"
                }`}>
                  {level.level}
                </span>
                <span className="rounded-full bg-[#FFF3C4] px-3 py-1 text-xs font-black text-[#082B80]">
                  {level.nodeType}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-black">{level.title}</h2>
              <p className="mt-2 min-h-16 text-sm font-bold leading-6 text-[#5B6B94]">
                {level.description}
              </p>
              <p className="mt-3 text-sm font-black text-[#5B6B94]">
                Stars earned: {stars}
              </p>
              <p className="mt-1 text-sm font-black">
                {completed ? "Complete" : unlocked ? "Unlocked" : "Locked"}
              </p>
              {unlocked ? (
                <PrimaryLink href={`/mvp/level/${level.level}`} tone={completed ? "green" : "blue"}>
                  {completed ? "Replay Level" : "Start Level"}
                </PrimaryLink>
              ) : (
                <div className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[#EAF6FF] px-6 py-3 text-base font-black text-[#5B6B94]">
                  Complete previous level
                </div>
              )}
            </MvpCard>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <PrimaryLink href="/mvp/rewards" tone="white">View Rewards</PrimaryLink>
        <PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink>
        <Link href="/mvp/subjects" className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-black text-[#0B63F6] underline-offset-4 hover:underline focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">
          Back to subjects
        </Link>
      </div>
    </div>
  );
}