import englishConfigJson from "../content/english/forest-world/forest-world-config.json";
import { englishWorldIdentity } from "@/data/english-world-identity";
import type { MvpLevel, MvpQuestion, VisualLearningModel } from "@/data/mvp-forest-world";
import type { NodeType } from "@/data/curriculum-types";
import type { VisualObjectName } from "@/data/object-visual-map";

type EnglishLevelConfig = {
  level: number;
  nodeType: NodeType;
  title: string;
  learningObjective: string;
};

type EnglishSeed = {
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  learnBotTip: string;
  voiceScript: string;
  visual: VisualLearningModel;
  steps: [string, string, string];
  visualExplanation: string;
  difficulty?: string;
};

const levelConfigs = englishConfigJson.levels as EnglishLevelConfig[];
const englishWorldConfig = englishConfigJson;

const sharedLevelMetadata = {
  subject: englishWorldIdentity.subject,
  subjectLabel: "English",
  year: englishWorldIdentity.year,
  worldId: englishWorldIdentity.worldId,
  worldName: englishWorldConfig.worldName,
  bossName: englishWorldIdentity.bossName,
  completionBadge: englishWorldIdentity.completionBadge,
  mapHref: "/english/world-map",
  rewardsHref: "/english/world-map",
  dashboardHref: "/mvp/parent-dashboard",
  levelHrefBase: "/english/level",
  questionHrefBase: "/english/question",
  randomizeQuestions: true,
  sessionQuestionCount: 10,
} as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function uniqueOptions(correctAnswer: string, options: string[]) {
  const values = [correctAnswer, ...options].map((value) => value.trim()).filter(Boolean);
  return [...new Set(values)].slice(0, 4);
}

function textVisual(prompt: string, answer: string): VisualLearningModel {
  return {
    type: "none",
    object: "object",
    groups: [],
    equation: prompt,
    answerVisual: answer,
    context: "forest",
    accessibleLabel: prompt,
  };
}

function objectVisual(object: VisualObjectName, answer: string, prompt?: string): VisualLearningModel {
  return {
    type: "matching",
    object,
    objects: [object],
    groups: [1],
    answerVisual: answer,
    context: "forest",
    accessibleLabel: prompt ?? `Picture clue for an English word`,
  };
}

function makeQuestion(level: EnglishLevelConfig, index: number, seed: EnglishSeed): MvpQuestion {
  const id = `english-forest-l${pad(level.level)}-q${pad(index)}`;
  return {
    id,
    level: level.level,
    nodeType: level.nodeType,
    topic: level.title,
    difficulty: seed.difficulty ?? (level.level <= 3 ? "easy" : level.level <= 7 ? "medium" : "challenge"),
    subject: englishWorldIdentity.subject,
    subjectLabel: "English",
    question: seed.question,
    options: seed.options,
    correctAnswer: seed.correctAnswer,
    explanation: seed.explanation,
    xpReward: 10,
    levelId: `english-forest-level-${level.level}`,
    worldId: englishWorldIdentity.worldId,
    visual: seed.visual,
    steps: seed.steps,
    visualExplanation: seed.visualExplanation,
    voiceScript: seed.voiceScript,
    learnBotTip: seed.learnBotTip,
  };
}

function buildLevel(levelNumber: number, description: string, seeds: EnglishSeed[]): MvpLevel {
  const config = levelConfigs.find((item) => item.level === levelNumber);
  if (!config) throw new Error(`English level ${levelNumber} is missing from the world config.`);

  return {
    ...sharedLevelMetadata,
    level: config.level,
    nodeType: config.nodeType,
    title: config.title,
    description,
    learningObjective: config.learningObjective,
    curriculumAlignment: "KSSR English Year 1: early literacy, phonics, vocabulary, sentence awareness, and literal reading comprehension.",
    cambridgeAlignment: "Cambridge Primary English Stage 1: phonics, vocabulary, simple grammar, sentence reading, and comprehension foundations.",
    questions: seeds.map((seed, index) => makeQuestion(config, index + 1, seed)),
  };
}

