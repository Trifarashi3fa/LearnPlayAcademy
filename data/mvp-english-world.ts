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

function uniqueOptions(correctAnswer: string, options: string[]) {
  const values = [correctAnswer, ...options].map((value) => value.trim()).filter(Boolean);
  return [...new Set(values)].slice(0, 4);
}

function textVisual(equation: string, answer: string): VisualLearningModel {
  return {
    type: "none",
    object: "object",
    groups: [],
    equation,
    answerVisual: answer,
    context: "forest",
    accessibleLabel: equation,
  };
}

function objectVisual(object: VisualObjectName, answer: string): VisualLearningModel {
  return {
    type: "matching",
    object,
    objects: [object],
    groups: [1],
    answerVisual: answer,
    context: "forest",
    accessibleLabel: `A picture clue for ${answer}`,
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
    steps: [
      "Look at the clue in the question.",
      "Say the sound, word, or sentence slowly.",
      `Choose the answer that matches: ${seed.correctAnswer}.`,
    ],
    visualExplanation: seed.explanation,
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
    curriculumAlignment: "KSSR English Year 1: early literacy, phonics, vocabulary, and simple sentence understanding.",
    cambridgeAlignment: "Cambridge Primary English Stage 1: phonics, vocabulary, sentence reading, and comprehension foundations.",
    questions: seeds.map((seed, index) => makeQuestion(config, index + 1, seed)),
  };
}

const alphabetLetters = [
  ["a", "A", ["B", "D", "G"]],
  ["b", "B", ["D", "P", "R"]],
  ["c", "C", ["G", "O", "S"]],
  ["d", "D", ["B", "P", "Q"]],
  ["e", "E", ["F", "L", "T"]],
  ["f", "F", ["E", "P", "T"]],
  ["g", "G", ["C", "O", "Q"]],
  ["h", "H", ["N", "M", "K"]],
  ["m", "M", ["N", "W", "H"]],
  ["p", "P", ["B", "D", "R"]],
  ["s", "S", ["C", "Z", "G"]],
  ["t", "T", ["F", "I", "L"]],
] as const;

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
  ["shell", "s", "shell", ["c", "f", "h"]],
  ["tree", "t", "tree", ["f", "l", "p"]],
  ["star", "s", "star", ["t", "m", "r"]],
];

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

const colourShapeSeeds: EnglishSeed[] = [
  colourQuestion("red", ["blue", "green", "yellow"], "red circle"),
  colourQuestion("blue", ["red", "black", "pink"], "blue square"),
  colourQuestion("green", ["orange", "purple", "blue"], "green leaf"),
  colourQuestion("yellow", ["white", "red", "brown"], "yellow star"),
  shapeQuestion("circle", ["square", "triangle", "rectangle"], "round shape"),
  shapeQuestion("square", ["circle", "triangle", "oval"], "four equal sides"),
  shapeQuestion("triangle", ["circle", "square", "rectangle"], "three sides"),
  shapeQuestion("rectangle", ["triangle", "oval", "circle"], "long box shape"),
  colourQuestion("orange", ["green", "blue", "white"], "orange fruit"),
  colourQuestion("purple", ["yellow", "red", "black"], "purple crayon"),
  shapeQuestion("oval", ["square", "circle", "triangle"], "egg shape"),
  colourQuestion("black", ["white", "yellow", "pink"], "black word"),
];

function colourQuestion(answer: string, distractors: string[], clue: string): EnglishSeed {
  return {
    question: `Which colour word matches "${clue}"?`,
    correctAnswer: answer,
    options: uniqueOptions(answer, distractors),
    explanation: `${answer} is the colour word that matches the clue.`,
    learnBotTip: "Look at the colour word, then say it slowly.",
    voiceScript: `The clue is ${clue}. The matching colour word is ${answer}.`,
    visual: textVisual(`Colour clue: ${clue}`, answer),
  };
}

function shapeQuestion(answer: string, distractors: string[], clue: string): EnglishSeed {
  return {
    question: `Which shape word means "${clue}"?`,
    correctAnswer: answer,
    options: uniqueOptions(answer, distractors),
    explanation: `${answer} is the shape word for ${clue}.`,
    learnBotTip: "Count the sides or look at the outline.",
    voiceScript: `${answer} means ${clue}.`,
    visual: textVisual(`Shape clue: ${clue}`, answer),
  };
}

