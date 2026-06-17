"use client";

import Image from "next/image";
import { MvpCard, PrimaryLink } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

export function RewardsClient() {
  const { progress, reset } = useMvpProgress();
  const badges = progress.badges.length > 0 ? progress.badges : ["No badges yet"];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-3">
        <MvpCard>
          <p className="text-sm font-black uppercase text-[#5B6B94]">XP</p>
          <p className="mt-2 text-5xl font-black">{progress.xp}</p>
        </MvpCard>
        <MvpCard>
          <p className="text-sm font-black uppercase text-[#5B6B94]">Stars</p>
          <p className="mt-2 text-5xl font-black">{progress.stars}</p>
        </MvpCard>
        <MvpCard>
          <p className="text-sm font-black uppercase text-[#5B6B94]">Badges</p>
          <p className="mt-2 text-5xl font-black">{progress.badges.length}</p>
        </MvpCard>
      </div>

      <MvpCard>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <Image
            src="/rewards/forest-explorer-badge.png"
            alt="Forest Explorer Badge"
            width={160}
            height={140}
            className="h-36 w-40 rounded-[1.5rem] object-cover"
          />
          <div>
            <h2 className="text-3xl font-black">Reward Collection</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="rounded-full bg-[#EAF6FF] px-4 py-2 text-sm font-black">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MvpCard>

      <div className="flex flex-wrap gap-3">
        <PrimaryLink href="/mvp/world-map" tone="blue">Continue Learning</PrimaryLink>
        <PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-base font-black text-[#B91C1C] ring-2 ring-[#FCA5A5] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#EF4444]/25"
        >
          Reset Local Progress
        </button>
      </div>
    </div>
  );
}