function englishQuestion({
  question,
  correctAnswer,
  distractors,
  explanation,
  tip,
  voice,
  visual,
  steps,
  visualExplanation,
  difficulty,
}: {
  question: string;
  correctAnswer: string;
  distractors: string[];
  explanation: string;
  tip: string;
  voice: string;
  visual: VisualLearningModel;
  steps: [string, string, string];
  visualExplanation: string;
  difficulty?: string;
}): EnglishSeed {
  return {
    question,
    correctAnswer,
    options: uniqueOptions(correctAnswer, distractors),
    explanation,
    learnBotTip: tip,
    voiceScript: voice,
    visual,
    steps,
    visualExplanation,
    difficulty,
  };
}

function letterPairQuestion(kind: "upper" | "lower", clue: string, answer: string, distractors: string[]): EnglishSeed {
  const target = kind === "upper" ? "small letter" : "big letter";
  const answerKind = kind === "upper" ? "big letter" : "small letter";
  return englishQuestion({
    question: `Look at the ${target}. Which ${answerKind} is its partner?`,
    correctAnswer: answer,
    distractors,
    explanation: `Let's look together. ${clue} and ${answer} are the same letter family.`,
    tip: "Look carefully at the letter shape.",
    voice: `Say the letter name slowly. ${clue}. Now find its partner, ${answer}.`,
    visual: textVisual(`${target}: ${clue}`, answer),
    steps: ["Look at the letter shown.", "Say the letter name slowly.", "Choose the partner letter."],
    visualExplanation: `${clue} and ${answer} are partners in the same letter family.`,
  });
}

function missingLetterQuestion(sequence: string, answer: string, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `Which letter is missing? ${sequence}`,
    correctAnswer: answer,
    distractors,
    explanation: `Read the letters in order. The missing letter is ${answer}.`,
    tip: "Say the alphabet slowly.",
    voice: `${sequence.replace("___", "blank")}. The missing letter is ${answer}.`,
    visual: textVisual(sequence, answer),
    steps: ["Read the letters from left to right.", "Say the next letter softly.", "Choose the missing letter."],
    visualExplanation: `The alphabet order helps us find ${answer}.`,
  });
}

function nextLetterQuestion(letter: string, answer: string, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `Which letter comes after ${letter}?`,
    correctAnswer: answer,
    distractors,
    explanation: `Say the alphabet: ${letter}, ${answer}. ${answer} comes next.`,
    tip: "Say the alphabet in order.",
    voice: `Say it with me: ${letter}, ${answer}.`,
    visual: textVisual(`${letter} -> ?`, answer),
    steps: ["Start at the letter shown.", "Say the next alphabet sound.", "Choose the next letter."],
    visualExplanation: `The arrow means we move one step forward to ${answer}.`,
  });
}

function firstLetterQuestion(word: string, answer: string, object: VisualObjectName, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `Which letter starts "${word}"?`,
    correctAnswer: answer,
    distractors,
    explanation: `${word} starts with ${answer}. Say it slowly: ${word}.`,
    tip: "Listen to the first sound.",
    voice: `${word}. The first letter is ${answer}.`,
    visual: objectVisual(object, answer, `Picture clue for ${word}`),
    steps: ["Look at the picture.", "Say the word slowly.", "Choose the first letter."],
    visualExplanation: `The picture shows ${word}. The word begins with ${answer}.`,
  });
}

function differentLetterQuestion(group: string, answer: string, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `Which letter is different? ${group}`,
    correctAnswer: answer,
    distractors,
    explanation: `Most letters are the same. ${answer} is the different letter.`,
    tip: "Look at each letter shape.",
    voice: `Look at each letter. ${answer} is not the same as the others.`,
    visual: textVisual(group, answer),
    steps: ["Look at every letter.", "Find the one that is not the same.", "Choose the different letter."],
    visualExplanation: `${answer} has a different shape from the others in the group.`,
  });
}

function sameLetterQuestion(target: string, answer: string, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `Find the same letter as ${target}.`,
    correctAnswer: answer,
    distractors,
    explanation: `${answer} looks the same as ${target}.`,
    tip: "Match the letter shape exactly.",
    voice: `The target letter is ${target}. Find the same one.`,
    visual: textVisual(`Target letter: ${target}`, answer),
    steps: ["Look at the target letter.", "Check each answer shape.", "Choose the same letter."],
    visualExplanation: `The target letter and the answer have the same shape.`,
  });
}

