"use client";

import { useEffect } from "react";
import { forestLevels } from "@/data/mvp-forest-world";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import {
  learningPackages,
  mathematicsForestWorldPackage,
} from "@/data/learning-packages";
import { subjectRegistry } from "@/data/subject-registry";
import { getYearLevelAvailabilityMessage, isSupportedMvpYearLevel } from "@/data/account-types";
import { MvpButtonLink, MvpEmptyState, MvpMetricCard, MvpProgressBar, MvpStatusPill, MvpSurface } from "@/components/mvp/MvpUi";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { trackLearningEvent } from "@/lib/learning-analytics/client";
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
    selectedChild,
    ready,
  } = useMvpProgress();

  const completedTopics = forestLevels.filter((level) => worldProgressRecord.completedLevels.includes(level.level));
  const completedSkillLabels = completedTopics.slice(-3).map((level) => `Level ${level.level}: ${level.title}`);
  const practiceLevels = forestLevels
    .filter((level) => !worldProgressRecord.completedLevels.includes(level.level))
    .slice(0, 3);
  const nextLevel = forestLevels.find((level) => level.level === worldProgressRecord.currentLevel)
    ?? practiceLevels[0]
    ?? null;
  const allForestLevelsComplete = completedCount >= totalLevels;
  const noProgressYet = completedCount === 0 && worldProgressRecord.questionsAnswered === 0 && progress.totalXp === 0;
  const unsupportedYear = Boolean(selectedChild && !isSupportedMvpYearLevel(selectedChild.yearLevel));

  useEffect(() => {
    trackLearningEvent("parent_dashboard_viewed", {
      subject: forestWorldIdentity.subject,
      worldId: forestWorldIdentity.worldId,
      completedLevels: completedCount,
      totalXp: progress.totalXp,
    });
  }, [completedCount, progress.totalXp]);

  return (
    <div className="space-y-6">
      <MvpSurface className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
        <div className="min-w-0">
          <MvpStatusPill tone={syncTone(syncStatus)}>{syncLabel(syncStatus)}</MvpStatusPill>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            {syncDescription(syncStatus, lastSyncedAt)}
          </p>
        </div>
        <MvpButtonLink
          href="/account"
          tone="white"
          onClick={() => trackLearningEvent("parent_dashboard_cta_clicked", { cta: "account", destination: "/account" })}
        >
          Account
        </MvpButtonLink>
      </MvpSurface>

      {!ready || syncStatus === "loading" ? (
        <MvpSurface className="border-[#BFE3FF] bg-[#F4FAFF]">
          <MvpStatusPill tone="blue">Checking save status</MvpStatusPill>
          <h2 className="mt-3 text-2xl font-black text-[#082B80]">Loading the latest progress</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            LearnPlay is checking this device and the selected child profile. Local progress remains visible while account sync finishes.
          </p>
        </MvpSurface>
      ) : null}

      {syncStatus === "no-child-profile" ? (
        <MvpEmptyState
          title="No child profile selected"
          description="Create one nickname-based child profile to sync Forest World progress to the parent account. This device can still keep local progress."
          action={<MvpButtonLink href="/account">Create Child Profile</MvpButtonLink>}
        />
      ) : null}

      {unsupportedYear && selectedChild ? (
        <MvpSurface className="border-[#FFD76A] bg-[#FFF7D6]">
          <MvpStatusPill tone="yellow">Year {selectedChild.yearLevel} coming soon</MvpStatusPill>
          <h2 className="mt-3 text-2xl font-black text-[#082B80]">Active lessons are Year 1 only</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            {getYearLevelAvailabilityMessage(selectedChild.yearLevel)} Switch the profile to Year 1 to use the current {mathematicsForestWorldPackage.subjectName} {mathematicsForestWorldPackage.worldName} MVP.
          </p>
          <div className="mt-4">
            <MvpButtonLink href="/account" tone="white">Review Child Profile</MvpButtonLink>
          </div>
        </MvpSurface>
      ) : null}

      {noProgressYet ? (
        <MvpSurface className="border-[#BDE7D0] bg-[#F3FFF7]">
          <MvpStatusPill tone="green">Ready to start</MvpStatusPill>
          <h2 className="mt-3 text-2xl font-black text-[#082B80]">No learning progress yet</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            Start Level 1 to create the first Forest World progress record. The dashboard will update after a level is completed.
          </p>
        </MvpSurface>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MvpMetricCard label="Total XP" value={progress.totalXp} tone="blue" />
        <MvpMetricCard label="Completed Levels" value={`${completedCount}/${totalLevels}`} tone="green" />
        <MvpMetricCard label="Accuracy" value={`${accuracy}%`} tone="yellow" />
        <MvpMetricCard label="Mastery Level" value={mastery} tone="pink" />
      </div>

      <MvpSurface>
        <h2 className="text-3xl font-black">Child Progress</h2>
        <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
          Current subject: {mathematicsForestWorldPackage.subjectName} Year {forestWorldIdentity.year}. Current world: {mathematicsForestWorldPackage.worldName}. Current unlocked mission: Level {worldProgressRecord.currentLevel}.
        </p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-black">
            <span>{mathematicsForestWorldPackage.worldName} progress</span>
            <span>{worldProgress}%</span>
          </div>
          <MvpProgressBar value={worldProgress} label={`${mathematicsForestWorldPackage.worldName} progress`} />
        </div>
      </MvpSurface>

      <RecommendedPracticeCard
        allComplete={allForestLevelsComplete}
        nextLevel={nextLevel}
        unsupportedYear={unsupportedYear}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <TopicList
          title="Recently Completed Skills"
          helper="These are based on completed Forest World levels, not topic-level test analytics yet."
          emptyTitle="Completed skills will appear soon"
          emptyDescription="Complete Level 1 so LearnPlay can show the skills your child has recently finished."
          topics={completedSkillLabels}
          tone="green"
        />
        <TopicList
          title="Recommended Practice"
          helper="For this MVP, recommendations use the next incomplete Forest World levels."
          emptyTitle="All current practice is complete"
          emptyDescription="Every available Forest mission is complete. Rewards and assessment preparation can come next."
          topics={practiceLevels.map((level) => `Level ${level.level}: ${level.title}`)}
          tone="yellow"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <MvpSurface>
          <h2 className="text-2xl font-black">Subject Progress</h2>
          <div className="mt-4 space-y-4">
            {subjectRegistry.filter((subject) => subject.showInSubjectSelection).map((subject) => {
              const pkg = learningPackages.find((item) => item.subject === subject.id);
              const packageProgress = pkg?.packageId === mathematicsForestWorldPackage.packageId ? worldProgress : 0;
              return (
              <div key={subject.id} className="rounded-[1.25rem] bg-[#EAF6FF] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{subject.parentDashboardDisplayName}</p>
                  <p className="text-sm font-black">
                    {pkg?.status === "active" ? `${packageProgress}%` : "Coming soon"}
                  </p>
                </div>
                <div className="mt-2">
                  <MvpProgressBar value={packageProgress} label={`${subject.parentDashboardDisplayName} progress`} />
                </div>
              </div>
            );
            })}
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
        <p className="mt-3 text-sm font-bold leading-6 text-[#5B6B94]">
          Accuracy is based on recorded question attempts, including replays. True topic-strength analytics will be added later.
        </p>
      </MvpSurface>

      <div className="flex flex-wrap gap-3">
        <MvpButtonLink
          href="/mvp/world-map"
          onClick={() => trackLearningEvent("parent_dashboard_cta_clicked", { cta: "open_world_map", destination: "/mvp/world-map" })}
        >
          Open Forest World Map
        </MvpButtonLink>
        <MvpButtonLink
          href="/mvp/rewards"
          tone="white"
          onClick={() => trackLearningEvent("parent_dashboard_cta_clicked", { cta: "view_rewards", destination: "/mvp/rewards" })}
        >
          View Rewards
        </MvpButtonLink>
      </div>
    </div>
  );
}

function syncLabel(status: ProgressSyncStatus) {
  if (status === "synced") return "Saved in child profile";
  if (status === "syncing") return "Saving progress";
  if (status === "loading") return "Checking saved progress";
  if (status === "no-child-profile") return "Create child profile to save";
  if (status === "signed-out") return "Log in to save progress";
  if (status === "error") return "Save issue";
  return "Local progress only";
}

function syncDescription(status: ProgressSyncStatus, lastSyncedAt: string | null) {
  if (status === "synced") {
    return lastSyncedAt
      ? `Saved to the selected child profile: ${new Date(lastSyncedAt).toLocaleString()}`
      : "Connected to a child profile. The next completed level will update the saved progress.";
  }
  if (status === "syncing") return "Saving the latest completed level to the selected child profile.";
  if (status === "loading") return "Checking whether this parent account has a selected child profile and saved progress.";
  if (status === "no-child-profile") return "Progress can stay on this device, but account sync needs one nickname-based child profile.";
  if (status === "signed-out") return "Progress is available on this device. Log in to sync future completed levels to a child profile.";
  if (status === "error") return "Local progress is still visible. Account sync could not be confirmed, so try again later or check the account page.";
  return "Progress is stored on this device only. It will not follow the child to another device until an account and child profile are used.";
}

function syncTone(status: ProgressSyncStatus): "blue" | "green" | "yellow" | "red" {
  if (status === "synced") return "green";
  if (status === "syncing" || status === "loading") return "blue";
  if (status === "error") return "red";
  return "yellow";
}

function RecommendedPracticeCard({
  allComplete,
  nextLevel,
  unsupportedYear,
}: {
  allComplete: boolean;
  nextLevel: (typeof forestLevels)[number] | null;
  unsupportedYear: boolean;
}) {
  if (unsupportedYear) {
    return (
      <MvpSurface className="border-[#FFD76A] bg-[#FFF7D6]">
        <MvpStatusPill tone="yellow">Action needed</MvpStatusPill>
        <h2 className="mt-3 text-2xl font-black text-[#082B80]">Update the child year level first</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
          Recommended practice is available for Year 1 Forest World only in the current MVP.
        </p>
        <div className="mt-4">
          <MvpButtonLink href="/account" tone="white">Open Account</MvpButtonLink>
        </div>
      </MvpSurface>
    );
  }

  if (allComplete) {
    return (
      <MvpSurface className="border-[#BDE7D0] bg-[#F3FFF7]">
        <MvpStatusPill tone="green">Forest World complete</MvpStatusPill>
        <h2 className="mt-3 text-2xl font-black text-[#082B80]">All current Forest missions are complete</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
          Your child has completed every available Year 1 Forest World level. Visit rewards while the next learning step is prepared.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <MvpButtonLink href="/mvp/rewards">View Rewards</MvpButtonLink>
          <MvpButtonLink href="/mvp/world-map" tone="white">Open World Map</MvpButtonLink>
        </div>
      </MvpSurface>
    );
  }

  if (!nextLevel) {
    return (
      <MvpEmptyState
        title="Recommended practice is almost ready"
        description="Open the Forest World map to choose the next available mission."
        action={<MvpButtonLink href="/mvp/world-map">Open Forest World Map</MvpButtonLink>}
      />
    );
  }

  return (
    <MvpSurface className="border-[#BFE3FF] bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAF6FF]">
      <MvpStatusPill tone="blue">Recommended Practice</MvpStatusPill>
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-[#082B80]">
            Level {nextLevel.level}: {nextLevel.title}
          </h2>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            This is the next unlocked Forest World mission based on completed levels.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <MvpStatusPill tone="pink">{nextLevel.nodeType}</MvpStatusPill>
            <MvpStatusPill tone="yellow">Year {forestWorldIdentity.year}</MvpStatusPill>
          </div>
        </div>
        <MvpButtonLink href={`/mvp/level/${nextLevel.level}`} size="lg">
          Continue Level {nextLevel.level}
        </MvpButtonLink>
      </div>
    </MvpSurface>
  );
}

function TopicList({
  title,
  helper,
  emptyTitle,
  emptyDescription,
  topics,
  tone,
}: {
  title: string;
  helper: string;
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
      <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{helper}</p>
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
