import forestConfigJson from "../content/math/forest-world/forest-world-config.json";
import { getApprovedForestQuestionsForLevel } from "@/lib/curriculum/active-content";
import { objectVisualMap, type VisualObjectName } from "@/data/object-visual-map";
import { forestWorldIdentity } from "@/data/forest-world-identity";

export type { VisualObjectName } from "@/data/object-visual-map";

export type VisualLearningType = "counting" | "addition" | "subtraction" | "comparison" | "matching" | "none";
export type VisualSceneContext = "basket" | "branch" | "forest" | "box" | "bag" | "path" | "water" | "none";
export type VisualLearningModel = {
  type: VisualLearningType;
  object: VisualObjectName;
  objects?: VisualObjectName[];
  groups: number[];
  equation?: string;
  answerVisual?: string;
  comparisonSymbol?: ">" | "<";
  context: VisualSceneContext;
  accessibleLabel: string;
};

export type MvpQuestion = {
  id: string; level: number; nodeType: string; topic: string; difficulty: string;
  question: string; options: string[]; correctAnswer: string; explanation: string; xpReward: number;
  steps?: string[]; visualPrompt?: string | string[]; visualExplanation?: string;
  voiceScript?: string; learnBotTip?: string; levelId?: string; worldId?: string;
  visual?: VisualLearningModel;
};

export type QuestionLearningContent = {
  hint: string; steps: string[]; visualExplanation: string; voiceScript: string;
  learnBotTip: string; levelId: string; worldId: string; visual: VisualLearningModel;
};

const visualObjectMatchers: Array<{ object: VisualObjectName; pattern: RegExp }> = [
  { object: "apple", pattern: /\bapples?\b/i }, { object: "orange", pattern: /\boranges?\b/i },
  { object: "star", pattern: /\bstars?\b/i }, { object: "bird", pattern: /\bbirds?\b/i },
  { object: "balloon", pattern: /\bballoons?\b/i }, { object: "ball", pattern: /\bballs?\b/i },
  { object: "flower", pattern: /\bflowers?\b/i }, { object: "duck", pattern: /\bducks?\b/i },
  { object: "leaf", pattern: /\b(?:leaf|leaves)\b/i }, { object: "shell", pattern: /\bshells?\b/i },
  { object: "pencil", pattern: /\bpencils?\b/i }, { object: "coin", pattern: /\bcoins?\b/i },
  { object: "tree", pattern: /\btrees?\b/i }, { object: "berry", pattern: /\bberries?\b/i },
  { object: "nut", pattern: /\bnuts?\b/i }, { object: "butterfly", pattern: /\bbutterfl(?:y|ies)\b/i },
  { object: "crayon", pattern: /\bcrayons?\b/i }, { object: "sticker", pattern: /\bstickers?\b/i },
  { object: "fish", pattern: /\bfish\b/i }, { object: "marble", pattern: /\bmarbles?\b/i },
  { object: "rabbit", pattern: /\brabbits?\b/i }, { object: "gem", pattern: /\bgems?\b/i },
  { object: "badge", pattern: /\bbadges?\b/i }, { object: "firefly", pattern: /\bfirefl(?:y|ies)\b/i },
  { object: "box", pattern: /\bboxes?\b/i }, { object: "stone", pattern: /\bstones?\b/i },
];

function findVisualObjects(text: string): VisualObjectName[] {
  const unique = [...new Set(visualObjectMatchers.filter((item) => item.pattern.test(text)).map((item) => item.object))];
  return unique.length > 1 && unique.includes("box") ? unique.filter((item) => item !== "box") : unique;
}
function getNumbers(text: string): number[] { return (text.match(/\d+/g) ?? []).map(Number).filter(Number.isFinite); }
function inferContext(text: string): VisualSceneContext {
  if (/\bbasket\b/i.test(text)) return "basket"; if (/\bbranch\b/i.test(text)) return "branch";
  if (/\b(?:box|chest)\b/i.test(text)) return "box"; if (/\bbag\b/i.test(text)) return "bag";
  if (/\bpath\b/i.test(text)) return "path"; if (/\b(?:fish|shells?|water)\b/i.test(text)) return "water";
  if (/\bforest\b/i.test(text)) return "forest"; return "none";
}

