import type {
  InteractionType,
  NormalizedMultipleChoiceQuestion,
  NormalizedQuestion,
} from "../../data/question-engine-types";

export type LegacyQuestionSource = {
  questionId?: string;
  id?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  visualMetadata?: unknown;
  visual?: unknown;
  accessibilityText?: string;
  interactionType?: InteractionType;
};

function requireQuestionId(question: LegacyQuestionSource) {
  const questionId = question.questionId ?? question.id;
  if (!questionId || questionId.trim() === "") {
    throw new Error("Question Engine A1 requires questionId or legacy id.");
  }
  return questionId;
}

function normalizeLegacyMultipleChoice(question: LegacyQuestionSource): NormalizedMultipleChoiceQuestion {
  const questionId = requireQuestionId(question);
  if (!Array.isArray(question.options) || question.options.length === 0) {
    throw new Error(`${questionId}: legacy multiple-choice options are missing.`);
  }

  const choices = question.options.map((label, index) => ({
    id: `choice-${String(index + 1).padStart(2, "0")}`,
    // Preserve the authored label exactly as children see it today.
    label,
  }));
  const exactIndex = question.options.findIndex((option) => option === question.correctAnswer);
  const trimmedIndex = question.options.findIndex(
    (option) => option.trim() === question.correctAnswer.trim(),
  );
  const correctIndex = exactIndex >= 0 ? exactIndex : trimmedIndex;
  if (correctIndex < 0) {
    throw new Error(`${questionId}: correctAnswer does not map to a legacy option.`);
  }

  return {
    questionId,
    prompt: question.question,
    interactionType: "multiple-choice",
    interaction: { choices, selectionMode: "single" },
    answerSpec: { correctChoiceId: choices[correctIndex].id },
    gradingSpec: { strategy: "exact-choice" },
    explanation: question.explanation,
    visualMetadata: question.visualMetadata ?? question.visual ?? null,
    accessibilityText: question.accessibilityText ?? question.question,
    originalLegacyFields: {
      sourceId: questionId,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
    },
  };
}

/**
 * A1 deliberately enables only the existing MCQ runtime. Future interaction
 * records fail closed until their renderers and validation rules are added.
 */
export function normalizeQuestion(question: LegacyQuestionSource): NormalizedQuestion {
  if (!question.interactionType || question.interactionType === "multiple-choice") {
    return normalizeLegacyMultipleChoice(question);
  }
  throw new Error(
    `${requireQuestionId(question)}: ${question.interactionType} is defined but not runtime-enabled in Question Engine A1.`,
  );
}