const alphabetSeeds: EnglishSeed[] = [
  letterPairQuestion("upper", "a", "A", ["B", "D", "G"]),
  letterPairQuestion("lower", "B", "b", ["d", "p", "q"]),
  missingLetterQuestion("A, B, ___", "C", ["D", "E", "G"]),
  nextLetterQuestion("D", "E", ["B", "F", "H"]),
  firstLetterQuestion("apple", "A", "apple", ["B", "M", "S"]),
  firstLetterQuestion("bird", "B", "bird", ["D", "P", "T"]),
  differentLetterQuestion("m  m  n  m", "n", ["m", "w", "h"]),
  sameLetterQuestion("T", "T", ["F", "I", "L"]),
  missingLetterQuestion("p, q, ___", "r", ["s", "t", "m"]),
  letterPairQuestion("upper", "e", "E", ["F", "L", "T"]),
  nextLetterQuestion("s", "t", ["r", "u", "p"]),
  firstLetterQuestion("star", "S", "star", ["T", "M", "R"]),
];

function soundQuestion(word: string, sound: string, object: VisualObjectName, distractors: string[], style: number): EnglishSeed {
  const prompts = [
    `Say "${word}". Which sound do you hear first?`,
    `Which letter or sound starts "${word}"?`,
    `Look at the picture. What is the first sound in "${word}"?`,
    `Which beginning sound matches "${word}"?`,
  ];
  return englishQuestion({
    question: prompts[(style + hashText(word)) % prompts.length],
    correctAnswer: sound,
    distractors,
    explanation: `${word} starts with ${sound}. Say it slowly and listen to the beginning.`,
    tip: "Say the word slowly.",
    voice: `${word}. Listen to the first sound: ${sound}.`,
    visual: objectVisual(object, sound, `Picture clue for ${word}`),
    steps: ["Look at the picture.", "Say the word slowly.", "Choose the first sound."],
    visualExplanation: `The picture shows ${word}. The first sound is ${sound}.`,
  });
}

const letterSoundItems: Array<[string, string, VisualObjectName, string[]]> = [
  ["apple", "a", "apple", ["b", "m", "s"]],
  ["bird", "b", "bird", ["d", "p", "t"]],
  ["coin", "c", "coin", ["g", "n", "s"]],
  ["duck", "d", "duck", ["b", "p", "r"]],
  ["fish", "f", "fish", ["s", "t", "m"]],
  ["leaf", "l", "leaf", ["r", "b", "n"]],
  ["nut", "n", "nut", ["m", "t", "p"]],
  ["orange", "o", "orange", ["a", "u", "e"]],
  ["pencil", "p", "pencil", ["b", "d", "q"]],
  ["shell", "sh", "shell", ["s", "ch", "th"]],
  ["tree", "t", "tree", ["f", "l", "p"]],
  ["star", "s", "star", ["t", "m", "r"]],
];

function vocabularyQuestion(object: VisualObjectName, word: string, distractors: string[], style: number): EnglishSeed {
  const prompts = [
    "Which word names the picture?",
    "Look at the picture. Which word matches?",
    "Choose the word for this picture.",
    "What is this picture called?",
    "Find the word that matches what you see.",
    "Which answer tells the picture name?",
    "Which word goes with this picture clue?",
    "Look first, then choose the picture word.",
    "Which word would you say for this picture?",
    "Point to the picture in your mind. Which word fits?",
    "Which word matches the object shown?",
    "Choose the best picture word.",
  ];
  const examples: Record<string, string> = {
    apple: "An apple is a fruit.",
    bird: "A bird is an animal.",
    fish: "A fish lives in water.",
    flower: "A flower grows on a plant.",
    duck: "A duck can swim.",
    tree: "A tree is a tall plant.",
    star: "A star shines in the sky.",
    pencil: "A pencil helps us write.",
    shell: "A shell can be found near water.",
    bee: "A bee is a small insect.",
    leaf: "A leaf grows on a plant.",
    ball: "A ball is a toy for playing.",
  };
  return englishQuestion({
    question: prompts[(style + hashText(word)) % prompts.length],
    correctAnswer: word,
    distractors,
    explanation: `${word}. ${examples[word] ?? "This word matches the picture."}`,
    tip: "Look at the picture first.",
    voice: `${word}. ${examples[word] ?? "Say the word and look at the picture."}`,
    visual: objectVisual(object, word, `Picture clue for ${word}`),
    steps: ["Look at the picture.", "Say each answer word.", "Choose the word that names it."],
    visualExplanation: `The picture shows ${word}.`,
  });
}

