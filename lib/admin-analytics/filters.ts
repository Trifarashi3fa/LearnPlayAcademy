import type {
  AdminAnalyticsDashboardData,
  AnalyticsDateRange,
  AnalyticsFilters,
  AnalyticsMetric,
  AnalyticsSubjectId,
  DatedSubjectRecord,
} from "./types";

export const defaultAnalyticsFilters: AnalyticsFilters = {
  dateRange: "30d",
  subject: "all",
};

const dayMs = 24 * 60 * 60 * 1000;

export function getDateRangeStart(dateRange: AnalyticsDateRange, nowIso: string) {
  if (dateRange === "all") return null;
  const days = Number(dateRange.replace("d", ""));
  const now = new Date(nowIso).getTime();
  return new Date(now - days * dayMs).toISOString().slice(0, 10);
}

export function recordMatchesFilters<T extends DatedSubjectRecord>(record: T, filters: AnalyticsFilters, nowIso: string) {
  const start = getDateRangeStart(filters.dateRange, nowIso);
  const dateMatches = start === null || record.date >= start;
  const subjectMatches = filters.subject === "all" || record.subject === filters.subject;
  return dateMatches && subjectMatches;
}

function filterRecords<T extends DatedSubjectRecord>(records: T[], filters: AnalyticsFilters, nowIso: string) {
  return records.filter((record) => recordMatchesFilters(record, filters, nowIso));
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round(sum(values) / values.length);
}

export function filterAdminAnalyticsData(data: AdminAnalyticsDashboardData, filters: AnalyticsFilters): AdminAnalyticsDashboardData {
  const generatedAt = data.generatedAt;
  return {
    ...data,
    userMetrics: filterRecords(data.userMetrics, filters, generatedAt),
    learningMetrics: filterRecords(data.learningMetrics, filters, generatedAt),
    subjectPerformance: filterRecords(data.subjectPerformance, filters, generatedAt),
    levelPerformance: filterRecords(data.levelPerformance, filters, generatedAt),
    questionPerformance: filterRecords(data.questionPerformance, filters, generatedAt),
    contentQa: filterRecords(data.contentQa, filters, generatedAt),
    importHistory: filterRecords(data.importHistory, filters, generatedAt),
  };
}

export function deriveExecutiveSummary(data: AdminAnalyticsDashboardData): AnalyticsMetric[] {
  const newParents = sum(data.userMetrics.map((record) => record.newParents));
  const activeParents = sum(data.userMetrics.map((record) => record.activeParents));
  const childProfiles = sum(data.userMetrics.map((record) => record.childProfiles));
  const sessions = sum(data.learningMetrics.map((record) => record.sessions));
  const questionsAnswered = sum(data.learningMetrics.map((record) => record.questionsAnswered));
  const averageAccuracy = average(data.learningMetrics.map((record) => record.averageAccuracy));
  const approvedContent = sum(data.contentQa.map((record) => record.approvedRows));
  const qaWarnings = sum(data.contentQa.map((record) => record.warnings));

  return [
    { id: "parents", label: "Active parents", value: activeParents, change: `${newParents} new`, tone: "blue" },
    { id: "profiles", label: "Child profiles", value: childProfiles, change: "one-child MVP", tone: "green" },
    { id: "sessions", label: "Learning sessions", value: sessions, change: `${questionsAnswered} answers`, tone: "pink" },
    { id: "accuracy", label: "Avg accuracy", value: `${averageAccuracy}%`, change: "mock trend", tone: "yellow" },
    { id: "content", label: "Approved rows", value: approvedContent, change: `${qaWarnings} QA warnings`, tone: qaWarnings > 0 ? "yellow" : "green" },
  ];
}

export function getAvailableSubjectOptions(data: AdminAnalyticsDashboardData): { id: AnalyticsSubjectId; label: string }[] {
  const subjects = new Set<AnalyticsSubjectId>(["all"]);
  data.subjectPerformance.forEach((record) => subjects.add(record.subject));
  const labels: Record<AnalyticsSubjectId, string> = {
    all: "All subjects",
    mathematics: "Mathematics",
    english: "English",
    science: "Science",
  };
  return [...subjects].map((id) => ({ id, label: labels[id] }));
}

export function getQuestionRiskLabel(correctRate: number) {
  if (correctRate >= 80) return "Healthy";
  if (correctRate >= 60) return "Watch";
  return "Needs review";
}
