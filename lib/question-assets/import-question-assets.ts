import type {
  ChoiceOption,
  NormalizedCountObjectsQuestion,
  NormalizedFillInBlankQuestion,
  NormalizedMultipleChoiceQuestion,
  NormalizedQuestion,
  NormalizedTapAnswerQuestion,
  NormalizedTrueFalseQuestion,
  TapTarget,
} from "@/data/question-engine-types";
import type { ForestL01QuestionAssetRow } from "@/data/question-asset-schema";
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

function getCorrectChoiceId(options: string[], correctAnswer: string, questionId: string) {
  const exactIndex = options.findIndex((option) => option === correctAnswer);
  const normalizedIndex = options.findIndex(
    (option) => option.trim().toLocaleLowerCase("en") === correctAnswer.trim().toLocaleLowerCase("en"),
  );
  const index = exactIndex >= 0 ? exactIndex : normalizedIndex;
  if (index < 0) {
    throw new Error(`${questionId}: correct answer does not match any option.`);
  }
  return choiceId(index);
}

function getCorrectTargetId(targets: TapTarget[], correctAnswer: string, questionId: string) {
  const normalizedAnswer = correctAnswer.trim().toLocaleLowerCase("en");
  const target = targets.find(
    (item) =>
      item.id === correctAnswer ||
      item.label.trim().toLocaleLowerCase("en") === normalizedAnswer,
  );
  if (!target) {
    throw new Error(`${questionId}: correct answer does not match any tap target.`);
  }
  return target.id;
}

function parseNumberAnswer(correctAnswer: string, questionId: string) {
  const value = Number(correctAnswer);
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

function visualMetadata(row: ReturnType<typeof parseForestL01AssetRows>[number]) {
  return {
    source: "question-asset-master",
    visualObject: row.visualObject,
    visualDescription: row.visualDescription,
    topic: row.topic,
    subtopic: row.subtopic,
    learningObjective: row.learningObjective,
    voiceScript: row.voiceScript,
    steps: row.steps,
    finalExplanation: row.finalExplanation,
    learnBotTip: row.learnBotTip,
  };
}

function baseFields(row: ReturnType<typeof parseForestL01AssetRows>[number]) {
  return {
    questionId: row.questionId,
    prompt: row.question,
    explanation: row.finalExplanation,
    visualMetadata: visualMetadata(row),
    accessibilityText: `${row.question} ${row.visualDescription}`.trim(),
  };
}

function toMultipleChoice(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedMultipleChoiceQuestion {
  if (row.options.length === 0) {
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
    .map((option) => Number(option))
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

function toTapAnswer(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedTapAnswerQuestion {
  if (row.options.length === 0) {
    throw new Error(`${row.questionId}: tap-answer targets are missing.`);
  }
  const targets: TapTarget[] = row.options.map((label, index) => ({
    id: slugify(label, `target-${index + 1}`),
    label,
    visualRef: row.visualObject,
    accessibilityLabel: `Tap ${label}`,
  }));

  return {
    ...baseFields(row),
    interactionType: "tap-answer",
    interaction: { targets },
    answerSpec: { correctTargetId: getCorrectTargetId(targets, row.correctAnswer, row.questionId) },
    gradingSpec: { strategy: "exact-target" },
  };
}

function toFillInBlank(row: ReturnType<typeof parseForestL01AssetRows>[number]): NormalizedFillInBlankQuestion {
  return {
    ...baseFields(row),
    interactionType: "fill-in-blank",
    interaction: {
      template: row.question,
      blankId: `${row.questionId}-blank`,
      inputMode: Number.isFinite(Number(row.correctAnswer)) ? "numeric" : "text",
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
      return toTapAnswer(row);
    case "Fill Missing Number":
      return toFillInBlank(row);
    case "Match Pairs":
      // A dedicated matching renderer can be added later. For the A9 preview
      // layer, pair rows are safely represented as tap-answer choices.
      return toTapAnswer(row);
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