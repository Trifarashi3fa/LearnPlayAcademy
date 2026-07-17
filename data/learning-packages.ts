import type { NodeType, PackageType, SubjectId } from "@/data/curriculum-types";
import { getSubjectRegistryEntry } from "@/data/subject-registry";

export const STANDARD_FOREST_WORLD_ID = "forest-world";
export const STANDARD_FOREST_LEVEL_COUNT = 10;
export const STANDARD_FOREST_NODE_SEQUENCE = [
  "Learn",
  "Practice",
  "Mini Game",
  "Learn",
  "Practice",
  "Mini Game",
  "Learn",
  "Review",
  "Challenge",
  "Boss",
] as const satisfies readonly NodeType[];

export type LearningPackageStatus = "active" | "coming-soon" | "inactive";
export type LearningPackageAccess = "free" | "premium";
export type LearningPackageDifficulty = "easy" | "medium" | "challenge" | "boss";
export type LearningPackageAssessmentRole = "foundation" | "practice" | "mini-game" | "review" | "challenge" | "boss";
export type LearningPackageContentSource =
  | { kind: "approved-manifest"; path: string; activeQuestionCount: number }
  | { kind: "planned"; description: string; recommendedQuestionCount: number; activeQuestionCount: number };
export type LearningPackageLevelSource =
  | { kind: "runtime-adapter"; module: string; exportName: string }
  | { kind: "planned"; description: string };

export type LearningPackageLevelMetadata = {
  level: number;
  nodeType: NodeType;
  title: string;
  topic: string;
  description: string;
  learningObjective: string;
  difficulty: LearningPackageDifficulty;
  activeQuestionCount: number;
  unlockRule: {
    type: "start" | "complete-previous-level";
    requiresLevel: number | null;
  };
  reward: {
    completionXp: number;
    starsAvailable: number;
    badgeName: string;
  };
  assessmentRole: LearningPackageAssessmentRole;
  assetRefs: {
    worldImage: string;
    icon: string;
    badgeImage: string | null;
  };
  questionSource:
    | { kind: "approved-manifest-level"; level: number; questionCount: number }
    | { kind: "planned"; description: string; recommendedQuestionCount: number; activeQuestionCount: number };
};

export type LearningPackage = {
  packageId: string;
  subject: SubjectId;
  subjectName: string;
  year: number;
  worldId: string;
  worldName: string;
  totalLevels: number;
  routeBase: string;
  access: LearningPackageAccess;
  packageType: PackageType;
  status: LearningPackageStatus;
  availabilityStatus: "available" | "coming-soon";
  standardizedForestWorld: boolean;
  badge: {
    completionBadge: string;
    levelBadgePrefix: string;
  };
  reward: {
    completionXp: number;
    worldCompletionXp: number;
  };
  levelMetadata: LearningPackageLevelMetadata[];
  levelMetadataSource: LearningPackageLevelSource;
  questionContentSource: LearningPackageContentSource;
};

export type LearningPackageRef = Pick<LearningPackage, "subject" | "year" | "worldId">;

type BaseForestLevelInput = {
  subjectLabel: string;
  level: number;
  nodeType: NodeType;
  title: string;
  topic: string;
  description: string;
  learningObjective: string;
  difficulty: LearningPackageDifficulty;
  activeQuestionCount: number;
  assessmentRole: LearningPackageAssessmentRole;
  icon: string;
  questionSource: LearningPackageLevelMetadata["questionSource"];
};

function createForestLevel(input: BaseForestLevelInput): LearningPackageLevelMetadata {
  const requiresLevel = input.level === 1 ? null : input.level - 1;
  return {
    level: input.level,
    nodeType: input.nodeType,
    title: input.title,
    topic: input.topic,
    description: input.description,
    learningObjective: input.learningObjective,
    difficulty: input.difficulty,
    activeQuestionCount: input.activeQuestionCount,
    unlockRule: {
      type: input.level === 1 ? "start" : "complete-previous-level",
      requiresLevel,
    },
    reward: {
      completionXp: input.level === STANDARD_FOREST_LEVEL_COUNT ? 250 : 100,
      starsAvailable: 3,
      badgeName: input.level === STANDARD_FOREST_LEVEL_COUNT
        ? `${input.subjectLabel} Forest Completion Badge`
        : `${input.subjectLabel} Level ${input.level} Badge`,
    },
    assessmentRole: input.assessmentRole,
    assetRefs: {
      worldImage: "/worlds/level 1-forest-world.webp",
      icon: input.icon,
      badgeImage: null,
    },
    questionSource: input.questionSource,
  };
}

