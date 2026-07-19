import type { MvpLevel, MvpQuestion } from "@/data/mvp-forest-world";

export type EnglishLevelOnePrototypeType = "matching" | "fill-in-the-blank" | "picture-choice";
export type EnglishLevelOneActivityVariant =
  | "letter-family"
  | "alphabet-sequence"
  | "next-letter"
  | "odd-one-out"
  | "same-letter"
  | "beginning-letter-picture";
export type EnglishLevelOneSelectionMode = "tap-to-match" | "blank-completion" | "picture-choice";

export type EnglishLevelOneChoice = {
  id: string;
  label: string;
  accessibilityLabel: string;
};

export type EnglishLevelOnePrototype = {
  questionId: string;
  type: EnglishLevelOnePrototypeType;
  typeCode: "B" | "D" | "F";
  typeName: "Fill in the Blank" | "Matching" | "Picture Choice";
  activityLabel: string;
  variant: EnglishLevelOneActivityVariant;
  selectionMode: EnglishLevelOneSelectionMode;
  rendererName: "EnglishFillBlankActivity" | "EnglishMatchingActivity" | "EnglishPictureChoiceActivity";
  skill: string;
  instruction: string;
  selectionPrompt: string;
  prompt: string;
  displayText: string;
  visualLabel: string;
  hint: string;
  voiceScript: string;
  choices: EnglishLevelOneChoice[];
  correctAnswer: string;
  explanation: {
    correctAnswer: string;
    whyCorrect: string;
    exampleOrVisual: string;
    learnBotTip: string;
    wordMeaning?: string;
  };
  picture?: {
    emoji?: string;
    assetSrc?: string;
    label: string;
    altText: string;
  };
  initialState: {
    hintCollapsed: true;
    revealAnswerBeforeSubmission: false;
  };
  keyboardInstructions: string;
  responsiveContract: {
    overflowX: "hidden";
    mobileExplanationPlacement: "below-activity";
    desktopExplanationPlacement: "beside-activity";
  };
};

export type EnglishLevelOneExplanationSection = {
  id: "correct-answer" | "why-correct" | "example-or-visual" | "learnbot-tip";
  title: string;
  body: string;
};

export type EnglishLevelOneMatchingModel = {
  clue: {
    id: string;
    label: string;
    helper: string;
  };
  partners: Array<EnglishLevelOneChoice & { correct: boolean }>;
  correctChoiceId: string;
};

export type EnglishLevelOneInteractionState = {
  selectedChoiceId: string | null;
  submittedChoiceId: string | null;
  hintOpen: boolean;
  voiceOpen: boolean;
};

export type EnglishLevelOneAssetInfo = {
  exists?: boolean;
  width?: number;
  height?: number;
};

export type EnglishLevelOneAssetQaIssue = {
  questionId: string;
  severity: "error" | "warning";
  code:
    | "missing-picture"
    | "missing-alt-text"
    | "unsupported-external-image"
    | "invalid-image-path"
    | "suspicious-image-source"
    | "missing-image-file"
    | "tiny-image"
    | "duplicate-picture-asset";
  message: string;
  assetSrc?: string;
};

type PrototypeBase = Omit<EnglishLevelOnePrototype, "choices" | "correctAnswer">;

const sharedState = {
  initialState: { hintCollapsed: true, revealAnswerBeforeSubmission: false },
  keyboardInstructions: "Tab to an activity choice, then press Enter or Space to choose it.",
  responsiveContract: {
    overflowX: "hidden",
    mobileExplanationPlacement: "below-activity",
    desktopExplanationPlacement: "beside-activity",
  },
} as const;

