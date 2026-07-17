import type { AdminAnalyticsDashboardData, AdminAnalyticsService } from "./types";

const generatedAt = "2026-07-17T00:00:00.000Z";

export function createMockAdminAnalyticsData(): AdminAnalyticsDashboardData {
  return {
    generatedAt,
    executiveSummary: [],
    userMetrics: [
      { id: "u1", date: "2026-07-10", subject: "mathematics", newParents: 6, activeParents: 18, childProfiles: 17, returningFamilies: 12 },
      { id: "u2", date: "2026-07-12", subject: "mathematics", newParents: 4, activeParents: 22, childProfiles: 21, returningFamilies: 15 },
      { id: "u3", date: "2026-07-15", subject: "english", newParents: 0, activeParents: 4, childProfiles: 4, returningFamilies: 0 },
      { id: "u4", date: "2026-06-21", subject: "mathematics", newParents: 3, activeParents: 14, childProfiles: 14, returningFamilies: 9 },
    ],
    learningMetrics: [
      { id: "l1", date: "2026-07-10", subject: "mathematics", sessions: 42, questionsAnswered: 378, completionRate: 74, averageAccuracy: 82, averageSessionMinutes: 12 },
      { id: "l2", date: "2026-07-12", subject: "mathematics", sessions: 51, questionsAnswered: 460, completionRate: 78, averageAccuracy: 84, averageSessionMinutes: 11 },
      { id: "l3", date: "2026-07-15", subject: "english", sessions: 0, questionsAnswered: 0, completionRate: 0, averageAccuracy: 0, averageSessionMinutes: 0 },
      { id: "l4", date: "2026-06-21", subject: "mathematics", sessions: 32, questionsAnswered: 285, completionRate: 69, averageAccuracy: 79, averageSessionMinutes: 13 },
    ],
    subjectPerformance: [
      { id: "sp1", date: "2026-07-12", subject: "mathematics", subjectName: "Mathematics", activeLearners: 22, sessions: 93, averageAccuracy: 83, completionRate: 76, status: "active" },
      { id: "sp2", date: "2026-07-15", subject: "english", subjectName: "English", activeLearners: 0, sessions: 0, averageAccuracy: 0, completionRate: 0, status: "staging" },
      { id: "sp3", date: "2026-07-15", subject: "science", subjectName: "Science", activeLearners: 0, sessions: 0, averageAccuracy: 0, completionRate: 0, status: "coming-soon" },
    ],
    levelPerformance: [
      { id: "lv1", date: "2026-07-10", subject: "mathematics", level: 1, title: "Numbers 1-10", attempts: 62, completions: 58, averageAccuracy: 91, averageXp: 96 },
      { id: "lv2", date: "2026-07-11", subject: "mathematics", level: 2, title: "Counting Objects", attempts: 53, completions: 45, averageAccuracy: 84, averageXp: 88 },
      { id: "lv3", date: "2026-07-12", subject: "mathematics", level: 3, title: "Number Matching", attempts: 44, completions: 32, averageAccuracy: 76, averageXp: 80 },
      { id: "lv10", date: "2026-07-13", subject: "mathematics", level: 10, title: "Forest Guardian", attempts: 12, completions: 7, averageAccuracy: 72, averageXp: 74 },
      { id: "elv1", date: "2026-07-15", subject: "english", level: 1, title: "Alphabet Recognition", attempts: 0, completions: 0, averageAccuracy: 0, averageXp: 0 },
    ],
    questionPerformance: [
      { id: "q1", date: "2026-07-10", subject: "mathematics", questionId: "MATH-FW-L01-Q001", level: 1, prompt: "Count 7 stars", attempts: 41, correctRate: 93, flagged: false },
      { id: "q2", date: "2026-07-11", subject: "mathematics", questionId: "MATH-FW-L03-Q004", level: 3, prompt: "Which word matches the number?", attempts: 38, correctRate: 71, flagged: true },
      { id: "q3", date: "2026-07-13", subject: "mathematics", questionId: "MATH-FW-L10-Q008", level: 10, prompt: "Forest Guardian mixed review", attempts: 11, correctRate: 64, flagged: true },
      { id: "q4", date: "2026-07-15", subject: "english", questionId: "ENG-Y1-FW-L01-Q001", level: 1, prompt: "Find the capital letter that says /a/.", attempts: 0, correctRate: 0, flagged: false },
    ],
    contentQa: [
      { id: "qa1", date: "2026-07-12", subject: "mathematics", packageName: "Math Year 1 Forest World", status: "ready", approvedRows: 100, reviewRows: 0, warnings: 0, duplicateGroups: 0 },
      { id: "qa2", date: "2026-07-16", subject: "english", packageName: "English Year 1 Forest L01", status: "ready", approvedRows: 30, reviewRows: 0, warnings: 5, duplicateGroups: 0 },
      { id: "qa3", date: "2026-07-16", subject: "english", packageName: "English Year 1 Forest L02-L10", status: "review", approvedRows: 0, reviewRows: 270, warnings: 300, duplicateGroups: 38 },
    ],
    importHistory: [
      { id: "i1", date: "2026-07-01", subject: "mathematics", fileName: "active-content-manifest.json", rows: 100, importedRows: 100, skippedRows: 0, errors: 0, warnings: 0, result: "passed" },
      { id: "i2", date: "2026-07-16", subject: "english", fileName: "forest-l01.csv", rows: 30, importedRows: 0, skippedRows: 30, errors: 0, warnings: 0, result: "warning" },
      { id: "i3", date: "2026-07-16", subject: "english", fileName: "forest-l02-l10.csv", rows: 270, importedRows: 0, skippedRows: 270, errors: 0, warnings: 300, result: "warning" },
    ],
    buildInformation: {
      appVersion: "0.1.0",
      buildTarget: "Next.js 16 App Router",
      lastBuildStatus: "warning",
      lastBuildAt: "2026-07-17T00:00:00.000Z",
      nodeRuntime: "Node.js local/Vercel runtime",
      notes: [
        "Production build passes.",
        "Turbopack NFT warning remains in the developer preview trace.",
        "Analytics dashboard uses mock data only.",
      ],
    },
    systemHealth: [
      { id: "h1", label: "Application build", status: "healthy", detail: "Last production build completed successfully.", lastCheckedAt: generatedAt },
      { id: "h2", label: "Curriculum validation", status: "healthy", detail: "Active Mathematics manifest validates 100 questions with 0 warnings.", lastCheckedAt: generatedAt },
      { id: "h3", label: "Admin analytics data", status: "warning", detail: "Mock/demo data only. No production analytics provider is connected.", lastCheckedAt: generatedAt },
      { id: "h4", label: "Supabase analytics connector", status: "offline", detail: "Placeholder interface only. Database schema was not changed.", lastCheckedAt: generatedAt },
    ],
  };
}

export class MockAdminAnalyticsService implements AdminAnalyticsService {
  async getDashboardData() {
    return createMockAdminAnalyticsData();
  }
}
