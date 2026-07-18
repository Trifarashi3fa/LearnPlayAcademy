import type { MvpQuestion } from "@/data/mvp-forest-world";
import type {
  EnglishChoice,
  EnglishCorrectPair,
  EnglishMatchItem,
  EnglishPictureOption,
  EnglishQuestionType,
  EnglishQuestionValidationIssue,
  EnglishQuestionValidationResult,
  EnglishStructuredQuestion,
  EnglishWordTile,
} from "@/data/english-question-types";
import { englishQuestionTypes } from "@/data/english-question-types";

const englishQuestionTypeSet = new Set<string>(englishQuestionTypes);

type RecordValue = Record<string, unknown>;

type LegacyAdaptResult =
  | { ok: true; question: EnglishStructuredQuestion }
  | { ok: false; questionId?: string; reason: string };

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function issue(
  severity: EnglishQuestionValidationIssue["severity"],
  code: string,
  message: string,
  questionId?: string,
): EnglishQuestionValidationIssue {
  return { severity, code, message, questionId };
}

function stableChoiceId(index: number) {
  return `choice-${String(index + 1).padStart(2, "0")}`;
}

function makeChoices(options: string[]): EnglishChoice[] {
  return options.map((label, index) => ({
    id: stableChoiceId(index),
    label,
    accessibilityLabel: `Answer choice ${index + 1}: ${label}`,
  }));
}

function findCorrectChoiceId(options: EnglishChoice[], correctAnswer: string) {
  const exact = options.find((option) => option.label === correctAnswer);
  if (exact) return exact.id;
  const trimmed = options.find((option) => option.label.trim() === correctAnswer.trim());
  return trimmed?.id;
}

function inferLegacyEnglishQuestionType(question: MvpQuestion): EnglishQuestionType {
  const text = `${question.topic} ${question.question}`.toLowerCase();
  if (/spelled correctly|spell|spelling/.test(text)) return "word-spelling";
  if (/missing|blank|complete|___/.test(text)) return "fill-in-the-blank";
  return "sentence-meaning";
}

function buildBase(question: MvpQuestion, questionType: EnglishQuestionType) {
  return {
    id: question.id,
    legacyId: question.id,
    level: question.level,
    topic: question.topic,
    skill: question.topic,
    subject: "english" as const,
    questionType,
    instruction: question.question,
    prompt: question.question,
    hint: question.learnBotTip ?? "Look carefully before choosing.",
    xpReward: question.xpReward,
    accessibility: {
      promptLabel: question.question,
      interactionLabel: `English ${questionType} question`,
      answerLabels: Object.fromEntries(
        question.options.map((option, index) => [stableChoiceId(index), `Answer choice ${index + 1}: ${option}`]),
      ),
    },
    voice: question.voiceScript ? { voiceScript: question.voiceScript } : undefined,
    explanation: {
      correctAnswerText: question.correctAnswer,
      whyCorrect: question.explanation,
      example: question.visualExplanation ?? question.explanation,
      learnBotTip: question.learnBotTip ?? "Try the same clue next time.",
      voiceScript: question.voiceScript,
    },
    visual: question.visual,
    legacyQuestion: {
      id: question.id,
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
    },
  };
}

