import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function writeTempModule(name, sourcePath) {
  const source = readFileSync(sourcePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  }).outputText;
  const tempPath = path.join(tmpdir(), `learnplay-${name}-${process.pid}-${Date.now()}.mjs`);
  writeFileSync(tempPath, output, "utf8");
  return tempPath;
}

const tempPaths = [];
try {
  const accessPath = writeTempModule("admin-analytics-access", path.resolve("lib/admin-analytics/access.ts"));
  tempPaths.push(accessPath);
  const filtersPath = writeTempModule("admin-analytics-filters", path.resolve("lib/admin-analytics/filters.ts"));
  tempPaths.push(filtersPath);
  const mockPath = writeTempModule("admin-analytics-mock", path.resolve("lib/admin-analytics/mock-service.ts"));
  tempPaths.push(mockPath);

  const { isAdminAnalyticsPreviewEnabled } = await import(pathToFileURL(accessPath).href);
  const {
    defaultAnalyticsFilters,
    deriveExecutiveSummary,
    filterAdminAnalyticsData,
    getAvailableSubjectOptions,
    getDateRangeStart,
    getQuestionRiskLabel,
    recordMatchesFilters,
  } = await import(pathToFileURL(filtersPath).href);
  const { MockAdminAnalyticsService, createMockAdminAnalyticsData } = await import(pathToFileURL(mockPath).href);

  assert(isAdminAnalyticsPreviewEnabled({ NODE_ENV: "development" }), "Admin analytics should be available in development.");
  assert(!isAdminAnalyticsPreviewEnabled({ NODE_ENV: "production" }), "Admin analytics should be disabled in production by default.");
  assert(
    isAdminAnalyticsPreviewEnabled({ NODE_ENV: "production", NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS: "true" }),
    "Admin analytics should support explicit feature-flag preview access.",
  );

  const data = createMockAdminAnalyticsData();
  const service = new MockAdminAnalyticsService();
  const serviceData = await service.getDashboardData();
  assert(serviceData.generatedAt === data.generatedAt, "Mock service should return deterministic generatedAt value.");
  assert(data.subjectPerformance.some((record) => record.subject === "mathematics"), "Mock data should include Mathematics.");
  assert(data.subjectPerformance.some((record) => record.subject === "english"), "Mock data should include English staging rows.");

  const subjectOptions = getAvailableSubjectOptions(data).map((option) => option.id);
  assert(subjectOptions.includes("all"), "Subject filters should include all.");
  assert(subjectOptions.includes("mathematics"), "Subject filters should include Mathematics.");
  assert(subjectOptions.includes("english"), "Subject filters should include English.");

  const englishOnly = filterAdminAnalyticsData(data, { dateRange: "all", subject: "english" });
  assert(englishOnly.subjectPerformance.every((record) => record.subject === "english"), "Subject filter should keep only English subject rows.");
  assert(englishOnly.levelPerformance.every((record) => record.subject === "english"), "Subject filter should keep only English level rows.");
  assert(englishOnly.contentQa.every((record) => record.subject === "english"), "Subject filter should keep only English QA rows.");

  const sevenDayStart = getDateRangeStart("7d", data.generatedAt);
  assert(sevenDayStart === "2026-07-10", `Expected 7-day start to be 2026-07-10, got ${sevenDayStart}`);
  const oldRecord = data.learningMetrics.find((record) => record.date === "2026-06-21");
  assert(oldRecord, "Mock data should include an older record for date filtering.");
  assert(!recordMatchesFilters(oldRecord, { dateRange: "7d", subject: "all" }, data.generatedAt), "7-day filter should remove older records.");

  const filtered = filterAdminAnalyticsData(data, defaultAnalyticsFilters);
  const summary = deriveExecutiveSummary(filtered);
  assert(summary.length >= 5, "Executive Summary should include at least five metrics.");
  assert(summary.some((metric) => metric.label === "Learning sessions"), "Executive Summary should include learning sessions.");
  assert(getQuestionRiskLabel(90) === "Healthy", "High correct rate should be healthy.");
  assert(getQuestionRiskLabel(70) === "Watch", "Mid correct rate should be watch.");
  assert(getQuestionRiskLabel(40) === "Needs review", "Low correct rate should need review.");

  const dashboardSource = readFileSync(path.resolve("components/admin/AdminAnalyticsDashboard.tsx"), "utf8");
  for (const sectionName of [
    "Executive Summary",
    "User Metrics",
    "Learning Metrics",
    "Subject Performance",
    "Level Performance",
    "Question Performance",
    "Content QA",
    "Import History",
    "Build Information",
    "System Health",
  ]) {
    assert(dashboardSource.includes(sectionName), `Dashboard rendering contract is missing ${sectionName}.`);
  }
  assert(dashboardSource.includes("Analytics date range"), "Dashboard should render a date-range filter.");
  assert(dashboardSource.includes("Analytics subject filter"), "Dashboard should render a subject filter.");

  const routeSource = readFileSync(path.resolve("app/dev/admin-analytics/page.tsx"), "utf8");
  assert(routeSource.includes("notFound"), "Admin analytics route should be protected with notFound.");
  assert(routeSource.includes("isAdminAnalyticsPreviewEnabled"), "Admin analytics route should use the access guard.");

  const featureFlagSource = readFileSync(path.resolve("data/feature-flags.ts"), "utf8");
  assert(featureFlagSource.includes("adminAnalyticsPreview"), "Central feature flags should expose adminAnalyticsPreview.");

  console.log("Admin analytics tests passed: 24");
} finally {
  for (const tempPath of tempPaths) {
    try {
      unlinkSync(tempPath);
    } catch {
      // ignore temp cleanup errors
    }
  }
}