function inferQuestionVisual(question: MvpQuestion): VisualLearningModel {
  const text = `${question.question} ${question.explanation}`;
  const detectedObjects = findVisualObjects(text);
  const object = detectedObjects.length === 1 ? detectedObjects[0] : detectedObjects.length > 1 ? "object" : "number";
  const context = inferContext(text);
  const answerNumber = Number(question.correctAnswer.match(/\d+/)?.[0]);
  const questionNumbers = getNumbers(question.question);
  const explicitAddition = text.match(/(\d+)\s*\+\s*(\d+)(?:\s*\+\s*(\d+))?\s*=\s*(\d+)/);
  const explicitSubtraction = text.match(/(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/);
  const comparison = /\bwhich\b[^?]*\b(?:more|fewer|bigger|smaller)\b/i.test(question.question);
  const matching = /\bmatch(?:es|ing)?\b/i.test(question.question);
  const asksStart = /\bat the start\b/i.test(question.question);
  const subtractionStory = /\b(?:take away|left|remain|eaten|fly away|spent|picked|pop|falls away)\b/i.test(question.question);
  const additionStory = /\b(?:more|added|add|plus|altogether|total|finds|gets|land|then)\b/i.test(question.question);

  if (explicitAddition) {
    const groups = [Number(explicitAddition[1]), Number(explicitAddition[2])];
    if (explicitAddition[3]) groups.push(Number(explicitAddition[3]));
    return { type: "addition", object, objects: groups.map((_, index) => detectedObjects[index] ?? detectedObjects[0] ?? object), groups, equation: explicitAddition[0], answerVisual: question.correctAnswer, context, accessibleLabel: `${groups.join(" plus ")} equals ${question.correctAnswer}` };
  }
  if (explicitSubtraction) {
    const groups = [Number(explicitSubtraction[1]), Number(explicitSubtraction[2])];
    return { type: "subtraction", object, objects: groups.map((_, index) => detectedObjects[index] ?? detectedObjects[0] ?? object), groups, equation: explicitSubtraction[0], answerVisual: question.correctAnswer, context, accessibleLabel: `${groups[0]} take away ${groups[1]} equals ${question.correctAnswer}` };
  }
  if (comparison) {
    const groups = questionNumbers.slice(0, 2); const symbol = groups.length === 2 ? (groups[0] > groups[1] ? ">" : "<") : undefined;
    return { type: "comparison", object, objects: groups.map(() => detectedObjects[0] ?? object), groups, comparisonSymbol: symbol, equation: symbol ? `${groups[0]} ${symbol} ${groups[1]}` : undefined, answerVisual: question.correctAnswer, context, accessibleLabel: `Compare ${groups.join(" and ")}. The answer is ${question.correctAnswer}` };
  }
  if (matching) {
    const count = object !== "number" ? answerNumber : (questionNumbers[0] ?? answerNumber);
    return { type: "matching", object, objects: [detectedObjects[0] ?? object], groups: Number.isFinite(count) ? [count] : [], answerVisual: question.correctAnswer, context, accessibleLabel: `Match the visual amount to ${question.correctAnswer}` };
  }
  if (asksStart && object !== "number" && Number.isFinite(answerNumber)) {
    return { type: "counting", object, objects: [detectedObjects[0] ?? object], groups: [answerNumber], answerVisual: question.correctAnswer, context, accessibleLabel: `Count ${answerNumber} ${objectVisualMap[object].plural} at the start` };
  }
  if (subtractionStory && questionNumbers.length >= 2) {
    const groups = questionNumbers.slice(0, 2); return { type: "subtraction", object, objects: groups.map((_, index) => detectedObjects[index] ?? detectedObjects[0] ?? object), groups, equation: `${groups[0]} - ${groups[1]} = ${question.correctAnswer}`, answerVisual: question.correctAnswer, context, accessibleLabel: `${groups[0]} take away ${groups[1]} equals ${question.correctAnswer}` };
  }
  if (additionStory && questionNumbers.length >= 2) {
    const groups = questionNumbers.slice(0, 3); return { type: "addition", object, objects: groups.map((_, index) => detectedObjects[index] ?? detectedObjects[0] ?? object), groups, equation: `${groups.join(" + ")} = ${question.correctAnswer}`, answerVisual: question.correctAnswer, context, accessibleLabel: `${groups.join(" plus ")} equals ${question.correctAnswer}` };
  }
  if (object !== "number" && Number.isFinite(answerNumber)) {
    return { type: "counting", object, objects: [detectedObjects[0] ?? object], groups: [answerNumber], answerVisual: question.correctAnswer, context, accessibleLabel: `Count ${answerNumber} ${objectVisualMap[object].plural}` };
  }
  const sequence = question.question.match(/(?:missing[^:]*:|count forward:|count backward:|count by 2:)\s*([^?]+)/i);
  const after = question.question.match(/comes after (\d+)/i); const before = question.question.match(/comes before (\d+)/i);
  const equation = sequence?.[1]?.trim() ?? (after ? `${after[1]} -> ?` : undefined) ?? (before ? `? -> ${before[1]}` : undefined);
  return { type: "none", object: "number", groups: [], equation, answerVisual: question.correctAnswer, context: "none", accessibleLabel: equation ? `${equation}. The answer is ${question.correctAnswer}` : `The answer is ${question.correctAnswer}` };
}

function prepareQuestions(questions: MvpQuestion[], level: number): MvpQuestion[] {
  return questions.map((question) => ({
    ...question,
    levelId: question.levelId ?? `forest-level-${level}`,
    worldId: question.worldId ?? forestWorldIdentity.worldId,
    visual: question.visual ?? inferQuestionVisual(question),
  }));
}

export function getQuestionLearningContent(question: MvpQuestion): QuestionLearningContent {
  const visual = question.visual ?? inferQuestionVisual(question);
  const label = objectVisualMap[visual.object].plural;
  const [first = 0, second = 0] = visual.groups;
  const generated = buildTutorContent(visual, label, first, second, question.correctAnswer, question.explanation);
  return {
    visual,
    hint: generated.hint,
    steps: question.steps?.length ? question.steps : generated.steps,
    visualExplanation: question.visualExplanation ?? generated.visualExplanation,
    voiceScript: question.voiceScript ?? `${question.question} ${generated.voiceScript}`,
    learnBotTip: question.learnBotTip ?? generated.tip,
    levelId: question.levelId ?? `forest-level-${question.level}`,
    worldId: question.worldId ?? forestWorldIdentity.worldId,
  };
}

function buildTutorContent(visual: VisualLearningModel, label: string, first: number, second: number, answer: string, explanation: string) {
  switch (visual.type) {
    case "counting": return { hint: `Point to each ${label.replace(/s$/, "")} once while counting.`, steps: [`Understand: the question asks how many ${label} are shown.`, `Count each ${label.replace(/s$/, "")} once from 1 to ${first}.`, `Match the final count, ${answer}, to the answer choices.`], visualExplanation: `The visual shows exactly ${first} ${label}. Counting every object gives ${answer}.`, voiceScript: `Point to each object and count slowly. The last number you say is ${answer}.`, tip: "Move from left to right and touch each object only once." };
    case "addition": return { hint: `Start with ${first}, then count on ${second} more.`, steps: [`Understand: addition joins the ${label} into one larger group.`, `Count ${first} first, then add ${second} more ${label}.`, `The groups make ${visual.equation ?? answer}. Choose ${answer}.`], visualExplanation: `${first} ${label} plus ${second} ${label} makes ${answer} altogether.`, voiceScript: `Addition means joining groups. Start at ${first} and count on ${second} more to reach ${answer}.`, tip: "For addition, keep the first number in your head and count forward." };
    case "subtraction": return { hint: `Start with ${first}. Cross out ${second} and count what remains.`, steps: [`Understand: subtraction starts with ${first} ${label}.`, `Take away or cross out ${second} ${label}.`, `Count the objects that are not crossed out. ${visual.equation ?? explanation}`], visualExplanation: `Begin with ${first}, remove ${second}, and ${answer} remain.`, voiceScript: `Subtraction means taking away. Cross out ${second} from ${first}, then count ${answer} left.`, tip: "Cross out the removed objects first, then count only the objects that remain." };
    case "comparison": return { hint: "Count both groups before deciding which is more or less.", steps: [`Understand: the question compares two groups of ${label}.`, `Count the first group and then the second group.`, `Compare the totals. The matching answer is ${answer}.`], visualExplanation: `The two groups are shown side by side so their sizes are easy to compare.`, voiceScript: `Count both groups. The group with the larger count has more, and the smaller count has fewer.`, tip: "Line groups up side by side. Extra objects show which group has more." };
    case "matching": return { hint: `Count the ${label}, then find the number or word with the same value.`, steps: [`Understand: the visual amount must match one answer choice.`, `Count the ${label} carefully.`, `Choose the number or word that represents ${answer}.`], visualExplanation: `The displayed group matches ${answer}.`, voiceScript: `Count the visual group and match that amount to ${answer}.`, tip: "A number, number word, and object group can all represent the same amount." };
    default: return { hint: "Look for the number pattern or operation clue.", steps: ["Understand what the number question is asking.", "Follow the numbers in order and identify the pattern.", `Match your result to ${answer}. ${explanation}`], visualExplanation: explanation, voiceScript: `Follow the number clue one step at a time. The answer is ${answer}.`, tip: "Say the number pattern aloud. Hearing the order can make the missing number easier to find." };
  }
}

export type MvpLevel = {
  level: number;
  nodeType: string;
  title: string;
  description: string;
  questions: MvpQuestion[];
};

export type MvpSubject = {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
  description: string;
};

export const forestWorldConfig = forestConfigJson;

export const mvpSubjects: MvpSubject[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    icon: "123",
    enabled: true,
    description: "Play the Free Math Starter World: Forest World with 10 guided levels and 100 questions.",
  },
  {
    id: "english",
    title: "English",
    icon: "ABC",
    enabled: false,
    description: "Reading, spelling, and word games can be added after the math starter world is stable.",
  },
  {
    id: "science",
    title: "Science",
    icon: "SCI",
    enabled: false,
    description: "Discovery questions and experiments can be added in a later content pack.",
  },
  {
    id: "bahasa-melayu",
    title: "Bahasa Melayu",
    icon: "BM",
    enabled: false,
    description: "Vocabulary and sentence practice can be added in a later content pack.",
  },
  {
    id: "life-skills",
    title: "Life Skills",
    icon: "LIFE",
    enabled: false,
    description: "Safety, emotions, habits, and money skills can be added in a later content pack.",
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    icon: "GK",
    enabled: false,
    description: "Fun mixed knowledge quizzes can be added after the core starter world.",
  },
];