export function adaptLegacyEnglishQuestion(question: MvpQuestion): EnglishStructuredQuestion {
  if (question.subject !== "english") {
    throw new Error(`${question.id}: legacy English adapter only accepts subject=english.`);
  }
  if (!Array.isArray(question.options) || question.options.length === 0) {
    throw new Error(`${question.id}: legacy English question is missing options.`);
  }
  if (!question.options.some((option) => option.trim() === question.correctAnswer.trim())) {
    throw new Error(`${question.id}: legacy correct answer is missing from options.`);
  }

  const questionType = inferLegacyEnglishQuestionType(question);
  const choices = makeChoices(question.options);
  const correctChoiceId = findCorrectChoiceId(choices, question.correctAnswer);
  if (!correctChoiceId) throw new Error(`${question.id}: correct answer could not be mapped to a stable choice.`);

  const base = buildBase(question, questionType);

  if (questionType === "word-spelling") {
    return {
      ...base,
      questionType,
      correctWord: question.correctAnswer,
      expectedLetterCount: question.correctAnswer.length,
      wordOptions: choices,
      clue: question.visualExplanation,
    };
  }

  if (questionType === "fill-in-the-blank") {
    return {
      ...base,
      questionType,
      template: question.question.includes("___") ? question.question : `${question.question} ___`,
      blankMarker: "___",
      answerOptions: choices,
      correctAnswer: question.correctAnswer,
      optionAccessibilityLabels: Object.fromEntries(choices.map((choice) => [choice.id, choice.accessibilityLabel])),
    };
  }

  return {
    ...base,
    questionType: "sentence-meaning",
    sentence: question.question,
    answerChoices: choices,
    correctAnswerId: correctChoiceId,
    voiceScript: question.voiceScript,
  };
}

export function tryAdaptLegacyEnglishQuestion(question: MvpQuestion): LegacyAdaptResult {
  try {
    return { ok: true, question: adaptLegacyEnglishQuestion(question) };
  } catch (error) {
    return {
      ok: false,
      questionId: question.id,
      reason: error instanceof Error ? error.message : "Unknown legacy English adapter error.",
    };
  }
}

function pushRequiredString(errors: EnglishQuestionValidationIssue[], source: RecordValue, field: string, questionId?: string) {
  if (!nonEmptyString(source[field])) {
    errors.push(issue("error", "missing-required-string", `${field} is required.`, questionId));
  }
}

function validateExplanation(
  errors: EnglishQuestionValidationIssue[],
  source: RecordValue,
  questionId?: string,
) {
  const explanation = source.explanation;
  if (!isRecord(explanation)) {
    errors.push(issue("error", "missing-explanation", "explanation is required.", questionId));
    return;
  }
  for (const field of ["correctAnswerText", "whyCorrect", "example", "learnBotTip"]) {
    pushRequiredString(errors, explanation, field, questionId);
  }
}

function validateAccessibility(
  errors: EnglishQuestionValidationIssue[],
  source: RecordValue,
  questionId?: string,
) {
  const accessibility = source.accessibility;
  if (!isRecord(accessibility)) {
    errors.push(issue("error", "missing-accessibility", "accessibility metadata is required.", questionId));
    return;
  }
  pushRequiredString(errors, accessibility, "promptLabel", questionId);
  pushRequiredString(errors, accessibility, "interactionLabel", questionId);
}

function validateChoiceArray(
  errors: EnglishQuestionValidationIssue[],
  value: unknown,
  field: string,
  questionId?: string,
): EnglishChoice[] {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(issue("error", "missing-options", `${field} must contain at least one option.`, questionId));
    return [];
  }
  const choices = value.filter(isRecord) as unknown as EnglishChoice[];
  if (choices.length !== value.length) {
    errors.push(issue("error", "invalid-option", `${field} contains a non-object option.`, questionId));
  }
  const ids = new Set<string>();
  for (const choice of choices) {
    if (!nonEmptyString(choice.id)) errors.push(issue("error", "missing-option-id", `${field} option is missing id.`, questionId));
    if (!nonEmptyString(choice.label)) errors.push(issue("error", "missing-option-label", `${field} option is missing label.`, questionId));
    if (!nonEmptyString(choice.accessibilityLabel)) errors.push(issue("error", "missing-option-accessibility", `${field} option is missing accessibilityLabel.`, questionId));
    if (nonEmptyString(choice.id)) {
      if (ids.has(choice.id)) errors.push(issue("error", "duplicate-option-id", `${field} has duplicate option id ${choice.id}.`, questionId));
      ids.add(choice.id);
    }
  }
  return choices;
}

function validateImageAlt(errors: EnglishQuestionValidationIssue[], image: unknown, path: string, questionId?: string) {
  if (!isRecord(image) || !nonEmptyString(image.altText)) {
    errors.push(issue("error", "missing-image-alt", `${path} must include altText.`, questionId));
  }
}

