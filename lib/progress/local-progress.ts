import {
  forestWorldIdentity,
  normalizeForestBadgeName,
  normalizeForestWorldId,
} from "@/data/forest-world-identity";
import {
  getLearningPackageByProgressKey,
  getLearningPackageByRef,
  learningPackageProgressRef,
  mathematicsForestWorldPackage,
  normalizeLearningWorldId,
} from "@/data/learning-packages";
import type {
  CompleteLevelInput,
  CompleteLevelResult,
  LevelCompletionRecord,
  LocalProgressV2,
  ProgressWorldRef,
  QuestionAttemptRecord,
  WorldProgressRecord,
} from "@/data/progress-types";

export const MVP_PROGRESS_V1_KEY = "learnplay-mvp-progress-v1";
export const MVP_PROGRESS_V2_KEY = "learnplay-mvp-progress-v2";

export const FOREST_PROGRESS_REF: ProgressWorldRef = {
  ...learningPackageProgressRef(mathematicsForestWorldPackage),
};

type LegacyProgressV1 = {
  currentSubject?: string;
  currentWorld?: string;
  currentLevel?: number;
  xp?: number;
  stars?: number;
  badges?: string[];
  completedLevels?: number[];
  levelStars?: Record<string, number>;
  questionsAnswered?: number;
  correctAnswers?: number;
};

