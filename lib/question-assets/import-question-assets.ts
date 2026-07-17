import type {
  ChoiceOption,
  NormalizedCountObjectsQuestion,
  NormalizedFillInBlankQuestion,
  NormalizedMatchPairsQuestion,
  NormalizedMultipleChoiceQuestion,
  NormalizedQuestion,
  NormalizedTapAnswerQuestion,
  NormalizedTrueFalseQuestion,
  TapTarget,
} from "@/data/question-engine-types";
import type { ForestL01QuestionAssetRow } from "@/data/question-asset-schema";
import {
  buildLegacyMatchPairs,
  orderRightItemsForPreview,
} from "@/lib/question-engine/match-pairs";
import { parseForestL01AssetRows } from "@/lib/question-assets/validate-question-assets";

export type QuestionAssetImportError = {
  questionId: string;
  rowNumber: number;
  message: string;
};

export type QuestionAssetImportResult = {
  questions: NormalizedQuestion[];
  errors: QuestionAssetImportError[];
};

const numberWords: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

function slugify(value: string, fallback: string) {
  const slug = value
    .trim()
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || fallback;
}

function choiceId(index: number) {
  return `choice-${String(index + 1).padStart(2, "0")}`;
}

function parseCount(value: string) {
  const normalized = value.trim().toLocaleLowerCase("en");
  return Number.isFinite(Number(normalized)) ? Number(normalized) : numberWords[normalized];
}

function normalizeAnswer(value: string) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  const numeric = Number(trimmed.replace(/,/g, ""));
  if (trimmed !== "" && Number.isFinite(numeric)) return String(numeric);
  return trimmed.toLocaleLowerCase("en");
}

function normalizeObjectName(value: string) {
  const normalized = value.trim().toLocaleLowerCase("en");
  const dictionary: Record<string, string> = {
    apples: "apple",
    apple: "apple",
    oranges: "orange",
    orange: "orange",
    leaves: "leaf",
    leaf: "leaf",
    mushrooms: "mushroom",
    mushroom: "mushroom",
    pinecones: "pinecone",
    pinecone: "pinecone",
    fish: "fish",
    bees: "bee",
    bee: "bee",
    stars: "star",
    star: "star",
    counters: "number",
    dots: "number",
    rocks: "stone",
    rock: "stone",
  };
  return dictionary[normalized] ?? (normalized.replace(/s$/, "") || "object");
}

function parseComparisonGroups(visualDescription: string) {
  const matches = Array.from(
    visualDescription.matchAll(/(Group [A-D])\s*(?::|-)?\s*(?:shows|has)?\s*([a-z0-9,]+)\s+([a-z]+)/gi),
  );
  if (matches.length < 2) return undefined;

  return matches.slice(0, 4).map((match) => ({
    id: slugify(match[1], "group"),
    label: match[1],
    count: parseCount(match[2].replace(/,/g, "")) ?? 0,
    object: normalizeObjectName(match[3]),
  }));
}

function getCorrectChoiceId(options: string[], correctAnswer: string, questionId: string) {
  const index = options.findIndex(
    (option) => normalizeAnswer(option) === normalizeAnswer(correctAnswer),
  );
  if (index < 0) {
    throw new Error(`${questionId}: correct answer does not match any option.`);
  }
  return choiceId(index);
}

function getCorrectTargetId(targets: TapTarget[], correctAnswer: string, questionId: string) {
  const normalizedAnswer = normalizeAnswer(correctAnswer);
  const target = targets.find(
    (item) =>
      item.id === correctAnswer ||
      normalizeAnswer(item.label) === normalizedAnswer ||
      normalizeAnswer(item.label.split(":")[0] ?? "") === normalizedAnswer ||
      normalizeAnswer(item.label.replace(/^Group\s+[A-D]\s*:\s*/i, "")) === normalizedAnswer,
  );
  if (!target) {
    throw new Error(`${questionId}: correct answer does not match any tap target.`);
  }
  return target.id;
}

function getCorrectMatchPairTargetId(targets: TapTarget[], correctAnswer: string) {
  const firstAnswer = correctAnswer
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)[0];
  if (!firstAnswer) return targets[0]?.id ?? "";
  return (
    targets.find((item) => normalizeAnswer(item.label) === normalizeAnswer(firstAnswer))?.id ??
    targets[0]?.id ??
    ""
  );
}

