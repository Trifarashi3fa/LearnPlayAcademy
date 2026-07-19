import type { MvpLevel, MvpQuestion } from "@/data/mvp-forest-world";

export type EnglishLevelOnePrototypeType = "matching" | "fill-in-the-blank" | "picture-choice";

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
  rendererName: "EnglishFillBlankActivity" | "EnglishMatchingActivity" | "EnglishPictureChoiceActivity";
  skill: string;
  instruction: string;
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

type PrototypeBase = Omit<EnglishLevelOnePrototype, "choices" | "correctAnswer">;

const sharedState = {
  initialState: { hintCollapsed: true, revealAnswerBeforeSubmission: false },
  keyboardInstructions: "Tab to an answer card, then press Enter or Space to choose it.",
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
    rendererName: "EnglishMatchingActivity",
    skill: "uppercase/lowercase matching",
    instruction: "Match the small letter with its big-letter partner.",
    prompt: "Look at the small letter. Which big letter is its partner?",
    displayText: "small letter: a",
    visualLabel: "Letter partner",
    hint: "Look at the small letter and find its big-letter partner.",
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
    rendererName: "EnglishMatchingActivity",
    skill: "uppercase/lowercase matching",
    instruction: "Match the big letter with its small-letter partner.",
    prompt: "Look at the big letter. Which small letter is its partner?",
    displayText: "big letter: B",
    visualLabel: "Letter partner",
    hint: "Look at the big letter and find its small-letter partner.",
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
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Choose the missing letter.",
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
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Choose the letter that comes next.",
    prompt: "Which letter comes after D?",
    displayText: "D -> ___",
    visualLabel: "Next letter",
    hint: "Say the alphabet from D slowly.",
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
    rendererName: "EnglishPictureChoiceActivity",
    skill: "pictured beginning letter",
    instruction: "Look at the picture and choose the first letter.",
    prompt: "Which letter starts apple?",
    displayText: "apple",
    visualLabel: "Picture clue",
    hint: "Look at the apple. Listen for the first sound.",
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
    rendererName: "EnglishPictureChoiceActivity",
    skill: "pictured beginning letter",
    instruction: "Look at the picture and choose the first letter.",
    prompt: "Which letter starts bird?",
    displayText: "bird",
    visualLabel: "Picture clue",
    hint: "Look at the bird. Listen for the first sound.",
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
    rendererName: "EnglishFillBlankActivity",
    skill: "identifying a different letter",
    instruction: "Choose the letter that is different.",
    prompt: "Which letter is different?",
    displayText: "m  m  ___  m",
    visualLabel: "Different letter",
    hint: "Read the letters from left to right. Which one changes?",
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
    rendererName: "EnglishMatchingActivity",
    skill: "identifying the same letter",
    instruction: "Find the same letter as the target.",
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
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Choose the missing letter.",
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
    rendererName: "EnglishMatchingActivity",
    skill: "uppercase/lowercase matching",
    instruction: "Match the small letter with its big-letter partner.",
    prompt: "Look at the small letter. Which big letter is its partner?",
    displayText: "small letter: e",
    visualLabel: "Letter partner",
    hint: "Look at the small letter and find its big-letter partner.",
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
    rendererName: "EnglishFillBlankActivity",
    skill: "alphabet order",
    instruction: "Choose the letter that comes next.",
    prompt: "Which letter comes after s?",
    displayText: "s -> ___",
    visualLabel: "Next letter",
    hint: "Say the alphabet from s slowly.",
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
    rendererName: "EnglishPictureChoiceActivity",
    skill: "pictured beginning letter",
    instruction: "Look at the picture and choose the first letter.",
    prompt: "Which letter starts star?",
    displayText: "star",
    visualLabel: "Picture clue",
    hint: "Look at the star. Listen for the first sound.",
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
      accessibilityLabel: `Answer ${index + 1}: ${label}`,
    })),
    correctAnswer: question.correctAnswer,
    explanation: {
      ...base.explanation,
      correctAnswer: question.correctAnswer,
    },
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
