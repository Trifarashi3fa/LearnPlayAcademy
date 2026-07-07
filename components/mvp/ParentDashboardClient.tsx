"use client";

import { forestLevels, mvpSubjects } from "@/data/mvp-forest-world";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import { MvpButtonLink, MvpEmptyState, MvpMetricCard, MvpProgressBar, MvpStatusPill, MvpSurface } from "@/components/mvp/MvpUi";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import type { ProgressSyncStatus } from "@/lib/progress/child-progress";

export function ParentDashboardClient() {
  const {
    progress,
    worldProgressRecord,
    completedCount,
    totalLevels,
    worldProgress,
    accuracy,
    mastery,
    syncStatus,
    lastSyncedAt,
  } = useMvpProgress();

  const completedTopics = forestLevels.filter((level) => worldProgressRecord.completedLevels.includes(level.level));
  const strongTopics = completedTopics.slice(-3).map((level) => level.title);
  const weakTopics = forestLevels
    .filter((level) => !worldProgressRecord.completedLevels.includes(level.level))
    .slice(0, 3)
    .map((level) => level.title);

  return (
    <div className="space-y-6">
      <MvpSurface className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <MvpStatusPill tone={syncTone(syncStatus)}>{syncLabel(syncStatus)}</MvpStatusPill>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            {lastSyncedAt ? `Last saved: ${new Date(lastSyncedAt).toLocaleString()}` : "Complete a level to save this child profile's Forest progress."}
          </p>
        </div>
        <MvpButtonLink href="/account" tone="white">Account</MvpButtonLink>
      </MvpSurface>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MvpMetricCard label="Total XP" value={progress.totalXp} tone="blue" />
        <MvpMetricCard label="Completed Levels" value={`${completedCount}/${totalLevels}`} tone="green" />
        <MvpMetricCard label="Accuracy" value={`${accuracy}%`} tone="yellow" />
        <MvpMetricCard label="Mastery Level" value={mastery} tone="pink" />
      </div>

      <MvpSurface>
        <h2 className="text-3xl font-black">Child Progress</h2>
        <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
          Current subject: Mathematics Year {forestWorldIdentity.year}. Current world: Forest World. Current unlocked level: {worldProgressRecord.currentLevel}.
        </p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-black">
            <span>Forest World progress</span>
            <span>{worldProgress}%</span>
          </div>
          <MvpProgressBar value={worldProgress} label="Forest World progress" />
        </div>
      </MvpSurface>

      <div className="grid gap-5 lg:grid-cols-2">
        <TopicList
          title="Strong Topics"
          emptyTitle="Strong topics will appear soon"
          emptyDescription="Complete Level 1 so LearnPlay can show the skills your child is building."
          topics={strongTopics}
          tone="green"
        />
        <TopicList
          title="Topics To Practice Next"
          emptyTitle="No practice topics yet"
          emptyDescription="When every Forest mission is complete, this area will stay clear."
          topics={weakTopics}
          tone="yellow"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <MvpSurface>
          <h2 className="text-2xl font-black">Subject Progress</h2>
          <div className="mt-4 space-y-4">
            {mvpSubjects.map((subject) => (
              <div key={subject.id} className="rounded-[1.25rem] bg-[#EAF6FF] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{subject.title}</p>
                  <p className="text-sm font-black">{subject.enabled ? `${worldProgress}%` : "0%"}</p>
                </div>
                <div className="mt-2">
                  <MvpProgressBar value={subject.enabled ? worldProgress : 0} label={`${subject.title} progress`} />
                </div>
              </div>
            ))}
          </div>
        </MvpSurface>

        <MvpSurface>
          <h2 className="text-2xl font-black">Forest World Levels</h2>
          <div className="mt-4 space-y-3">
            {forestLevels.map((level) => {
              const complete = worldProgressRecord.completedLevels.includes(level.level);
              return (
                <div key={level.level} className="flex items-center justify-between gap-3 rounded-[1.25rem] bg-[#F8FBFF] px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-black">Level {level.level}: {level.title}</p>
                    <p className="text-sm font-bold text-[#5B6B94]">{level.nodeType}</p>
                  </div>
                  <MvpStatusPill tone={complete ? "green" : "yellow"}>
                    {complete ? "Complete" : "Not yet"}
                  </MvpStatusPill>
                </div>
              );
            })}
          </div>
        </MvpSurface>
      </div>

      <MvpSurface>
        <h2 className="text-2xl font-black">Learning Summary</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <MvpMetricCard label="Questions Answered" value={worldProgressRecord.questionsAnswered} tone="blue" />
          <MvpMetricCard label="Correct Answers" value={worldProgressRecord.correctAnswers} tone="green" />
          <MvpMetricCard label="Stars Earned" value={progress.totalStars} tone="yellow" />
        </div>
      </MvpSurface>

      <div className="flex flex-wrap gap-3">
        <MvpButtonLink href="/mvp/world-map">Open Forest World Map</MvpButtonLink>
        <MvpButtonLink href="/mvp/rewards" tone="white">View Rewards</MvpButtonLink>
      </div>
    </div>
  );
}

function syncLabel(status: ProgressSyncStatus) {
  if (status === "synced") return "Saved in child profile";
  if (status === "syncing" || status === "loading") return "Syncing progress";
  if (status === "no-child-profile") return "Create child profile to save";
  if (status === "signed-out") return "Log in to save progress";
  if (status === "error") return "Save issue";
  return "Local progress only";
}

function syncTone(status: ProgressSyncStatus): "blue" | "green" | "yellow" | "red" {
  if (status === "synced") return "green";
  if (status === "syncing" || status === "loading") return "blue";
  if (status === "error") return "red";
  return "yellow";
}

function TopicList({
  title,
  emptyTitle,
  emptyDescription,
  topics,
  tone,
}: {
  title: string;
  emptyTitle: string;
  emptyDescription: string;
  topics: string[];
  tone: "green" | "yellow";
}) {
  if (topics.length === 0) {
    return <MvpEmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const className = tone === "green" ? "bg-[#22C55E]/15 text-[#14532D]" : "bg-[#FFF3C4] text-[#082B80]";

  return (
    <MvpSurface>
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-4 space-y-3">
        {topics.map((topic) => (
          <p key={topic} className={`rounded-[1.25rem] px-4 py-3 text-sm font-black ${className}`}>
            {topic}
          </p>
        ))}
      </div>
    </MvpSurface>
  );
}