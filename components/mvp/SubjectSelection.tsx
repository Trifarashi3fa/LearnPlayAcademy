"use client";

import Link from "next/link";
import { mvpSubjects } from "@/data/mvp-forest-world";
import { MvpCard, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

export function SubjectSelection() {
  const { worldProgress, completedCount } = useMvpProgress();

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {mvpSubjects.map((subject) => {
        const progress = subject.enabled ? worldProgress : 0;
        const levelsCompleted = subject.enabled ? completedCount : 0;

        return (
          <Link
            key={subject.id}
            href={subject.enabled ? "/mvp/world-map" : "/subjects"}
            className="group block rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            <MvpCard className="h-full transition group-hover:-translate-y-1 group-hover:shadow-playful">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF6FF] text-lg font-black text-[#0B63F6]">
                  {subject.icon}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${
                  subject.enabled ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#FFF3C4] text-[#082B80]"
                }`}>
                  {subject.enabled ? "Playable" : "Coming Soon"}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black">{subject.title}</h2>
              <p className="mt-2 min-h-14 text-sm font-bold leading-6 text-[#5B6B94]">
                {subject.description}
              </p>
              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm font-black text-[#5B6B94]">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <ProgressBar value={progress} />
              </div>
              <p className="mt-3 text-sm font-black text-[#082B80]">
                {levelsCompleted} levels completed
              </p>
            </MvpCard>
          </Link>
        );
      })}
    </div>
  );
}