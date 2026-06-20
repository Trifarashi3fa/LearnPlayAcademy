import Image from "next/image";
import { PrimaryLink } from "@/components/mvp/MvpShell";

export function ForestRewardScreen({
  level,
  worldComplete,
  correctCount,
  totalQuestions,
  starsEarned,
  xpEarned,
}: {
  level: number;
  worldComplete: boolean;
  correctCount: number;
  totalQuestions: number;
  starsEarned: number;
  xpEarned: number;
}) {
  const badgeName = worldComplete ? "Forest Explorer Badge" : `Level ${level} Badge`;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[#BDE7D0] bg-gradient-to-br from-[#EAFBF0] via-white to-[#FFF3C4] p-6 shadow-playful sm:p-8">
      <span className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#66CC00]/15" />
      <span className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[#FFC83D]/20" />
      <div className="relative grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="text-center">
          <div className="mx-auto overflow-hidden rounded-[2rem] border-8 border-white bg-[#FFF3C4] p-3 shadow-playful">
            <Image src="/rewards/badge.png" alt={badgeName} width={360} height={360} className="aspect-square w-full rounded-[1.25rem] object-cover" priority />
          </div>
          <p className="mt-4 inline-flex rounded-full bg-[#082B80] px-5 py-2 text-sm font-black text-white">{badgeName}</p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">{worldComplete ? "World Reward Unlocked" : "Level Reward Unlocked"}</p>
          <h2 className="mt-2 text-4xl font-black leading-tight text-[#082B80] sm:text-5xl">{worldComplete ? "You are a Forest Explorer!" : `Level ${level} complete!`}</h2>
          <p className="mt-4 text-lg font-bold leading-8 text-[#5B6B94]">{worldComplete ? "You completed every Forest World mission. LearnBot is proud of your focus, courage, and growing number skills." : "Excellent effort. Your next Forest World mission is now ready."}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <RewardStat label="Correct" value={`${correctCount}/${totalQuestions}`} />
            <RewardStat label="Stars" value={String(starsEarned)} />
            <RewardStat label="XP earned" value={String(xpEarned)} />
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-[1.5rem] bg-white/90 p-4">
            <div className="relative h-24 w-24 shrink-0 bg-transparent"><Image src="/mascots/learnbot-trophy.png" alt="LearnBot celebrating the reward" fill sizes="96px" className="object-contain" /></div>
            <p className="text-sm font-black leading-6 text-[#14532D]">Keep exploring. Every careful answer makes your mathematics skills stronger.</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {level < 10 ? <PrimaryLink href={`/mvp/level/${level + 1}`} tone="green">Unlock Next Level</PrimaryLink> : <PrimaryLink href="/mvp/rewards" tone="green">View Badge</PrimaryLink>}
            <PrimaryLink href="/mvp/world-map" tone="blue">World Map</PrimaryLink>
            <PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function RewardStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[1.25rem] bg-white p-4 text-center shadow-sm"><p className="text-xs font-black uppercase text-[#5B6B94]">{label}</p><p className="mt-1 text-2xl font-black text-[#082B80]">{value}</p></div>;
}