function approvedMathLevel(input: Omit<BaseForestLevelInput, "subjectLabel" | "activeQuestionCount" | "icon" | "questionSource">) {
  return createForestLevel({
    ...input,
    subjectLabel: "Mathematics",
    activeQuestionCount: 10,
    icon: "123",
    questionSource: { kind: "approved-manifest-level", level: input.level, questionCount: 10 },
  });
}

function plannedLevel(input: Omit<BaseForestLevelInput, "activeQuestionCount" | "questionSource"> & { recommendedQuestionCount?: number }) {
  return createForestLevel({
    ...input,
    activeQuestionCount: 0,
    questionSource: {
      kind: "planned",
      description: `${input.subjectLabel} Year 1 Forest World Level ${input.level} content is not active yet.`,
      recommendedQuestionCount: input.recommendedQuestionCount ?? 30,
      activeQuestionCount: 0,
    },
  });
}

export const mathematicsForestWorldPackage = {
  packageId: "mathematics-year-1-forest-world",
  subject: "mathematics",
  subjectName: "Mathematics",
  year: 1,
  worldId: STANDARD_FOREST_WORLD_ID,
  worldName: "Forest World",
  totalLevels: STANDARD_FOREST_LEVEL_COUNT,
  routeBase: "/mvp",
  access: "free",
  packageType: "mvp-free",
  status: "active",
  availabilityStatus: "available",
  standardizedForestWorld: true,
  badge: {
    completionBadge: "Forest Explorer Badge",
    levelBadgePrefix: "Level",
  },
  reward: {
    completionXp: 100,
    worldCompletionXp: 500,
  },
  levelMetadata: [
    approvedMathLevel({ level: 1, nodeType: "Learn", title: "Numbers 1-10", topic: "Numbers 1-10", description: "Meet numbers, count forward, and learn first number patterns.", learningObjective: "Recognise, count, and order numbers from 1 to 10.", difficulty: "easy", assessmentRole: "foundation" }),
    approvedMathLevel({ level: 2, nodeType: "Practice", title: "Counting Objects", topic: "Counting objects", description: "Practice counting everyday objects and comparing groups.", learningObjective: "Count object groups accurately and compare small quantities.", difficulty: "easy", assessmentRole: "practice" }),
    approvedMathLevel({ level: 3, nodeType: "Mini Game", title: "Number Matching", topic: "Number matching", description: "Match numbers, words, and small groups in a quick game.", learningObjective: "Connect numerals, number words, and visual quantities.", difficulty: "easy", assessmentRole: "mini-game" }),
    approvedMathLevel({ level: 4, nodeType: "Learn", title: "Simple Addition", topic: "Simple addition", description: "Learn how adding puts groups together.", learningObjective: "Model addition as joining groups.", difficulty: "easy", assessmentRole: "foundation" }),
    approvedMathLevel({ level: 5, nodeType: "Practice", title: "Addition Practice", topic: "Addition practice", description: "Use addition in small story problems.", learningObjective: "Solve simple addition stories with visual support.", difficulty: "medium", assessmentRole: "practice" }),
    approvedMathLevel({ level: 6, nodeType: "Mini Game", title: "Addition Mini Game", topic: "Addition fluency", description: "Collect rewards while solving addition missions.", learningObjective: "Strengthen addition fluency through short game-style practice.", difficulty: "medium", assessmentRole: "mini-game" }),
    approvedMathLevel({ level: 7, nodeType: "Learn", title: "Simple Subtraction", topic: "Simple subtraction", description: "Learn how subtraction shows what is left.", learningObjective: "Model subtraction as taking away and counting what remains.", difficulty: "medium", assessmentRole: "foundation" }),
    approvedMathLevel({ level: 8, nodeType: "Review", title: "Review Numbers and Operations", topic: "Numbers and operations review", description: "Review numbers, addition, and subtraction.", learningObjective: "Review number, addition, and subtraction skills together.", difficulty: "medium", assessmentRole: "review" }),
    approvedMathLevel({ level: 9, nodeType: "Challenge", title: "Mixed Challenge", topic: "Mixed challenge", description: "Solve mixed number, addition, and subtraction challenges.", learningObjective: "Apply Year 1 Forest World skills in mixed questions.", difficulty: "challenge", assessmentRole: "challenge" }),
    approvedMathLevel({ level: 10, nodeType: "Boss", title: "Forest Guardian Boss Quiz", topic: "Forest Guardian boss quiz", description: "Complete the Forest Guardian boss quiz and earn the Forest Explorer Badge.", learningObjective: "Demonstrate readiness across the full Mathematics Forest World.", difficulty: "boss", assessmentRole: "boss" }),
  ],
  levelMetadataSource: {
    kind: "runtime-adapter",
    module: "data/mvp-forest-world",
    exportName: "forestLevels",
  },
  questionContentSource: {
    kind: "approved-manifest",
    path: "generated/active-content-manifest.json",
    activeQuestionCount: 100,
  },
} as const satisfies LearningPackage;