const familySchoolSeeds: EnglishSeed[] = [
  wordMeaning("mother", "family", ["teacher", "desk", "book"], "Mother is a family word."),
  wordMeaning("father", "family", ["pencil", "bag", "chair"], "Father is a family word."),
  wordMeaning("sister", "family", ["ruler", "school", "door"], "Sister is a family word."),
  wordMeaning("brother", "family", ["class", "book", "pen"], "Brother is a family word."),
  wordMeaning("teacher", "school", ["mother", "uncle", "sister"], "Teacher is a school word."),
  wordMeaning("book", "school", ["father", "aunt", "baby"], "Book is a school word."),
  wordMeaning("pencil", "school", ["grandma", "brother", "home"], "Pencil is a school word."),
  wordMeaning("bag", "school", ["mother", "father", "sister"], "Bag is a school word."),
  wordMeaning("class", "school", ["uncle", "baby", "family"], "Class is a school word."),
  wordMeaning("friend", "school", ["desk", "ruler", "door"], "Friend can be a school word."),
  wordMeaning("desk", "school", ["aunt", "cousin", "mother"], "Desk is a school word."),
  wordMeaning("grandma", "family", ["teacher", "book", "chair"], "Grandma is a family word."),
];

function wordMeaning(word: string, category: string, distractors: string[], explanation: string): EnglishSeed {
  return {
    question: `Which word belongs to ${category}?`,
    correctAnswer: word,
    options: uniqueOptions(word, distractors),
    explanation,
    learnBotTip: `Think about words you hear at ${category === "family" ? "home" : "school"}.`,
    voiceScript: `${word} belongs to ${category}.`,
    visual: textVisual(`${category}: ${word}`, word),
  };
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

function sentenceCompletion(sentence: string, answer: string, distractors: string[]): EnglishSeed {
  return {
    question: `Choose the word that completes: ${sentence}`,
    correctAnswer: answer,
    options: uniqueOptions(answer, distractors),
    explanation: `${answer} makes the sentence sound right and clear.`,
    learnBotTip: "Read the sentence out loud and listen for the missing word.",
    voiceScript: `The sentence is ${sentence.replace("___", answer)}.`,
    visual: textVisual(sentence, answer),
  };
}

const grammarSeeds: EnglishSeed[] = [
  grammarQuestion("Which word is a noun?", "apple", ["run", "blue", "quickly"], "A noun names a person, place, or thing."),
  grammarQuestion("Which word is a verb?", "jump", ["book", "red", "desk"], "A verb shows an action."),
  grammarQuestion("Which word is a colour adjective?", "green", ["run", "fish", "book"], "Green describes a colour."),
  grammarQuestion("Which word means more than one cat?", "cats", ["cat", "cated", "catting"], "Add s to make many cats."),
  grammarQuestion("Which sentence starts with a capital letter?", "The dog runs.", ["the dog runs.", "the Dog runs.", "the dog Runs."], "A sentence starts with a capital letter."),
  grammarQuestion("Which sentence ends correctly?", "I can read.", ["I can read", "I can read,", "I can read?"], "A telling sentence can end with a full stop."),
  grammarQuestion("Choose the correct word: I ___ happy.", "am", ["is", "are", "be"], "I goes with am."),
  grammarQuestion("Choose the correct word: She ___ kind.", "is", ["am", "are", "be"], "She goes with is."),
  grammarQuestion("Which word is a describing word?", "small", ["jump", "teacher", "pencil"], "Small describes a size."),
  grammarQuestion("Which word means more than one book?", "books", ["book", "bookes", "booking"], "Books means more than one book."),
  grammarQuestion("Which word is an action?", "read", ["apple", "yellow", "desk"], "Read is something you do."),
  grammarQuestion("Which word names a person?", "teacher", ["jump", "blue", "round"], "Teacher names a person."),
];

function grammarQuestion(question: string, answer: string, distractors: string[], explanation: string): EnglishSeed {
  return {
    question,
    correctAnswer: answer,
    options: uniqueOptions(answer, distractors),
    explanation,
    learnBotTip: "Ask: is it a naming word, an action word, or a describing word?",
    voiceScript: `${explanation} The answer is ${answer}.`,
    visual: textVisual(question, answer),
  };
}

const categorisingSeeds: EnglishSeed[] = [
  categoryQuestion("Which word is an animal?", "bird", ["pencil", "chair", "book"]),
  categoryQuestion("Which word is food?", "apple", ["tree", "pencil", "desk"]),
  categoryQuestion("Which word is a school thing?", "book", ["mother", "fish", "flower"]),
  categoryQuestion("Which word is a family word?", "sister", ["pencil", "desk", "school"]),
  categoryQuestion("Which word is a colour?", "blue", ["run", "fish", "desk"]),
  categoryQuestion("Which word is a shape?", "circle", ["apple", "read", "teacher"]),
  categoryQuestion("Which two words go together?", "fish and water", ["book and tree", "pencil and bird", "mother and shell"]),
  categoryQuestion("Which two words go together?", "teacher and school", ["duck and pencil", "fish and chair", "tree and book"]),
  categoryQuestion("Which word belongs with forest?", "tree", ["desk", "pencil", "chair"]),
  categoryQuestion("Which word belongs with classroom?", "desk", ["shell", "fish", "flower"]),
  categoryQuestion("Which word is a greeting?", "hello", ["sleep", "green", "circle"]),
  categoryQuestion("Which word is an action?", "write", ["yellow", "apple", "teacher"]),
];

function categoryQuestion(question: string, answer: string, distractors: string[]): EnglishSeed {
  return {
    question,
    correctAnswer: answer,
    options: uniqueOptions(answer, distractors),
    explanation: `${answer} belongs in this group.`,
    learnBotTip: "Think about what the words mean, then choose the best match.",
    voiceScript: `${answer} belongs in this group.`,
    visual: textVisual("Sort by meaning", answer),
  };
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
  readingQuestion("The bee is small.", "What is small?", "the bee", ["the tree", "the book", "the desk"]),
  readingQuestion("I say hello.", "What do I say?", "hello", ["goodbye", "red", "jump"]),
];

function readingQuestion(sentence: string, question: string, answer: string, distractors: string[]): EnglishSeed {
  return {
    question: `${sentence} ${question}`,
    correctAnswer: answer,
    options: uniqueOptions(answer, distractors),
    explanation: `The sentence tells us the answer is ${answer}.`,
    learnBotTip: "Go back to the sentence and find the clue word.",
    voiceScript: `${sentence} The answer is ${answer}.`,
    visual: textVisual(sentence, answer),
    difficulty: "challenge",
  };
}

function challengeSeeds(): EnglishSeed[] {
  return [
    ...alphabetLetters.slice(0, 2).map(([lower, upper, distractors]) => alphabetSeed(lower, upper, [...distractors])),
    ...letterSoundItems.slice(0, 2).map(([word, sound, object, distractors]) => soundSeed(word, sound, object, distractors)),
    ...vocabularyItems.slice(0, 2).map(([object, word, distractors]) => vocabularySeed(object, word, distractors)),
    ...sentenceSeeds.slice(0, 2),
    ...grammarSeeds.slice(0, 2),
    ...readingSeeds.slice(0, 2),
  ].map((seed) => ({ ...seed, difficulty: "boss" }));
}

function alphabetSeed(lowercase: string, uppercase: string, distractors: string[]): EnglishSeed {
  return {
    question: `Which uppercase letter matches lowercase "${lowercase}"?`,
    correctAnswer: uppercase,
    options: uniqueOptions(uppercase, distractors),
    explanation: `Uppercase ${uppercase} and lowercase ${lowercase} are the same letter family.`,
    learnBotTip: "Look at the letter shape, then say the letter name.",
    voiceScript: `Lowercase ${lowercase} matches uppercase ${uppercase}.`,
    visual: textVisual(`${uppercase} matches ${lowercase}`, uppercase),
  };
}

function soundSeed(word: string, sound: string, object: VisualObjectName, distractors: string[]): EnglishSeed {
  return {
    question: `What beginning sound do you hear in "${word}"?`,
    correctAnswer: sound,
    options: uniqueOptions(sound, distractors),
    explanation: `${word} starts with the /${sound}/ sound.`,
    learnBotTip: "Say the word slowly and listen to the first sound.",
    voiceScript: `${word}. The first sound is ${sound}.`,
    visual: objectVisual(object, sound),
  };
}

function vocabularySeed(object: VisualObjectName, word: string, distractors: string[]): EnglishSeed {
  return {
    question: "Which word names the picture?",
    correctAnswer: word,
    options: uniqueOptions(word, distractors),
    explanation: `The picture shows ${word}.`,
    learnBotTip: "Look at the picture first, then match the word.",
    voiceScript: `The picture shows ${word}.`,
    visual: objectVisual(object, word),
  };
}

export const englishLevels: MvpLevel[] = [
  buildLevel(
    1,
    "Recognise uppercase and lowercase letters, then match letter families.",
    alphabetLetters.map(([lower, upper, distractors]) => alphabetSeed(lower, upper, [...distractors])),
  ),
  buildLevel(
    2,
    "Listen for the first sound in familiar words.",
    letterSoundItems.map(([word, sound, object, distractors]) => soundSeed(word, sound, object, distractors)),
  ),
  buildLevel(
    3,
    "Match simple English words to familiar Forest World pictures.",
    vocabularyItems.map(([object, word, distractors]) => vocabularySeed(object, word, distractors)),
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
    "Notice simple grammar patterns: naming words, action words, plurals, and sentence rules.",
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