const vocabularyItems: Array<[VisualObjectName, string, string[]]> = [
  ["apple", "apple", ["orange", "leaf", "bird"]],
  ["bird", "bird", ["fish", "tree", "apple"]],
  ["fish", "fish", ["duck", "shell", "bee"]],
  ["flower", "flower", ["tree", "leaf", "star"]],
  ["duck", "duck", ["bird", "fish", "nut"]],
  ["tree", "tree", ["leaf", "flower", "pencil"]],
  ["star", "star", ["shell", "coin", "ball"]],
  ["pencil", "pencil", ["crayon", "coin", "shell"]],
  ["shell", "shell", ["fish", "stone", "flower"]],
  ["bee", "bee", ["bird", "duck", "butterfly"]],
  ["leaf", "leaf", ["tree", "flower", "apple"]],
  ["ball", "ball", ["coin", "orange", "star"]],
];

function colourQuestion(answer: string, distractors: string[], visualPrompt: string, example: string): EnglishSeed {
  return englishQuestion({
    question: [
      "Which colour word matches the picture clue?",
      "Look at the clue. Which colour word fits?",
      "Choose the colour word for this clue.",
      "Which answer is the colour word?",
      "Find the colour word that matches.",
      "Which colour word would you say?",
    ][hashText(visualPrompt) % 6],
    correctAnswer: answer,
    distractors,
    explanation: `${answer} is the colour word. ${example}`,
    tip: "Look at the colour clue.",
    voice: `The colour word is ${answer}. ${example}`,
    visual: textVisual(visualPrompt, answer),
    steps: ["Look at the colour clue.", "Say each colour word.", "Choose the word that matches."],
    visualExplanation: `${example}`,
  });
}

function shapeQuestion(answer: string, distractors: string[], visualPrompt: string, example: string): EnglishSeed {
  return englishQuestion({
    question: [
      "Which shape word matches the outline?",
      "Look at the outline. Which shape word fits?",
      "Choose the shape word for this clue.",
      "Which answer names the shape?",
      "Find the shape word that matches.",
      "Which shape word would you say?",
    ][hashText(visualPrompt) % 6],
    correctAnswer: answer,
    distractors,
    explanation: `${answer} is the shape word. ${example}`,
    tip: "Look at the outline.",
    voice: `The shape word is ${answer}. ${example}`,
    visual: textVisual(visualPrompt, answer),
    steps: ["Look at the outline clue.", "Think about the shape name.", "Choose the matching word."],
    visualExplanation: `${example}`,
  });
}

const colourShapeSeeds: EnglishSeed[] = [
  colourQuestion("red", ["blue", "green", "yellow"], "Picture clue: apple", "An apple can be red."),
  colourQuestion("blue", ["red", "black", "pink"], "Picture clue: clear sky", "The sky can be blue."),
  colourQuestion("green", ["orange", "purple", "blue"], "Picture clue: leaf", "A leaf can be green."),
  colourQuestion("yellow", ["white", "red", "brown"], "Picture clue: bright star", "A bright star can be yellow."),
  shapeQuestion("circle", ["square", "triangle", "rectangle"], "Outline clue: round with no corners", "A circle is round."),
  shapeQuestion("square", ["circle", "triangle", "oval"], "Outline clue: four equal sides", "A square has four equal sides."),
  shapeQuestion("triangle", ["circle", "square", "rectangle"], "Outline clue: three sides", "A triangle has three sides."),
  shapeQuestion("rectangle", ["triangle", "oval", "circle"], "Outline clue: long box shape", "A rectangle has two long sides and two short sides."),
  colourQuestion("orange", ["green", "blue", "white"], "Picture clue: orange fruit", "An orange fruit is orange."),
  colourQuestion("purple", ["yellow", "red", "black"], "Picture clue: grape colour", "Grapes can be purple."),
  shapeQuestion("oval", ["square", "circle", "triangle"], "Outline clue: egg-shaped", "An oval is like an egg shape."),
  colourQuestion("black", ["white", "yellow", "pink"], "Picture clue: night sky", "The night sky can look black."),
];

