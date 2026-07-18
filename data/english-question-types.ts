import type { MvpQuestion, VisualLearningModel } from "@/data/mvp-forest-world";

export const englishQuestionTypes = [
  "word-spelling",
  "fill-in-the-blank",
  "sentence-meaning",
  "matching",
  "sentence-builder",
  "picture-choice",
] as const;

export type EnglishQuestionType = (typeof englishQuestionTypes)[number];
export type EnglishQuestionTypeCode = "A" | "B" | "C" | "D" | "E" | "F";

export const englishQuestionTypeCodes: Record<EnglishQuestionType, EnglishQuestionTypeCode> = {
  "word-spelling": "A",
  "fill-in-the-blank": "B",
  "sentence-meaning": "C",
  matching: "D",
  "sentence-builder": "E",
  "picture-choice": "F",
};

export type EnglishAccessibilityMetadata = {
  promptLabel: string;
  interactionLabel: string;
  hintLabel?: string;
  answerLabels?: Record<string, string>;
};

export type EnglishVoiceMetadata = {
  voiceScript?: string;
  audioSrc?: string;
};

export type EnglishImageMetadata = {
  src?: string;
  altText: string;
  description?: string;
};

export type EnglishExplanationVisual = {
  kind: "letter-card" | "word-card" | "sentence-card" | "match-recap" | "picture";
  description: string;
  image?: EnglishImageMetadata;
};

export type EnglishExplanation = {
  correctAnswerText: string;
  whyCorrect: string;
  example: string;
  learnBotTip: string;
  wordMeaning?: string;
  funFact?: string;
  visual?: EnglishExplanationVisual;
  voiceScript?: string;
};

export type EnglishChoice = {
  id: string;
  label: string;
  accessibilityLabel: string;
};

export type EnglishLetterTile = {
  id: string;
  letter: string;
  accessibilityLabel: string;
};

export type EnglishMatchItem = {
  id: string;
  label: string;
  accessibilityLabel: string;
  image?: EnglishImageMetadata;
};

export type EnglishCorrectPair = {
  pairId: string;
  leftId: string;
  rightId: string;
};

export type EnglishWordTile = {
  id: string;
  word: string;
  accessibilityLabel: string;
  isDistractor?: boolean;
};

export type EnglishPictureOption = {
  id: string;
  label?: string;
  image: EnglishImageMetadata;
  accessibilityLabel: string;
};

type EnglishQuestionBase<TQuestionType extends EnglishQuestionType> = {
  id: string;
  legacyId?: string;
  level: number;
  topic: string;
  skill: string;
  subject: "english";
  questionType: TQuestionType;
  instruction: string;
  prompt: string;
  hint: string;
  xpReward: number;
  accessibility: EnglishAccessibilityMetadata;
  voice?: EnglishVoiceMetadata;
  explanation: EnglishExplanation;
  visual?: VisualLearningModel;
  legacyQuestion?: Pick<MvpQuestion, "id" | "question" | "options" | "correctAnswer" | "explanation">;
};

export type EnglishWordSpellingQuestion = EnglishQuestionBase<"word-spelling"> & {
  correctWord: string;
  expectedLetterCount?: number;
  spellingSlots?: EnglishLetterTile[];
  wordOptions: EnglishChoice[];
  selectableLetterTiles?: EnglishLetterTile[];
  image?: EnglishImageMetadata;
  clue?: string;
};

export type EnglishFillInBlankQuestion = EnglishQuestionBase<"fill-in-the-blank"> & {
  template: string;
  blankMarker: string;
  answerOptions: EnglishChoice[];
  correctAnswer: string;
  image?: EnglishImageMetadata;
  optionAccessibilityLabels?: Record<string, string>;
};

export type EnglishSentenceMeaningQuestion = EnglishQuestionBase<"sentence-meaning"> & {
  sentence: string;
  answerChoices: EnglishChoice[];
  correctAnswerId: string;
  pictureChoices?: EnglishPictureOption[];
  voiceScript?: string;
};

export type EnglishMatchingQuestion = EnglishQuestionBase<"matching"> & {
  leftItems: EnglishMatchItem[];
  rightItems: EnglishMatchItem[];
  correctPairs: EnglishCorrectPair[];
  images?: EnglishImageMetadata[];
};

export type EnglishSentenceBuilderQuestion = EnglishQuestionBase<"sentence-builder"> & {
  wordTiles: EnglishWordTile[];
  correctSequence: string[];
  punctuation?: string;
  distractorTiles?: EnglishWordTile[];
};

export type EnglishPictureChoiceQuestion = EnglishQuestionBase<"picture-choice"> & {
  pictureOptions: EnglishPictureOption[];
  correctOptionId: string;
  shortLabels?: Record<string, string>;
};

export type EnglishStructuredQuestion =
  | EnglishWordSpellingQuestion
  | EnglishFillInBlankQuestion
  | EnglishSentenceMeaningQuestion
  | EnglishMatchingQuestion
  | EnglishSentenceBuilderQuestion
  | EnglishPictureChoiceQuestion;

export type EnglishQuestionValidationIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
  questionId?: string;
};

export type EnglishQuestionValidationResult = {
  valid: boolean;
  errors: EnglishQuestionValidationIssue[];
  warnings: EnglishQuestionValidationIssue[];
};