import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

function transpileSource(sourcePath, replacements = {}) {
  const source = readFileSync(sourcePath, "utf8");
  let output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  }).outputText;
  for (const [from, to] of Object.entries(replacements)) {
    output = output.replaceAll(from, to);
  }
  return output;
}

const tempPaths = [];

function writeTempModule(name, sourcePath, replacements = {}) {
  const tempPath = path.join(tmpdir(), `learnplay-${name}-${process.pid}-${Date.now()}.mjs`);
  writeFileSync(tempPath, transpileSource(sourcePath, replacements));
  tempPaths.push(tempPath);
  return tempPath;
}

try {
  const levelAccessPath = writeTempModule("level-access", path.resolve("lib/progress/level-access.ts"));
  const subjectRegistryPath = writeTempModule("subject-registry", path.resolve("data/subject-registry.ts"));
  const subjectRegistryUrl = pathToFileURL(subjectRegistryPath).href;
  const registryPath = writeTempModule("learning-packages", path.resolve("data/learning-packages.ts"), {
    'from "@/data/subject-registry"': `from "${subjectRegistryUrl}"`,
  });
  const {
    getForestLevelAccess,
    getLevelAccess,
    isForestLevelAccessible,
    isLevelAccessible,
  } = await import(pathToFileURL(levelAccessPath).href);
  const {
    getSubjectRegistryEntry,
    subjectRegistry,
  } = await import(subjectRegistryUrl);
  const {
    englishForestWorldPackage,
    scienceForestWorldPackage,
    getLearningPackageById,
    getLearningPackageByRef,
    learningPackageProgressKey,
    learningPackageProgressRef,
    mathematicsForestWorldPackage,
    validateStandardForestPackage,
  } = await import(pathToFileURL(registryPath).href);

  const cases = [
    {
      name: "Level 1 accessible with no progress",
      level: 1,
      completedLevels: [],
      accessible: true,
      requiredLevel: null,
    },
    {
      name: "Level 2 blocked before Level 1 completion",
      level: 2,
      completedLevels: [],
      accessible: false,
      requiredLevel: 1,
    },
    {
      name: "Level 2 accessible after Level 1 completion",
      level: 2,
      completedLevels: [1],
      accessible: true,
      requiredLevel: 1,
    },
    {
      name: "Level 10 blocked when prerequisites are incomplete",
      level: 10,
      completedLevels: [1, 2, 3],
      accessible: false,
      requiredLevel: 9,
    },
    {
      name: "Direct URL cannot bypass progression",
      level: 7,
      completedLevels: [1, 2, 3, 4],
      accessible: false,
      requiredLevel: 6,
    },
  ];

  for (const testCase of cases) {
    const before = JSON.stringify(testCase.completedLevels);
    const result = getForestLevelAccess(testCase.level, testCase.completedLevels);
    if (result.accessible !== testCase.accessible) {
      throw new Error(`${testCase.name}: expected accessible=${testCase.accessible}, got ${result.accessible}`);
    }
    if (result.requiredLevel !== testCase.requiredLevel) {
      throw new Error(`${testCase.name}: expected requiredLevel=${testCase.requiredLevel}, got ${result.requiredLevel}`);
    }
    if (JSON.stringify(testCase.completedLevels) !== before) {
      throw new Error(`${testCase.name}: completedLevels was mutated`);
    }
    if (isForestLevelAccessible(testCase.level, testCase.completedLevels) !== testCase.accessible) {
      throw new Error(`${testCase.name}: isForestLevelAccessible mismatch`);
    }
  }

  const genericCases = [
    {
      name: "Mathematics package keeps 10-level access",
      totalLevels: mathematicsForestWorldPackage.totalLevels,
      level: 10,
      completedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      accessible: true,
      requiredLevel: 9,
    },
    {
      name: "Future English Level 1 accessible with no English progress",
      totalLevels: englishForestWorldPackage.totalLevels,
      level: 1,
      completedLevels: [],
      accessible: true,
      requiredLevel: null,
    },
    {
      name: "Future English Level 10 blocked without Level 9",
      totalLevels: englishForestWorldPackage.totalLevels,
      level: 10,
      completedLevels: [1, 2, 3, 4, 5, 6, 7, 8],
      accessible: false,
      requiredLevel: 9,
    },
    {
      name: "Future English Level 11 invalid because package has 10 levels",
      totalLevels: englishForestWorldPackage.totalLevels,
      level: 11,
      completedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      accessible: false,
      requiredLevel: null,
    },
    {
      name: "Future Science Level 1 accessible with no Science progress",
      totalLevels: scienceForestWorldPackage.totalLevels,
      level: 1,
      completedLevels: [],
      accessible: true,
      requiredLevel: null,
    },
  ];

  for (const testCase of genericCases) {
    const result = getLevelAccess({
      level: testCase.level,
      completedLevels: testCase.completedLevels,
      totalLevels: testCase.totalLevels,
    });
    if (result.accessible !== testCase.accessible) {
      throw new Error(`${testCase.name}: expected accessible=${testCase.accessible}, got ${result.accessible}`);
    }
    if (result.requiredLevel !== testCase.requiredLevel) {
      throw new Error(`${testCase.name}: expected requiredLevel=${testCase.requiredLevel}, got ${result.requiredLevel}`);
    }
    if (isLevelAccessible(testCase.level, testCase.completedLevels, testCase.totalLevels) !== testCase.accessible) {
      throw new Error(`${testCase.name}: isLevelAccessible mismatch`);
    }
  }

  const mathRef = learningPackageProgressRef(mathematicsForestWorldPackage);
  const englishRef = learningPackageProgressRef(englishForestWorldPackage);
  const scienceRef = learningPackageProgressRef(scienceForestWorldPackage);
  const mathKey = learningPackageProgressKey(mathRef);
  const englishKey = learningPackageProgressKey(englishRef);
  const scienceKey = learningPackageProgressKey(scienceRef);
  if (mathKey !== "mathematics:1:forest-world") {
    throw new Error(`Mathematics progress key changed unexpectedly: ${mathKey}`);
  }
  if (englishKey !== "english:1:forest-world") {
    throw new Error(`English progress key is not isolated: ${englishKey}`);
  }
  if (scienceKey !== "science:1:forest-world") {
    throw new Error(`Science progress key is not isolated: ${scienceKey}`);
  }
  if (new Set([mathKey, englishKey, scienceKey]).size !== 3) {
    throw new Error("Mathematics, English, and Science progress keys must not collide.");
  }
  if (getLearningPackageById(mathematicsForestWorldPackage.packageId)?.worldId !== "forest-world") {
    throw new Error("Mathematics registry entry did not resolve correctly.");
  }
  if (getLearningPackageByRef(englishRef)?.status !== "coming-soon") {
    throw new Error("English registry entry must remain coming soon.");
  }
  if (getLearningPackageByRef(scienceRef)?.status !== "coming-soon") {
    throw new Error("Science registry entry must remain coming soon.");
  }
  if (getLearningPackageByRef(englishRef)?.packageId === getLearningPackageByRef(scienceRef)?.packageId) {
    throw new Error("Package lookup confused English with Science.");
  }
  if (getLearningPackageByRef(mathRef)?.packageId === getLearningPackageByRef(englishRef)?.packageId) {
    throw new Error("Package lookup confused Mathematics with English.");
  }

  const requiredSubjects = ["mathematics", "english", "science", "bahasa-melayu", "life-skills", "ai-literacy"];
  for (const subjectId of requiredSubjects) {
    if (!getSubjectRegistryEntry(subjectId)) {
      throw new Error(`Subject Registry did not resolve ${subjectId}.`);
    }
  }
  if (getSubjectRegistryEntry("mathematics")?.status !== "active") {
    throw new Error("Mathematics must remain active in the Subject Registry.");
  }
  if (getSubjectRegistryEntry("english")?.status !== "coming-soon") {
    throw new Error("English must remain coming soon in the Subject Registry.");
  }
  if (getSubjectRegistryEntry("science")?.status !== "coming-soon") {
    throw new Error("Science must remain coming soon in the Subject Registry.");
  }
  if (subjectRegistry.filter((subject) => subject.status === "active").map((subject) => subject.id).join(",") !== "mathematics") {
    throw new Error("Only Mathematics should be active.");
  }

  for (const pkg of [mathematicsForestWorldPackage, englishForestWorldPackage, scienceForestWorldPackage]) {
    const issues = validateStandardForestPackage(pkg);
    if (issues.length > 0) {
      throw new Error(`${pkg.packageId} should pass 10-level Forest validation: ${JSON.stringify(issues)}`);
    }
  }

  const missingLevelPackage = {
    ...englishForestWorldPackage,
    packageId: "test-missing-level",
    levelMetadata: englishForestWorldPackage.levelMetadata.slice(0, 9),
  };
  if (!validateStandardForestPackage(missingLevelPackage).some((issue) => issue.code === "invalid-level-count" || issue.code === "missing-level")) {
    throw new Error("10-level validation must reject missing levels.");
  }

  const duplicateLevelPackage = {
    ...englishForestWorldPackage,
    packageId: "test-duplicate-level",
    levelMetadata: englishForestWorldPackage.levelMetadata.map((level, index) => index === 9 ? { ...level, level: 9 } : level),
  };
  if (!validateStandardForestPackage(duplicateLevelPackage).some((issue) => issue.code === "duplicate-level")) {
    throw new Error("10-level validation must reject duplicate level numbers.");
  }

  const invalidWorldPackage = {
    ...englishForestWorldPackage,
    packageId: "test-invalid-world",
    worldId: "english-forest-world",
  };
  if (!validateStandardForestPackage(invalidWorldPackage).some((issue) => issue.code === "invalid-world-id")) {
    throw new Error("10-level validation must reject invalid world identity.");
  }

  console.log(`MVP level access tests passed: ${cases.length + genericCases.length + 26}`);
} finally {
  for (const tempPath of tempPaths) {
    unlinkSync(tempPath);
  }
}