function homeSchoolWord(word: string, category: "family" | "school", distractors: string[], example: string, style: number): EnglishSeed {
  const prompts = category === "family"
    ? [
        "Which word is a family word?",
        "Which word can name someone at home?",
        "Choose the family word.",
        "Which answer belongs with family?",
        "Find the word you might use at home.",
        "Which word names a family person?",
      ]
    : [
        "Which word belongs at school?",
        "Which word can you use in class?",
        "Choose the school word.",
        "Which answer belongs with school?",
        "Find the word you might use in class.",
        "Which word fits a school day?",
      ];
  return englishQuestion({
    question: prompts[(style + hashText(word)) % prompts.length],
    correctAnswer: word,
    distractors,
    explanation: `${word}. ${example}`,
    tip: category === "family" ? "Think about people at home." : "Think about things or people in class.",
    voice: `${word}. ${example}`,
    visual: textVisual(category === "family" ? "Place clue: home" : "Place clue: school", word),
    steps: ["Read the category.", "Say each answer word.", "Choose the word that belongs."],
    visualExplanation: `${word} belongs with ${category}.`,
  });
}

const familySchoolSeeds: EnglishSeed[] = [
  homeSchoolWord("mother", "family", ["teacher", "desk", "book"], "Mother is a family word.", 0),
  homeSchoolWord("father", "family", ["pencil", "bag", "chair"], "Father is a family word.", 1),
  homeSchoolWord("sister", "family", ["ruler", "school", "door"], "Sister is a family word.", 2),
  homeSchoolWord("brother", "family", ["class", "book", "pen"], "Brother is a family word.", 0),
  homeSchoolWord("teacher", "school", ["mother", "uncle", "sister"], "A teacher helps children learn at school.", 0),
  homeSchoolWord("book", "school", ["father", "aunt", "baby"], "A book is used for reading and learning.", 1),
  homeSchoolWord("pencil", "school", ["grandma", "brother", "home"], "A pencil helps us write in class.", 2),
  homeSchoolWord("bag", "school", ["mother", "father", "sister"], "A school bag carries books and pencils.", 0),
  homeSchoolWord("class", "school", ["uncle", "baby", "family"], "A class is a group of learners at school.", 1),
  homeSchoolWord("friend", "school", ["mother", "father", "sister"], "A friend can learn and play with you at school.", 2),
  homeSchoolWord("desk", "school", ["aunt", "cousin", "mother"], "A desk is used for work in class.", 0),
  homeSchoolWord("grandma", "family", ["teacher", "book", "chair"], "Grandma is a family word.", 1),
];

function sentenceCompletion(sentence: string, answer: string, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `Choose the word that completes the sentence: ${sentence}`,
    correctAnswer: answer,
    distractors,
    explanation: `${answer} fits the sentence. Read it: ${sentence.replace("___", answer)}`,
    tip: "Read the whole sentence.",
    voice: `Read it with me: ${sentence.replace("___", answer)}.`,
    visual: textVisual(sentence, answer),
    steps: ["Read the sentence from the start.", "Try each word in the blank.", "Choose the word that sounds right."],
    visualExplanation: `The sentence becomes: ${sentence.replace("___", answer)}`,
  });
}

const sentenceSeeds: EnglishSeed[] = [
  sentenceCompletion("I can ___ a book.", "read", ["run", "blue", "desk"]),
  sentenceCompletion("The bird can ___.", "fly", ["book", "red", "sit"]),
  sentenceCompletion("I ___ an apple.", "eat", ["jump", "pencil", "green"]),
  sentenceCompletion("The fish can ___.", "swim", ["read", "write", "sleep"]),
  sentenceCompletion("We go to ___.", "school", ["yellow", "bird", "run"]),
  sentenceCompletion("I write with a ___.", "pencil", ["fish", "tree", "mother"]),
  sentenceCompletion("The ball is ___.", "round", ["read", "school", "father"]),
  sentenceCompletion("A flower is ___.", "pretty", ["swim", "book", "desk"]),
  sentenceCompletion("I say ___ to my friend.", "hello", ["sleep", "green", "chair"]),
  sentenceCompletion("The sun is ___.", "hot", ["book", "run", "pencil"]),
  sentenceCompletion("A duck can ___.", "quack", ["write", "read", "pencil"]),
  sentenceCompletion("I sit on a ___.", "chair", ["fish", "red", "mother"]),
];

function grammarQuestion(question: string, answer: string, distractors: string[], explanation: string, tip: string): EnglishSeed {
  return englishQuestion({
    question,
    correctAnswer: answer,
    distractors,
    explanation,
    tip,
    voice: `${explanation} The answer is ${answer}.`,
    visual: textVisual("Sentence helper", answer),
    steps: ["Read the whole question.", "Try each answer in your head.", "Choose the word or sentence that fits best."],
    visualExplanation: explanation,
  });
}

