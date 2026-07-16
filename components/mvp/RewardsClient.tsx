"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MvpButton, MvpButtonLink, MvpEmptyState, MvpMetricCard, MvpStatusPill, MvpSurface, mvpButtonClass } from "@/components/mvp/MvpUi";
import { useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import type { ProgressSyncStatus } from "@/lib/progress/child-progress";
import {
  canSubmitProgressReset,
  getProgressResetImpact,
  getSyncedProgressSafetyMessage,
} from "@/lib/progress/reset-progress-safety";

export function RewardsClient() {
  const { progress, clearLocalDeviceProgress, syncStatus, lastSyncedAt } = useMvpProgress();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [resetProcessing, setResetProcessing] = useState(false);
  const [resetStatus, setResetStatus] = useState<"idle" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const hasBadges = progress.badges.length > 0;
  const resetImpact = getProgressResetImpact("clear-local-device-data");
  const canConfirmReset = canSubmitProgressReset({
    dialogOpen: resetDialogOpen,
    secondActionConfirmed: finalConfirmation,
    processing: resetProcessing,
  });

  useEffect(() => {
    if (!resetDialogOpen) return;
    const focusTimer = window.setTimeout(() => cancelButtonRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [resetDialogOpen, finalConfirmation]);

  function closeResetDialog() {
    if (resetProcessing) return;
    setResetDialogOpen(false);
    setFinalConfirmation(false);
    setResetStatus("idle");
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeResetDialog();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openResetDialog() {
    setFinalConfirmation(false);
    setResetStatus("idle");
    setResetDialogOpen(true);
  }

  function confirmResetStep() {
    setFinalConfirmation(true);
    setResetStatus("idle");
  }

  function runLocalReset() {
    if (!canConfirmReset) return;
    setResetProcessing(true);
    setResetStatus("idle");
    const success = clearLocalDeviceProgress();
    setResetProcessing(false);
    setResetStatus(success ? "success" : "error");
    if (success) setFinalConfirmation(false);
  }

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
              <Image src="/rewards/badge.webp" alt="LearnPlay achievement badge" width={320} height={320} className="aspect-square w-full rounded-xl object-cover" priority />
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
        <MvpButton type="button" onClick={openResetDialog} tone="danger">
          Clear Local Device Data
        </MvpButton>
      </div>

      {resetDialogOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#082B80]/45 p-4"
          role="presentation"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-progress-title"
            aria-describedby="reset-progress-description"
            onKeyDown={handleDialogKeyDown}
            className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-[#FCA5A5] bg-white p-5 text-[#082B80] shadow-playful sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] bg-[#FEE2E2] text-3xl" aria-hidden>
                !
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-wide text-[#B91C1C]">Parent confirmation</p>
                <h2 id="reset-progress-title" className="mt-1 text-2xl font-black leading-tight sm:text-3xl">
                  Clear progress stored on this device?
                </h2>
                <p id="reset-progress-description" className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
                  This action only clears the browser progress on this device. It will not delete the child profile or saved Supabase child progress.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ResetImpactRow active={resetImpact.localProgress} label="Local device progress" detail="Cleared from this browser." />
              <ResetImpactRow active={resetImpact.xpStarsLevelsAttemptsRewards} label="XP, stars, levels, attempts, rewards" detail="Reset in local storage." />
              <ResetImpactRow active={resetImpact.syncedChildProgress} label="Synced child progress" detail="Not deleted by this action." safe />
              <ResetImpactRow active={resetImpact.childProfile} label="Child profile" detail="Not deleted by this action." safe />
            </div>

            <div className="mt-4 rounded-[1.25rem] border border-[#DDE8F5] bg-[#EAF6FF] p-4">
              <p className="text-sm font-black text-[#082B80]">Saved child data</p>
              <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">
                {getSyncedProgressSafetyMessage(syncStatus)}
              </p>
            </div>

            {finalConfirmation ? (
              <div className="mt-4 rounded-[1.25rem] border border-[#FCA5A5] bg-[#FFF7F7] p-4" aria-live="polite">
                <p className="text-sm font-black text-[#B91C1C]">Final check</p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">
                  Press the red button once to clear local device data. Choose Cancel to keep everything unchanged.
                </p>
              </div>
            ) : null}

            {resetStatus === "success" ? (
              <div className="mt-4 rounded-[1.25rem] border border-[#86EFAC] bg-[#DCFCE7] p-4 text-sm font-black text-[#15803D]" role="status">
                Local device progress was cleared. Synced child progress was not deleted.
              </div>
            ) : null}

            {resetStatus === "error" ? (
              <div className="mt-4 rounded-[1.25rem] border border-[#FCA5A5] bg-[#FEE2E2] p-4 text-sm font-black text-[#B91C1C]" role="alert">
                Local progress could not be cleared. Please check browser storage permissions and try again.
              </div>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={closeResetDialog}
                disabled={resetProcessing}
                className={mvpButtonClass({ tone: "white", disabled: resetProcessing })}
              >
                {resetStatus === "success" ? "Done" : "Cancel"}
              </button>
              {resetStatus !== "success" ? (
                finalConfirmation ? (
                  <MvpButton type="button" tone="danger" onClick={runLocalReset} disabled={!canConfirmReset || resetProcessing}>
                    {resetProcessing ? "Clearing..." : "Clear Local Device Data"}
                  </MvpButton>
                ) : (
                  <MvpButton type="button" tone="danger" onClick={confirmResetStep} disabled={resetProcessing}>
                    Continue to Final Confirmation
                  </MvpButton>
                )
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResetImpactRow({
  active,
  label,
  detail,
  safe = false,
}: {
  active: boolean;
  label: string;
  detail: string;
  safe?: boolean;
}) {
  return (
    <div className={`rounded-[1.25rem] border p-4 ${active && !safe ? "border-[#FCA5A5] bg-[#FFF7F7]" : "border-[#DDE8F5] bg-[#F8FBFF]"}`}>
      <p className="text-sm font-black text-[#082B80]">{label}</p>
      <p className={`mt-1 text-xs font-bold leading-5 ${active && !safe ? "text-[#B91C1C]" : "text-[#5B6B94]"}`}>
        {detail}
      </p>
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
