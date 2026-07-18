import type { EnglishStructuredQuestion } from "@/data/english-question-types";

const base = {
  level: 1,
  topic: "Alphabet Recognition",
  skill: "Letter recognition",
  subject: "english" as const,
  instruction: "Choose the best answer.",
  hint: "Look carefully before choosing.",
  xpReward: 10,
  accessibility: {
    promptLabel: "English Year 1 question",
    interactionLabel: "Choose an English answer",
  },
  explanation: {
    correctAnswerText: "Correct answer",
    whyCorrect: "This answer matches the English clue.",
    example: "Use the clue in the question.",
    learnBotTip: "Check the clue first.",
  },
};

export const validEnglishQuestionFixtures: EnglishStructuredQuestion[] = [
  {
    ...base,
    id: "english-schema-valid-type-a",
    questionType: "word-spelling",
    topic: "Simple Spelling",
    skill: "Word spelling",
    instruction: "Choose the correctly spelled word.",
    prompt: "Which word is spelled correctly?",
    hint: "Check each letter from left to right.",
    explanation: {
      correctAnswerText: "receive",
      whyCorrect: "The word is spelled receive.",
      example: "I will receive a gift.",
      learnBotTip: "Check every letter carefully.",
      wordMeaning: "Receive means to get something.",
    },
    correctWord: "receive",
    expectedLetterCount: 7,
    wordOptions: [
      { id: "a", label: "recieve", accessibilityLabel: "Option A: recieve" },
      { id: "b", label: "receive", accessibilityLabel: "Option B: receive" },
      { id: "c", label: "receeve", accessibilityLabel: "Option C: receeve" },
    ],
  },
  {
    ...base,
    id: "english-schema-valid-type-b",
    questionType: "fill-in-the-blank",
    topic: "CVC Words",
    skill: "Fill missing letter",
    prompt: "Complete the word c___t.",
    hint: "Say each sound slowly.",
    explanation: {
      correctAnswerText: "a",
      whyCorrect: "The letter a completes cat.",
      example: "c-a-t makes cat.",
      learnBotTip: "Blend the sounds slowly.",
    },
    template: "c___t",
    blankMarker: "___",
    answerOptions: [
      { id: "a", label: "a", accessibilityLabel: "Option A: a" },
      { id: "e", label: "e", accessibilityLabel: "Option B: e" },
    ],
    correctAnswer: "a",
  },
  {
    ...base,
    id: "english-schema-valid-type-c",
    questionType: "sentence-meaning",
    topic: "Reading Simple Sentences",
    skill: "Sentence meaning",
    prompt: "What does this sentence mean?",
    hint: "Look for the action word.",
    explanation: {
      correctAnswerText: "The cat is resting.",
      whyCorrect: "Sleeping means the cat is resting.",
      example: "The cat is sleeping on the mat.",
      learnBotTip: "Read the action word.",
    },
    sentence: "The cat is sleeping on the mat.",
    answerChoices: [
      { id: "eating", label: "The cat is eating.", accessibilityLabel: "The cat is eating." },
      { id: "resting", label: "The cat is resting.", accessibilityLabel: "The cat is resting." },
    ],
    correctAnswerId: "resting",
  },
  {
    ...base,
    id: "english-schema-valid-type-d",
    questionType: "matching",
    topic: "Grammar Basics",
    skill: "Sentence type matching",
    prompt: "Match the sentence with the correct type.",
    hint: "Look at the punctuation mark.",
    explanation: {
      correctAnswerText: "Question matches the question sentence.",
      whyCorrect: "A question asks something.",
      example: "What is your name? is a question.",
      learnBotTip: "Check the end mark.",
    },
    leftItems: [
      { id: "left-question", label: "What is your name?", accessibilityLabel: "What is your name?" },
      { id: "left-command", label: "Close the door.", accessibilityLabel: "Close the door." },
    ],
    rightItems: [
      { id: "right-question", label: "Question", accessibilityLabel: "Question" },
      { id: "right-command", label: "Command", accessibilityLabel: "Command" },
    ],
    correctPairs: [
      { pairId: "pair-question", leftId: "left-question", rightId: "right-question" },
      { pairId: "pair-command", leftId: "left-command", rightId: "right-command" },
    ],
  },
  {
    ...base,
    id: "english-schema-valid-type-e",
    questionType: "sentence-builder",
    topic: "Reading Simple Sentences",
    skill: "Sentence order",
    prompt: "Arrange the words to make a sentence.",
    hint: "Start with who did it.",
    explanation: {
      correctAnswerText: "We played in the park yesterday.",
      whyCorrect: "The sentence starts with who, then the action, then where and when.",
      example: "We played in the park yesterday.",
      learnBotTip: "Think who did what.",
    },
    wordTiles: [
      { id: "we", word: "We", accessibilityLabel: "We" },
      { id: "played", word: "played", accessibilityLabel: "played" },
      { id: "in", word: "in", accessibilityLabel: "in" },
      { id: "the", word: "the", accessibilityLabel: "the" },
      { id: "park", word: "park", accessibilityLabel: "park" },
      { id: "yesterday", word: "yesterday", accessibilityLabel: "yesterday" },
    ],
    correctSequence: ["We", "played", "in", "the", "park", "yesterday"],
    punctuation: ".",
  },
  {
    ...base,
    id: "english-schema-valid-type-f",
    questionType: "picture-choice",
    topic: "Everyday Vocabulary",
    skill: "Picture meaning",
    prompt: "What is the girl doing?",
    hint: "Look at what she is holding.",
    explanation: {
      correctAnswerText: "She is reading.",
      whyCorrect: "The picture shows a girl looking at a book.",
      example: "She is reading a book.",
      learnBotTip: "Use the picture clue.",
    },
    pictureOptions: [
      {
        id: "sleeping",
        label: "She is sleeping.",
        image: { altText: "A girl sleeping.", description: "Sleeping picture choice." },
        accessibilityLabel: "She is sleeping.",
      },
      {
        id: "reading",
        label: "She is reading.",
        image: { altText: "A girl reading a book.", description: "Reading picture choice." },
        accessibilityLabel: "She is reading.",
      },
    ],
    correctOptionId: "reading",
  },
];

