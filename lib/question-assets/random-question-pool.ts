import type { ForestL01QuestionAssetRow } from "@/data/question-asset-schema";
import type { NormalizedQuestion } from "@/data/question-engine-types";

export type QuestionPoolQuestionType =
  | "Multiple Choice"
  | "Count & Type"
  | "Tap Correct Group"
  | "Fill Missing Number"
  | "Match Pairs"
  | "True or False";

export type QuestionPoolWarning = {
  code:
    | "pool-too-small"
    | "duplicate-question-id"
    | "missing-asset-row"
    | "unsupported-question-type"
    | "target-shortfall";
  message: string;
  questionId?: string;
};

export type RendererSupportStatus =
  | "supported"
  | "preview-fallback"
  | "preview-only-limitation"
  | "unsupported";

export type RendererSupportSummaryItem = {
  questionType: string;
  status: RendererSupportStatus;
  count: number;
  message: string;
};

export type QuestionPoolSelectorOptions = {
  subject: string;
  year: number;
  world: string;
  level: number;
  desiredQuestionCount: number;
  targetDistribution: Partial<Record<QuestionPoolQuestionType, number>>;
  seed?: string;
  questions: NormalizedQuestion[];
  assetRows: ForestL01QuestionAssetRow[];
  validQuestionIds?: Iterable<string>;
};

export type QuestionPoolSelectionResult = {
  selectedQuestions: NormalizedQuestion[];
  selectedQuestionIds: string[];
  typeDistribution: Record<string, number>;
  targetDistribution: Partial<Record<QuestionPoolQuestionType, number>>;
  eligibleCount: number;
  validCount: number;
  hasEnoughQuestions: boolean;
  duplicateQuestionIds: string[];
  warnings: QuestionPoolWarning[];
};

type EligibleQuestion = {
  question: NormalizedQuestion;
  row: ForestL01QuestionAssetRow;
  questionType: string;
  approvalRank: number;
};

export const forestL01TargetDistribution = {
  "Multiple Choice": 3,
  "Count & Type": 2,
  "Tap Correct Group": 2,
  "Fill Missing Number": 1,
  "Match Pairs": 1,
  "True or False": 1,
} as const satisfies Record<QuestionPoolQuestionType, number>;

const supportedQuestionTypes = new Set<QuestionPoolQuestionType>([
  "Multiple Choice",
  "Count & Type",
  "Tap Correct Group",
  "Fill Missing Number",
  "Match Pairs",
  "True or False",
]);

function normalizeText(value: string | number | null | undefined) {
  return String(value).trim().toLocaleLowerCase("en");
}

function normalizeComparableText(value: string | number | null | undefined) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, " ").trim();
}

function extractNumber(value: string | number | null | undefined) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const match = String(value ?? "").match(/\d+/);
  return match ? Number(match[0]) : Number.NaN;
}

function subjectMatches(actual: string | number | null | undefined, expected: string) {
  return normalizeComparableText(actual) === normalizeComparableText(expected);
}

function worldMatches(actual: string | number | null | undefined, expected: string) {
  const actualWorld = normalizeComparableText(actual);
  const expectedWorld = normalizeComparableText(expected);
  return actualWorld === expectedWorld || (actualWorld.includes("forest") && expectedWorld.includes("forest"));
}

function levelMatches(actual: string | number | null | undefined, expected: number) {
  return extractNumber(actual) === expected;
}

function yearMatches(actual: string | number | null | undefined, expected: number) {
  return extractNumber(actual) === expected;
}

export function classifyQuestionRendererSupport(questionType: string): {
  status: RendererSupportStatus;
  message: string;
} {
  if (
    questionType === "Multiple Choice" ||
    questionType === "Count & Type" ||
    questionType === "Tap Correct Group" ||
    questionType === "Fill Missing Number" ||
    questionType === "True or False" ||
    questionType === "Match Pairs"
  ) {
    return {
      status: "supported",
      message: `${questionType} renders through a dedicated question-engine renderer.`,
    };
  }

  return {
    status: "unsupported",
    message: `${questionType || "Unknown"} is not supported by the dev preview renderer.`,
  };
}

