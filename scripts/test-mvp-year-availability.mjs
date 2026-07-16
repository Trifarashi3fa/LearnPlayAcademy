import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const sourcePath = path.resolve("data/account-types.ts");
const source = readFileSync(sourcePath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
}).outputText;

const tempPath = path.join(tmpdir(), `learnplay-year-availability-${process.pid}-${Date.now()}.mjs`);
writeFileSync(tempPath, transpiled);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const {
    activeMvpYearLevel,
    getYearLevelAvailabilityMessage,
    getYearLevelOption,
    isSupportedMvpYearLevel,
    parseSupportedMvpYearLevel,
    yearLevelOptions,
  } = await import(pathToFileURL(tempPath).href);

  assert(activeMvpYearLevel === 1, "The active MVP year must remain Year 1");
  assert(isSupportedMvpYearLevel(1), "Year 1 should be treated as available");
  assert(parseSupportedMvpYearLevel("1") === 1, "Year 1 string should be accepted");
  assert(parseSupportedMvpYearLevel(" 1 ") === 1, "Trimmed Year 1 should be accepted");

  for (const year of [2, 3, 4, 5, 6]) {
    const option = getYearLevelOption(year);
    assert(option, `Year ${year} should have a visible availability option`);
    assert(option.availability === "coming-soon", `Year ${year} should be marked coming soon`);
    assert(!isSupportedMvpYearLevel(year), `Year ${year} should not be supported for new MVP profiles`);
    assert(parseSupportedMvpYearLevel(year) === null, `Year ${year} number should be rejected`);
    assert(parseSupportedMvpYearLevel(` ${year} `) === null, `Trimmed Year ${year} should still be rejected`);
  }

  for (const forgedValue of ["", "0", "7", "Year 1", "1.5", "2 ", " 3", "NaN"]) {
    assert(parseSupportedMvpYearLevel(forgedValue) === null, `Forged year value "${forgedValue}" should be rejected`);
  }

  const existingUnsupportedProfile = {
    id: "child-test",
    parentId: "parent-test",
    nickname: "Saved learner",
    yearLevel: 3,
    avatar: "learnbot",
    selected: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
  const before = JSON.stringify(existingUnsupportedProfile);
  assert(!isSupportedMvpYearLevel(existingUnsupportedProfile.yearLevel), "Existing Year 3 profile should be detected as unsupported");
  assert(
    getYearLevelAvailabilityMessage(existingUnsupportedProfile.yearLevel).includes("Coming soon"),
    "Existing unsupported-year profile should receive availability messaging",
  );
  assert(JSON.stringify(existingUnsupportedProfile) === before, "Availability checks must not mutate existing unsupported-year profiles");

  assert(parseSupportedMvpYearLevel(1) === 1, "Intentional switch from unsupported year to Year 1 should be accepted");

  const activeOptions = yearLevelOptions.filter((option) => option.availability === "active").map((option) => option.value);
  assert(JSON.stringify(activeOptions) === "[1]", "Only Year 1 should be active in the MVP options");

  console.log("MVP year availability tests passed: 22");
} finally {
  unlinkSync(tempPath);
}
