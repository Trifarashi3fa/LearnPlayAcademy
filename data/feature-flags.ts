import { getPublicSubjectRegistryEntries } from "@/data/subject-registry";

export type FeatureStatus = "active" | "coming-soon";

export const featureAvailability = {
  mathematicsYear1ForestWorld: {
    label: "Mathematics Year 1 - Forest World",
    status: "active",
    route: "/mvp/world-map",
    description: "The approved LearnPlay Foundation MVP with 10 levels and 100 questions.",
  },
  games: { label: "Quick Games", status: "coming-soon", route: "/games", description: "Preserved for future approved activity packages." },
  mathQuickGames: { label: "Mathematics Quick Games", status: "coming-soon", route: "/games/math-quiz-battle", description: "Not part of the current Foundation MVP." },
  englishYear1ForestWorld: { label: "English Year 1 - Forest World", status: "coming-soon", route: "/subjects/english", description: "English Forest World is planned for beta after subject-isolated content approval." },
  englishWordBuilder: { label: "English Word Builder", status: "coming-soon", route: "/games/word-builder", description: "English remains inactive until its curriculum package is approved." },
  scienceYear1ForestWorld: { label: "Science Year 1 - Forest World", status: "coming-soon", route: "/subjects/science", description: "Science Forest World is planned for beta after subject-isolated content approval." },
  science: { label: "Science", status: "coming-soon", route: "/science", description: "Science content is preserved but inactive for the current MVP." },
  lifeSkills: { label: "Life Skills", status: "coming-soon", route: "/life-skills", description: "Life Skills content is preserved but inactive for the current MVP." },
  aiLiteracy: { label: "AI Literacy", status: "coming-soon", route: "/subjects/ai-literacy", description: "AI Literacy remains inactive until approved." },
  bahasaMelayu: { label: "Bahasa Melayu", status: "coming-soon", route: "/subjects/bahasa-melayu", description: "Bahasa Melayu remains inactive until approved." },
  criticalThinking: { label: "Critical Thinking", status: "coming-soon", route: "/subjects/critical-thinking", description: "Critical Thinking remains inactive until approved." },
  generalKnowledge: { label: "General Knowledge", status: "coming-soon", route: "/subjects", description: "General Knowledge remains inactive until approved." },
  premiumMathematics: { label: "Premium Mathematics", status: "coming-soon", route: "/subjects/mathematics", description: "Premium Mathematics is outside the current pilot scope." },
  mathematicsYear2: { label: "Mathematics Year 2", status: "coming-soon", route: "/subjects", description: "Year 2 is not approved for activation." },
  mathematicsYear3: { label: "Mathematics Year 3", status: "coming-soon", route: "/subjects", description: "Year 3 is not approved for activation." },
  mathematicsYears4To6: { label: "Mathematics Years 4-6", status: "coming-soon", route: "/subjects", description: "Years 4-6 are future roadmap content." },
  premiumLanguages: { label: "Premium Languages", status: "coming-soon", route: "/subjects", description: "Premium language packages are inactive." },
} as const satisfies Record<string, {
  label: string;
  status: FeatureStatus;
  route: string;
  description: string;
}>;

export type FeatureId = keyof typeof featureAvailability;

export function isFeatureActive(featureId: FeatureId) {
  return featureAvailability[featureId].status === "active";
}

export const publicSubjectAvailability = getPublicSubjectRegistryEntries().map((subject) => ({
  id: subject.id,
  featureId: subject.featureFlagId as FeatureId,
  title: subject.id === "mathematics" ? "Mathematics Year 1" : subject.displayName,
  description: subject.description,
  image: subject.asset,
  href: subject.status === "active" ? subject.navigationRoute : subject.navigationRoute,
})) satisfies ReadonlyArray<{
  id: string;
  featureId: FeatureId;
  title: string;
  description: string;
  image: string;
  href: string;
}>;

export function getSubjectFeatureId(subjectSlug: string): FeatureId | null {
  const subject = publicSubjectAvailability.find((item) => item.id === subjectSlug);
  if (subject) return subject.featureId;
  if (subjectSlug === "critical-thinking") return "criticalThinking";
  return null;
}
export const questionEngineFeatureFlags = {
  // Non-MCQ import and renderer previews are development-only until approved.
  nonMCQPreview: process.env.NODE_ENV !== "production",
  // Forest L01 random sessions are for local/dev review only until approved.
  forestL01RandomPoolPreview: process.env.NODE_ENV !== "production",
} as const;

export const adminFeatureFlags = {
  // Internal analytics uses mock data only. It is disabled in production unless explicitly enabled.
  adminAnalyticsPreview: process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS === "true",
} as const;

export const learningAnalyticsFeatureFlags = {
  // Closed-beta learner analytics are local/no-op or console-only until a provider is connected.
  enabled: process.env.NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS === "true" || (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS !== "false"),
  provider: process.env.NEXT_PUBLIC_LEARNING_ANALYTICS_PROVIDER ?? "console",
} as const;
