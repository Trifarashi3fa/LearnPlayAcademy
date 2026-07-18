"use client";

import Link from "next/link";
import { MvpCard, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { ENGLISH_PROGRESS_REF } from "@/data/english-world-identity";
import { isFeatureActive, publicSubjectAvailability } from "@/data/feature-flags";
import { SCIENCE_PROGRESS_REF } from "@/data/science-world-identity";
import { FOREST_PROGRESS_REF } from "@/lib/progress/local-progress";

type SubjectAvailabilityItem = (typeof publicSubjectAvailability)[number];

function ActiveSubjectCard({ subject }: { subject: SubjectAvailabilityItem }) {
  const ref = subject.id === "english" ? ENGLISH_PROGRESS_REF : subject.id === "science" ? SCIENCE_PROGRESS_REF : FOREST_PROGRESS_REF;
  const { worldProgress, completedCount } = useMvpProgress(ref, 10);
  const card = <SubjectCardContent subject={subject} active worldProgress={worldProgress} completedCount={completedCount} />;
  return (
    <Link key={subject.id} href={subject.href} className="group block rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">
      {card}
    </Link>
  );
}

function SubjectCardContent({
  subject,
  active,
  worldProgress,
  completedCount,
}: {
  subject: SubjectAvailabilityItem;
  active: boolean;
  worldProgress: number;
  completedCount: number;
}) {
  return (
    <MvpCard className={`h-full ${active ? "transition group-hover:-translate-y-1 group-hover:shadow-playful" : "opacity-70"}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF6FF] text-lg font-black text-[#0B63F6]">
          {subject.id === "mathematics" ? "123" : subject.id === "english" ? "ABC" : subject.id === "science" ? "SCI" : subject.title.slice(0, 3).toUpperCase()}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#FFF3C4]"}`}>
          {active ? "Playable" : "Coming Soon"}
        </span>
      </div>
      <h2 className="mt-5 text-2xl font-black">{subject.title}</h2>
      <p className="mt-2 min-h-14 text-sm font-bold leading-6 text-[#5B6B94]">{subject.description}</p>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm font-black text-[#5B6B94]">
          <span>Progress</span>
          <span>{active ? worldProgress : 0}%</span>
        </div>
        <ProgressBar value={active ? worldProgress : 0} />
      </div>
      <p className="mt-3 text-sm font-black">{active ? completedCount : 0} levels completed</p>
    </MvpCard>
  );
}

export function SubjectSelection() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {publicSubjectAvailability.map((subject) => {
        const active = isFeatureActive(subject.featureId);
        return active ? (
          <ActiveSubjectCard key={subject.id} subject={subject} />
        ) : (
          <div key={subject.id} aria-disabled="true">
            <SubjectCardContent subject={subject} active={false} worldProgress={0} completedCount={0} />
          </div>
        );
      })}
    </div>
  );
}