function getCorrectAnswerTexts(question: RecordValue): string[] {
  const explanation = isRecord(question.explanation) ? question.explanation : undefined;
  const texts = nonEmptyString(explanation?.correctAnswerText) ? [explanation.correctAnswerText] : [];

  switch (question.questionType) {
    case "word-spelling":
      if (nonEmptyString(question.correctWord)) texts.push(question.correctWord);
      break;
    case "fill-in-the-blank":
      if (nonEmptyString(question.correctAnswer)) texts.push(question.correctAnswer);
      break;
    case "sentence-meaning": {
      if (nonEmptyString(question.correctAnswerId) && Array.isArray(question.answerChoices)) {
        const found = (question.answerChoices.filter(isRecord) as unknown as EnglishChoice[]).find((choice) => choice.id === question.correctAnswerId);
        if (found) texts.push(found.label);
      }
      break;
    }
    case "sentence-builder":
      if (Array.isArray(question.correctSequence)) texts.push(question.correctSequence.join(" "));
      break;
    case "picture-choice": {
      if (nonEmptyString(question.correctOptionId) && Array.isArray(question.pictureOptions)) {
        const found = (question.pictureOptions.filter(isRecord) as unknown as EnglishPictureOption[]).find((option) => option.id === question.correctOptionId);
        if (found?.label) texts.push(found.label);
      }
      break;
    }
    default:
      break;
  }

  return [...new Set(texts.map((text) => text.trim()).filter(Boolean))];
}

function validateHintDoesNotRevealAnswer(
  warnings: EnglishQuestionValidationIssue[],
  question: RecordValue,
  questionId?: string,
) {
  if (!nonEmptyString(question.hint)) return;
  const hint = question.hint.toLowerCase();
  for (const answer of getCorrectAnswerTexts(question)) {
    const normalized = answer.trim().toLowerCase();
    if (normalized.length <= 1) {
      if (hint.includes(`choose ${normalized}`) || hint.includes(`answer is ${normalized}`)) {
        warnings.push(issue("warning", "hint-may-reveal-answer", "Hint may reveal the answer directly.", questionId));
      }
      continue;
    }
    if (hint.includes(normalized) || hint.includes(`choose ${normalized}`) || hint.includes(`answer is ${normalized}`)) {
      warnings.push(issue("warning", "hint-may-reveal-answer", "Hint may reveal the answer directly.", questionId));
    }
  }
}

function validateWordSpelling(errors: EnglishQuestionValidationIssue[], question: RecordValue, questionId?: string) {
  pushRequiredString(errors, question, "correctWord", questionId);
  const hasExpectedCount = typeof question.expectedLetterCount === "number" && question.expectedLetterCount > 0;
  const hasSlots = Array.isArray(question.spellingSlots) && question.spellingSlots.length > 0;
  if (!hasExpectedCount && !hasSlots) {
    errors.push(issue("error", "missing-spelling-shape", "Word spelling requires expectedLetterCount or spellingSlots.", questionId));
  }
  const choices = validateChoiceArray(errors, question.wordOptions, "wordOptions", questionId);
  const correctWord = nonEmptyString(question.correctWord) ? question.correctWord : undefined;
  if (correctWord && !choices.some((choice) => choice.label.trim() === correctWord.trim())) {
    errors.push(issue("error", "correct-answer-absent", "correctWord must exist in wordOptions.", questionId));
  }
}

function validateFillBlank(errors: EnglishQuestionValidationIssue[], question: RecordValue, questionId?: string) {
  pushRequiredString(errors, question, "template", questionId);
  pushRequiredString(errors, question, "blankMarker", questionId);
  pushRequiredString(errors, question, "correctAnswer", questionId);
  const choices = validateChoiceArray(errors, question.answerOptions, "answerOptions", questionId);
  const correctAnswer = nonEmptyString(question.correctAnswer) ? question.correctAnswer : undefined;
  if (correctAnswer && choices.length > 0 && !choices.some((choice) => choice.label.trim() === correctAnswer.trim())) {
    errors.push(issue("error", "correct-answer-absent", "correctAnswer must exist in answerOptions.", questionId));
  }
  const template = nonEmptyString(question.template) ? question.template : undefined;
  const blankMarker = nonEmptyString(question.blankMarker) ? question.blankMarker : undefined;
  if (template && blankMarker && !template.includes(blankMarker)) {
    errors.push(issue("error", "missing-blank-marker", "template must include blankMarker.", questionId));
  }
}