export const englishForestWorldPackage = {
  packageId: "english-year-1-forest-world",
  subject: "english",
  subjectName: "English",
  year: 1,
  worldId: STANDARD_FOREST_WORLD_ID,
  worldName: "Forest World",
  totalLevels: STANDARD_FOREST_LEVEL_COUNT,
  routeBase: "/mvp/english",
  access: "free",
  packageType: "mvp-free",
  status: "coming-soon",
  availabilityStatus: "coming-soon",
  standardizedForestWorld: true,
  badge: {
    completionBadge: "English Forest Explorer Badge",
    levelBadgePrefix: "English Level",
  },
  reward: {
    completionXp: 100,
    worldCompletionXp: 500,
  },
  levelMetadata: [
    plannedLevel({ subjectLabel: "English", level: 1, nodeType: "Learn", title: "Uppercase and Lowercase Letters", topic: "Letter recognition", description: "Match big and small letters.", learningObjective: "Recognise and match uppercase and lowercase letters.", difficulty: "easy", assessmentRole: "foundation", icon: "ABC" }),
    plannedLevel({ subjectLabel: "English", level: 2, nodeType: "Practice", title: "Beginning Sounds", topic: "Phonics", description: "Listen for the first sound in familiar words.", learningObjective: "Identify beginning sounds in simple spoken words.", difficulty: "easy", assessmentRole: "practice", icon: "Aa" }),
    plannedLevel({ subjectLabel: "English", level: 3, nodeType: "Mini Game", title: "Match Words to Pictures", topic: "Picture vocabulary", description: "Match simple words with clear pictures.", learningObjective: "Connect familiar words to picture meanings.", difficulty: "easy", assessmentRole: "mini-game", icon: "PIC" }),
    plannedLevel({ subjectLabel: "English", level: 4, nodeType: "Learn", title: "Simple CVC Words", topic: "CVC words", description: "Read and complete short words like cat, sun, and pen.", learningObjective: "Blend and read simple consonant-vowel-consonant words.", difficulty: "medium", assessmentRole: "foundation", icon: "CVC" }),
    plannedLevel({ subjectLabel: "English", level: 5, nodeType: "Practice", title: "Vocabulary and Simple Sentences", topic: "Simple sentences", description: "Use picture clues to read simple words and sentences.", learningObjective: "Read short vocabulary phrases and simple sentences.", difficulty: "medium", assessmentRole: "practice", icon: "SEN" }),
    plannedLevel({ subjectLabel: "English", level: 6, nodeType: "Mini Game", title: "Word Families Mini Game", topic: "Word families", description: "Play with rhyming word families and short word patterns.", learningObjective: "Recognise simple word-family patterns.", difficulty: "medium", assessmentRole: "mini-game", icon: "RHY" }),
    plannedLevel({ subjectLabel: "English", level: 7, nodeType: "Learn", title: "Sight Words", topic: "Sight words", description: "Meet short common words used in early reading.", learningObjective: "Recognise high-frequency words in simple contexts.", difficulty: "medium", assessmentRole: "foundation", icon: "SEE" }),
    plannedLevel({ subjectLabel: "English", level: 8, nodeType: "Review", title: "Letters, Sounds, and Words Review", topic: "English review", description: "Review letters, sounds, words, and simple sentences.", learningObjective: "Review early reading skills across the English Forest World.", difficulty: "medium", assessmentRole: "review", icon: "REV" }),
    plannedLevel({ subjectLabel: "English", level: 9, nodeType: "Challenge", title: "Reading Challenge", topic: "Mixed reading challenge", description: "Use letter, sound, and word clues in mixed challenges.", learningObjective: "Apply early English reading skills in mixed questions.", difficulty: "challenge", assessmentRole: "challenge", icon: "CH" }),
    plannedLevel({ subjectLabel: "English", level: 10, nodeType: "Boss", title: "Forest Reader Boss Quiz", topic: "Forest Reader boss quiz", description: "Complete the Forest Reader challenge and earn the English Forest Explorer Badge.", learningObjective: "Demonstrate readiness across the full English Forest World.", difficulty: "boss", assessmentRole: "boss", icon: "BOSS" }),
  ],
  levelMetadataSource: {
    kind: "planned",
    description: "English levels are registered for the standardized 10-level Forest contract but are not connected to runtime routes.",
  },
  questionContentSource: {
    kind: "planned",
    description: "English questions will be imported after E2 and remain inactive until approved.",
    recommendedQuestionCount: 300,
    activeQuestionCount: 0,
  },
} as const satisfies LearningPackage;

