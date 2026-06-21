"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { forestLevels, getMasteryLabel } from "@/data/mvp-forest-world";
import {
  forestWorldIdentity,
  normalizeForestBadgeName,
  normalizeForestWorldId,
} from "@/data/forest-world-identity";

export type MvpProgress = {
  currentSubject: string;
  currentWorld: string;
  currentLevel: number;
  xp: number;
  stars: number;
  badges: string[];
  completedLevels: number[];
  levelStars: Record<string, number>;
  questionsAnswered: number;
  correctAnswers: number;
};

const STORAGE_KEY = "learnplay-mvp-progress-v1";

export const defaultProgress: MvpProgress = {
  currentSubject: forestWorldIdentity.subject,
  currentWorld: forestWorldIdentity.worldId,
  currentLevel: 1,
  xp: 0,
  stars: 0,
  badges: [],
  completedLevels: [],
  levelStars: {},
  questionsAnswered: 0,
  correctAnswers: 0,
};

function normalizeProgress(value: Partial<MvpProgress> | null): MvpProgress {
  // Older local saves used math-forest-world and Forest Guardian Badge.
  // Normalize names while preserving XP, stars, completed levels, and answers.
  return {
    ...defaultProgress,
    ...value,
    currentSubject: forestWorldIdentity.subject,
    currentWorld: normalizeForestWorldId(value?.currentWorld),
    badges: Array.isArray(value?.badges) ? value.badges.map(normalizeForestBadgeName) : [],
    completedLevels: Array.isArray(value?.completedLevels) ? value.completedLevels : [],
    levelStars: value?.levelStars ?? {},
  };
}

export function readMvpProgress(): MvpProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return normalizeProgress(JSON.parse(raw) as Partial<MvpProgress>);
  } catch {
    return defaultProgress;
  }
}

export function saveMvpProgress(progress: MvpProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetMvpProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProgress));
}

export function calculateStars(correct: number, total: number) {
  const percent = total > 0 ? (correct / total) * 100 : 0;
  if (percent >= 90) return 3;
  if (percent >= 70) return 2;
  if (percent >= 50) return 1;
  return 0;
}

export function useMvpProgress() {
  const [progress, setProgress] = useState<MvpProgress>(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readMvpProgress());
    setReady(true);
  }, []);

  const updateProgress = useCallback((next: MvpProgress) => {
    setProgress(next);
    saveMvpProgress(next);
  }, []);

  const reset = useCallback(() => {
    setProgress(defaultProgress);
    resetMvpProgress();
  }, []);

  const completedCount = progress.completedLevels.length;
  const totalLevels = forestLevels.length;
  const worldProgress = Math.round((completedCount / totalLevels) * 100);
  const accuracy =
    progress.questionsAnswered > 0
      ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)
      : 0;
  const mastery = getMasteryLabel(accuracy);
  const nextUnlockedLevel = Math.min(totalLevels, completedCount + 1);

  return useMemo(
    () => ({
      progress,
      ready,
      updateProgress,
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
      ready,
      updateProgress,
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