function parseNumberAnswer(correctAnswer: string, questionId: string) {
  const value = Number(correctAnswer.replace(/,/g, ""));
  if (!Number.isFinite(value)) {
    throw new Error(`${questionId}: expected a numeric correct answer.`);
  }
  return value;
}

function parseTrueFalse(correctAnswer: string, questionId: string) {
  const normalized = correctAnswer.trim().toLocaleLowerCase("en");
  if (["true", "yes", "correct"].includes(normalized)) return true;
  if (["false", "no", "incorrect"].includes(normalized)) return false;
  throw new Error(`${questionId}: true/false correct answer must be True or False.`);
}

function visualMetadata(
  row: ReturnType<typeof parseForestL01AssetRows>[number],
  overrides: Record<string, unknown> = {},
) {
  const requiredAssets = row.requiredAssets
    .split("|")
    .map((asset) => asset.trim())
    .filter(Boolean);

  return {
    source: "question-asset-master",
    assetQuestionType: row.questionType,
    visualObject: normalizeObjectName(row.visualObject),
    visualDescription: row.visualDescription,
    comparisonGroups: parseComparisonGroups(row.visualDescription),
    matchPairTodo: false,
    matchPairsRenderer: row.questionType === "Match Pairs" ? "dedicated" : undefined,
    topic: row.topic,
    subtopic: row.subtopic,
    learningObjective: row.learningObjective,
    voiceScript: row.voiceScript,
    steps: row.steps,
    finalExplanation: row.finalExplanation,
    learnBotTip: row.learnBotTip,
    teachingNotes: row.teachingNotes,
    requiredAssets: row.requiredAssets,
    requiredAssetList: requiredAssets,
    subject: row.subject,
    year: row.year,
    world: row.world,
    level: row.level,
    ...overrides,
  };
}

function baseFields(
  row: ReturnType<typeof parseForestL01AssetRows>[number],
  metadataOverrides: Record<string, unknown> = {},
) {
  return {
    questionId: row.questionId,
    prompt: row.question,
    explanation: row.finalExplanation,
    visualMetadata: visualMetadata(row, metadataOverrides),
    accessibilityText: `${row.question} ${row.visualDescription}`.trim(),
  };
}

