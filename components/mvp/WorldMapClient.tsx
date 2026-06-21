"use client";

import Image from "next/image";
import Link from "next/link";
import { forestLevels } from "@/data/mvp-forest-world";
import { MvpCard, PrimaryLink, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

const nodeColors: Record<string, string> = {
  Learn: "bg-[#0B63F6] text-white",
  Practice: "bg-[#22C55E] text-white",
  "Mini Game": "bg-[#FF9F1C] text-white",
  Review: "bg-[#8B5CF6] text-white",
  Challenge: "bg-[#EF4444] text-white",
  Boss: "bg-[#FF4FA0] text-white",
};

const nodeMessages: Record<string, string> = {
  Learn: "Learn a new skill",
  Practice: "Build confidence",
  "Mini Game": "Play a quick mission",
  Review: "Check what you remember",
  Challenge: "Try a stronger mission",
  Boss: "Win the world badge",
};

export function WorldMapClient() {
  const { progress, worldProgressRecord, worldProgress, nextUnlockedLevel, completedCount } = useMvpProgress();

  return (
    <div className="space-y-8">
      <MvpCard className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-72 overflow-hidden">
            <Image
              src="/worlds/level 1-forest-world.png"
              alt="Forest World learning path"
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#082B80]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-sm font-black uppercase tracking-wide text-[#FFC83D]">
                Free Math Starter World
              </p>
              <h2 className="mt-2 text-4xl font-black">Forest World Map</h2>
              <p className="mt-2 max-w-xl text-base font-bold leading-7">
                Complete one level at a time. Level 1 starts open, and each win unlocks the next step.
              </p>
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[1.5rem] bg-[#EAF6FF] p-5 text-center">
                <p className="text-5xl font-black text-[#0B63F6]">10</p>
                <p className="mt-1 text-sm font-black uppercase text-[#5B6B94]">guided levels</p>
              </div>
              <div className="rounded-[1.5rem] bg-[#FFF3C4] p-5 text-center">
                <p className="text-5xl font-black text-[#22C55E]">100</p>
                <p className="mt-1 text-sm font-black uppercase text-[#5B6B94]">math questions</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm font-black">
                <span>Forest World Progress</span>
                <span>{worldProgress}%</span>
              </div>
              <ProgressBar value={worldProgress} />
              <p className="mt-3 text-sm font-black text-[#5B6B94]">
                {completedCount} of {forestLevels.length} levels complete. Total XP: {progress.totalXp}
              </p>
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-[#F0FDF4] p-4">
              <p className="text-sm font-black uppercase text-[#15803D]">Next step</p>
              <p className="mt-1 text-xl font-black">
                Level {nextUnlockedLevel}: {forestLevels[nextUnlockedLevel - 1]?.title ?? "Forest Complete"}
              </p>
            </div>
          </div>
        </div>
      </MvpCard>

      <section aria-labelledby="level-path-title">
        <div className="mb-5">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
            Adventure Trail
          </p>
          <h2 id="level-path-title" className="text-3xl font-black">
            Tap an unlocked mission
          </h2>
        </div>

        <div className="relative space-y-4 before:absolute before:left-9 before:top-4 before:hidden before:h-[calc(100%-2rem)] before:w-2 before:rounded-full before:bg-[#DDE8F5] sm:before:block">
          {forestLevels.map((level, index) => {
            const completed = worldProgressRecord.completedLevels.includes(level.level);
            const unlocked = level.level === 1 || level.level <= nextUnlockedLevel || completed;
            const stars = worldProgressRecord.levelStars[String(level.level)] ?? 0;
            const nodeClass = nodeColors[level.nodeType] ?? "bg-[#0B63F6] text-white";

            const content = (
              <div className={`relative grid gap-4 rounded-[2rem] border p-5 shadow-sm transition sm:grid-cols-[88px_1fr_auto] sm:items-center ${
                completed
                  ? "border-[#22C55E] bg-[#F0FDF4]"
                  : unlocked
                    ? "border-[#0B63F6] bg-white hover:-translate-y-0.5 hover:shadow-playful"
                    : "border-[#DDE8F5] bg-white opacity-75"
              }`}>
                <div className={`z-10 flex h-20 w-20 items-center justify-center rounded-[1.5rem] text-3xl font-black ${
                  unlocked || completed ? nodeClass : "bg-[#EAF6FF] text-[#5B6B94]"
                }`}>
                  {level.level}
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-[#FF4FA0]">
                    Level {level.level} - {level.nodeType}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">{level.title}</h3>
                  <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">
                    {nodeMessages[level.nodeType]} with 10 child-friendly questions.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3C4] px-3 py-2 text-xs font-black text-[#082B80]">
                    <Image src="/rewards/star.png" alt="" width={18} height={18} className="h-5 w-5 object-contain" />
                    {stars} stars
                  </span>
                  <span className={`rounded-full px-3 py-2 text-xs font-black ${
                    completed
                      ? "bg-[#22C55E]/15 text-[#15803D]"
                      : unlocked
                        ? "bg-[#0B63F6]/10 text-[#0B63F6]"
                        : "bg-[#EAF6FF] text-[#5B6B94]"
                  }`}>
                    {completed ? "Complete" : unlocked ? "Start" : "Locked"}
                  </span>
                </div>
              </div>
            );

            return unlocked ? (
              <Link
                key={level.level}
                href={`/mvp/level/${level.level}`}
                className={`block rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
                  index % 2 === 1 ? "sm:ml-10" : ""
                }`}
              >
                {content}
              </Link>
            ) : (
              <div key={level.level} className={index % 2 === 1 ? "sm:ml-10" : ""}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <PrimaryLink href="/subjects" tone="white">Back to Subjects</PrimaryLink>
        <PrimaryLink href="/mvp/rewards" tone="white">Rewards</PrimaryLink>
        <PrimaryLink href="/mvp/parent-dashboard" tone="blue">Parent Dashboard</PrimaryLink>
      </div>
    </div>
  );
}