const grammarSeeds: EnglishSeed[] = [
  grammarQuestion("Which word names a thing?", "apple", ["run", "blue", "quickly"], "Apple names a thing. A naming word can name a thing.", "Ask: can I see or name this thing?"),
  grammarQuestion("Which word is an action?", "jump", ["book", "red", "desk"], "Jump is something you can do.", "Action words tell what someone does."),
  grammarQuestion("Which word tells a colour?", "green", ["run", "fish", "book"], "Green tells us a colour.", "A describing word can tell colour or size."),
  grammarQuestion("Which word means more than one cat?", "cats", ["cat", "cated", "catting"], "Cats means more than one cat.", "Look for the word that means many."),
  grammarQuestion("Which sentence starts correctly?", "The dog runs.", ["the dog runs.", "the Dog runs.", "the dog Runs."], "A sentence starts with a capital letter.", "Check the first letter."),
  grammarQuestion("Which sentence has a full stop?", "I can read.", ["I can read", "I can read,", "I can read?"], "This sentence tells something, so it can end with a full stop.", "Look at the mark at the end."),
  grammarQuestion("Choose the correct word: I ___ happy.", "am", ["is", "are", "be"], "We say: I am happy.", "Say the sentence aloud."),
  grammarQuestion("Choose the correct word: She ___ kind.", "is", ["am", "are", "be"], "We say: She is kind.", "Say the sentence aloud."),
  grammarQuestion("Which word describes size?", "small", ["jump", "teacher", "pencil"], "Small tells us about size.", "A describing word tells more about something."),
  grammarQuestion("Which word means more than one book?", "books", ["book", "bookes", "booking"], "Books means more than one book.", "Look for the simple plural word."),
  grammarQuestion("Which word is an action you can do?", "read", ["apple", "yellow", "desk"], "Read is something you can do.", "Think about actions."),
  grammarQuestion("Which word names a person?", "teacher", ["jump", "blue", "round"], "Teacher names a person.", "A naming word can name a person."),
];

function categoryQuestion(question: string, answer: string, distractors: string[], explanation: string): EnglishSeed {
  return englishQuestion({
    question,
    correctAnswer: answer,
    distractors,
    explanation,
    tip: "Think about what the words mean.",
    voice: `${answer}. ${explanation}`,
    visual: textVisual("Word group helper", answer),
    steps: ["Read the group clue.", "Say each answer word.", "Choose the word that belongs."],
    visualExplanation: explanation,
  });
}

const categorisingSeeds: EnglishSeed[] = [
  categoryQuestion("Which word is an animal?", "bird", ["pencil", "chair", "book"], "Bird is an animal word."),
  categoryQuestion("Which word is food?", "apple", ["tree", "pencil", "desk"], "Apple is food."),
  categoryQuestion("Which word is a school thing?", "book", ["mother", "fish", "flower"], "A book is used at school."),
  categoryQuestion("Which word is a family word?", "sister", ["pencil", "desk", "school"], "Sister is a family word."),
  categoryQuestion("Which word is a colour?", "blue", ["run", "fish", "desk"], "Blue is a colour word."),
  categoryQuestion("Which word is a shape?", "circle", ["apple", "read", "teacher"], "Circle is a shape word."),
  categoryQuestion("Which two words go together?", "fish and water", ["book and tree", "pencil and bird", "mother and shell"], "Fish and water go together because fish live in water."),
  categoryQuestion("Which pair belongs at school?", "teacher and school", ["duck and pencil", "fish and chair", "tree and book"], "Teacher and school go together."),
  categoryQuestion("Which word belongs with forest?", "tree", ["desk", "pencil", "chair"], "A tree can grow in a forest."),
  categoryQuestion("Which word belongs with classroom?", "desk", ["shell", "fish", "flower"], "A desk can be in a classroom."),
  categoryQuestion("Which word is a greeting?", "hello", ["sleep", "green", "circle"], "Hello is a greeting word."),
  categoryQuestion("Which word is the opposite of big?", "small", ["round", "happy", "yellow"], "Small is the opposite of big."),
];

