import forestConfigJson from "../content/math/forest-world/forest-world-config.json";
import level1 from "../content/math/forest-world/level-1.json";
import level2 from "../content/math/forest-world/level-2.json";
import level3 from "../content/math/forest-world/level-3.json";
import level4 from "../content/math/forest-world/level-4.json";
import level5 from "../content/math/forest-world/level-5.json";
import level6 from "../content/math/forest-world/level-6.json";
import level7 from "../content/math/forest-world/level-7.json";
import level8 from "../content/math/forest-world/level-8.json";
import level9 from "../content/math/forest-world/level-9.json";
import level10 from "../content/math/forest-world/level-10.json";

export type VisualLearningType =
  | "counting"
  | "addition"
  | "subtraction"
  | "comparison"
  | "none";

export type VisualObjectName =
  | "apple"
  | "star"
  | "bird"
  | "ball"
  | "flower"
  | "duck"
  | "orange"
  | "leaf"
  | "shell"
  | "pencil"
  | "coin"
  | "tree"
  | "berry"
  | "nut"
  | "butterfly"
  | "crayon"
  | "sticker"
  | "fish"
  | "marble"
  | "rabbit"
  | "gem"
  | "badge"
  | "firefly"
  | "box"
  | "balloon"
  | "stone"
  | "number"
  | "object";

export type VisualLearningModel = {
  type: VisualLearningType;
  object: VisualObjectName;
  groups: number[];
  equation?: string;
  answerVisual?: string;
  accessibleLabel: string;
};

export type MvpQuestion = {
  id: string;
  level: number;
  nodeType: string;
  topic: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
  steps?: string[];
  visualPrompt?: string | string[];
  visualExplanation?: string;
  voiceScript?: string;
  learnBotTip?: string;
  levelId?: string;
  worldId?: string;
  visual?: VisualLearningModel;
};

export type QuestionLearningContent = {
  steps: string[];
  visualExplanation: string;
  voiceScript: string;
  learnBotTip: string;
  levelId: string;
  worldId: string;
  visual: VisualLearningModel;
};

const visualObjectMatchers: Array<{
  object: VisualObjectName;
  pattern: RegExp;
}> = [
  { object: "apple", pattern: /\bapples?\b/i },
  { object: "star", pattern: /\bstars?\b/i },
  { object: "bird", pattern: /\bbirds?\b/i },
  { object: "balloon", pattern: /\bballoons?\b/i },
  { object: "ball", pattern: /\bballs?\b/i },
  { object: "flower", pattern: /\bflowers?\b/i },
  { object: "duck", pattern: /\bducks?\b/i },
  { object: "orange", pattern: /\boranges?\b/i },
  { object: "leaf", pattern: /\b(?:leaf|leaves)\b/i },
  { object: "shell", pattern: /\bshells?\b/i },
  { object: "pencil", pattern: /\bpencils?\b/i },
  { object: "coin", pattern: /\bcoins?\b/i },
  { object: "tree", pattern: /\btrees?\b/i },
  { object: "berry", pattern: /\bberries?\b/i },
  { object: "nut", pattern: /\bnuts?\b/i },
  { object: "butterfly", pattern: /\bbutterfl(?:y|ies)\b/i },
  { object: "crayon", pattern: /\bcrayons?\b/i },
  { object: "sticker", pattern: /\bstickers?\b/i },
  { object: "fish", pattern: /\bfish\b/i },
  { object: "marble", pattern: /\bmarbles?\b/i },
  { object: "rabbit", pattern: /\brabbits?\b/i },
  { object: "gem", pattern: /\bgems?\b/i },
  { object: "badge", pattern: /\bbadges?\b/i },
  { object: "firefly", pattern: /\bfirefl(?:y|ies)\b/i },
  { object: "box", pattern: /\bboxes?\b/i },
  { object: "stone", pattern: /\bstones?\b/i },
];

function findVisualObject(text: string): VisualObjectName {
  const matches = visualObjectMatchers
    .filter((item) => item.pattern.test(text))
    .map((item) => item.object);
  const unique = [...new Set(matches)];

  if (unique.length === 1) return unique[0];
  if (unique.length > 1) return "object";
  return "number";
}

function getNumbers(text: string): number[] {
  return (text.match(/\d+/g) ?? []).map(Number).filter(Number.isFinite);
}

