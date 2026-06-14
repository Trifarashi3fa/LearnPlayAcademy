export type XPRules = {
  correctAnswer: number;
  completionBonus: number;
  perfectScoreBonus: number;
};

export type XPLevel = {
  level: number;
  requiredXP: number;
};

export type LevelProgress = {
  level: number;
  currentLevelXP: number;
  nextLevelXP: number | null;
  xpIntoLevel: number;
  xpForNextLevel: number | null;
  progressPercent: number;
};

export type CalculateXPInput = {
  correctAnswers: number;
  totalQuestions: number;
  rules: XPRules;
  completed?: boolean;
};

export type StoredProgress = {
  totalXP: number;
  level: number;
  completedGames: Record<string, number>;
  updatedAt: string;
};

export const XP_LEVELS: XPLevel[] = [
  { level: 1, requiredXP: 0 },
  { level: 2, requiredXP: 100 },
  { level: 3, requiredXP: 250 },
  { level: 4, requiredXP: 500 },
  { level: 5, requiredXP: 1000 },
];

const STORAGE_KEY = "learnplay-academy-progress";

export function calculateXP({
  correctAnswers,
  totalQuestions,
  rules,
  completed = true,
}: CalculateXPInput) {
  const answerXP = correctAnswers * rules.correctAnswer;
  const completionXP = completed ? rules.completionBonus : 0;
  const perfectXP =
    completed && correctAnswers === totalQuestions ? rules.perfectScoreBonus : 0;

  return answerXP + completionXP + perfectXP;
}

export function calculateLevel(totalXP: number): LevelProgress {
  const normalizedXP = Math.max(0, totalXP);
  const currentLevel = [...XP_LEVELS]
    .reverse()
    .find((level) => normalizedXP >= level.requiredXP) ?? XP_LEVELS[0];
  const nextLevel = XP_LEVELS.find(
    (level) => level.requiredXP > currentLevel.requiredXP,
  );
  const xpIntoLevel = normalizedXP - currentLevel.requiredXP;
  const xpForNextLevel = nextLevel
    ? nextLevel.requiredXP - currentLevel.requiredXP
    : null;
  const progressPercent = xpForNextLevel
    ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100))
    : 100;

  return {
    level: currentLevel.level,
    currentLevelXP: currentLevel.requiredXP,
    nextLevelXP: nextLevel?.requiredXP ?? null,
    xpIntoLevel,
    xpForNextLevel,
    progressPercent,
  };
}

export function getDefaultProgress(): StoredProgress {
  return {
    totalXP: 0,
    level: 1,
    completedGames: {},
    updatedAt: new Date(0).toISOString(),
  };
}

export function getStoredProgress(): StoredProgress {
  if (typeof window === "undefined") {
    return getDefaultProgress();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return getDefaultProgress();
  }

  try {
    const parsed = JSON.parse(stored) as Partial<StoredProgress>;
    const totalXP = Math.max(0, Number(parsed.totalXP ?? 0));
    const level = calculateLevel(totalXP).level;

    return {
      totalXP,
      level,
      completedGames: parsed.completedGames ?? {},
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return getDefaultProgress();
  }
}

export function saveStoredProgress(progress: StoredProgress) {
  if (typeof window === "undefined") {
    return progress;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export function recordGameXP(gameId: string, earnedXP: number) {
  const currentProgress = getStoredProgress();
  const totalXP = currentProgress.totalXP + Math.max(0, earnedXP);
  const level = calculateLevel(totalXP).level;
  const nextProgress: StoredProgress = {
    totalXP,
    level,
    completedGames: {
      ...currentProgress.completedGames,
      [gameId]: (currentProgress.completedGames[gameId] ?? 0) + 1,
    },
    updatedAt: new Date().toISOString(),
  };

  return saveStoredProgress(nextProgress);
}