function readingQuestion(sentence: string, question: string, answer: string, distractors: string[]): EnglishSeed {
  return englishQuestion({
    question: `${sentence} ${question}`,
    correctAnswer: answer,
    distractors,
    explanation: `Look back at the sentence. It says ${answer}.`,
    tip: "Read one sentence at a time.",
    voice: `${sentence} The answer is ${answer}.`,
    visual: textVisual(`Passage: ${sentence}`, answer),
    steps: ["Read the short passage.", "Find the clue words.", "Choose the answer from the passage."],
    visualExplanation: `The clue sentence is: ${sentence}`,
    difficulty: "challenge",
  });
}

const readingSeeds: EnglishSeed[] = [
  readingQuestion("Sam has a red ball.", "What does Sam have?", "a red ball", ["a blue fish", "a green book", "a yellow duck"]),
  readingQuestion("Mia reads a book.", "What does Mia do?", "reads a book", ["kicks a ball", "eats an apple", "draws a star"]),
  readingQuestion("The duck swims in water.", "Where does the duck swim?", "in water", ["in a bag", "on a desk", "under a tree"]),
  readingQuestion("I see five stars.", "What does the child see?", "five stars", ["five books", "two fish", "one pencil"]),
  readingQuestion("The flower is pink.", "What colour is the flower?", "pink", ["blue", "green", "black"]),
  readingQuestion("Dad is at school.", "Who is at school?", "Dad", ["Mum", "Baby", "Grandma"]),
  readingQuestion("The bird is in the tree.", "Where is the bird?", "in the tree", ["in the water", "on the desk", "in the bag"]),
  readingQuestion("I eat an orange.", "What do I eat?", "an orange", ["a pencil", "a shell", "a flower"]),
  readingQuestion("The pencil is on the desk.", "Where is the pencil?", "on the desk", ["in the water", "under the tree", "in the sky"]),
  readingQuestion("We play with a ball.", "What do we play with?", "a ball", ["a book", "a fish", "a leaf"]),
  readingQuestion("First, Ben gets a book. Then, Ben reads.", "What does Ben do second?", "reads", ["gets a ball", "sleeps", "draws"]),
  readingQuestion("I say hello.", "What do I say?", "hello", ["goodbye", "red", "jump"]),
];

function challengeSeeds(): EnglishSeed[] {
  return [
    alphabetSeeds[0],
    alphabetSeeds[2],
    soundQuestion("apple", "a", "apple", ["b", "m", "s"], 0),
    soundQuestion("bird", "b", "bird", ["d", "p", "t"], 1),
    vocabularyQuestion("fish", "fish", ["duck", "shell", "bee"], 2),
    vocabularyQuestion("tree", "tree", ["leaf", "flower", "pencil"], 3),
    sentenceSeeds[0],
    sentenceSeeds[3],
    grammarSeeds[4],
    grammarSeeds[10],
    readingSeeds[0],
    readingSeeds[10],
  ].map((seed) => ({ ...seed, difficulty: "boss" }));
}

export const englishLevels: MvpLevel[] = [
  buildLevel(
    1,
    "Recognise letters, match upper and lower case, and use simple alphabet order.",
    alphabetSeeds,
  ),
  buildLevel(
    2,
    "Listen for the first sound in familiar words.",
    letterSoundItems.map(([word, sound, object, distractors], index) => soundQuestion(word, sound, object, distractors, index)),
  ),
  buildLevel(
    3,
    "Match simple English words to familiar Forest World pictures.",
    vocabularyItems.map(([object, word, distractors], index) => vocabularyQuestion(object, word, distractors, index)),
  ),
  buildLevel(
    4,
    "Read common colour and shape words used in early English.",
    colourShapeSeeds,
  ),
  buildLevel(
    5,
    "Read useful family and school words that children see every day.",
    familySchoolSeeds,
  ),
  buildLevel(
    6,
    "Choose words that complete short, meaningful sentences.",
    sentenceSeeds,
  ),
  buildLevel(
    7,
    "Notice simple grammar patterns: naming words, action words, plurals, capitals, full stops, and sentence fit.",
    grammarSeeds,
  ),
  buildLevel(
    8,
    "Match and categorise words by meaning.",
    categorisingSeeds,
  ),
  buildLevel(
    9,
    "Read one short sentence at a time and answer a clear question.",
    readingSeeds,
  ),
  buildLevel(
    10,
    "Review letters, sounds, words, grammar, sentences, and reading with the Forest Guardian.",
    challengeSeeds(),
  ),
];

export function getEnglishLevel(level: number) {
  return englishLevels.find((item) => item.level === level);
}

export { englishWorldConfig };
