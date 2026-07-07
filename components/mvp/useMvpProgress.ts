"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { forestLevels, getMasteryLabel } from "@/data/mvp-forest-world";
import type { CompleteLevelInput, LocalProgressV2 } from "@/data/progress-types";
import {
  loadProgress as loadChildProgress,
  saveProgress as saveChildProgress,
  type ProgressSyncStatus,
} from "@/lib/progress/child-progress";
import {
  completeLocalLevel,
  createDefaultLocalProgress,
  FOREST_PROGRESS_REF,
  getWorldProgress,
  progressWorldKey,
  readLocalProgress,
  resetLocalProgress,
  saveLocalProgress,
} from "@/lib/progress/local-progress";

export function calculateStars(correct: number, total: number) {
  const percent = total > 0 ? (correct / total) * 100 : 0;
  if (percent >= 90) return 3;
  if (percent >= 70) return 2;
  if (percent >= 50) return 1;
  return 0;
}

export function useMvpProgress() {
  const [progress, setProgress] = useState<LocalProgressV2>(createDefaultLocalProgress);
  const [ready, setReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<ProgressSyncStatus>("loading");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const localProgress = readLocalProgress();
    setProgress(localProgress);
    setReady(true);

    void loadChildProgress()
      .then((result) => {
        if (!active) return;
        if (result.progress) {
          saveLocalProgress(result.progress);
          setProgress(result.progress);
        }
        setSyncStatus(result.status);
        setLastSyncedAt(result.lastPlayedAt);
      })
      .catch(() => {
        if (!active) return;
        setSyncStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  const syncRemoteProgress = useCallback((nextProgress: LocalProgressV2) => {
    setSyncStatus("syncing");
    void saveChildProgress(nextProgress)
      .then((result) => {
        setSyncStatus(result.status);
        if (result.lastPlayedAt) setLastSyncedAt(result.lastPlayedAt);
      })
      .catch(() => {
        setSyncStatus("error");
      });
  }, []);

  const completeLevel = useCallback((input: CompleteLevelInput) => {
    const result = completeLocalLevel(progress, input);
    saveLocalProgress(result.progress);
    setProgress(result.progress);
    syncRemoteProgress(result.progress);
  }, [progress, syncRemoteProgress]);

  const reset = useCallback(() => {
    const fresh = resetLocalProgress();
    setProgress(fresh);
    syncRemoteProgress(fresh);
  }, [syncRemoteProgress]);

  const worldProgressRecord = getWorldProgress(progress, FOREST_PROGRESS_REF);
  const completedCount = worldProgressRecord.completedLevels.length;
  const totalLevels = forestLevels.length;
  const worldProgress = Math.round((completedCount / totalLevels) * 100);
  const accuracy = worldProgressRecord.questionsAnswered > 0
    ? Math.round((worldProgressRecord.correctAnswers / worldProgressRecord.questionsAnswered) * 100)
    : 0;
  const mastery = getMasteryLabel(accuracy);
  const nextUnlockedLevel = forestLevels.find(
    (level) => !worldProgressRecord.completedLevels.includes(level.level),
  )?.level ?? totalLevels;
  const worldCompleted = progress.completedWorlds.includes(progressWorldKey(FOREST_PROGRESS_REF));

  return useMemo(
    () => ({
      progress,
      worldProgressRecord,
      worldCompleted,
      ready,
      syncStatus,
      lastSyncedAt,
      completeLevel,
      reset,
      completedCount,
      totalLevels,
      worldProgress,
      accuracy,
      mastery,
      nextUnlockedLevel,
    }),
    [
      progress,
      worldProgressRecord,
      worldCompleted,
      ready,
      syncStatus,
      lastSyncedAt,
      completeLevel,
      reset,
      completedCount,
      totalLevels,
      worldProgress,
      accuracy,
      mastery,
      nextUnlockedLevel,
    ],
  );
}