const prototypeOverrides: Record<string, PrototypeBase> = {
  "english-forest-l01-q01": {
    ...sharedState,
    questionId: "english-forest-l01-q01",
    type: "matching",
    typeCode: "D",
    typeName: "Matching",
    activityLabel: "Letter Match",
    variant: "letter-family",
    selectionMode: "tap-to-match",
    rendererName: "EnglishMatchingActivity",
    skill: "uppercase/lowercase matching",
    instruction: "Tap the big-letter partner for the small letter.",
    selectionPrompt: "Tap one partner letter on the right.",
    prompt: "Look at the small letter. Which big letter is its partner?",
    displayText: "small letter: a",
    visualLabel: "Letter partner",
    hint: "Look at the big and small form of the same letter.",
    voiceScript: "Small letter a. Find the big letter partner.",
    explanation: {
      correctAnswer: "A",
      whyCorrect: "A and a are the same letter family.",
      exampleOrVisual: "A is the big letter. a is the small letter.",
      learnBotTip: "Big and small letters can be partners.",
    },
  },
  "english-forest-l01-q02": {
    ...sharedState,
    questionId: "english-forest-l01-q02",
    type: "matching",
    typeCode: "D",
    typeName: "Matching",
    activityLabel: "Letter Match",
    variant: "letter-family",
    selectionMode: "tap-to-match",
    rendererName: "EnglishMatchingActivity",
    skill: "uppercase/lowercase matching",
    instruction: "Tap the small-letter partner for the big letter.",
    selectionPrompt: "Tap one partner letter on the right.",
    prompt: "Look at the big letter. Which small letter is its partner?",
    displayText: "big letter: B",
    visualLabel: "Letter partner",
    hint: "Look at the big and small form of the same letter.",
    voiceScript: "Big letter B. Find the small letter partner.",
    explanation: {
      correctAnswer: "b",
      whyCorrect: "B and b are the same letter family.",
      exampleOrVisual: "B is the big letter. b is the small letter.",
      learnBotTip: "Say the letter name before choosing.",
    },
  },
  "english-forest-l01-q03": {
    ...sharedState,
    questionId: "english-forest-l01-q03",
    type: "fill-in-the-blank",
    typeCode: "B",
    typeName: "Fill in the Blank",
    activityLabel: "Missing Letter",
    variant: "alphabet-sequence",
    selectionMode: "blank-completion",
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Tap the letter that fills the blank.",
    selectionPrompt: "Tap a letter to place it in the blank.",
    prompt: "Which letter is missing?",
    displayText: "A, B, ___",
    visualLabel: "Alphabet sequence",
    hint: "Say A, B slowly. Which letter comes next?",
    voiceScript: "A, B, blank. Choose the next letter.",
    explanation: {
      correctAnswer: "C",
      whyCorrect: "C comes after A and B in the alphabet.",
      exampleOrVisual: "A -> B -> C",
      learnBotTip: "Read the letters from left to right.",
    },
  },
  "english-forest-l01-q04": {
    ...sharedState,
    questionId: "english-forest-l01-q04",
    type: "fill-in-the-blank",
    typeCode: "B",
    typeName: "Fill in the Blank",
    activityLabel: "Next Letter",
    variant: "next-letter",
    selectionMode: "blank-completion",
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Tap the letter that comes next.",
    selectionPrompt: "Tap a letter to complete the sequence.",
    prompt: "Which letter comes after D?",
    displayText: "D -> ___",
    visualLabel: "Next letter",
    hint: "Say the alphabet slowly from the shown letter.",
    voiceScript: "D. What letter comes next?",
    explanation: {
      correctAnswer: "E",
      whyCorrect: "E comes right after D in the alphabet.",
      exampleOrVisual: "D -> E",
      learnBotTip: "Say the alphabet in order.",
    },
  },
  "english-forest-l01-q05": {
    ...sharedState,
    questionId: "english-forest-l01-q05",
    type: "picture-choice",
    typeCode: "F",
    typeName: "Picture Choice",
    activityLabel: "Picture Sound",
    variant: "beginning-letter-picture",
    selectionMode: "picture-choice",
    rendererName: "EnglishPictureChoiceActivity",
    skill: "pictured beginning letter",
    instruction: "Look at the picture and tap the first letter.",
    selectionPrompt: "Tap the first letter you hear.",
    prompt: "Which letter starts apple?",
    displayText: "apple",
    visualLabel: "Picture clue",
    hint: "Say the word slowly and listen to the first sound.",
    voiceScript: "Apple. Listen to the first sound.",
    explanation: {
      correctAnswer: "A",
      whyCorrect: "Apple begins with the letter A.",
      exampleOrVisual: "A for apple.",
      learnBotTip: "Listen to the first sound.",
    },
    picture: { assetSrc: "/assets/math-icons/apple.png", label: "apple", altText: "An apple picture clue." },
  },
  "english-forest-l01-q06": {
    ...sharedState,
    questionId: "english-forest-l01-q06",
    type: "picture-choice",
    typeCode: "F",
    typeName: "Picture Choice",
    activityLabel: "Picture Sound",
    variant: "beginning-letter-picture",
    selectionMode: "picture-choice",
    rendererName: "EnglishPictureChoiceActivity",
    skill: "pictured beginning letter",
    instruction: "Look at the picture and tap the first letter.",
    selectionPrompt: "Tap the first letter you hear.",
    prompt: "Which letter starts bird?",
    displayText: "bird",
    visualLabel: "Picture clue",
    hint: "Say the word slowly and listen to the first sound.",
    voiceScript: "Bird. Listen to the first sound.",
    explanation: {
      correctAnswer: "B",
      whyCorrect: "Bird begins with the letter B.",
      exampleOrVisual: "B for bird.",
      learnBotTip: "Say the word slowly.",
    },
    picture: { assetSrc: "/assets/math-icons/bird.png", label: "bird", altText: "A bird picture clue." },
  },
  "english-forest-l01-q07": {
    ...sharedState,
    questionId: "english-forest-l01-q07",
    type: "fill-in-the-blank",
    typeCode: "B",
    typeName: "Fill in the Blank",
    activityLabel: "Different Letter",
    variant: "odd-one-out",
    selectionMode: "blank-completion",
    rendererName: "EnglishFillBlankActivity",
    skill: "identifying a different letter",
    instruction: "Tap the letter that is different from the others.",
    selectionPrompt: "Tap the different letter to place it in the row.",
    prompt: "Which letter is different?",
    displayText: "m  m  ___  m",
    visualLabel: "Different letter",
    hint: "Compare each letter shape carefully.",
    voiceScript: "m, m, n, m. Which letter is different?",
    explanation: {
      correctAnswer: "n",
      whyCorrect: "n is different from the other letters in the row.",
      exampleOrVisual: "m, m, n, m",
      learnBotTip: "Check each letter shape slowly.",
    },
  },
  "english-forest-l01-q08": {
    ...sharedState,
    questionId: "english-forest-l01-q08",
    type: "matching",
    typeCode: "D",
    typeName: "Matching",
    activityLabel: "Same Letter Match",
    variant: "same-letter",
    selectionMode: "tap-to-match",
    rendererName: "EnglishMatchingActivity",
    skill: "identifying the same letter",
    instruction: "Tap the letter that matches the target.",
    selectionPrompt: "Tap one matching letter on the right.",
    prompt: "Find the same letter as T.",
    displayText: "target letter: T",
    visualLabel: "Same letter",
    hint: "Look at the target letter and find the same letter.",
    voiceScript: "The target letter is T. Find the same one.",
    explanation: {
      correctAnswer: "T",
      whyCorrect: "T matches the target letter T.",
      exampleOrVisual: "T = T",
      learnBotTip: "Match the letter shape exactly.",
    },
  },
  "english-forest-l01-q09": {
    ...sharedState,
    questionId: "english-forest-l01-q09",
    type: "fill-in-the-blank",
    typeCode: "B",
    typeName: "Fill in the Blank",
    activityLabel: "Missing Letter",
    variant: "alphabet-sequence",
    selectionMode: "blank-completion",
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Tap the letter that fills the blank.",
    selectionPrompt: "Tap a letter to place it in the blank.",
    prompt: "Which letter is missing?",
    displayText: "p, q, ___",
    visualLabel: "Alphabet sequence",
    hint: "Say p, q slowly. Which letter comes next?",
    voiceScript: "p, q, blank. Choose the next letter.",
    explanation: {
      correctAnswer: "r",
      whyCorrect: "r comes after p and q in the alphabet.",
      exampleOrVisual: "p -> q -> r",
      learnBotTip: "Read the letters in order.",
    },
  },
  "english-forest-l01-q10": {
    ...sharedState,
    questionId: "english-forest-l01-q10",
    type: "matching",
    typeCode: "D",
    typeName: "Matching",
    activityLabel: "Letter Match",
    variant: "letter-family",
    selectionMode: "tap-to-match",
    rendererName: "EnglishMatchingActivity",
    skill: "uppercase/lowercase matching",
    instruction: "Tap the big-letter partner for the small letter.",
    selectionPrompt: "Tap one partner letter on the right.",
    prompt: "Look at the small letter. Which big letter is its partner?",
    displayText: "small letter: e",
    visualLabel: "Letter partner",
    hint: "Look at the big and small form of the same letter.",
    voiceScript: "Small letter e. Find the big letter partner.",
    explanation: {
      correctAnswer: "E",
      whyCorrect: "E and e are the same letter family.",
      exampleOrVisual: "E is the big letter. e is the small letter.",
      learnBotTip: "Big and small letters can be partners.",
    },
  },
  "english-forest-l01-q11": {
    ...sharedState,
    questionId: "english-forest-l01-q11",
    type: "fill-in-the-blank",
    typeCode: "B",
    typeName: "Fill in the Blank",
    activityLabel: "Next Letter",
    variant: "next-letter",
    selectionMode: "blank-completion",
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Tap the letter that comes next.",
    selectionPrompt: "Tap a letter to complete the sequence.",
    prompt: "Which letter comes after s?",
    displayText: "s -> ___",
    visualLabel: "Next letter",
    hint: "Say the alphabet slowly from the shown letter.",
    voiceScript: "s. What letter comes next?",
    explanation: {
      correctAnswer: "t",
      whyCorrect: "t comes right after s in the alphabet.",
      exampleOrVisual: "s -> t",
      learnBotTip: "Say the alphabet in order.",
    },
  },
  "english-forest-l01-q12": {
    ...sharedState,
    questionId: "english-forest-l01-q12",
    type: "picture-choice",
    typeCode: "F",
    typeName: "Picture Choice",
    activityLabel: "Picture Sound",
    variant: "beginning-letter-picture",
    selectionMode: "picture-choice",
    rendererName: "EnglishPictureChoiceActivity",
    skill: "pictured beginning letter",
    instruction: "Look at the picture and tap the first letter.",
    selectionPrompt: "Tap the first letter you hear.",
    prompt: "Which letter starts star?",
    displayText: "star",
    visualLabel: "Picture clue",
    hint: "Say the word slowly and listen to the first sound.",
    voiceScript: "Star. Listen to the first sound.",
    explanation: {
      correctAnswer: "S",
      whyCorrect: "Star begins with the letter S.",
      exampleOrVisual: "S for star.",
      learnBotTip: "Listen to the first sound.",
    },
    picture: { assetSrc: "/assets/math-icons/star.webp", label: "star", altText: "A star picture clue." },
  },
};

