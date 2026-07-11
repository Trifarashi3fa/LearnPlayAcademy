import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { importQuestionAssets } from "./import-question-assets.mjs";

const {
  selectForestL01RandomSession,
  summarizeRendererSupport,
} = await import("../lib/question-assets/random-question-pool.ts");

const headers = [
  "Question ID",
  "Question Pool Version",
  "Status",
  "Subject",
  "Year",
  "World",
  "Level",
  "Topic",
  "Subtopic",
  "Learning Objective",
  "Difficulty",
  "Question Type",
  "Question",
  "Visual Object",
  "Visual Description",
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Correct Answer",
  "Step 1",
  "Step 2",
  "Step 3",
  "Final Explanation",
  "LearnBot Tip",
  "Assessment Eligible",
  "Curriculum Alignment",
  "Estimated Time (Seconds)",
  "Visual Asset Required",
  "Voice Script",
  "Reviewer",
  "Review Status",
  "Review Date",
  "Version Notes",
];

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function makeRow(overrides = {}) {
  return {
    "Question ID": "FW-Y1-L01-Q001",
    "Question Pool Version": "1.0",
    Status: "Review",
    Subject: "Mathematics",
    Year: "1",
    World: "Forest World",
    Level: "1",
    Topic: "Numbers 1-10",
    Subtopic: "Counting",
    "Learning Objective": "Count objects.",
    Difficulty: "Easy",
    "Question Type": "Multiple Choice",
    Question: "How many apples are there?",
    "Visual Object": "apple",
    "Visual Description": "Show 3 apples.",
    "Option A": "2",
    "Option B": "3",
    "Option C": "4",
    "Option D": "",
    "Correct Answer": "3",
    "Step 1": "Look at the apples.",
    "Step 2": "Count each apple.",
    "Step 3": "Match the number.",
    "Final Explanation": "There are 3 apples.",
    "LearnBot Tip": "Point as you count.",
    "Assessment Eligible": "Yes",
    "Curriculum Alignment": "Year 1",
    "Estimated Time (Seconds)": "30",
    "Visual Asset Required": "Yes",
    "Voice Script": "Count the apples.",
    Reviewer: "",
    "Review Status": "Pending",
    "Review Date": "",
    "Version Notes": "",
    ...overrides,
  };
}

function writeCsv(rows) {
  const file = path.join(os.tmpdir(), `learnplay-import-test-${Date.now()}-${Math.random()}.csv`);
  const lines = [headers.join(","), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","))];
  fs.writeFileSync(file, `${lines.join("\n")}\n`, "utf8");
  return file;
}

function run(rows, sheet = "Forest L01") {
  return importQuestionAssets({ filePath: writeCsv(rows), sheet });
}

{
  const result = run([makeRow()]);
  assert.equal(result.report.totalSourceRows, 1);
  assert.equal(result.report.importedRows, 1);
  assert.equal(result.rowsToWrite[0].Options, "2|3|4");
  assert.equal(result.report.publishableRows, 0);
  assert.equal(result.report.errorCount, 0);
}

{
  const result = run([makeRow({ "Question ID": "FW-Y1-L02-Q001", Level: "2" })]);
  assert.equal(result.report.sourceMismatch.hasMismatch, true);
  assert.equal(result.report.importedRows, 0);
}

{
  const result = run([makeRow({ "Question Type": "Tap Correct Group", "Option A": "Group A: 13 leaves", "Option B": "Group B: 14 leaves", "Option C": "Group C: 15 leaves", "Correct Answer": "Group B: 14 leaves" })]);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.rowsToWrite[0].Options, "Group A: 13 leaves|Group B: 14 leaves|Group C: 15 leaves");
}

{
  const result = run([makeRow({ "Question Type": "Count & Type", "Option A": "", "Option B": "", "Option C": "", "Correct Answer": "5" })]);
  assert.equal(result.report.errorCount, 0);
}

{
  const result = run([makeRow({ "Question Type": "Fill Missing Number", "Option A": "", "Option B": "", "Option C": "", "Visual Description": "", "Correct Answer": "4" })]);
  assert.equal(result.report.errorCount, 0);
}

{
  const result = run([makeRow({ "Question Type": "True or False", "Option A": "", "Option B": "", "Option C": "", "Visual Description": "", "Correct Answer": "True" })]);
  assert.equal(result.report.errorCount, 0);
}

{
  const result = run([makeRow({ "Question Type": "Match Pairs", "Option A": "1-one", "Option B": "2-two", "Correct Answer": "1-one;2-two" })]);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.report.rendererLimitations.length, 1);
}

{
  const result = run([makeRow(), makeRow()]);
  assert.ok(result.report.errorCount > 0);
  assert.ok(result.report.duplicateIds.length > 0);
}

{
  const result = run([makeRow({ "Correct Answer": "" })]);
  assert.ok(result.report.errorCount > 0);
}

{
  const rows = Array.from({ length: 30 }, (_, index) => makeRow({ "Question ID": `FW-Y1-L01-Q${String(index + 1).padStart(3, "0")}`, Question: `Question ${index + 1}` }));
  const result = run(rows);
  assert.equal(result.report.totalSourceRows, 30);
  assert.equal(result.report.importedRows, 30);
  assert.equal(result.report.publishableRows, 0);
  assert.equal(result.report.rejectedRows, 0);
}

{
  const rows = Array.from({ length: 30 }, (_, index) => {
    const questionNumber = index + 1;
    const questionType =
      index < 10
        ? "Multiple Choice"
        : index < 20
          ? "Fill Missing Number"
          : "Match Pairs";

    return makeRow({
      "Question ID": `FW-Y1-L01-Q${String(questionNumber).padStart(3, "0")}`,
      Status: "Review",
      "Review Status": "Pending",
      Year: "Year 1",
      Level: "Level 01",
      "Question Type": questionType,
      Question: `Imported Review/Pending question ${questionNumber}`,
      "Option A": questionType === "Match Pairs" ? "1-one" : "1",
      "Option B": questionType === "Match Pairs" ? "2-two" : "2",
      "Option C": questionType === "Match Pairs" ? "" : "3",
      "Correct Answer": questionType === "Match Pairs" ? "1-one;2-two" : "2",
    });
  });
  const result = run(rows);
  const validQuestionIds = result.rowsToWrite.map((row) => row["Question ID"]);
  const normalizedQuestions = result.rowsToWrite.map((row) => ({ questionId: row["Question ID"] }));
  const session = selectForestL01RandomSession({
    questions: normalizedQuestions,
    assetRows: result.rowsToWrite,
    validQuestionIds,
    seed: "review-pending-random-pool-test",
  });
  const rendererSummary = summarizeRendererSupport(result.rowsToWrite);

  assert.equal(result.report.importedRows, 30);
  assert.equal(result.report.publishableRows, 0);
  assert.equal(session.eligibleCount, 30);
  assert.equal(session.selectedQuestions.length, 10);
  assert.equal(new Set(session.selectedQuestionIds).size, 10);
  assert.equal(rendererSummary.unsupported.length, 0);
  assert.equal(rendererSummary.previewFallback.find((item) => item.questionType === "Match Pairs")?.count, 10);
}

console.log("Question asset import tests passed.");
