"use client";

import Image from "next/image";
import { MvpButton, MvpButtonLink, MvpEmptyState, MvpMetricCard, MvpStatusPill, MvpSurface } from "@/components/mvp/MvpUi";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import type { ProgressSyncStatus } from "@/lib/progress/child-progress";

export function RewardsClient() {
  const { progress, reset, syncStatus, lastSyncedAt } = useMvpProgress();
  const hasBadges = progress.badges.length > 0;

  return (
    <div className="space-y-6">
      <MvpSurface className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <MvpStatusPill tone={syncTone(syncStatus)}>{syncLabel(syncStatus)}</MvpStatusPill>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            {lastSyncedAt ? `Last saved: ${new Date(lastSyncedAt).toLocaleString()}` : "Rewards are saved to the selected child profile after level completion."}
          </p>
        </div>
        <MvpButtonLink href="/account" tone="white">Account</MvpButtonLink>
      </MvpSurface>

      <div className="grid gap-5 md:grid-cols-3">
        <MvpMetricCard label="XP" value={progress.totalXp} tone="blue" />
        <MvpMetricCard label="Stars" value={progress.totalStars} tone="yellow" />
        <MvpMetricCard label="Badges" value={progress.badges.length} tone="green" />
      </div>

      {hasBadges ? (
        <MvpSurface className="overflow-hidden bg-gradient-to-br from-[#EAFBF0] via-white to-[#FFF3C4] p-6 shadow-playful sm:p-8">
          <div className="grid gap-7 md:grid-cols-[240px_1fr] md:items-center">
            <div className="overflow-hidden rounded-[1.5rem] border-8 border-white bg-[#FFF3C4] p-2 shadow-sm">
              <Image src="/rewards/badge.png" alt="LearnPlay achievement badge" width={320} height={320} className="aspect-square w-full rounded-xl object-cover" priority />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Reward Collection</p>
              <h2 className="mt-2 text-4xl font-black text-[#082B80]">Your Forest badges</h2>
              <p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">
                Every badge records a completed learning mission. Finish Level 10 to earn the {forestWorldIdentity.completionBadge}.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {progress.badges.map((badge) => (
                  <span key={badge} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#082B80] shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MvpSurface>
      ) : (
        <MvpEmptyState
          title="Your first badge is waiting"
          description={`Complete Forest World missions to start collecting badges. Level 10 unlocks the ${forestWorldIdentity.completionBadge}.`}
          action={<MvpButtonLink href="/mvp/world-map">Continue Learning</MvpButtonLink>}
        />
      )}

      <div className="flex flex-wrap gap-3">
        <MvpButtonLink href="/mvp/world-map">Continue Learning</MvpButtonLink>
        <MvpButtonLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</MvpButtonLink>
        <MvpButton type="button" onClick={reset} tone="danger">
          Reset Local Progress
        </MvpButton>
      </div>
    </div>
  );
}

function syncLabel(status: ProgressSyncStatus) {
  if (status === "synced") return "Saved in child profile";
  if (status === "syncing" || status === "loading") return "Syncing";
  if (status === "no-child-profile") return "Create child profile to save";
  if (status === "signed-out") return "Local progress only";
  if (status === "error") return "Save issue";
  return "Local progress only";
}

function syncTone(status: ProgressSyncStatus): "blue" | "green" | "yellow" | "red" {
  if (status === "synced") return "green";
  if (status === "syncing" || status === "loading") return "blue";
  if (status === "error") return "red";
  return "yellow";
}