export function shouldUseEnglishLevelOnePrototype(level: Pick<MvpLevel, "subject" | "level">) {
  return level.subject === "english" && level.level === 1;
}

export function getEnglishLevelOnePrototype(question: MvpQuestion): EnglishLevelOnePrototype {
  const base = prototypeOverrides[question.id];
  if (!base) {
    throw new Error(`${question.id}: English Level 1 prototype metadata is missing.`);
  }

  return {
    ...base,
    choices: question.options.map((label, index) => ({
      id: `choice-${String(index + 1).padStart(2, "0")}`,
      label,
      accessibilityLabel: `${base.activityLabel} answer ${index + 1}: ${label}`,
    })),
    correctAnswer: question.correctAnswer,
    explanation: {
      ...base.explanation,
      correctAnswer: question.correctAnswer,
    },
  };
}

export function getEnglishLevelOneInitialInteractionState(): EnglishLevelOneInteractionState {
  return {
    selectedChoiceId: null,
    submittedChoiceId: null,
    hintOpen: false,
    voiceOpen: false,
  };
}

export function getEnglishLevelOneChoiceById(prototype: EnglishLevelOnePrototype, choiceId: string | null) {
  if (!choiceId) return null;
  return prototype.choices.find((choice) => choice.id === choiceId) ?? null;
}