export const scienceForestWorldPackage = {
  packageId: "science-year-1-forest-world",
  subject: "science",
  subjectName: "Science",
  year: 1,
  worldId: STANDARD_FOREST_WORLD_ID,
  worldName: "Forest World",
  totalLevels: STANDARD_FOREST_LEVEL_COUNT,
  routeBase: "/mvp/science",
  access: "free",
  packageType: "mvp-free",
  status: "coming-soon",
  availabilityStatus: "coming-soon",
  standardizedForestWorld: true,
  badge: {
    completionBadge: "Science Forest Explorer Badge",
    levelBadgePrefix: "Science Level",
  },
  reward: {
    completionXp: 100,
    worldCompletionXp: 500,
  },
  levelMetadata: [
    plannedLevel({ subjectLabel: "Science", level: 1, nodeType: "Learn", title: "Living and Non-Living Things", topic: "Living things", description: "Notice what is living and what is not living.", learningObjective: "Identify simple features of living and non-living things.", difficulty: "easy", assessmentRole: "foundation", icon: "SCI" }),
    plannedLevel({ subjectLabel: "Science", level: 2, nodeType: "Practice", title: "Animals Around Us", topic: "Animals", description: "Observe familiar animals and their basic needs.", learningObjective: "Recognise animals and simple animal needs.", difficulty: "easy", assessmentRole: "practice", icon: "ANI" }),
    plannedLevel({ subjectLabel: "Science", level: 3, nodeType: "Mini Game", title: "Animal Needs Mini Game", topic: "Animal needs", description: "Match animals with food, water, shelter, and care clues.", learningObjective: "Connect animals with basic needs through game-style practice.", difficulty: "easy", assessmentRole: "mini-game", icon: "NEED" }),
    plannedLevel({ subjectLabel: "Science", level: 4, nodeType: "Learn", title: "Plants Around Us", topic: "Plants", description: "Learn simple plant features and what plants need.", learningObjective: "Identify common plant parts and basic plant needs.", difficulty: "medium", assessmentRole: "foundation", icon: "PLANT" }),
    plannedLevel({ subjectLabel: "Science", level: 5, nodeType: "Practice", title: "Plant Parts Practice", topic: "Plant parts", description: "Practise naming leaves, stems, roots, flowers, and fruits.", learningObjective: "Match common plant parts to their names.", difficulty: "medium", assessmentRole: "practice", icon: "LEAF" }),
    plannedLevel({ subjectLabel: "Science", level: 6, nodeType: "Mini Game", title: "Five Senses Mini Game", topic: "Senses", description: "Use sight, hearing, smell, taste, and touch clues.", learningObjective: "Connect everyday observations with the five senses.", difficulty: "medium", assessmentRole: "mini-game", icon: "5" }),
    plannedLevel({ subjectLabel: "Science", level: 7, nodeType: "Learn", title: "Materials and Objects", topic: "Materials", description: "Explore what everyday objects are made from.", learningObjective: "Identify simple materials such as wood, plastic, metal, and paper.", difficulty: "medium", assessmentRole: "foundation", icon: "MAT" }),
    plannedLevel({ subjectLabel: "Science", level: 8, nodeType: "Review", title: "Science Forest Review", topic: "Science review", description: "Review living things, plants, senses, and materials.", learningObjective: "Review the main Year 1 Science Forest World ideas.", difficulty: "medium", assessmentRole: "review", icon: "REV" }),
    plannedLevel({ subjectLabel: "Science", level: 9, nodeType: "Challenge", title: "Discovery Challenge", topic: "Mixed science challenge", description: "Use observation clues in mixed science challenges.", learningObjective: "Apply observation and classification skills in mixed questions.", difficulty: "challenge", assessmentRole: "challenge", icon: "CH" }),
    plannedLevel({ subjectLabel: "Science", level: 10, nodeType: "Boss", title: "Forest Scientist Boss Quiz", topic: "Forest Scientist boss quiz", description: "Complete the Forest Scientist challenge and earn the Science Forest Explorer Badge.", learningObjective: "Demonstrate readiness across the full Science Forest World.", difficulty: "boss", assessmentRole: "boss", icon: "BOSS" }),
  ],
  levelMetadataSource: {
    kind: "planned",
    description: "Science levels are registered for the standardized 10-level Forest contract but are not connected to runtime routes.",
  },
  questionContentSource: {
    kind: "planned",
    description: "Science questions will remain inactive until curriculum and question assets are approved.",
    recommendedQuestionCount: 300,
    activeQuestionCount: 0,
  },
} as const satisfies LearningPackage;

