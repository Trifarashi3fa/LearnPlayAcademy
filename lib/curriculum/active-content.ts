import activeContentManifestJson from "@/generated/active-content-manifest.json";
import { objectVisualMap, type VisualObjectName } from "@/data/object-visual-map";

type ApprovedVisualMetadata = {
  visualType: "counting" | "addition" | "subtraction" | "comparison" | "matching" | "number-sequence" | "number-matching" | "none";
  object: string;
  objects: string[];
  groups: number[];
  total: number | null;
  operation: string;
  equation: string | null;
  startingAmount: number | null;
  removedAmount: number | null;
  context: string;
  assetHint: string;
  reviewStatus: "ready" | "needs-review";
};

type ApprovedQuestion = {
  questionId: string;
  legacyId: string;
  curriculumTopicId: string;
  subject: string;
  year: number;
  topic: string;
  subtopic: string;
  worldId: string;
  level: number;
  nodeType: string;
  status: string;
  approvedBy: string | null;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
  visualMetadata: ApprovedVisualMetadata;
};

type ApprovedManifest = {
  subject: string;
  year: number;
  worldId: string;
  questionCount: number;
  levels: Array<{ level: number; nodeType: string; questionCount: number; questionIds: string[] }>;
  questionsByLevel: Record<string, ApprovedQuestion[]>;
  validationSummary: { status: string; approvedQuestionCount: number; errors: number };
};

export type ApprovedRuntimeVisual = {
  type: "counting" | "addition" | "subtraction" | "comparison" | "matching" | "none";
  object: VisualObjectName;
  objects?: VisualObjectName[];
  groups: number[];
  equation?: string;
  answerVisual?: string;
  comparisonSymbol?: ">" | "<";
  context: "basket" | "branch" | "forest" | "box" | "bag" | "path" | "water" | "none";
  accessibleLabel: string;
};

export type ApprovedRuntimeQuestion = {
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
  levelId: string;
  worldId: string;
  visual: ApprovedRuntimeVisual;
};

// This generated manifest is the only active question source. Edit governed
// records under content/question-bank/, then run npm run validate:curriculum.
// Never edit generated/active-content-manifest.json manually.
const manifest = activeContentManifestJson as unknown as ApprovedManifest;

if (
  manifest.validationSummary.status !== "passed" ||
  manifest.validationSummary.errors !== 0 ||
  manifest.subject !== "mathematics" ||
  manifest.year !== 1 ||
  manifest.worldId !== "forest-world" ||
  manifest.questionCount !== 100
) {
  throw new Error("The approved Forest World content manifest is invalid or outside the active MVP scope.");
}

function visualObject(value: string): VisualObjectName {
  return value in objectVisualMap ? (value as VisualObjectName) : "number";
}

function visualContext(value: string): ApprovedRuntimeVisual["context"] {
  const allowed = new Set(["basket", "branch", "forest", "box", "bag", "path", "water", "none"]);
  return allowed.has(value) ? (value as ApprovedRuntimeVisual["context"]) : "none";
}

function visualType(value: ApprovedVisualMetadata["visualType"]): ApprovedRuntimeVisual["type"] {
  if (value === "number-sequence" || value === "none") return "none";
  if (value === "number-matching") return "matching";
  return value;
}

function comparisonSymbol(equation: string | null) {
  if (equation?.includes(">")) return ">" as const;
  if (equation?.includes("<")) return "<" as const;
  return undefined;
}

function adaptQuestion(question: ApprovedQuestion): ApprovedRuntimeQuestion {
  const metadata = question.visualMetadata;
  const object = visualObject(metadata.object);
  const objects = metadata.objects.map(visualObject);
  return {
    // Preserve legacy IDs so React keys and existing level behavior remain stable.
    id: question.legacyId || question.questionId,
    level: question.level,
    nodeType: question.nodeType,
    topic: question.topic,
    difficulty: question.difficulty,
    question: question.question,
    options: [...question.options],
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    xpReward: question.xpReward,
    levelId: `forest-level-${question.level}`,
    worldId: question.worldId,
    visual: {
      type: visualType(metadata.visualType),
      object,
      objects: objects.length > 0 ? objects : [object],
      groups: [...metadata.groups],
      equation: metadata.equation ?? undefined,
      answerVisual: question.correctAnswer,
      comparisonSymbol: comparisonSymbol(metadata.equation),
      context: visualContext(metadata.context),
      accessibleLabel: metadata.assetHint || `${question.topic}: ${question.question}`,
    },
  };
}

export function getApprovedForestQuestionsForLevel(level: number): ApprovedRuntimeQuestion[] {
  const questions = manifest.questionsByLevel[String(level)];
  if (!questions || questions.length !== 10) {
    throw new Error(`Approved Forest World level ${level} must contain exactly 10 questions.`);
  }
  return questions.map(adaptQuestion);
}

export const approvedForestContentSummary = {
  subject: manifest.subject,
  year: manifest.year,
  worldId: manifest.worldId,
  questionCount: manifest.questionCount,
  levelCount: manifest.levels.length,
} as const;