export const forestLevels: MvpLevel[] = [
  {
    level: 1,
    nodeType: "Learn",
    title: "Numbers 1-10",
    description: "Meet numbers, count forward, and learn first number patterns.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(1) as MvpQuestion[], 1),
  },
  {
    level: 2,
    nodeType: "Practice",
    title: "Counting Objects",
    description: "Practice counting everyday objects and comparing groups.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(2) as MvpQuestion[], 2),
  },
  {
    level: 3,
    nodeType: "Mini Game",
    title: "Number Matching",
    description: "Match numbers, words, and small groups in a quick game.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(3) as MvpQuestion[], 3),
  },
  {
    level: 4,
    nodeType: "Learn",
    title: "Simple Addition",
    description: "Learn how adding puts groups together.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(4) as MvpQuestion[], 4),
  },
  {
    level: 5,
    nodeType: "Practice",
    title: "Addition Practice",
    description: "Use addition in small story problems.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(5) as MvpQuestion[], 5),
  },
  {
    level: 6,
    nodeType: "Mini Game",
    title: "Addition Mini Game",
    description: "Collect rewards while solving addition missions.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(6) as MvpQuestion[], 6),
  },
  {
    level: 7,
    nodeType: "Learn",
    title: "Simple Subtraction",
    description: "Learn how subtraction shows what is left.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(7) as MvpQuestion[], 7),
  },
  {
    level: 8,
    nodeType: "Review",
    title: "Review Numbers and Operations",
    description: "Review numbers, addition, and subtraction.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(8) as MvpQuestion[], 8),
  },
  {
    level: 9,
    nodeType: "Challenge",
    title: "Mixed Challenge",
    description: "Solve mixed number, addition, and subtraction challenges.",
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(9) as MvpQuestion[], 9),
  },
  {
    level: 10,
    nodeType: "Boss",
    title: `${forestWorldIdentity.bossName} Boss Quiz`,
    description: `Complete the ${forestWorldIdentity.bossName} boss quiz and earn the ${forestWorldIdentity.completionBadge}.`,
    questions: prepareQuestions(getApprovedForestQuestionsForLevel(10) as MvpQuestion[], 10),
  },
];

export function getForestLevel(level: number) {
  return forestLevels.find((item) => item.level === level);
}

export function getMasteryLabel(accuracy: number) {
  if (accuracy >= 96) return "Master";
  if (accuracy >= 81) return "Advanced";
  if (accuracy >= 61) return "Proficient";
  if (accuracy >= 41) return "Progressing";
  if (accuracy >= 21) return "Developing";
  return "Beginner";
}

export function getLevelBonusXp(level: number) {
  return level === 10 ? 250 : 100;
}