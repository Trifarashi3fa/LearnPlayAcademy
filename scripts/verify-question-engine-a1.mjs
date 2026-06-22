import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeQuestion } from "../lib/question-engine/normalize-question.ts";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const manifestPath = path.join(projectRoot, "generated", "active-content-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const questions = Object.values(manifest.questionsByLevel).flat();

if (questions.length !== 100) {
  throw new Error(`Expected 100 approved questions, received ${questions.length}.`);
}

const normalized = questions.map((question) => normalizeQuestion(question));
for (let index = 0; index < questions.length; index += 1) {
  const source = questions[index];
  const result = normalized[index];
  if (result.interactionType !== "multiple-choice") {
    throw new Error(`${source.questionId}: expected multiple-choice normalization.`);
  }
  if (JSON.stringify(result.interaction.choices.map((choice) => choice.label)) !== JSON.stringify(source.options)) {
    throw new Error(`${source.questionId}: visible option labels changed.`);
  }
  const correctChoice = result.interaction.choices.find(
    (choice) => choice.id === result.answerSpec.correctChoiceId,
  );
  if (!correctChoice || correctChoice.label.trim() !== String(source.correctAnswer).trim()) {
    throw new Error(`${source.questionId}: correctAnswer did not map to the generated choice ID.`);
  }
}

console.log("Question Engine A1 verification passed.");
console.log(`Normalized questions: ${normalized.length}`);
console.log("Interaction type: multiple-choice (100)");
console.log("Skipped questions: 0");
console.log("Visible option label changes: 0");
console.log("Invalid correct-answer mappings: 0");