function toMultipleChoice(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedMultipleChoiceQuestion {
  if (row.options.length < 2) {
    throw new Error(`${row.questionId}: multiple-choice options are missing.`);
  }
  const choices: ChoiceOption[] = row.options.map((label, index) => ({
    id: choiceId(index),
    label,
  }));

  return {
    ...baseFields(row),
    interactionType: "multiple-choice",
    interaction: { choices, selectionMode: "single" },
    answerSpec: { correctChoiceId: getCorrectChoiceId(row.options, row.correctAnswer, row.questionId) },
    gradingSpec: { strategy: "exact-choice" },
    originalLegacyFields: {
      sourceId: row.questionId,
      options: [...row.options],
      correctAnswer: row.correctAnswer,
    },
  };
}

function toCountObjects(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedCountObjectsQuestion {
  const expectedCount = parseNumberAnswer(row.correctAnswer, row.questionId);
  const numericChoices = row.options
    .map((option) => Number(option.replace(/,/g, "")))
    .filter((option) => Number.isFinite(option));

  return {
    ...baseFields(row),
    interactionType: "count-objects",
    interaction: {
      responseMode: numericChoices.length > 0 ? "numeric-choice" : "number-pad",
      numericChoices: numericChoices.length > 0 ? numericChoices : undefined,
    },
    answerSpec: { expectedCount },
    gradingSpec: { strategy: "exact-number" },
  };
}

function toTapAnswer(
  row: ReturnType<typeof parseForestL01AssetRows>[number],
  mode: "tap-group" | "match-pairs" = "tap-group",
  fallbackReason?: string,
): NormalizedTapAnswerQuestion {
  if (row.options.length < 2) {
    throw new Error(`${row.questionId}: tap-answer targets are missing.`);
  }
  const targets: TapTarget[] = row.options.map((label, index) => ({
    id: slugify(label, `target-${index + 1}`),
    label,
    visualRef: row.visualObject,
    accessibilityLabel: `Tap ${label}`,
  }));
  if (mode === "tap-group" && ["both", "both groups", "same"].includes(normalizeAnswer(row.correctAnswer))) {
    targets.push({
      id: "both-groups",
      label: "Both groups",
      visualRef: row.visualObject,
      accessibilityLabel: "Tap Both groups",
    });
  }

  return {
    ...baseFields(
      row,
      mode === "match-pairs"
        ? {
            matchPairTodo: true,
            matchPairsRenderer: "fallback",
            matchPairsFallbackReason:
              fallbackReason ?? "Match Pairs source data was incomplete.",
          }
        : {},
    ),
    interactionType: "tap-answer",
    interaction: { targets },
    answerSpec: {
      correctTargetId:
        mode === "match-pairs"
          ? getCorrectMatchPairTargetId(targets, row.correctAnswer)
          : getCorrectTargetId(targets, row.correctAnswer, row.questionId),
    },
    gradingSpec: { strategy: "exact-target" },
  };
}

function toMatchPairs(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedMatchPairsQuestion {
  const result = buildLegacyMatchPairs({
    options: row.options,
    correctAnswer: row.correctAnswer,
    questionId: row.questionId,
    visualRef: row.visualObject,
  });

  if (result.pairs.length < 2) {
    throw new Error(
      `${row.questionId}: Match Pairs needs at least 2 complete left = right pairs for the dedicated renderer.`,
    );
  }

  return {
    ...baseFields(row, {
      matchPairsRenderer: "dedicated",
      matchPairsWarnings: result.warnings,
    }),
    interactionType: "match-pairs",
    interaction: {
      pairs: result.pairs,
      leftItems: result.pairs.map((pair) => pair.left),
      rightItems: orderRightItemsForPreview(result.pairs),
      minPairsToComplete: result.pairs.length,
    },
    answerSpec: { pairIds: result.pairs.map((pair) => pair.id) },
    gradingSpec: { strategy: "exact-pairs" },
  };
}

function toFillInBlank(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedFillInBlankQuestion {
  return {
    ...baseFields(row),
    interactionType: "fill-in-blank",
    interaction: {
      template: row.question,
      blankId: `${row.questionId}-blank`,
      inputMode: Number.isFinite(Number(row.correctAnswer.replace(/,/g, ""))) ? "numeric" : "text",
      placeholder: "Type your answer",
    },
    answerSpec: { acceptedAnswers: [row.correctAnswer] },
    gradingSpec: {
      strategy: "normalized-text",
      trimWhitespace: true,
      caseSensitive: false,
      collapseWhitespace: true,
      numericNormalization: true,
    },
  };
}

function toTrueFalse(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedTrueFalseQuestion {
  return {
    ...baseFields(row),
    interactionType: "true-false",
    interaction: {
      trueLabel: "True",
      falseLabel: "False",
    },
    answerSpec: { correctValue: parseTrueFalse(row.correctAnswer, row.questionId) },
    gradingSpec: { strategy: "exact-boolean" },
  };
}

function normalizeAssetRow(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedQuestion {
  switch (row.questionType) {
    case "Multiple Choice":
      return toMultipleChoice(row);
    case "Count & Type":
      return toCountObjects(row);
    case "Tap Correct Group":
    case "Tap Correct":
      return toTapAnswer(row);
    case "Fill Missing Number":
    case "Fill Missing Letter":
    case "Fill Missing Word":
    case "Text Input":
      return toFillInBlank(row);
    case "Match Pairs":
      try {
        return toMatchPairs(row);
      } catch (error) {
        return toTapAnswer(
          row,
          "match-pairs",
          error instanceof Error ? error.message : "Match Pairs source data was incomplete.",
        );
      }
    case "True or False":
      return toTrueFalse(row);
    default:
      throw new Error(`${row.questionId}: unsupported question type ${row.questionType}.`);
  }
}

export function importForestL01AssetRows(rows: ForestL01QuestionAssetRow[]): QuestionAssetImportResult {
  const parsedRows = parseForestL01AssetRows(rows);
  const questions: NormalizedQuestion[] = [];
  const errors: QuestionAssetImportError[] = [];

  parsedRows.forEach((row, index) => {
    try {
      questions.push(normalizeAssetRow(row));
    } catch (error) {
      errors.push({
        questionId: row.questionId || `row-${index + 1}`,
        rowNumber: index + 1,
        message: error instanceof Error ? error.message : "Unknown import error.",
      });
    }
  });

  return { questions, errors };
}

export const importQuestionAssetRows = importForestL01AssetRows;
