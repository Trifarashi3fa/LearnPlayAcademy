export const questionAssetQaStatuses = [
  "Draft",
  "Review",
  "Needs Revision",
  "Approved",
  "Rejected",
  "Archived",
] as const;

export type QuestionAssetQaStatus = (typeof questionAssetQaStatuses)[number];

const normalizedStatusMap = new Map<string, QuestionAssetQaStatus>(
  questionAssetQaStatuses.map((status) => [status.toLocaleLowerCase("en"), status]),
);

export const questionAssetStatusTransitions: Record<QuestionAssetQaStatus, QuestionAssetQaStatus[]> = {
  Draft: ["Review", "Archived"],
  Review: ["Needs Revision", "Approved", "Rejected", "Archived"],
  "Needs Revision": ["Review", "Rejected", "Archived"],
  Approved: ["Needs Revision", "Archived"],
  Rejected: ["Draft", "Archived"],
  Archived: ["Draft"],
};

export type QuestionAssetQaChecklistItem = {
  id: string;
  label: string;
  reviewerPrompt: string;
};

export const educationalQaChecklist: QuestionAssetQaChecklistItem[] = [
  {
    id: "kssr-alignment",
    label: "Curriculum alignment (KSSR)",
    reviewerPrompt: "Confirm the row maps to the intended KSSR Year 1 skill.",
  },
  {
    id: "cambridge-alignment",
    label: "Cambridge alignment",
    reviewerPrompt: "Confirm Cambridge alignment where it is used or mark it not applicable.",
  },
  {
    id: "age-appropriateness",
    label: "Age appropriateness",
    reviewerPrompt: "Confirm the wording, concepts, and task length are suitable for Year 1 learners.",
  },
  {
    id: "reading-level",
    label: "Reading level",
    reviewerPrompt: "Confirm the child-facing prompt is short and decodable where possible.",
  },
  {
    id: "vocabulary-suitability",
    label: "Vocabulary suitability",
    reviewerPrompt: "Confirm vocabulary is familiar or clearly taught by the visual.",
  },
  {
    id: "grammar-accuracy",
    label: "Grammar accuracy",
    reviewerPrompt: "Confirm the question, options, explanation, and narration use correct English.",
  },
  {
    id: "correct-answer-accuracy",
    label: "Correct answer accuracy",
    reviewerPrompt: "Confirm the correct answer is truly correct and matches the expected renderer format.",
  },
  {
    id: "distractor-quality",
    label: "Distractor quality",
    reviewerPrompt: "Confirm distractors are plausible, fair, and not accidentally correct.",
  },
  {
    id: "explanation-quality",
    label: "Explanation quality",
    reviewerPrompt: "Confirm the explanation teaches the concept in short child-friendly language.",
  },
  {
    id: "learnbot-tip-quality",
    label: "LearnBot tip quality",
    reviewerPrompt: "Confirm the tip gives one useful strategy and does not repeat generic wording.",
  },
  {
    id: "voice-script-clarity",
    label: "Voice script clarity",
    reviewerPrompt: "Confirm narration is short, clear, and speakable.",
  },
  {
    id: "visual-description-clarity",
    label: "Visual description clarity",
    reviewerPrompt: "Confirm the visual can be created or rendered from the description.",
  },
  {
    id: "duplicate-detection",
    label: "Duplicate detection",
    reviewerPrompt: "Check repeated question text, explanations, tips, visuals, and distractors.",
  },
  {
    id: "difficulty-consistency",
    label: "Difficulty consistency",
    reviewerPrompt: "Confirm difficulty matches the level and nearby questions.",
  },
  {
    id: "accessibility",
    label: "Accessibility considerations",
    reviewerPrompt: "Confirm the item is understandable without relying only on colour, sound, or tiny visuals.",
  },
];

export function normalizeQuestionAssetStatus(status: string): QuestionAssetQaStatus | null {
  return normalizedStatusMap.get(status.trim().toLocaleLowerCase("en")) ?? null;
}

export function isSupportedQuestionAssetStatus(status: string) {
  return normalizeQuestionAssetStatus(status) !== null;
}

export function canTransitionQuestionAssetStatus(from: string, to: string) {
  const normalizedFrom = normalizeQuestionAssetStatus(from);
  const normalizedTo = normalizeQuestionAssetStatus(to);
  if (!normalizedFrom || !normalizedTo) return false;
  return questionAssetStatusTransitions[normalizedFrom].includes(normalizedTo);
}

export function getQuestionAssetStatusTransitionMessage(from: string, to: string) {
  if (canTransitionQuestionAssetStatus(from, to)) {
    return `${normalizeQuestionAssetStatus(from)} can move to ${normalizeQuestionAssetStatus(to)}.`;
  }
  return `Status transition from ${from || "(blank)"} to ${to || "(blank)"} is not allowed.`;
}