function validateSentenceMeaning(errors: EnglishQuestionValidationIssue[], question: RecordValue, questionId?: string) {
  pushRequiredString(errors, question, "sentence", questionId);
  pushRequiredString(errors, question, "correctAnswerId", questionId);
  const choices = validateChoiceArray(errors, question.answerChoices, "answerChoices", questionId);
  if (nonEmptyString(question.correctAnswerId) && choices.length > 0 && !choices.some((choice) => choice.id === question.correctAnswerId)) {
    errors.push(issue("error", "correct-answer-absent", "correctAnswerId must exist in answerChoices.", questionId));
  }
  if (Array.isArray(question.pictureChoices)) {
    for (const [index, option] of question.pictureChoices.entries()) {
      if (!isRecord(option)) continue;
      validateImageAlt(errors, option.image, `pictureChoices[${index}].image`, questionId);
    }
  }
}

function validateMatching(errors: EnglishQuestionValidationIssue[], question: RecordValue, questionId?: string) {
  const leftItems = Array.isArray(question.leftItems) ? (question.leftItems.filter(isRecord) as unknown as EnglishMatchItem[]) : [];
  const rightItems = Array.isArray(question.rightItems) ? (question.rightItems.filter(isRecord) as unknown as EnglishMatchItem[]) : [];
  const pairs = Array.isArray(question.correctPairs) ? (question.correctPairs.filter(isRecord) as unknown as EnglishCorrectPair[]) : [];
  if (leftItems.length === 0) errors.push(issue("error", "missing-match-left", "matching requires leftItems.", questionId));
  if (rightItems.length === 0) errors.push(issue("error", "missing-match-right", "matching requires rightItems.", questionId));
  if (pairs.length === 0) errors.push(issue("error", "missing-match-pairs", "matching requires correctPairs.", questionId));
  const leftIds = new Set(leftItems.map((item) => item.id));
  const rightIds = new Set(rightItems.map((item) => item.id));
  const pairIds = new Set<string>();
  for (const pair of pairs) {
    if (!nonEmptyString(pair.pairId)) errors.push(issue("error", "missing-pair-id", "correct pair is missing pairId.", questionId));
    if (pairIds.has(pair.pairId)) errors.push(issue("error", "duplicate-pair-id", `Duplicate pair id ${pair.pairId}.`, questionId));
    pairIds.add(pair.pairId);
    if (!leftIds.has(pair.leftId)) errors.push(issue("error", "invalid-left-pair", `Pair ${pair.pairId} references missing left item.`, questionId));
    if (!rightIds.has(pair.rightId)) errors.push(issue("error", "invalid-right-pair", `Pair ${pair.pairId} references missing right item.`, questionId));
  }
}

function validateSentenceBuilder(errors: EnglishQuestionValidationIssue[], question: RecordValue, questionId?: string) {
  const tiles = Array.isArray(question.wordTiles) ? (question.wordTiles.filter(isRecord) as unknown as EnglishWordTile[]) : [];
  if (tiles.length === 0) errors.push(issue("error", "missing-word-tiles", "sentence-builder requires wordTiles.", questionId));
  if (!Array.isArray(question.correctSequence) || question.correctSequence.length === 0) {
    errors.push(issue("error", "missing-correct-sequence", "sentence-builder requires correctSequence.", questionId));
    return;
  }
  const tileWords = new Map<string, number>();
  for (const tile of tiles) tileWords.set(tile.word, (tileWords.get(tile.word) ?? 0) + 1);
  for (const token of question.correctSequence) {
    if (!nonEmptyString(token)) {
      errors.push(issue("error", "invalid-sequence-token", "correctSequence contains an empty token.", questionId));
      continue;
    }
    if (!tileWords.has(token)) {
      errors.push(issue("error", "sequence-token-missing", `correctSequence token ${token} is missing from wordTiles.`, questionId));
    }
  }
}

