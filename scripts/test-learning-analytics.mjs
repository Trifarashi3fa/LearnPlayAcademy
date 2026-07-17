import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function transpileSource(source) {
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  }).outputText;
}

function writeTempModule(name, source) {
  const tempPath = path.join(tmpdir(), `learning-analytics-${name}-${process.pid}-${Date.now()}.mjs`);
  writeFileSync(tempPath, source, "utf8");
  return tempPath;
}

const tempPaths = [];
try {
  const catalogSource = readFileSync(path.resolve("lib/learning-analytics/catalog.ts"), "utf8");
  const catalogPath = writeTempModule("catalog", transpileSource(catalogSource));
  tempPaths.push(catalogPath);

  let serviceSource = readFileSync(path.resolve("lib/learning-analytics/service.ts"), "utf8");
  serviceSource = serviceSource
    .replace(/import type \{([^}]+)\} from "\.\/catalog";?/g, "")
    .replace(/import \{ validateLearningAnalyticsEvent \} from "\.\/catalog";/g, `import { validateLearningAnalyticsEvent } from "${pathToFileURL(catalogPath).href}";`);
  const servicePath = writeTempModule("service", transpileSource(serviceSource));
  tempPaths.push(servicePath);

  const {
    isLearningAnalyticsEventName,
    learningAnalyticsEventCatalog,
    validateLearningAnalyticsEvent,
  } = await import(pathToFileURL(catalogPath).href);
  const {
    ConsoleLearningAnalyticsService,
    MockLearningAnalyticsCollector,
    NoopLearningAnalyticsService,
    createLearningAnalyticsService,
    isLearningAnalyticsEnabled,
  } = await import(pathToFileURL(servicePath).href);

  assert(isLearningAnalyticsEventName("question_answered"), "question_answered should be a supported event.");
  assert(!isLearningAnalyticsEventName("unknown_event"), "Unknown events should be rejected.");

  const requiredCategories = [
    "Authentication",
    "Parent",
    "Child Profile",
    "Subject",
    "World",
    "Level",
    "Question",
    "LearnBot",
    "Rewards",
    "Session",
    "Error",
  ];
  const categories = new Set(Object.values(learningAnalyticsEventCatalog).map((entry) => entry.category));
  for (const category of requiredCategories) {
    assert(categories.has(category), `Catalog should include ${category} events.`);
  }

  const validEvent = {
    name: "question_answered",
    payload: {
      subject: "mathematics",
      year: 1,
      worldId: "forest-world",
      level: 1,
      questionId: "forest-l01-q01",
      questionIndex: 1,
      correct: true,
      xpReward: 10,
    },
    timestamp: "2026-07-17T00:00:00.000Z",
  };
  const validResult = validateLearningAnalyticsEvent(validEvent);
  assert(validResult.valid, `Valid question event should pass: ${validResult.errors.join(", ")}`);

  const invalidEvent = {
    name: "question_answered",
    payload: {
      subject: "mathematics",
      year: 1,
      worldId: "forest-world",
      level: 1,
      questionId: "forest-l01-q01",
      questionIndex: 1,
      correct: true,
    },
    timestamp: "2026-07-17T00:00:00.000Z",
  };
  const invalidResult = validateLearningAnalyticsEvent(invalidEvent);
  assert(!invalidResult.valid, "Missing required payload field should fail validation.");
  assert(invalidResult.errors.some((error) => error.includes("xpReward")), "Validation should name missing xpReward.");

  assert(isLearningAnalyticsEnabled({ NODE_ENV: "development" }), "Analytics should default on in development for beta diagnostics.");
  assert(!isLearningAnalyticsEnabled({ NODE_ENV: "production" }), "Analytics should default off in production.");
  assert(isLearningAnalyticsEnabled({ NODE_ENV: "production", NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS: "true" }), "Explicit feature flag should enable analytics.");
  assert(!isLearningAnalyticsEnabled({ NODE_ENV: "development", NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS: "false" }), "Explicit feature flag should disable analytics.");

  const disabledService = createLearningAnalyticsService({ NODE_ENV: "production" });
  assert(disabledService instanceof NoopLearningAnalyticsService, "Disabled production analytics should use no-op service.");
  const consoleService = createLearningAnalyticsService({ NODE_ENV: "development" });
  assert(consoleService instanceof ConsoleLearningAnalyticsService, "Development analytics should use console service by default.");
  const mockService = createLearningAnalyticsService({ NODE_ENV: "development", NEXT_PUBLIC_LEARNING_ANALYTICS_PROVIDER: "mock" });
  assert(mockService instanceof MockLearningAnalyticsCollector, "Mock provider should use mock collector.");

  const collector = new MockLearningAnalyticsCollector();
  collector.track("subject_selection_viewed", { activeSubjectCount: 1, comingSoonSubjectCount: 5 });
  collector.track("auth_login_completed", { method: "email", result: "success" });
  assert(collector.getEvents().length === 2, "Mock collector should retain tracked events.");
  assert(collector.getEvents()[0].name === "subject_selection_viewed", "Mock collector should preserve event order.");
  collector.clear();
  assert(collector.getEvents().length === 0, "Mock collector should clear events.");

  let threw = false;
  try {
    collector.track("question_answered", { subject: "mathematics" });
  } catch (error) {
    threw = String(error).includes("Invalid analytics event");
  }
  assert(threw, "Mock collector should throw for invalid payloads.");

  const featureFlagSource = readFileSync(path.resolve("data/feature-flags.ts"), "utf8");
  assert(featureFlagSource.includes("learningAnalyticsFeatureFlags"), "Central feature flags should expose learningAnalyticsFeatureFlags.");

  console.log("Learning analytics tests passed: 22");
} finally {
  for (const tempPath of tempPaths) {
    try {
      unlinkSync(tempPath);
    } catch {
      // ignore temp cleanup errors
    }
  }
}