export const invalidEnglishQuestionFixtures: unknown[] = [
  { ...validEnglishQuestionFixtures[0], id: "english-schema-invalid-missing-field", prompt: "" },
  { ...validEnglishQuestionFixtures[0], id: "english-schema-invalid-combination", questionType: "word-spelling", correctWord: "receive", wordOptions: [] },
  { ...validEnglishQuestionFixtures[0], id: "english-schema-invalid-unsupported", questionType: "drag-and-drop" },
  {
    ...validEnglishQuestionFixtures[1],
    id: "english-schema-invalid-answer-absent",
    correctAnswer: "u",
  },
  {
    ...validEnglishQuestionFixtures[3],
    id: "english-schema-invalid-match-pair",
    correctPairs: [{ pairId: "broken", leftId: "missing-left", rightId: "right-question" }],
  },
  {
    ...validEnglishQuestionFixtures[4],
    id: "english-schema-invalid-builder-sequence",
    correctSequence: ["We", "jumped"],
  },
  {
    ...validEnglishQuestionFixtures[5],
    id: "english-schema-invalid-missing-alt",
    pictureOptions: [
      {
        id: "reading",
        label: "She is reading.",
        image: { description: "Missing alt text." },
        accessibilityLabel: "She is reading.",
      },
    ],
    correctOptionId: "reading",
  },
];

export const duplicateEnglishQuestionFixtures: unknown[] = [
  validEnglishQuestionFixtures[0],
  { ...validEnglishQuestionFixtures[0] },
];