function validatePictureChoice(errors: EnglishQuestionValidationIssue[], question: RecordValue, questionId?: string) {
  pushRequiredString(errors, question, "correctOptionId", questionId);
  if (!Array.isArray(question.pictureOptions) || question.pictureOptions.length === 0) {
    errors.push(issue("error", "missing-picture-options", "picture-choice requires pictureOptions.", questionId));
    return;
  }
  const options = question.pictureOptions.filter(isRecord) as unknown as EnglishPictureOption[];
  for (const [index, option] of options.entries()) {
    if (!nonEmptyString(option.id)) errors.push(issue("error", "missing-picture-option-id", `pictureOptions[${index}] is missing id.`, questionId));
    validateImageAlt(errors, option.image, `pictureOptions[${index}].image`, questionId);
    if (!nonEmptyString(option.accessibilityLabel)) {
      errors.push(issue("error", "missing-picture-option-accessibility", `pictureOptions[${index}] is missing accessibilityLabel.`, questionId));
    }
  }
  if (nonEmptyString(question.correctOptionId) && !options.some((option) => option.id === question.correctOptionId)) {
    errors.push(issue("error", "correct-answer-absent", "correctOptionId must exist in pictureOptions.", questionId));
  }
}

export function validateEnglishQuestion(question: unknown): EnglishQuestionValidationResult {
  const errors: EnglishQuestionValidationIssue[] = [];
  const warnings: EnglishQuestionValidationIssue[] = [];

  if (!isRecord(question)) {
    errors.push(issue("error", "invalid-question", "Question must be an object."));
    return { valid: false, errors, warnings };
  }

  const questionId = nonEmptyString(question.id) ? question.id : undefined;
  for (const field of ["id", "topic", "skill", "instruction", "prompt", "hint"]) {
    pushRequiredString(errors, question, field, questionId);
  }
  if (question.subject !== "english") errors.push(issue("error", "invalid-subject", "English schema requires subject=english.", questionId));
  if (typeof question.level !== "number" || question.level < 1 || question.level > 10) {
    errors.push(issue("error", "invalid-level", "level must be a number from 1 to 10.", questionId));
  }
  if (!positiveNumber(question.xpReward)) errors.push(issue("error", "invalid-xp", "xpReward must be a non-negative number.", questionId));
  if (!nonEmptyString(question.questionType) || !englishQuestionTypeSet.has(question.questionType)) {
    errors.push(issue("error", "unsupported-question-type", "questionType is not supported for English Year 1.", questionId));
  }

  validateAccessibility(errors, question, questionId);
  validateExplanation(errors, question, questionId);
  validateHintDoesNotRevealAnswer(warnings, question, questionId);

  switch (question.questionType) {
    case "word-spelling":
      validateWordSpelling(errors, question, questionId);
      break;
    case "fill-in-the-blank":
      validateFillBlank(errors, question, questionId);
      break;
    case "sentence-meaning":
      validateSentenceMeaning(errors, question, questionId);
      break;
    case "matching":
      validateMatching(errors, question, questionId);
      break;
    case "sentence-builder":
      validateSentenceBuilder(errors, question, questionId);
      break;
    case "picture-choice":
      validatePictureChoice(errors, question, questionId);
      break;
    default:
      break;
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateEnglishQuestionCollection(questions: readonly unknown[]): EnglishQuestionValidationResult {
  const errors: EnglishQuestionValidationIssue[] = [];
  const warnings: EnglishQuestionValidationIssue[] = [];
  const ids = new Set<string>();

  for (const question of questions) {
    const result = validateEnglishQuestion(question);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
    if (isRecord(question) && nonEmptyString(question.id)) {
      if (ids.has(question.id)) {
        errors.push(issue("error", "duplicate-question-id", `Duplicate English question ID ${question.id}.`, question.id));
      }
      ids.add(question.id);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}