import type {
  GradeResult,
  NormalizedFillInBlankQuestion,
  NormalizedQuestion,
  QuestionResponse,
} from "../../data/question-engine-types";
import { serializeQuestionResponse } from "./serialize-response";

function normalizeText(value: string, question: NormalizedFillInBlankQuestion) {
  const rules = question.gradingSpec;
  let normalized = value;
  if (rules.trimWhitespace) normalized = normalized.trim();
  if (rules.collapseWhitespace) normalized = normalized.replace(/\s+/g, " ");
  if (!rules.caseSensitive) normalized = normalized.toLocaleLowerCase("en");
  if (rules.numericNormalization && normalized !== "" && Number.isFinite(Number(normalized))) {
    normalized = String(Number(normalized));
  }
  return normalized;
}

function mismatchedResponse(response: QuestionResponse): GradeResult {
  return {
    correct: false,
    serializedResponse: serializeQuestionResponse(response),
    expectedAnswerSummary: "Response type does not match the question.",
  };
}

export function gradeQuestionResponse(
  question: NormalizedQuestion,
  response: QuestionResponse,
): GradeResult {
  if (question.interactionType !== response.interactionType) {
    return mismatchedResponse(response);
  }

  switch (question.interactionType) {
    case "multiple-choice":
      if (response.interactionType !== "multiple-choice") return mismatchedResponse(response);
      return {
        correct: response.choiceId === question.answerSpec.correctChoiceId,
        serializedResponse: serializeQuestionResponse(response),
        expectedAnswerSummary: question.answerSpec.correctChoiceId,
      };
    case "true-false":
      if (response.interactionType !== "true-false") return mismatchedResponse(response);
      return {
        correct: response.value === question.answerSpec.correctValue,
        serializedResponse: serializeQuestionResponse(response),
        expectedAnswerSummary: String(question.answerSpec.correctValue),
      };
    case "count-objects":
      if (response.interactionType !== "count-objects") return mismatchedResponse(response);
      return {
        correct: response.value === question.answerSpec.expectedCount,
        serializedResponse: serializeQuestionResponse(response),
        expectedAnswerSummary: String(question.answerSpec.expectedCount),
      };
    case "tap-answer":
      if (response.interactionType !== "tap-answer") return mismatchedResponse(response);
      return {
        correct: response.targetId === question.answerSpec.correctTargetId,
        serializedResponse: serializeQuestionResponse(response),
        expectedAnswerSummary: question.answerSpec.correctTargetId,
      };
    case "fill-in-blank": {
      if (response.interactionType !== "fill-in-blank") return mismatchedResponse(response);
      const actual = normalizeText(response.value, question);
      const accepted = question.answerSpec.acceptedAnswers.map((answer) => normalizeText(answer, question));
      return {
        correct: accepted.includes(actual),
        serializedResponse: serializeQuestionResponse(response),
        expectedAnswerSummary: question.answerSpec.acceptedAnswers[0] ?? "",
      };
    }
    case "match-pairs": {
      if (response.interactionType !== "match-pairs") return mismatchedResponse(response);
      const selected = new Set(response.pairIds);
      return {
        correct: question.answerSpec.pairIds.every((pairId) => selected.has(pairId)),
        serializedResponse: serializeQuestionResponse(response),
        expectedAnswerSummary: `${question.answerSpec.pairIds.length} pairs`,
      };
    }
  }
}