function record(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function safeNonNegative(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

function packageTotalLevels(ref: ProgressWorldRef): number {
  return getLearningPackageByRef(ref)?.totalLevels ?? mathematicsForestWorldPackage.totalLevels;
}

function safeLevel(value: unknown, fallback = 1, totalLevels: number = mathematicsForestWorldPackage.totalLevels) {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= totalLevels ? value : fallback;
}

function forestNodeType(level: number): LevelCompletionRecord["nodeType"] {
  const types: LevelCompletionRecord["nodeType"][] = [
    "Learn", "Practice", "Mini Game", "Learn", "Practice",
    "Mini Game", "Learn", "Review", "Challenge", "Boss",
  ];
  return types[level - 1] ?? "Practice";
}

function uniqueStrings(value: unknown) {
  return Array.isArray(value)
    ? [...new Set(value.filter((item): item is string => typeof item === "string" && item.trim() !== ""))]
    : [];
}

function uniqueLevels(value: unknown, totalLevels: number = mathematicsForestWorldPackage.totalLevels) {
  return Array.isArray(value)
    ? [...new Set(value.map((item) => safeLevel(item, 0, totalLevels)).filter((item) => item >= 1))].sort((a, b) => a - b)
    : [];
}

export function progressWorldKey(ref: ProgressWorldRef) {
  const worldId = normalizeLearningWorldId(ref.worldId);
  return `${ref.subject}:${ref.year}:${typeof worldId === "string" ? worldId : ref.worldId}`;
}

function normalizeProgressWorldKey(key: string) {
  const pkg = getLearningPackageByProgressKey(key);
  if (pkg) return progressWorldKey(learningPackageProgressRef(pkg));
  const [subject, year, ...worldParts] = key.split(":");
  const normalizedWorldId = normalizeLearningWorldId(worldParts.join(":"));
  return subject && year && typeof normalizedWorldId === "string"
    ? `${subject}:${year}:${normalizedWorldId}`
    : key;
}

export function createEmptyWorldProgress(ref: ProgressWorldRef): WorldProgressRecord {
  return {
    ...ref,
    currentLevel: 1,
    completedLevels: [],
    levelStars: {},
    levelCompletions: {},
    questionAttempts: {},
    questionsAnswered: 0,
    correctAnswers: 0,
  };
}

export function createDefaultLocalProgress(): LocalProgressV2 {
  const key = progressWorldKey(FOREST_PROGRESS_REF);
  return {
    version: 2,
    active: FOREST_PROGRESS_REF,
    totalXp: 0,
    totalStars: 0,
    badges: [],
    completedWorlds: [],
    unlockedWorlds: [key],
    worlds: { [key]: createEmptyWorldProgress(FOREST_PROGRESS_REF) },
    migration: null,
  };
}

function normalizeLevelCompletion(value: unknown, level: number): LevelCompletionRecord | null {
  if (!record(value)) return null;
  const nodeType = typeof value.nodeType === "string" ? value.nodeType : "Practice";
  if (!["Learn", "Practice", "Mini Game", "Review", "Challenge", "Boss"].includes(nodeType)) return null;
  return {
    level,
    nodeType: nodeType as LevelCompletionRecord["nodeType"],
    completedAt: typeof value.completedAt === "string" ? value.completedAt : new Date(0).toISOString(),
    attempts: Math.max(1, safeNonNegative(value.attempts)),
    bestCorrectAnswers: safeNonNegative(value.bestCorrectAnswers),
    totalQuestions: safeNonNegative(value.totalQuestions),
    bestStars: Math.min(3, safeNonNegative(value.bestStars)),
    completionBonusXpAwarded: safeNonNegative(value.completionBonusXpAwarded),
    worldCompletionXpAwarded: safeNonNegative(value.worldCompletionXpAwarded),
  };
}

function normalizeQuestionAttempt(value: unknown, questionId: string): QuestionAttemptRecord | null {
  if (!record(value)) return null;
  return {
    questionId,
    attempts: safeNonNegative(value.attempts),
    correctAttempts: safeNonNegative(value.correctAttempts),
    lastSelectedAnswer: typeof value.lastSelectedAnswer === "string" ? value.lastSelectedAnswer : "",
    lastCorrect: value.lastCorrect === true,
    lastAttemptedAt: typeof value.lastAttemptedAt === "string" ? value.lastAttemptedAt : new Date(0).toISOString(),
  };
}

function normalizeWorld(value: unknown, fallbackRef: ProgressWorldRef): WorldProgressRecord {
  if (!record(value)) return createEmptyWorldProgress(fallbackRef);
  const ref: ProgressWorldRef = {
    subject: typeof value.subject === "string" ? value.subject as ProgressWorldRef["subject"] : fallbackRef.subject,
    year: typeof value.year === "number" && value.year > 0 ? value.year : fallbackRef.year,
    worldId: typeof value.worldId === "string" && value.worldId ? String(normalizeLearningWorldId(value.worldId)) : fallbackRef.worldId,
  };
  const totalLevels = packageTotalLevels(ref);
  const completedLevels = uniqueLevels(value.completedLevels, totalLevels);
  const levelStars: Record<string, number> = {};
  if (record(value.levelStars)) {
    for (const [level, stars] of Object.entries(value.levelStars)) {
      levelStars[level] = Math.min(3, safeNonNegative(stars));
    }
  }
  const levelCompletions: Record<string, LevelCompletionRecord> = {};
  if (record(value.levelCompletions)) {
    for (const [levelKey, completion] of Object.entries(value.levelCompletions)) {
      const level = safeLevel(Number(levelKey), 0, totalLevels);
      const normalized = level > 0 ? normalizeLevelCompletion(completion, level) : null;
      if (normalized) levelCompletions[levelKey] = normalized;
    }
  }
  const questionAttempts: Record<string, QuestionAttemptRecord> = {};
  if (record(value.questionAttempts)) {
    for (const [questionId, attempt] of Object.entries(value.questionAttempts)) {
      const normalized = normalizeQuestionAttempt(attempt, questionId);
      if (normalized) questionAttempts[questionId] = normalized;
    }
  }
  return {
    ...ref,
    currentLevel: safeLevel(value.currentLevel, Math.min(totalLevels, completedLevels.length + 1), totalLevels),
    completedLevels,
    levelStars,
    levelCompletions,
    questionAttempts,
    questionsAnswered: safeNonNegative(value.questionsAnswered),
    correctAnswers: safeNonNegative(value.correctAnswers),
  };
}

function normalizeV2(value: unknown): LocalProgressV2 | null {
  if (!record(value) || value.version !== 2) return null;
  const active = record(value.active)
    ? {
        subject: typeof value.active.subject === "string" ? value.active.subject as ProgressWorldRef["subject"] : FOREST_PROGRESS_REF.subject,
        year: typeof value.active.year === "number" && value.active.year > 0 ? value.active.year : FOREST_PROGRESS_REF.year,
        worldId: typeof value.active.worldId === "string" && value.active.worldId ? String(normalizeLearningWorldId(value.active.worldId)) : FOREST_PROGRESS_REF.worldId,
      }
    : FOREST_PROGRESS_REF;
  const worlds: Record<string, WorldProgressRecord> = {};
  if (record(value.worlds)) {
    for (const [key, world] of Object.entries(value.worlds)) {
      const normalizedKey = normalizeProgressWorldKey(key);
      const packageFromKey = getLearningPackageByProgressKey(normalizedKey);
      const fallbackRef = packageFromKey ? learningPackageProgressRef(packageFromKey) : active;
      worlds[normalizedKey] = normalizeWorld(world, normalizedKey === progressWorldKey(FOREST_PROGRESS_REF) ? FOREST_PROGRESS_REF : fallbackRef);
    }
  }
  const forestKey = progressWorldKey(FOREST_PROGRESS_REF);
  if (!worlds[forestKey]) worlds[forestKey] = createEmptyWorldProgress(FOREST_PROGRESS_REF);
  return {
    version: 2,
    active,
    totalXp: safeNonNegative(value.totalXp),
    totalStars: safeNonNegative(value.totalStars),
    badges: uniqueStrings(value.badges).map(normalizeForestBadgeName),
    completedWorlds: uniqueStrings(value.completedWorlds).map(normalizeProgressWorldKey),
    unlockedWorlds: [...new Set([forestKey, ...uniqueStrings(value.unlockedWorlds).map(normalizeProgressWorldKey)])],
    worlds,
    migration: record(value.migration) && typeof value.migration.fromKey === "string" && typeof value.migration.migratedAt === "string"
      ? { fromKey: value.migration.fromKey, migratedAt: value.migration.migratedAt }
      : null,
  };
}

export function normalizeLocalProgress(value: unknown): LocalProgressV2 | null {
  return normalizeV2(value);
}

function migrateV1(value: unknown): LocalProgressV2 | null {
  if (!record(value)) return null;
  const legacy = value as LegacyProgressV1;
  const migratedAt = new Date().toISOString();
  const completedLevels = uniqueLevels(legacy.completedLevels);
  const migratedRef: ProgressWorldRef = {
    ...FOREST_PROGRESS_REF,
    worldId: normalizeForestWorldId(legacy.currentWorld),
  };
  const world = createEmptyWorldProgress(migratedRef);
  world.completedLevels = completedLevels;
  world.currentLevel = Math.min(mathematicsForestWorldPackage.totalLevels, Math.max(safeLevel(legacy.currentLevel), completedLevels.length + 1));
  world.questionsAnswered = safeNonNegative(legacy.questionsAnswered);
  world.correctAnswers = safeNonNegative(legacy.correctAnswers);
  if (record(legacy.levelStars)) {
    for (const [level, stars] of Object.entries(legacy.levelStars)) {
      world.levelStars[level] = Math.min(3, safeNonNegative(stars));
    }
  }
  for (const level of completedLevels) {
    world.levelCompletions[String(level)] = {
      level,
      nodeType: forestNodeType(level),
      completedAt: migratedAt,
      attempts: 1,
      bestCorrectAnswers: 0,
      totalQuestions: 10,
      bestStars: world.levelStars[String(level)] ?? 0,
      // Mark historical bonuses as awarded so migration cannot duplicate XP.
      completionBonusXpAwarded: level === 10 ? 250 : 100,
      worldCompletionXpAwarded: level === 10 ? 500 : 0,
    };
  }
  const key = progressWorldKey(migratedRef);
  const completedWorlds = completedLevels.includes(10) ? [key] : [];
  const badges = uniqueStrings(legacy.badges).map(normalizeForestBadgeName);
  if (completedLevels.includes(10) && !badges.includes(forestWorldIdentity.completionBadge)) {
    badges.push(forestWorldIdentity.completionBadge);
  }
  return {
    version: 2,
    active: migratedRef,
    totalXp: safeNonNegative(legacy.xp),
    totalStars: safeNonNegative(legacy.stars),
    badges,
    completedWorlds,
    unlockedWorlds: [key],
    worlds: { [key]: world },
    migration: { fromKey: MVP_PROGRESS_V1_KEY, migratedAt },
  };
}

export function saveLocalProgress(progress: LocalProgressV2) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(MVP_PROGRESS_V2_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function readLocalProgress(): LocalProgressV2 {
  const fallback = createDefaultLocalProgress();
  if (typeof window === "undefined") return fallback;
  try {
    const currentRaw = window.localStorage.getItem(MVP_PROGRESS_V2_KEY);
    if (currentRaw) {
      const normalized = normalizeV2(JSON.parse(currentRaw));
      if (normalized) {
        saveLocalProgress(normalized);
        return normalized;
      }
    }
  } catch {
    // Corrupt v2 data falls through to the intact v1 migration or a clean default.
  }
  try {
    const legacyRaw = window.localStorage.getItem(MVP_PROGRESS_V1_KEY);
    if (legacyRaw) {
      const migrated = migrateV1(JSON.parse(legacyRaw));
      if (migrated && saveLocalProgress(migrated)) return migrated;
    }
  } catch {
    // Corrupt legacy data must not prevent a safe fresh start.
  }
  saveLocalProgress(fallback);
  return fallback;
}

export function resetLocalProgress() {
  const fresh = createDefaultLocalProgress();
  const saved = saveLocalProgress(fresh);
  // The v1 key is intentionally retained; an existing valid v2 record prevents remigration.
  return { progress: fresh, saved };
}

export function getWorldProgress(progress: LocalProgressV2, ref: ProgressWorldRef) {
  return progress.worlds[progressWorldKey(ref)] ?? createEmptyWorldProgress(ref);
}

export function completeLocalLevel(progress: LocalProgressV2, input: CompleteLevelInput): CompleteLevelResult {
  const key = progressWorldKey(input);
  const previousWorld = getWorldProgress(progress, input);
  const firstLevelCompletion = !previousWorld.completedLevels.includes(input.level);
  const firstWorldCompletion = input.completesWorld
    && !progress.completedWorlds.includes(key)
    && !previousWorld.completedLevels.includes(input.level);
  const questionXpAwarded = input.questionAttempts.reduce(
    (total, attempt) => total + (attempt.correct ? Math.max(0, attempt.xpReward) : 0),
    0,
  );
  const completionBonusAwarded = firstLevelCompletion ? Math.max(0, input.completionBonusXp) : 0;
  const worldBonusAwarded = firstWorldCompletion ? Math.max(0, input.worldCompletionXp) : 0;
  const previousStars = previousWorld.levelStars[String(input.level)] ?? 0;
  const bestStars = Math.max(previousStars, Math.min(3, input.starsEarned));
  const completedLevels = firstLevelCompletion
    ? [...previousWorld.completedLevels, input.level].sort((a, b) => a - b)
    : previousWorld.completedLevels;
  const attemptedAt = new Date().toISOString();
  const questionAttempts = { ...previousWorld.questionAttempts };
  for (const attempt of input.questionAttempts) {
    const previous = questionAttempts[attempt.questionId];
    questionAttempts[attempt.questionId] = {
      questionId: attempt.questionId,
      attempts: (previous?.attempts ?? 0) + 1,
      correctAttempts: (previous?.correctAttempts ?? 0) + (attempt.correct ? 1 : 0),
      lastSelectedAnswer: attempt.selectedAnswer,
      lastCorrect: attempt.correct,
      lastAttemptedAt: attemptedAt,
    };
  }
  const previousCompletion = previousWorld.levelCompletions[String(input.level)];
  const levelCompletion: LevelCompletionRecord = {
    level: input.level,
    nodeType: input.nodeType,
    completedAt: previousCompletion?.completedAt ?? attemptedAt,
    attempts: (previousCompletion?.attempts ?? 0) + 1,
    bestCorrectAnswers: Math.max(previousCompletion?.bestCorrectAnswers ?? 0, input.correctAnswers),
    totalQuestions: input.totalQuestions,
    bestStars,
    completionBonusXpAwarded: previousCompletion?.completionBonusXpAwarded ?? completionBonusAwarded,
    worldCompletionXpAwarded: previousCompletion?.worldCompletionXpAwarded ?? worldBonusAwarded,
  };
  const world: WorldProgressRecord = {
    ...previousWorld,
    currentLevel: Math.min(input.totalLevels, Math.max(previousWorld.currentLevel, input.level + 1)),
    completedLevels,
    levelStars: { ...previousWorld.levelStars, [String(input.level)]: bestStars },
    levelCompletions: { ...previousWorld.levelCompletions, [String(input.level)]: levelCompletion },
    questionAttempts,
    questionsAnswered: previousWorld.questionsAnswered + input.questionAttempts.length,
    correctAnswers: previousWorld.correctAnswers + input.questionAttempts.filter((attempt) => attempt.correct).length,
  };
  const badges = [...progress.badges];
  const badge = input.completesWorld ? input.completionBadge : `Level ${input.level} Badge`;
  if (!badges.includes(badge)) badges.push(badge);
  const nextProgress: LocalProgressV2 = {
    ...progress,
    active: { subject: input.subject, year: input.year, worldId: input.worldId },
    totalXp: progress.totalXp + questionXpAwarded + completionBonusAwarded + worldBonusAwarded,
    totalStars: progress.totalStars + Math.max(0, bestStars - previousStars),
    badges,
    completedWorlds: firstWorldCompletion ? [...progress.completedWorlds, key] : progress.completedWorlds,
    unlockedWorlds: progress.unlockedWorlds.includes(key) ? progress.unlockedWorlds : [...progress.unlockedWorlds, key],
    worlds: { ...progress.worlds, [key]: world },
  };
  return {
    progress: nextProgress,
    xpAwarded: questionXpAwarded + completionBonusAwarded + worldBonusAwarded,
    questionXpAwarded,
    completionBonusAwarded,
    worldBonusAwarded,
    firstLevelCompletion,
    firstWorldCompletion,
  };
}
