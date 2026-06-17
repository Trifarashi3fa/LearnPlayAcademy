"use client";

import { forestLevels, mvpSubjects } from "@/data/mvp-forest-world";
import { MvpCard, PrimaryLink, ProgressBar } from "@/components/mvp/MvpShell";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";

export function ParentDashboardClient() {
  const {
    progress,
    completedCount,
    totalLevels,
    worldProgress,
    accuracy,
    mastery,
  } = useMvpProgress();

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStat label="XP" value={String(progress.xp)} />
        <DashboardStat label="Stars" value={String(progress.stars)} />
        <DashboardStat label="Levels Completed" value={`${completedCount}/${totalLevels}`} />
        <DashboardStat label="Accuracy" value={`${accuracy}%`} />
      </div>

      <MvpCard>
        <h2 className="text-3xl font-black">Child Progress</h2>
        <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
          Current subject: Mathematics. Current world: Forest World. Current level: {progress.currentLevel}.
        </p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-black">
            <span>World progress</span>
            <span>{worldProgress}%</span>
          </div>
          <ProgressBar value={worldProgress} />
        </div>
      </MvpCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <MvpCard>
          <h2 className="text-2xl font-black">Subject Progress</h2>
          <div className="mt-4 space-y-4">
            {mvpSubjects.map((subject) => (
              <div key={subject.id} className="rounded-[1.25rem] bg-[#EAF6FF] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{subject.title}</p>
                  <p className="text-sm font-black">{subject.enabled ? `${worldProgress}%` : "0%"}</p>
                </div>
                <div className="mt-2">
                  <ProgressBar value={subject.enabled ? worldProgress : 0} />
                </div>
              </div>
            ))}
          </div>
        </MvpCard>

        <MvpCard>
          <h2 className="text-2xl font-black">World Progress</h2>
          <div className="mt-4 space-y-3">
            {forestLevels.map((level) => {
              const complete = progress.completedLevels.includes(level.level);
              return (
                <div key={level.level} className="flex items-center justify-between rounded-[1.25rem] bg-[#F8FBFF] px-4 py-3">
                  <div>
                    <p className="font-black">Level {level.level}: {level.title}</p>
                    <p className="text-sm font-bold text-[#5B6B94]">{level.nodeType}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${complete ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#FFF3C4] text-[#082B80]"}`}>
                    {complete ? "Complete" : "Not yet"}
                  </span>
                </div>
              );
            })}
          </div>
        </MvpCard>
      </div>

      <MvpCard>
        <h2 className="text-2xl font-black">Learning Summary</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <DashboardStat label="Questions Answered" value={String(progress.questionsAnswered)} />
          <DashboardStat label="Correct Answers" value={String(progress.correctAnswers)} />
          <DashboardStat label="Mastery Level" value={mastery} />
        </div>
      </MvpCard>

      <div className="flex flex-wrap gap-3">
        <PrimaryLink href="/mvp/world-map" tone="blue">Open World Map</PrimaryLink>
        <PrimaryLink href="/mvp/rewards" tone="white">View Rewards</PrimaryLink>
      </div>
    </div>
  );
}

function DashboardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-[#EAF6FF] p-5">
      <p className="text-sm font-black uppercase text-[#5B6B94]">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}