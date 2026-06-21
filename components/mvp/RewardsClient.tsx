"use client";

import Image from "next/image";
import { MvpCard, PrimaryLink } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";

export function RewardsClient() {
  const { progress, reset } = useMvpProgress();
  const badges = progress.badges.length > 0 ? progress.badges : ["Complete a level to unlock your first badge"];
  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-3"><MvpCard><Stat label="XP" value={progress.totalXp} /></MvpCard><MvpCard><Stat label="Stars" value={progress.totalStars} /></MvpCard><MvpCard><Stat label="Badges" value={progress.badges.length} /></MvpCard></div>
      <section className="overflow-hidden rounded-[2rem] border border-[#BDE7D0] bg-gradient-to-br from-[#EAFBF0] via-white to-[#FFF3C4] p-6 shadow-playful sm:p-8">
        <div className="grid gap-7 md:grid-cols-[240px_1fr] md:items-center">
          <div className="overflow-hidden rounded-[1.5rem] border-8 border-white bg-[#FFF3C4] p-2 shadow-sm"><Image src="/rewards/badge.png" alt="LearnPlay achievement badge" width={320} height={320} className="aspect-square w-full rounded-xl object-cover" priority /></div>
          <div><p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Reward Collection</p><h2 className="mt-2 text-4xl font-black text-[#082B80]">Your Forest badges</h2><p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">Every badge records a completed learning mission. Finish Level 10 to earn the {forestWorldIdentity.completionBadge}.</p><div className="mt-5 flex flex-wrap gap-2">{badges.map((badge) => <span key={badge} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#082B80] shadow-sm">{badge}</span>)}</div></div>
        </div>
      </section>
      <div className="flex flex-wrap gap-3"><PrimaryLink href="/mvp/world-map" tone="blue">Continue Learning</PrimaryLink><PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink><button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-base font-black text-[#B91C1C] ring-2 ring-[#FCA5A5] focus:outline-none focus:ring-4 focus:ring-[#EF4444]/25">Reset Local Progress</button></div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: number }) { return <><p className="text-sm font-black uppercase text-[#5B6B94]">{label}</p><p className="mt-2 text-5xl font-black">{value}</p></>; }