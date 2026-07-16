import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const sourcePath = path.resolve("lib/progress/reset-progress-safety.ts");
const source = readFileSync(sourcePath, "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
}).outputText;

const tempPath = path.join(tmpdir(), `learnplay-reset-safety-${process.pid}-${Date.now()}.mjs`);
writeFileSync(tempPath, transpiled);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const {
    canSubmitProgressReset,
    getProgressResetImpact,
    getSyncedProgressSafetyMessage,
  } = await import(pathToFileURL(tempPath).href);

  assert(!canSubmitProgressReset({
    dialogOpen: false,
    secondActionConfirmed: true,
    processing: false,
  }), "Cancel/closed dialog must not run reset");

  assert(!canSubmitProgressReset({
    dialogOpen: true,
    secondActionConfirmed: false,
    processing: false,
  }), "First dialog step must not run reset");

  assert(canSubmitProgressReset({
    dialogOpen: true,
    secondActionConfirmed: true,
    processing: false,
  }), "Final confirmation should allow one reset");

  assert(!canSubmitProgressReset({
    dialogOpen: true,
    secondActionConfirmed: true,
    processing: true,
  }), "Processing state must block repeated reset submissions");

  const impact = getProgressResetImpact("clear-local-device-data");
  assert(impact.localProgress, "Local device data should be affected");
  assert(impact.xpStarsLevelsAttemptsRewards, "Local XP, stars, levels, attempts, and rewards should be affected");
  assert(!impact.syncedChildProgress, "Synced child progress must not be affected by local-only reset");
  assert(!impact.childProfile, "Child profile must not be affected by local-only reset");

  const syncedMessage = getSyncedProgressSafetyMessage("synced");
  assert(syncedMessage.includes("not deleted"), "Synced safety message must clearly say saved child progress is not deleted");

  const errorMessage = getSyncedProgressSafetyMessage("error");
  assert(errorMessage.includes("only clear local"), "Error safety message must not falsely report synced progress deletion or success");

  console.log("MVP reset safety tests passed: 7");
} finally {
  unlinkSync(tempPath);
}
