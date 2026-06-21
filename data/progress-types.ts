import type { NodeType, SubjectId } from "@/data/curriculum-types";

export type ProgressWorldRef = {
  subject: SubjectId;
  year: number;
  worldId: string;
};

export type LevelCompletionRecord = {
  level: number;
  nodeType: NodeType;
  completedAt: string;
  attempts: number;
  bestCorrectAnswers: number;
  totalQuestions: number;
  bestStars: number;
  completionBonusXpAwarded: number;
  worldCompletionXpAwarded: number;
};

/** Aggregated by question ID so localStorage remains bounded as children replay levels. */
export type QuestionAttemptRecord = {
  questionId: string;
  attempts: number;
  correctAttempts: number;
  lastSelectedAnswer: string;
  lastCorrect: boolean;
  lastAttemptedAt: string;
};

export type WorldProgressRecord = ProgressWorldRef & {
  currentLevel: number;
  completedLevels: number[];
  levelStars: Record<string, number>;
  levelCompletions: Record<string, LevelCompletionRecord>;
  questionAttempts: Record<string, QuestionAttemptRecord>;
  questionsAnswered: number;
  correctAnswers: number;
};

export type ProgressMigrationRecord = {
  fromKey: string;
  migratedAt: string;
};

export type LocalProgressV2 = {
  version: 2;
  active: ProgressWorldRef;
  totalXp: number;
  totalStars: number;
  badges: string[];
  completedWorlds: string[];
  unlockedWorlds: string[];
  worlds: Record<string, WorldProgressRecord>;
  migration: ProgressMigrationRecord | null;
};

export type LevelQuestionAttemptInput = {
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  xpReward: number;
};

export type CompleteLevelInput = ProgressWorldRef & {
  level: number;
  nodeType: NodeType;
  totalLevels: number;
  totalQuestions: number;
  correctAnswers: number;
  starsEarned: number;
  completionBonusXp: number;
  worldCompletionXp: number;
  completesWorld: boolean;
  completionBadge: string;
  questionAttempts: LevelQuestionAttemptInput[];
};

export type CompleteLevelResult = {
  progress: LocalProgressV2;
  xpAwarded: number;
  questionXpAwarded: number;
  completionBonusAwarded: number;
  worldBonusAwarded: number;
  firstLevelCompletion: boolean;
  firstWorldCompletion: boolean;
};