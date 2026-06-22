export const supportedInteractionTypes = [
  "multiple-choice",
  "true-false",
  "count-objects",
  "tap-answer",
  "fill-in-blank",
] as const;

export type InteractionType = (typeof supportedInteractionTypes)[number];

export type ChoiceOption = {
  id: string;
  label: string;
};

export type TapTarget = {
  id: string;
  label: string;
  visualRef?: string;
  accessibilityLabel: string;
};

export type MultipleChoiceInteraction = {
  choices: ChoiceOption[];
  selectionMode: "single";
};

export type TrueFalseInteraction = {
  trueLabel: string;
  falseLabel: string;
};

export type CountObjectsInteraction = {
  responseMode: "number-pad" | "numeric-choice";
  numericChoices?: number[];
};

export type TapAnswerInteraction = {
  targets: TapTarget[];
};

export type FillInBlankInteraction = {
  template: string;
  blankId: string;
  inputMode: "numeric" | "text";
  placeholder: string;
};

export type MultipleChoiceAnswerSpec = { correctChoiceId: string };
export type TrueFalseAnswerSpec = { correctValue: boolean };
export type CountObjectsAnswerSpec = { expectedCount: number };
export type TapAnswerAnswerSpec = { correctTargetId: string };
export type FillInBlankAnswerSpec = { acceptedAnswers: string[] };

export type ExactChoiceGradingSpec = { strategy: "exact-choice" };
export type ExactBooleanGradingSpec = { strategy: "exact-boolean" };
export type ExactNumberGradingSpec = { strategy: "exact-number" };
export type ExactTargetGradingSpec = { strategy: "exact-target" };
export type NormalizedTextGradingSpec = {
  strategy: "normalized-text";
  trimWhitespace: boolean;
  caseSensitive: boolean;
  collapseWhitespace: boolean;
  numericNormalization: boolean;
};

export type LegacyCompatibilityFields = {
  sourceId: string;
  options: string[];
  correctAnswer: string;
};

type NormalizedQuestionBase<
  TType extends InteractionType,
  TInteraction,
  TAnswerSpec,
  TGradingSpec,
> = {
  questionId: string;
  prompt: string;
  interactionType: TType;
  interaction: TInteraction;
  answerSpec: TAnswerSpec;
  gradingSpec: TGradingSpec;
  explanation: string;
  visualMetadata: unknown;
  accessibilityText: string;
  originalLegacyFields?: LegacyCompatibilityFields;
};

export type NormalizedMultipleChoiceQuestion = NormalizedQuestionBase<
  "multiple-choice",
  MultipleChoiceInteraction,
  MultipleChoiceAnswerSpec,
  ExactChoiceGradingSpec
>;

export type NormalizedTrueFalseQuestion = NormalizedQuestionBase<
  "true-false",
  TrueFalseInteraction,
  TrueFalseAnswerSpec,
  ExactBooleanGradingSpec
>;

export type NormalizedCountObjectsQuestion = NormalizedQuestionBase<
  "count-objects",
  CountObjectsInteraction,
  CountObjectsAnswerSpec,
  ExactNumberGradingSpec
>;

export type NormalizedTapAnswerQuestion = NormalizedQuestionBase<
  "tap-answer",
  TapAnswerInteraction,
  TapAnswerAnswerSpec,
  ExactTargetGradingSpec
>;

export type NormalizedFillInBlankQuestion = NormalizedQuestionBase<
  "fill-in-blank",
  FillInBlankInteraction,
  FillInBlankAnswerSpec,
  NormalizedTextGradingSpec
>;

export type NormalizedQuestion =
  | NormalizedMultipleChoiceQuestion
  | NormalizedTrueFalseQuestion
  | NormalizedCountObjectsQuestion
  | NormalizedTapAnswerQuestion
  | NormalizedFillInBlankQuestion;

export type QuestionResponse =
  | { interactionType: "multiple-choice"; choiceId: string }
  | { interactionType: "true-false"; value: boolean }
  | { interactionType: "count-objects"; value: number }
  | { interactionType: "tap-answer"; targetId: string }
  | { interactionType: "fill-in-blank"; value: string };

export type GradeResult = {
  correct: boolean;
  serializedResponse: string;
  expectedAnswerSummary: string;
};