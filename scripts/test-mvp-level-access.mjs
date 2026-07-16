import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const sourcePath = path.resolve("lib/progress/level-access.ts");
const source = readFileSync(sourcePath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
}).outputText;

const tempPath = path.join(tmpdir(), `learnplay-level-access-${process.pid}-${Date.now()}.mjs`);
writeFileSync(tempPath, transpiled);

try {
  const { getForestLevelAccess, isForestLevelAccessible } = await import(pathToFileURL(tempPath).href);

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

  console.log(`MVP level access tests passed: ${cases.length}`);
} finally {
  unlinkSync(tempPath);
}
