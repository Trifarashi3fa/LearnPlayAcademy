"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { forestLevels, getMasteryLabel } from "@/data/mvp-forest-world";
import type { CompleteLevelInput, LocalProgressV2 } from "@/data/progress-types";
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

  useEffect(() => {
    setProgress(readLocalProgress());
    setReady(true);
  }, []);

  const completeLevel = useCallback((input: CompleteLevelInput) => {
    setProgress((current) => {
      const result = completeLocalLevel(current, input);
      saveLocalProgress(result.progress);
      return result.progress;
    });
  }, []);

  const reset = useCallback(() => {
    setProgress(resetLocalProgress());
  }, []);

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