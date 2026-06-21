"use client";

import Image from "next/image";
import Link from "next/link";
import { MvpCard, PrimaryLink, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import { forestLevels } from "@/data/mvp-forest-world";

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
  Boss: `Meet the ${forestWorldIdentity.bossName}`,
};

export function WorldMapClient() {
  const {
    progress,
    worldProgressRecord,
    worldCompleted,
    worldProgress,
    nextUnlockedLevel,
    completedCount,
  } = useMvpProgress();
  const levelsRemaining = forestLevels.length - completedCount;
  const currentLevel = worldCompleted ? null : nextUnlockedLevel;
  const currentMission = currentLevel ? forestLevels[currentLevel - 1] : null;

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="level-path-title"
        className="rounded-[2rem] border border-[#BDE7D0] bg-gradient-to-b from-[#F0FDF4] via-white to-[#EAF6FF] p-4 shadow-sm sm:p-6"
      >
        <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#15803D]">
              Your Forest Trail
            </p>
            <h2 id="level-path-title" className="mt-1 text-3xl font-black sm:text-4xl">
              {worldCompleted ? "Forest World complete!" : `Level ${currentLevel} is your next mission`}
            </h2>
            <p className="mt-2 max-w-2xl text-base font-bold leading-7 text-[#5B6B94]">
              {worldCompleted
                ? `You completed every mission and earned the ${forestWorldIdentity.completionBadge}.`
                : `${levelsRemaining} ${levelsRemaining === 1 ? "level remains" : "levels remain"}. Follow the trail to reach the ${forestWorldIdentity.bossName}.`}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[#DDE8F5] bg-white px-5 py-4 shadow-sm" aria-live="polite">
            <p className="text-xs font-black uppercase text-[#FF4FA0]">
              {worldCompleted ? "Adventure complete" : "You are here"}
            </p>
            <p className="mt-1 text-lg font-black">
              {worldCompleted ? forestWorldIdentity.completionBadge : `Level ${currentLevel}: ${currentMission?.title}`}
            </p>
          </div>
        </div>

        <div className="mb-7 rounded-[1.5rem] bg-white p-4 shadow-sm">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm font-black">
            <span>Trail progress</span>
            <span>{completedCount}/{forestLevels.length} levels - {worldProgress}%</span>
          </div>
          <ProgressBar value={worldProgress} />
        </div>

        <div className="relative space-y-5">
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[2.15rem] top-10 w-2 -translate-x-1/2 rounded-full bg-[#CFE0F5] sm:left-[2.65rem] sm:w-3"
          />

          {forestLevels.map((level) => {
            const completed = worldProgressRecord.completedLevels.includes(level.level);
            const current = !worldCompleted && !completed && level.level === currentLevel;
            const unlocked = completed || current || level.level === 1 || level.level <= nextUnlockedLevel;
            const locked = !unlocked;
            const boss = level.level === 10;
            const stars = worldProgressRecord.levelStars[String(level.level)] ?? 0;
            const nodeClass = nodeColors[level.nodeType] ?? "bg-[#0B63F6] text-white";
            const stateLabel = completed ? "Completed" : current ? "Current mission" : locked ? "Locked" : "Unlocked";

            const content = (
              <article
                className={`relative ml-[4.35rem] min-h-32 rounded-[1.75rem] border bg-white p-4 shadow-sm transition sm:ml-[5.35rem] sm:p-5 ${
                  boss ? "min-h-40 border-2 border-[#FF4FA0] bg-[#FFF4FA]" : ""
                } ${
                  completed
                    ? "border-[#22C55E] bg-[#F0FDF4]"
                    : current
                      ? "border-2 border-[#0B63F6] shadow-playful ring-4 ring-[#0B63F6]/10"
                      : locked
                        ? "border-[#DDE8F5] opacity-70"
                        : "border-[#DDE8F5] hover:-translate-y-0.5 hover:border-[#0B63F6] hover:shadow-playful"
                }`}
              >
                <div
                  className={`absolute -left-[4.2rem] top-1/2 z-10 flex h-[4.3rem] w-[4.3rem] -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-2xl font-black shadow-md sm:-left-[5.1rem] sm:h-[5.2rem] sm:w-[5.2rem] sm:text-3xl ${
                    locked ? "bg-[#EAF6FF] text-[#5B6B94]" : nodeClass
                  } ${current ? "outline outline-4 outline-[#FFC83D] outline-offset-2" : ""}`}
                  aria-hidden="true"
                >
                  {completed ? "âœ“" : level.level}
                </div>

                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    {boss && (
                      <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#FF4FA0]">
                        Final destination
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${nodeClass}`}>
                        Level {level.level} - {level.nodeType}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          completed
                            ? "bg-[#DCFCE7] text-[#15803D]"
                            : current
                              ? "bg-[#FFF3C4] text-[#9A6700]"
                              : locked
                                ? "bg-[#EAF6FF] text-[#5B6B94]"
                                : "bg-[#EAF6FF] text-[#0B63F6]"
                        }`}
                      >
                        {stateLabel}
                      </span>
                    </div>
                    <h3 className={`mt-3 font-black ${boss ? "text-3xl" : "text-2xl"}`}>
                      {level.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">
                      {nodeMessages[level.nodeType]} with 10 child-friendly questions.
                    </p>
                    {boss && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-[#082B80] shadow-sm">
                        <Image src="/rewards/star.png" alt="" width={22} height={22} className="h-6 w-6 object-contain" />
                        Badge reward: {forestWorldIdentity.completionBadge}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF3C4] px-3 py-2 text-xs font-black">
                      <Image src="/rewards/star.png" alt="" width={18} height={18} className="h-5 w-5 object-contain" />
                      {stars} stars
                    </span>
                    {unlocked && !completed && (
                      <span className="rounded-full bg-[#0B63F6] px-4 py-2 text-xs font-black text-white">
                        {current ? "Continue" : "Open"}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );

            return unlocked ? (
              <Link
                key={level.level}
                href={`/mvp/level/${level.level}`}
                aria-current={current ? "step" : undefined}
                aria-label={`${stateLabel}: Level ${level.level}, ${level.title}`}
                className="block rounded-[1.75rem] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/30"
              >
                {content}
              </Link>
            ) : (
              <div key={level.level} aria-label={`Locked: Level ${level.level}, ${level.title}`}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <MvpCard className="overflow-hidden p-0">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
          <div className="relative min-h-48 overflow-hidden sm:min-h-56">
            <Image
              src="/worlds/level 1-forest-world.png"
              alt="Forest World landscape"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082B80]/60 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-5 text-2xl font-black text-white">
              Free Math Starter World
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-sm font-black uppercase text-[#15803D]">World summary</p>
            <h2 className="mt-1 text-3xl font-black">Forest World</h2>
            <p className="mt-2 font-bold leading-7 text-[#5B6B94]">
              Complete one mission at a time. Every completed level opens the next step toward the Forest Guardian.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <SummaryStat value="10" label="Levels" />
              <SummaryStat value="100" label="Questions" />
              <SummaryStat value={String(progress.totalXp)} label="Total XP" />
            </div>
          </div>
        </div>
      </MvpCard>

      <div className="flex flex-wrap gap-3">
        <PrimaryLink href="/subjects" tone="white">Back to Subjects</PrimaryLink>
        <PrimaryLink href="/mvp/rewards" tone="white">Rewards</PrimaryLink>
        <PrimaryLink href="/mvp/parent-dashboard" tone="blue">Parent Dashboard</PrimaryLink>
      </div>
    </div>
  );
}

function SummaryStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.25rem] bg-[#EAF6FF] p-3">
      <p className="text-2xl font-black text-[#0B63F6]">{value}</p>
      <p className="mt-1 text-xs font-black uppercase text-[#5B6B94]">{label}</p>
    </div>
  );
}