function inferQuestionVisual(question: MvpQuestion): VisualLearningModel {
  const combinedText = `${question.question} ${question.explanation}`;
  const object = findVisualObject(combinedText);
  const addition = question.explanation.match(
    /(\d+)\s*\+\s*(\d+)(?:\s*\+\s*(\d+))?\s*=\s*(\d+)/,
  );
  const subtraction = question.explanation.match(/(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/);
  const isComparison = /\b(?:more|fewer|bigger|smaller)\b/i.test(combinedText);

  if (addition) {
    const groups = [Number(addition[1]), Number(addition[2])];
    if (addition[3]) groups.push(Number(addition[3]));
    return {
      type: "addition",
      object,
      groups,
      equation: addition[0],
      answerVisual: question.correctAnswer,
      accessibleLabel: `${groups.join(" plus ")} equals ${question.correctAnswer}`,
    };
  }

  if (subtraction) {
    const groups = [Number(subtraction[1]), Number(subtraction[2])];
    return {
      type: "subtraction",
      object,
      groups,
      equation: subtraction[0],
      answerVisual: question.correctAnswer,
      accessibleLabel: `${groups[0]} take away ${groups[1]} equals ${question.correctAnswer}`,
    };
  }

  if (isComparison) {
    const groups = getNumbers(question.question).slice(0, 2);
    return {
      type: "comparison",
      object,
      groups,
      equation: groups.length === 2 ? `${groups[0]} or ${groups[1]}` : undefined,
      answerVisual: question.correctAnswer,
      accessibleLabel: `Compare ${groups.join(" and ")}. The answer is ${question.correctAnswer}`,
    };
  }

  const numericAnswer = Number(question.correctAnswer.match(/\d+/)?.[0]);
  if (object !== "number" && Number.isFinite(numericAnswer)) {
    return {
      type: "counting",
      object,
      groups: [numericAnswer],
      answerVisual: question.correctAnswer,
      accessibleLabel: `Count ${numericAnswer} visual objects`,
    };
  }

  const sequence = question.question.match(
    /(?:missing[^:]*:|count forward:|count backward:|count by 2:)\s*([^?]+)/i,
  );
  const after = question.question.match(/comes after (\d+)/i);
  const before = question.question.match(/comes before (\d+)/i);
  const word = question.question.match(/word\s+([a-z]+)/i);
  const matchedNumber = question.question.match(/word matches the number\s+(\d+)/i);
  const equation = sequence?.[1]?.trim()
    ?? (after ? `${after[1]} -> ?` : undefined)
    ?? (before ? `? -> ${before[1]}` : undefined)
    ?? (word ? `${word[1]} = ?` : undefined)
    ?? (matchedNumber ? `${matchedNumber[1]} = ?` : undefined);

  return {
    type: "none",
    object: "number",
    groups: [],
    equation,
    answerVisual: question.correctAnswer,
    accessibleLabel: equation
      ? `${equation}. The answer is ${question.correctAnswer}`
      : `The answer is ${question.correctAnswer}`,
  };
}

function prepareQuestions(questions: MvpQuestion[], level: number): MvpQuestion[] {
  return questions.map((question) => ({
    ...question,
    levelId: question.levelId ?? `forest-level-${level}`,
    worldId: question.worldId ?? "forest-world",
    visual: question.visual ?? inferQuestionVisual(question),
  }));
}

export function getQuestionLearningContent(question: MvpQuestion): QuestionLearningContent {
  const visualPrompt = Array.isArray(question.visualPrompt)
    ? question.visualPrompt.join(" ")
    : question.visualPrompt;

  return {
    visual: question.visual ?? inferQuestionVisual(question),
    steps:
      question.steps && question.steps.length > 0
        ? question.steps
        : [
            "Read the question slowly and find the important numbers or clues.",
            "Check each answer choice and solve one small step at a time.",
            question.explanation,
          ],
    visualExplanation:
      question.visualExplanation ??
      visualPrompt ??
      `Picture the numbers or objects in the question. ${question.explanation}`,
    voiceScript:
      question.voiceScript ??
      `${question.question} The correct answer is ${question.correctAnswer}. ${question.explanation}`,
    learnBotTip:
      question.learnBotTip ??
      `Take your time and use the clue in the question. ${question.explanation}`,
    levelId: question.levelId ?? `forest-level-${question.level}`,
    worldId: question.worldId ?? "forest-world",
  };
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
    questions: prepareQuestions(level1 as MvpQuestion[], 1),
  },
  {
    level: 2,
    nodeType: "Practice",
    title: "Counting Objects",
    description: "Practice counting everyday objects and comparing groups.",
    questions: prepareQuestions(level2 as MvpQuestion[], 2),
  },
  {
    level: 3,
    nodeType: "Mini Game",
    title: "Number Matching",
    description: "Match numbers, words, and small groups in a quick game.",
    questions: prepareQuestions(level3 as MvpQuestion[], 3),
  },
  {
    level: 4,
    nodeType: "Learn",
    title: "Simple Addition",
    description: "Learn how adding puts groups together.",
    questions: prepareQuestions(level4 as MvpQuestion[], 4),
  },
  {
    level: 5,
    nodeType: "Practice",
    title: "Addition Practice",
    description: "Use addition in small story problems.",
    questions: prepareQuestions(level5 as MvpQuestion[], 5),
  },
  {
    level: 6,
    nodeType: "Mini Game",
    title: "Addition Mini Game",
    description: "Collect rewards while solving addition missions.",
    questions: prepareQuestions(level6 as MvpQuestion[], 6),
  },
  {
    level: 7,
    nodeType: "Learn",
    title: "Simple Subtraction",
    description: "Learn how subtraction shows what is left.",
    questions: prepareQuestions(level7 as MvpQuestion[], 7),
  },
  {
    level: 8,
    nodeType: "Review",
    title: "Review Numbers and Operations",
    description: "Review numbers, addition, and subtraction.",
    questions: prepareQuestions(level8 as MvpQuestion[], 8),
  },
  {
    level: 9,
    nodeType: "Challenge",
    title: "Mixed Challenge",
    description: "Solve mixed number, addition, and subtraction challenges.",
    questions: prepareQuestions(level9 as MvpQuestion[], 9),
  },
  {
    level: 10,
    nodeType: "Boss",
    title: "Forest Guardian Boss Quiz",
    description: "Complete the Forest Guardian boss quiz and earn a badge.",
    questions: prepareQuestions(level10 as MvpQuestion[], 10),
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