export function getEnglishLevelOneCorrectChoiceId(prototype: EnglishLevelOnePrototype) {
  return prototype.choices.find((choice) => choice.label === prototype.correctAnswer)?.id ?? null;
}

export function getEnglishLevelOneSelectedAnswer(prototype: EnglishLevelOnePrototype, choiceId: string | null) {
  return getEnglishLevelOneChoiceById(prototype, choiceId)?.label ?? null;
}

export function isEnglishLevelOneChoiceCorrect(prototype: EnglishLevelOnePrototype, choiceId: string | null) {
  const selectedAnswer = getEnglishLevelOneSelectedAnswer(prototype, choiceId);
  return selectedAnswer !== null && selectedAnswer === prototype.correctAnswer;
}

export function canSubmitEnglishLevelOneAnswer({ selectedChoiceId, submitted }: { selectedChoiceId: string | null; submitted: boolean }) {
  return selectedChoiceId !== null && !submitted;
}

export function getEnglishLevelOneBlankDisplay(prototype: EnglishLevelOnePrototype, selectedChoiceId: string | null) {
  const selectedAnswer = getEnglishLevelOneSelectedAnswer(prototype, selectedChoiceId);
  if (!selectedAnswer || prototype.type !== "fill-in-the-blank") return prototype.displayText;
  return prototype.displayText.replace("___", selectedAnswer);
}

export function getEnglishLevelOneMatchingModel(prototype: EnglishLevelOnePrototype): EnglishLevelOneMatchingModel {
  const correctChoiceId = getEnglishLevelOneCorrectChoiceId(prototype);
  return {
    clue: {
      id: `${prototype.questionId}-clue`,
      label: prototype.displayText,
      helper: prototype.visualLabel,
    },
    partners: prototype.choices.map((choice) => ({
      ...choice,
      correct: choice.id === correctChoiceId,
    })),
    correctChoiceId: correctChoiceId ?? "",
  };
}

