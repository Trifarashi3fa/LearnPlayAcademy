export type LearnPlaySubjectId =
  | "mathematics"
  | "english"
  | "science"
  | "bahasa-melayu"
  | "life-skills"
  | "ai-literacy"
  | "general-knowledge";

export type SubjectAvailabilityStatus = "active" | "coming-soon" | "premium" | "inactive";
export type SubjectThemeToken = "blue" | "green" | "yellow" | "pink" | "purple" | "teal";

export type SubjectRegistryEntry = {
  id: LearnPlaySubjectId;
  displayName: string;
  shortLabel: string;
  description: string;
  icon: string;
  asset: string;
  status: SubjectAvailabilityStatus;
  freeBetaAvailability: "available" | "coming-soon" | "not-included";
  supportedYears: number[];
  defaultLearningPackageId: string | null;
  themeToken: SubjectThemeToken;
  navigationRoute: string;
  parentDashboardDisplayName: string;
  order: number;
  featureFlagId: string;
  showInSubjectSelection: boolean;
};

export const subjectRegistry = [
  {
    id: "mathematics",
    displayName: "Mathematics",
    shortLabel: "Maths",
    description: "Numbers, counting, operations, problem solving, and reasoning through guided Forest World missions.",
    icon: "123",
    asset: "/subjects/math.webp",
    status: "active",
    freeBetaAvailability: "available",
    supportedYears: [1],
    defaultLearningPackageId: "mathematics-year-1-forest-world",
    themeToken: "blue",
    navigationRoute: "/mvp/world-map",
    parentDashboardDisplayName: "Mathematics",
    order: 1,
    featureFlagId: "mathematicsYear1ForestWorld",
    showInSubjectSelection: true,
  },
  {
    id: "english",
    displayName: "English",
    shortLabel: "English",
    description: "Letters, sounds, vocabulary, short words, and simple sentences in the same Forest World structure.",
    icon: "ABC",
    asset: "/subjects/english.webp",
    status: "coming-soon",
    freeBetaAvailability: "coming-soon",
    supportedYears: [1],
    defaultLearningPackageId: "english-year-1-forest-world",
    themeToken: "green",
    navigationRoute: "/subjects/english",
    parentDashboardDisplayName: "English",
    order: 2,
    featureFlagId: "englishYear1ForestWorld",
    showInSubjectSelection: true,
  },
  {
    id: "science",
    displayName: "Science",
    shortLabel: "Science",
    description: "Observation, living things, materials, senses, and discovery missions for future beta testing.",
    icon: "SCI",
    asset: "/subjects/science.webp",
    status: "coming-soon",
    freeBetaAvailability: "coming-soon",
    supportedYears: [1],
    defaultLearningPackageId: "science-year-1-forest-world",
    themeToken: "teal",
    navigationRoute: "/subjects/science",
    parentDashboardDisplayName: "Science",
    order: 3,
    featureFlagId: "scienceYear1ForestWorld",
    showInSubjectSelection: true,
  },
  {
    id: "bahasa-melayu",
    displayName: "Bahasa Melayu",
    shortLabel: "BM",
    description: "Vocabulary, sounds, reading, and simple communication for future approved language packages.",
    icon: "BM",
    asset: "/subjects/bahasa-melayu.webp",
    status: "coming-soon",
    freeBetaAvailability: "coming-soon",
    supportedYears: [1],
    defaultLearningPackageId: null,
    themeToken: "purple",
    navigationRoute: "/subjects/bahasa-melayu",
    parentDashboardDisplayName: "Bahasa Melayu",
    order: 4,
    featureFlagId: "bahasaMelayu",
    showInSubjectSelection: true,
  },
  {
    id: "life-skills",
    displayName: "Life Skills",
    shortLabel: "Life",
    description: "Confidence, safety, habits, feelings, and practical everyday learning for future packages.",
    icon: "LIFE",
    asset: "/subjects/life-skills.webp",
    status: "coming-soon",
    freeBetaAvailability: "coming-soon",
    supportedYears: [1],
    defaultLearningPackageId: null,
    themeToken: "pink",
    navigationRoute: "/subjects/life-skills",
    parentDashboardDisplayName: "Life Skills",
    order: 5,
    featureFlagId: "lifeSkills",
    showInSubjectSelection: true,
  },
  {
    id: "ai-literacy",
    displayName: "AI Literacy",
    shortLabel: "AI",
    description: "Future child-safe AI concepts, prompt awareness, and digital confidence activities.",
    icon: "AI",
    asset: "/subjects/life-skills.webp",
    status: "coming-soon",
    freeBetaAvailability: "coming-soon",
    supportedYears: [1],
    defaultLearningPackageId: null,
    themeToken: "teal",
    navigationRoute: "/subjects/ai-literacy",
    parentDashboardDisplayName: "AI Literacy",
    order: 6,
    featureFlagId: "aiLiteracy",
    showInSubjectSelection: true,
  },
  {
    id: "general-knowledge",
    displayName: "General Knowledge",
    shortLabel: "GK",
    description: "Mixed knowledge quizzes and curiosity-building activities for future expansion.",
    icon: "GK",
    asset: "/subjects/general-knowledge.webp",
    status: "coming-soon",
    freeBetaAvailability: "coming-soon",
    supportedYears: [1],
    defaultLearningPackageId: null,
    themeToken: "yellow",
    navigationRoute: "/subjects",
    parentDashboardDisplayName: "General Knowledge",
    order: 7,
    featureFlagId: "generalKnowledge",
    showInSubjectSelection: true,
  },
] as const satisfies readonly SubjectRegistryEntry[];

export function getSubjectRegistryEntry(subjectId: string) {
  return subjectRegistry.find((subject) => subject.id === subjectId) ?? null;
}

export function getActiveSubjectRegistryEntries() {
  return subjectRegistry.filter((subject) => subject.status === "active");
}

export function getPublicSubjectRegistryEntries() {
  return subjectRegistry
    .filter((subject) => subject.showInSubjectSelection)
    .slice()
    .sort((left, right) => left.order - right.order);
}
