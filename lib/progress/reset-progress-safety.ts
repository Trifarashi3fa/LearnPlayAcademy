import type { ProgressSyncStatus } from "@/lib/progress/child-progress";

export type ProgressResetAction = "clear-local-device-data";

export type ProgressResetImpact = {
  localProgress: boolean;
  syncedChildProgress: boolean;
  childProfile: boolean;
  xpStarsLevelsAttemptsRewards: boolean;
};

export type ResetSubmissionState = {
  dialogOpen: boolean;
  secondActionConfirmed: boolean;
  processing: boolean;
};

export function getProgressResetImpact(action: ProgressResetAction): ProgressResetImpact {
  if (action === "clear-local-device-data") {
    return {
      localProgress: true,
      syncedChildProgress: false,
      childProfile: false,
      xpStarsLevelsAttemptsRewards: true,
    };
  }

  return {
    localProgress: false,
    syncedChildProgress: false,
    childProfile: false,
    xpStarsLevelsAttemptsRewards: false,
  };
}

export function canSubmitProgressReset(state: ResetSubmissionState) {
  return state.dialogOpen && state.secondActionConfirmed && !state.processing;
}

export function getSyncedProgressSafetyMessage(syncStatus: ProgressSyncStatus) {
  if (syncStatus === "synced" || syncStatus === "syncing" || syncStatus === "loading") {
    return "Saved child profile progress is not deleted by this local device action.";
  }

  if (syncStatus === "signed-out" || syncStatus === "no-child-profile" || syncStatus === "local-only") {
    return "Only progress stored on this browser will be cleared.";
  }

  return "There is a save issue, so this action will only clear local browser progress.";
}