export function getEnglishLevelOneActivityState({ submitted }: { submitted: boolean }) {
  return {
    showCorrectAnswer: submitted,
    showExplanation: submitted,
  };
}

export function buildEnglishLevelOneExplanationSections(
  prototype: EnglishLevelOnePrototype,
): EnglishLevelOneExplanationSection[] {
  return [
    {
      id: "correct-answer",
      title: "Correct answer",
      body: prototype.explanation.correctAnswer,
    },
    {
      id: "why-correct",
      title: "Why it works",
      body: prototype.explanation.whyCorrect,
    },
    {
      id: "example-or-visual",
      title: prototype.type === "picture-choice" ? "Picture clue" : "Example",
      body: prototype.explanation.exampleOrVisual,
    },
    {
      id: "learnbot-tip",
      title: "LearnBot tip",
      body: prototype.explanation.learnBotTip,
    },
  ];
}

export function summarizeEnglishLevelOneQuestionTypes(questions: readonly MvpQuestion[]) {
  return questions.reduce<Record<EnglishLevelOnePrototypeType, number>>(
    (summary, question) => {
      const prototype = getEnglishLevelOnePrototype(question);
      summary[prototype.type] += 1;
      return summary;
    },
    {
      matching: 0,
      "fill-in-the-blank": 0,
      "picture-choice": 0,
    },
  );
}

export function validateEnglishLevelOnePrototypeAssets(
  prototypes: readonly EnglishLevelOnePrototype[],
  assetInfoBySrc: Record<string, EnglishLevelOneAssetInfo> = {},
): EnglishLevelOneAssetQaIssue[] {
  const issues: EnglishLevelOneAssetQaIssue[] = [];
  const seenPictureSources = new Map<string, string>();

  for (const prototype of prototypes) {
    if (prototype.type !== "picture-choice") continue;

    const picture = prototype.picture;
    if (!picture) {
      issues.push({
        questionId: prototype.questionId,
        severity: "error",
        code: "missing-picture",
        message: "Type F picture-choice question is missing picture metadata.",
      });
      continue;
    }

    if (!picture.altText.trim()) {
      issues.push({
        questionId: prototype.questionId,
        severity: "error",
        code: "missing-alt-text",
        message: "Type F picture-choice question is missing meaningful alt text.",
        assetSrc: picture.assetSrc,
      });
    }

    if (!picture.assetSrc) {
      issues.push({
        questionId: prototype.questionId,
        severity: "error",
        code: "missing-picture",
        message: "Type F picture-choice question is missing an image source.",
      });
      continue;
    }

    if (/^https?:\/\//i.test(picture.assetSrc)) {
      issues.push({
        questionId: prototype.questionId,
        severity: "error",
        code: "unsupported-external-image",
        message: "External image paths are not supported for the Level 1 prototype.",
        assetSrc: picture.assetSrc,
      });
    }

    if (!picture.assetSrc.startsWith("/")) {
      issues.push({
        questionId: prototype.questionId,
        severity: "error",
        code: "invalid-image-path",
        message: "Image paths must be absolute public paths that start with /.",
        assetSrc: picture.assetSrc,
      });
    }

    if (/map|world|sprite/i.test(picture.assetSrc)) {
      issues.push({
        questionId: prototype.questionId,
        severity: "warning",
        code: "suspicious-image-source",
        message: "Image source looks like a map, world, or sprite asset rather than a teaching picture.",
        assetSrc: picture.assetSrc,
      });
    }

    const assetInfo = assetInfoBySrc[picture.assetSrc];
    if (assetInfo?.exists === false) {
      issues.push({
        questionId: prototype.questionId,
        severity: "error",
        code: "missing-image-file",
        message: "Image source was not found in public assets.",
        assetSrc: picture.assetSrc,
      });
    }

    if (assetInfo?.width !== undefined && assetInfo.height !== undefined && (assetInfo.width < 64 || assetInfo.height < 64)) {
      issues.push({
        questionId: prototype.questionId,
        severity: "warning",
        code: "tiny-image",
        message: "Image dimensions are very small for a picture-first Type F activity.",
        assetSrc: picture.assetSrc,
      });
    }

    const firstQuestionId = seenPictureSources.get(picture.assetSrc);
    if (firstQuestionId) {
      issues.push({
        questionId: prototype.questionId,
        severity: "warning",
        code: "duplicate-picture-asset",
        message: `Picture asset is also used by ${firstQuestionId} in the Level 1 pool.`,
        assetSrc: picture.assetSrc,
      });
    } else {
      seenPictureSources.set(picture.assetSrc, prototype.questionId);
    }
  }

  return issues;
}