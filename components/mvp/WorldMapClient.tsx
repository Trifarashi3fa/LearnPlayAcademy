"use client";

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

export function WorldMapClient() {
  const { progress, worldProgress, nextUnlockedLevel, completedCount } = useMvpProgress();

  return (
    <div className="space-y-8">
      <MvpCard className="bg-[#EAF6FF]">
        <div className="grid gap-5 md:grid-cols-[1fr_260px] md:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#FF4FA0]">
              Free Math Starter World
            </p>
            <h2 className="mt-1 text-3xl font-black">Forest World Map</h2>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
              Follow the simple path from Level 1 to Level 10. Level 1 is unlocked by default. Complete each level to open the next one.
            </p>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-black">
                <span>Forest World Progress</span>
                <span>{worldProgress}%</span>
              </div>
              <ProgressBar value={worldProgress} />
            </div>
            <p className="mt-3 text-sm font-black text-[#5B6B94]">
              {completedCount} of {forestLevels.length} levels complete. Total XP: {progress.xp}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white p-5 text-center shadow-sm">
            <p className="text-5xl font-black text-[#0B63F6]">10</p>
            <p className="mt-1 text-sm font-black uppercase text-[#5B6B94]">guided levels</p>
            <p className="mt-4 text-5xl font-black text-[#22C55E]">100</p>
            <p className="mt-1 text-sm font-black uppercase text-[#5B6B94]">math questions</p>
          </div>
        </div>
      </MvpCard>

      <section aria-labelledby="level-path-title">
        <div className="mb-5">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
            Level Path
          </p>
          <h2 id="level-path-title" className="text-3xl font-black">
            Tap an unlocked level
          </h2>
        </div>

        <div className="grid gap-4">
          {forestLevels.map((level) => {
            const completed = progress.completedLevels.includes(level.level);
            const unlocked = level.level === 1 || level.level <= nextUnlockedLevel || completed;
            const stars = progress.levelStars[String(level.level)] ?? 0;
            const nodeClass = nodeColors[level.nodeType] ?? "bg-[#0B63F6] text-white";

            const content = (
              <div className={`grid gap-4 rounded-[2rem] border p-5 shadow-sm transition sm:grid-cols-[80px_1fr_auto] sm:items-center ${
                completed
                  ? "border-[#22C55E] bg-[#F0FDF4]"
                  : unlocked
                    ? "border-[#0B63F6] bg-white hover:-translate-y-0.5 hover:shadow-playful"
                    : "border-[#DDE8F5] bg-white opacity-75"
              }`}>
                <div className={`flex h-20 w-20 items-center justify-center rounded-[1.5rem] text-3xl font-black ${
                  unlocked || completed ? nodeClass : "bg-[#EAF6FF] text-[#5B6B94]"
                }`}>
                  {level.level}
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-[#FF4FA0]">
                    Level {level.level} = {level.nodeType}
                  </p>
                  <h3 className="mt-1 text-2xl font-black">{level.title}</h3>
                  <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">
                    {level.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <span className="rounded-full bg-[#FFF3C4] px-3 py-2 text-xs font-black text-[#082B80]">
                    {stars} stars
                  </span>
                  <span className={`rounded-full px-3 py-2 text-xs font-black ${
                    completed
                      ? "bg-[#22C55E]/15 text-[#15803D]"
                      : unlocked
                        ? "bg-[#0B63F6]/10 text-[#0B63F6]"
                        : "bg-[#EAF6FF] text-[#5B6B94]"
                  }`}>
                    {completed ? "Complete" : unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
              </div>
            );

            return unlocked ? (
              <Link
                key={level.level}
                href={`/mvp/level/${level.level}`}
                className="block rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
              >
                {content}
              </Link>
            ) : (
              <div key={level.level}>{content}</div>
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