export const learningPackages = [
  mathematicsForestWorldPackage,
  englishForestWorldPackage,
  scienceForestWorldPackage,
] as const satisfies readonly LearningPackage[];

export type LearningPackageId = (typeof learningPackages)[number]["packageId"];

const legacyWorldIds: Record<string, string> = {
  "math-forest-world": STANDARD_FOREST_WORLD_ID,
  "english-forest-world": STANDARD_FOREST_WORLD_ID,
  "science-forest-world": STANDARD_FOREST_WORLD_ID,
};

const legacyBadgeNames: Record<string, string> = {
  "Forest Guardian Badge": mathematicsForestWorldPackage.badge.completionBadge,
};

export type LearningPackageValidationIssue = {
  packageId: string;
  code: string;
  message: string;
  level?: number;
};

export function learningPackageProgressRef(pkg: LearningPackage): LearningPackageRef {
  return {
    subject: pkg.subject,
    year: pkg.year,
    worldId: pkg.worldId,
  };
}

export function learningPackageProgressKey(ref: LearningPackageRef) {
  const worldId = normalizeLearningWorldId(ref.worldId);
  return `${ref.subject}:${ref.year}:${typeof worldId === "string" ? worldId : ref.worldId}`;
}

export function refsMatch(left: LearningPackageRef, right: LearningPackageRef) {
  return left.subject === right.subject && left.year === right.year && normalizeLearningWorldId(left.worldId) === normalizeLearningWorldId(right.worldId);
}

export function normalizeLearningWorldId(value: unknown) {
  return typeof value === "string" && legacyWorldIds[value] ? legacyWorldIds[value] : value;
}

export function normalizeLearningBadgeName(value: string) {
  return legacyBadgeNames[value] ?? value;
}

export function getLearningPackageById(packageId: string) {
  return learningPackages.find((pkg) => pkg.packageId === packageId) ?? null;
}

export function getLearningPackageByRef(ref: LearningPackageRef) {
  const normalizedWorldId = normalizeLearningWorldId(ref.worldId);
  return learningPackages.find((pkg) => (
    pkg.subject === ref.subject
    && pkg.year === ref.year
    && pkg.worldId === normalizedWorldId
  )) ?? null;
}

export function getLearningPackageByProgressKey(key: string) {
  const [subject, yearValue, ...worldParts] = key.split(":");
  const year = Number(yearValue);
  const worldId = worldParts.join(":");
  if (!subject || !Number.isInteger(year) || !worldId) return null;
  return getLearningPackageByRef({
    subject: subject as SubjectId,
    year,
    worldId,
  });
}

export function isLearningPackageActive(packageId: string) {
  return getLearningPackageById(packageId)?.status === "active";
}

