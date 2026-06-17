"use client";

import Link from "next/link";
import Image from "next/image";
import { forestLevels } from "@/data/mvp-forest-world";
import { MvpCard, PrimaryLink, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

const premiumWorlds = [
  {
    name: "Mountain World",
    year: "Premium preview",
    image: "/worlds/level 2-mountain-world.png",
    description: "Addition, subtraction, time, money, and patterns continue after Forest World.",
  },
  {
    name: "Ocean World",
    year: "Premium preview",
    image: "/worlds/level 3-ocean-world.png",
    description: "Multiplication, division, fractions, and measurement wait in the next adventure.",
  },
  {
    name: "Space World",
    year: "Premium preview",
    image: "/worlds/level 4-space-world.png",
    description: "Decimals, geometry, and data handling become bigger learning missions.",
  },
  {
    name: "Galaxy World",
    year: "Premium preview",
    image: "/worlds/level 5-galaxy-world.png",
    description: "Problem solving, reasoning, and exam readiness are locked for premium learning.",
  },
];

export function WorldMapClient() {
  const { progress, worldProgress, nextUnlockedLevel, completedCount } = useMvpProgress();

  return (
    <div className="space-y-8">
      <MvpCard className="overflow-hidden bg-[#EAF6FF]">
        <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#FF4FA0]">
              Free Math Starter World
            </p>
            <h2 className="mt-1 text-3xl font-black">Forest World</h2>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
              Forest World is the only free playable math world. Complete 10 guided levels, answer 100 questions, earn XP, collect stars, and defeat the Forest Guardian boss quiz.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["10", "guided levels"],
                ["100", "questions"],
                ["1", "boss quiz"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.25rem] bg-white px-4 py-3 text-center shadow-sm">
                  <p className="text-2xl font-black text-[#0B63F6]">{value}</p>
                  <p className="text-xs font-black uppercase text-[#5B6B94]">{label}</p>
                </div>
              ))}
            </div>
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
            src="/worlds/level 1-forest-world.png"
            alt="Forest World learning path"
            width={220}
            height={180}
            className="mx-auto h-44 w-56 rounded-[1.5rem] object-cover shadow-sm"
            priority
          />
        </div>
      </MvpCard>

      <section aria-labelledby="forest-levels-title">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
              Forest World path
            </p>
            <h2 id="forest-levels-title" className="text-3xl font-black">
              10 guided levels
            </h2>
          </div>
          <p className="max-w-xl text-sm font-bold leading-6 text-[#5B6B94]">
            Complete each level to unlock the next one. Level 1 is open for every learner.
          </p>
        </div>

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
                <h3 className="mt-4 text-xl font-black">{level.title}</h3>
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
      </section>

      <section aria-labelledby="premium-worlds-title" className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
              Premium preview
            </p>
            <h2 id="premium-worlds-title" className="text-3xl font-black">
              Unlock premium worlds to continue learning.
            </h2>
          </div>
          <Link
            href="/register"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#FF4FA0] px-6 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#e83d8e] focus:outline-none focus:ring-4 focus:ring-[#FF4FA0]/25"
          >
            Register for full access
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {premiumWorlds.map((world) => (
            <article key={world.name} className="overflow-hidden rounded-[1.5rem] border border-[#DDE8F5] bg-[#FFFDF7] shadow-sm">
              <div className="relative">
                <Image
                  src={world.image}
                  alt={`${world.name} preview`}
                  width={320}
                  height={220}
                  className="h-40 w-full object-cover opacity-80"
                />
                <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-black text-[#082B80] shadow-sm">
                  Locked
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs font-black uppercase text-[#8B5CF6]">{world.year}</p>
                <h3 className="mt-1 text-xl font-black">{world.name}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{world.description}</p>
                <div className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#EAF6FF] px-5 py-2 text-sm font-black text-[#5B6B94]">
                  Premium locked
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

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