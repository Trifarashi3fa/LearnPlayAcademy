"use client";

import { useEffect } from "react";
import Image from "next/image";
import { LockedLevelNotice } from "@/components/mvp/LockedLevelNotice";
import { PrimaryLink } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import type { MvpLevel } from "@/data/mvp-forest-world";
import { trackLearningEvent } from "@/lib/learning-analytics/client";
import { getForestLevelAccess } from "@/lib/progress/level-access";

export function LevelIntroClient({ level }: { level: MvpLevel }) {
  const { ready, syncStatus, worldProgressRecord } = useMvpProgress();
  const progressLoading = level.level !== 1 && (!ready || syncStatus === "loading");
  const levelAccess = getForestLevelAccess(level.level, worldProgressRecord.completedLevels);

  useEffect(() => {
    if (!levelAccess.accessible || progressLoading) return;
    trackLearningEvent("level_intro_viewed", {
      subject: forestWorldIdentity.subject,
      year: forestWorldIdentity.year,
      worldId: forestWorldIdentity.worldId,
      level: level.level,
      nodeType: level.nodeType,
      title: level.title,
    });
  }, [level.level, level.nodeType, level.title, levelAccess.accessible, progressLoading]);

  if (progressLoading) {
    return <LockedLevelNotice level={level.level} requiredLevel={levelAccess.requiredLevel} checking />;
  }

  if (!levelAccess.accessible) {
    return <LockedLevelNotice level={level.level} requiredLevel={levelAccess.requiredLevel} />;
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#BDE7D0] bg-white shadow-playful">
      <div className="relative grid min-h-64 gap-6 overflow-hidden bg-[#EAFBF0] p-6 sm:p-8 lg:grid-cols-[280px_1fr] lg:items-center">
        <span className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-[#66CC00]/15" />
        <div className="relative overflow-hidden rounded-[1.5rem] border-4 border-white shadow-sm"><Image src="/worlds/level 1-forest-world.webp" alt="Forest World mission" width={420} height={300} className="h-56 w-full object-cover" priority /></div>
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B63F6] text-2xl font-black text-white shadow-sm">{level.level}</span><div><p className="text-xs font-black uppercase text-[#FF4FA0]">Forest World Mission</p><p className="mt-1 inline-flex rounded-full bg-[#FFF3C4] px-3 py-1 text-sm font-black text-[#082B80]">{level.nodeType}</p></div></div>
          <h2 className="mt-5 text-4xl font-black leading-tight text-[#082B80]">Level {level.level}: {level.title}</h2>
          <p className="mt-3 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">{level.description}</p>
        </div>
      </div>
      <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1fr_1fr_220px]">
        <MissionSection title="What you will learn" body={level.description} />
        <MissionSection title="Mission goal" body={`Complete ${level.questions.length} questions, learn from every explanation, and earn stars for careful answers.`} />
        <aside className="rounded-[1.5rem] bg-[#EAF6FF] p-4 text-center"><div className="relative mx-auto h-28 w-28"><Image src="/mascots/learnbot-thinking.webp" alt="LearnBot mission helper" fill sizes="112px" className="object-contain" /></div><p className="mt-2 text-sm font-black text-[#082B80]">LearnBot is ready to help.</p></aside>
      </div>
      <div className="flex flex-col gap-3 border-t border-[#DDE8F5] bg-[#F8FBFF] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex gap-3 text-sm font-black text-[#5B6B94]"><span>{level.questions.length} questions</span><span>10 XP each</span></div>
        <div className="flex flex-col gap-3 sm:flex-row"><PrimaryLink
            href={`/mvp/question/${level.level}`}
            tone="green"
            onClick={() => trackLearningEvent("level_started", {
              subject: forestWorldIdentity.subject,
              year: forestWorldIdentity.year,
              worldId: forestWorldIdentity.worldId,
              level: level.level,
              questionCount: level.questions.length,
            })}
          >
            Start Mission
          </PrimaryLink><PrimaryLink href="/mvp/world-map" tone="white">Back to World Map</PrimaryLink></div>
      </div>
    </section>
  );
}

function MissionSection({ title, body }: { title: string; body: string }) {
  return <div className="rounded-[1.5rem] border border-[#DDE8F5] bg-white p-5"><p className="text-xs font-black uppercase text-[#0B63F6]">{title}</p><p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">{body}</p></div>;
}