export function validateStandardForestPackage(pkg: LearningPackage): LearningPackageValidationIssue[] {
  const issues: LearningPackageValidationIssue[] = [];
  const subject = getSubjectRegistryEntry(pkg.subject);

  if (!subject) {
    issues.push({ packageId: pkg.packageId, code: "invalid-subject", message: `Subject ${pkg.subject} is not registered.` });
  } else {
    if (!(subject.supportedYears as readonly number[]).includes(pkg.year)) {
      issues.push({ packageId: pkg.packageId, code: "unsupported-year", message: `${subject.displayName} does not support Year ${pkg.year} in the registry.` });
    }
    if (subject.defaultLearningPackageId && subject.defaultLearningPackageId !== pkg.packageId) {
      issues.push({ packageId: pkg.packageId, code: "default-package-mismatch", message: `${subject.displayName} default package does not point to ${pkg.packageId}.` });
    }
  }

  if (!pkg.standardizedForestWorld) {
    issues.push({ packageId: pkg.packageId, code: "not-standardized", message: "Package is not marked as a standardized Forest World package." });
  }
  if (pkg.worldId !== STANDARD_FOREST_WORLD_ID) {
    issues.push({ packageId: pkg.packageId, code: "invalid-world-id", message: `Standardized Forest packages must use worldId ${STANDARD_FOREST_WORLD_ID}.` });
  }
  if (pkg.totalLevels !== STANDARD_FOREST_LEVEL_COUNT) {
    issues.push({ packageId: pkg.packageId, code: "invalid-total-levels", message: `Standardized Forest packages must have exactly ${STANDARD_FOREST_LEVEL_COUNT} levels.` });
  }
  if (pkg.levelMetadata.length !== STANDARD_FOREST_LEVEL_COUNT) {
    issues.push({ packageId: pkg.packageId, code: "invalid-level-count", message: `Expected ${STANDARD_FOREST_LEVEL_COUNT} level metadata entries, found ${pkg.levelMetadata.length}.` });
  }

  const seenLevels = new Set<number>();
  for (const level of pkg.levelMetadata) {
    if (seenLevels.has(level.level)) {
      issues.push({ packageId: pkg.packageId, code: "duplicate-level", level: level.level, message: `Level ${level.level} is duplicated.` });
    }
    seenLevels.add(level.level);

    if (level.level < 1 || level.level > STANDARD_FOREST_LEVEL_COUNT) {
      issues.push({ packageId: pkg.packageId, code: "level-out-of-range", level: level.level, message: `Level ${level.level} is outside the 1-${STANDARD_FOREST_LEVEL_COUNT} range.` });
    }

    const expectedNodeType = STANDARD_FOREST_NODE_SEQUENCE[level.level - 1];
    if (expectedNodeType && level.nodeType !== expectedNodeType) {
      issues.push({ packageId: pkg.packageId, code: "invalid-node-type", level: level.level, message: `Level ${level.level} must be ${expectedNodeType}, found ${level.nodeType}.` });
    }

    const expectedRequiresLevel = level.level === 1 ? null : level.level - 1;
    const expectedRuleType = level.level === 1 ? "start" : "complete-previous-level";
    if (level.unlockRule.type !== expectedRuleType || level.unlockRule.requiresLevel !== expectedRequiresLevel) {
      issues.push({ packageId: pkg.packageId, code: "invalid-unlock-rule", level: level.level, message: `Level ${level.level} has an invalid unlock rule.` });
    }

    if (!level.title || !level.topic || !level.learningObjective || !level.assetRefs.worldImage) {
      issues.push({ packageId: pkg.packageId, code: "incomplete-level-metadata", level: level.level, message: `Level ${level.level} is missing required metadata.` });
    }
  }

  for (let level = 1; level <= STANDARD_FOREST_LEVEL_COUNT; level += 1) {
    if (!seenLevels.has(level)) {
      issues.push({ packageId: pkg.packageId, code: "missing-level", level, message: `Level ${level} is missing.` });
    }
  }

  return issues;
}

export function assertStandardForestPackage(pkg: LearningPackage) {
  const issues = validateStandardForestPackage(pkg);
  if (issues.length > 0) {
    throw new Error(`${pkg.packageId} failed standardized Forest validation: ${issues.map((issue) => issue.message).join(" ")}`);
  }
  return pkg;
}
