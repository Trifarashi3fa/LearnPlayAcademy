import type { QuestionResponse } from "../../data/question-engine-types";

/** Keeps future response shapes compatible with the current string attempt log. */
export function serializeQuestionResponse(response: QuestionResponse): string {
  switch (response.interactionType) {
    case "multiple-choice":
      return response.choiceId;
    case "true-false":
      return response.value ? "true" : "false";
    case "count-objects":
      return String(response.value);
    case "tap-answer":
      return response.targetId;
    case "fill-in-blank":
      return response.value;
    case "match-pairs":
      return response.pairIds.join("|");
  }
}