export function summarizeRendererSupport(rows: ForestL01QuestionAssetRow[]) {
  const summary = rows.reduce<Record<string, RendererSupportSummaryItem>>((items, row) => {
    const questionType = row["Question Type"] || "Unknown";
    const support = classifyQuestionRendererSupport(questionType);
    const key = `${support.status}:${questionType}`;
    items[key] ??= {
      questionType,
      status: support.status,
      count: 0,
      message: support.message,
    };
    items[key].count += 1;
    return items;
  }, {});

  const items = Object.values(summary).sort((a, b) => a.questionType.localeCompare(b.questionType));

  return {
    items,
    supported: items.filter((item) => item.status === "supported"),
    previewFallback: items.filter((item) => item.status === "preview-fallback"),
    previewOnlyLimitation: items.filter((item) => item.status === "preview-only-limitation"),
    unsupported: items.filter((item) => item.status === "unsupported"),
  };
}

function createSeededRandom(seed = "learnplay-forest-l01") {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return function nextRandom() {
    hash += 0x6d2b79f5;
    let value = hash;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: string) {
  const random = createSeededRandom(seed);
  return items
    .map((item, index) => ({ item, index, sort: random() }))
    .sort((a, b) => a.sort - b.sort || a.index - b.index)
    .map(({ item }) => item);
}

function approvalRank(row: ForestL01QuestionAssetRow) {
  const status = normalizeText(row.Status);
  const reviewStatus = normalizeText(row["Review Status"]);

  if (status === "approved" && reviewStatus === "approved") return 0;
  if (
    ["approved", "review", "ready", "review-ready"].includes(status) ||
    ["approved", "review", "ready", "review-ready"].includes(reviewStatus)
  ) {
    return 1;
  }
  return 2;
}

function findDuplicateIds(rows: ForestL01QuestionAssetRow[]) {
  const counts = rows.reduce<Record<string, number>>((allCounts, row) => {
    const id = row["Question ID"];
    if (id) allCounts[id] = (allCounts[id] ?? 0) + 1;
    return allCounts;
  }, {});

  return Object.entries(counts)
    .filter(([, count]) => count > 1)
    .map(([id]) => id)
    .sort();
}

function orderByApprovalThenSeed(items: EligibleQuestion[], seed: string) {
  const grouped = [0, 1, 2].flatMap((rank) =>
    seededShuffle(
      items.filter((item) => item.approvalRank === rank),
      `${seed}:rank-${rank}`,
    ),
  );
  return grouped;
}

export function selectRandomQuestionPool({
  subject,
  year,
  world,
  level,
  desiredQuestionCount,
  targetDistribution,
  seed = "learnplay-forest-l01",
  questions,
  assetRows,
  validQuestionIds,
}: QuestionPoolSelectorOptions): QuestionPoolSelectionResult {
  const validIds =
    validQuestionIds === undefined ? null : new Set(Array.from(validQuestionIds));
  const rowById = new Map(assetRows.map((row) => [row["Question ID"], row]));
  const duplicateQuestionIds = findDuplicateIds(assetRows);
  const warnings: QuestionPoolWarning[] = duplicateQuestionIds.map((questionId) => ({
    code: "duplicate-question-id",
    questionId,
    message: `Duplicate question ID found in the Forest L01 asset pool: ${questionId}.`,
  }));

  const eligible: EligibleQuestion[] = [];

  questions.forEach((question) => {
    if (validIds && !validIds.has(question.questionId)) return;

    const row = rowById.get(question.questionId);
    if (!row) {
      warnings.push({
        code: "missing-asset-row",
        questionId: question.questionId,
        message: `Imported question ${question.questionId} has no matching asset row.`,
      });
      return;
    }

    const questionType = row["Question Type"];
    const rendererSupport = classifyQuestionRendererSupport(questionType);
    if (
      !supportedQuestionTypes.has(questionType as QuestionPoolQuestionType) ||
      rendererSupport.status === "unsupported"
    ) {
      warnings.push({
        code: "unsupported-question-type",
        questionId: question.questionId,
        message: rendererSupport.message,
      });
      return;
    }

    if (
      !subjectMatches(row.Subject, subject) ||
      !yearMatches(row.Year, year) ||
      !worldMatches(row.World, world) ||
      !levelMatches(row.Level, level)
    ) {
      return;
    }

    eligible.push({
      question,
      row,
      questionType,
      approvalRank: approvalRank(row),
    });
  });

  if (eligible.length < desiredQuestionCount) {
    warnings.push({
      code: "pool-too-small",
      message: `Forest L01 has ${eligible.length} eligible questions. ${desiredQuestionCount} are needed for a full session.`,
    });
  }

  const orderedEligible = orderByApprovalThenSeed(eligible, seed);
  const selected: EligibleQuestion[] = [];
  const selectedIds = new Set<string>();

  function addItem(item: EligibleQuestion) {
    if (selectedIds.has(item.question.questionId)) return false;
    selected.push(item);
    selectedIds.add(item.question.questionId);
    return true;
  }

  Object.entries(targetDistribution).forEach(([type, targetCount]) => {
    if (!targetCount || targetCount <= 0) return;
    const matchingItems = orderedEligible.filter(
      (item) => item.questionType === type && !selectedIds.has(item.question.questionId),
    );
    const selectedBefore = selected.length;
    matchingItems.slice(0, targetCount).forEach(addItem);
    const addedCount = selected.length - selectedBefore;

    if (addedCount < targetCount) {
      warnings.push({
        code: "target-shortfall",
        message: `Requested ${targetCount} ${type} question(s), but only ${addedCount} were available. Remaining slots will be filled from other valid questions.`,
      });
    }
  });

  if (selected.length < desiredQuestionCount) {
    orderedEligible
      .filter((item) => !selectedIds.has(item.question.questionId))
      .slice(0, desiredQuestionCount - selected.length)
      .forEach(addItem);
  }

  const finalSelection = selected.slice(0, desiredQuestionCount);
  const typeDistribution = finalSelection.reduce<Record<string, number>>((counts, item) => {
    counts[item.questionType] = (counts[item.questionType] ?? 0) + 1;
    return counts;
  }, {});

  return {
    selectedQuestions: finalSelection.map((item) => item.question),
    selectedQuestionIds: finalSelection.map((item) => item.question.questionId),
    typeDistribution,
    targetDistribution,
    eligibleCount: eligible.length,
    validCount: validIds ? validIds.size : questions.length,
    hasEnoughQuestions: eligible.length >= desiredQuestionCount,
    duplicateQuestionIds,
    warnings,
  };
}

export function selectForestL01RandomSession(options: {
  questions: NormalizedQuestion[];
  assetRows: ForestL01QuestionAssetRow[];
  validQuestionIds?: Iterable<string>;
  seed?: string;
  desiredQuestionCount?: number;
}) {
  return selectForestYear1RandomSession({ ...options, level: 1 });
}

export function selectForestYear1RandomSession(options: {
  level: number;
  questions: NormalizedQuestion[];
  assetRows: ForestL01QuestionAssetRow[];
  validQuestionIds?: Iterable<string>;
  seed?: string;
  desiredQuestionCount?: number;
}) {
  return selectRandomQuestionPool({
    subject: "Mathematics",
    year: 1,
    world: "Forest World",
    level: options.level,
    desiredQuestionCount: options.desiredQuestionCount ?? 10,
    targetDistribution: forestL01TargetDistribution,
    seed: options.seed,
    questions: options.questions,
    assetRows: options.assetRows,
    validQuestionIds: options.validQuestionIds,
  });
}
