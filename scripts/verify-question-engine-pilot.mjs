import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const pilotPath = path.join(
  repoRoot,
  "content",
  "question-bank",
  "mathematics",
  "year-1",
  "forest-world",
  "pilot-non-mcq.json",
);
const manifestPath = path.join(repoRoot, "generated", "active-content-manifest.json");

const pilot = JSON.parse(fs.readFileSync(pilotPath, "utf8"));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const fail = (message) => {
  throw new Error(message);
};

if (!Array.isArray(pilot)) {
  fail("Pilot file must be an array.");
}

if (pilot.length !== 3) {
  fail(`Expected 3 pilot questions, found ${pilot.length}.`);
}

const expectedTypes = new Set(["true-false", "count-objects", "fill-in-blank"]);
const actualTypes = new Set(pilot.map((question) => question.interactionType));

for (const type of expectedTypes) {
  if (!actualTypes.has(type)) {
    fail(`Missing pilot interaction type: ${type}`);
  }
}

for (const type of actualTypes) {
  if (!expectedTypes.has(type)) {
    fail(`Unexpected pilot interaction type: ${type}`);
  }
}

const ids = new Set();
for (const question of pilot) {
  if (!question.questionId) {
    fail("Pilot question is missing questionId.");
  }
  if (ids.has(question.questionId)) {
    fail(`Duplicate pilot questionId: ${question.questionId}`);
  }
  ids.add(question.questionId);

  if (question.subject !== "mathematics") {
    fail(`${question.questionId} must use subject mathematics.`);
  }
  if (question.year !== 1) {
    fail(`${question.questionId} must use year 1.`);
  }
  if (question.worldId !== "forest-world") {
    fail(`${question.questionId} must use worldId forest-world.`);
  }
  if (question.status === "active") {
    fail(`${question.questionId} must not be active.`);
  }
  if (question.mvpStatus !== "pilot") {
    fail(`${question.questionId} must use mvpStatus pilot.`);
  }
  if (question.approvedBy === "Fara") {
    fail(`${question.questionId} must not be approved for active use.`);
  }
  if (question.activeManifestEligible !== false) {
    fail(`${question.questionId} must set activeManifestEligible to false.`);
  }
}

const manifestQuestions = Object.values(manifest.questionsByLevel ?? {})
  .flat()
  .map((question) => question.questionId);
const manifestQuestionIds = new Set(manifestQuestions);

for (const questionId of ids) {
  if (manifestQuestionIds.has(questionId)) {
    fail(`Pilot question appeared in active manifest: ${questionId}`);
  }
}

if (manifest.questionCount !== 100) {
  fail(`Active manifest questionCount changed: ${manifest.questionCount}`);
}

console.log("Question Engine pilot verification passed.");
console.log("Pilot questions: 3");
console.log("Interaction types: true-false, count-objects, fill-in-blank");
console.log("Active manifest question count: 100");