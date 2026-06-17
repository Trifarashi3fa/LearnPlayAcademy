"use client";

import { useRouter } from "next/navigation";
import { MvpCard, PrimaryLink } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import type { MvpLevel } from "@/data/mvp-forest-world";

export function LevelIntroClient({ level }: { level: MvpLevel }) {
  const router = useRouter();
  const { nextUnlockedLevel, progress } = useMvpProgress();
  const unlocked = level.level === 1 || level.level <= nextUnlockedLevel || progress.completedLevels.includes(level.level);

  return (
    <MvpCard>
      <span className="rounded-full bg-[#FFF3C4] px-4 py-2 text-sm font-black text-[#082B80]">
        {level.nodeType}
      </span>
      <h2 className="mt-5 text-4xl font-black">
        Level {level.level}: {level.title}
      </h2>
      <p className="mt-3 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">
        {level.description}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Info label="Questions" value={String(level.questions.length)} />
        <Info label="XP per correct answer" value="10" />
        <Info label="Node type" value={level.nodeType} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {unlocked ? (
          <PrimaryLink href={`/mvp/question/${level.level}`} tone="blue">
            Start
          </PrimaryLink>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/mvp/world-map")}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#EAF6FF] px-6 py-3 text-base font-black text-[#5B6B94]"
          >
            Locked until previous level is complete
          </button>
        )}
        <PrimaryLink href="/mvp/world-map" tone="white">Back to World Map</PrimaryLink>
      </div>
    </MvpCard>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-[#EAF6FF] p-4">
      <p className="text-sm font-black uppercase text-[#5B6B94]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}