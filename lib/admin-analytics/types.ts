export type AnalyticsSubjectId = "all" | "mathematics" | "english" | "science";

export type AnalyticsDateRange = "7d" | "30d" | "90d" | "all";

export type AnalyticsFilters = {
  dateRange: AnalyticsDateRange;
  subject: AnalyticsSubjectId;
};

export type AnalyticsMetric = {
  id: string;
  label: string;
  value: number | string;
  change: string;
  tone: "blue" | "green" | "yellow" | "pink" | "red";
};

export type DatedSubjectRecord = {
  id: string;
  date: string;
  subject: Exclude<AnalyticsSubjectId, "all">;
};

export type UserMetricRecord = DatedSubjectRecord & {
  newParents: number;
  activeParents: number;
  childProfiles: number;
  returningFamilies: number;
};

export type LearningMetricRecord = DatedSubjectRecord & {
  sessions: number;
  questionsAnswered: number;
  completionRate: number;
  averageAccuracy: number;
  averageSessionMinutes: number;
};

export type SubjectPerformanceRecord = DatedSubjectRecord & {
  subjectName: string;
  activeLearners: number;
  sessions: number;
  averageAccuracy: number;
  completionRate: number;
  status: "active" | "staging" | "coming-soon";
};

export type LevelPerformanceRecord = DatedSubjectRecord & {
  level: number;
  title: string;
  attempts: number;
  completions: number;
  averageAccuracy: number;
  averageXp: number;
};

export type QuestionPerformanceRecord = DatedSubjectRecord & {
  questionId: string;
  level: number;
  prompt: string;
  attempts: number;
  correctRate: number;
  flagged: boolean;
};

export type ContentQaRecord = DatedSubjectRecord & {
  packageName: string;
  status: "ready" | "review" | "blocked";
  approvedRows: number;
  reviewRows: number;
  warnings: number;
  duplicateGroups: number;
};

export type ImportHistoryRecord = DatedSubjectRecord & {
  fileName: string;
  rows: number;
  importedRows: number;
  skippedRows: number;
  errors: number;
  warnings: number;
  result: "passed" | "warning" | "failed";
};

export type BuildInformation = {
  appVersion: string;
  buildTarget: string;
  lastBuildStatus: "passed" | "warning" | "failed";
  lastBuildAt: string;
  nodeRuntime: string;
  notes: string[];
};

export type SystemHealthRecord = {
  id: string;
  label: string;
  status: "healthy" | "warning" | "offline";
  detail: string;
  lastCheckedAt: string;
};

export type AdminAnalyticsDashboardData = {
  generatedAt: string;
  executiveSummary: AnalyticsMetric[];
  userMetrics: UserMetricRecord[];
  learningMetrics: LearningMetricRecord[];
  subjectPerformance: SubjectPerformanceRecord[];
  levelPerformance: LevelPerformanceRecord[];
  questionPerformance: QuestionPerformanceRecord[];
  contentQa: ContentQaRecord[];
  importHistory: ImportHistoryRecord[];
  buildInformation: BuildInformation;
  systemHealth: SystemHealthRecord[];
};

export type AdminAnalyticsService = {
  getDashboardData(): Promise<AdminAnalyticsDashboardData>;
};
