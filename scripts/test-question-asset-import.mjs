import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { importQuestionAssets } from "./import-question-assets.mjs";

const {
  selectForestL01RandomSession,
  selectForestYear1RandomSession,
  summarizeRendererSupport,
} = await import("../lib/question-assets/random-question-pool.ts");
const {
  buildLegacyMatchPairs,
  createInitialMatchPairsState,
  isMatchPairsComplete,
  parseMatchPairsState,
  selectMatchPairItem,
  serializeMatchPairsState,
} = await import("../lib/question-engine/match-pairs.ts");
const {
  discoverYear1ForestCsvFiles,
  processYear1ForestBatch,
} = await import("./import-year1-forest-question-assets.mjs");
const {
  buildCurriculumQaSummary,
} = await import("../lib/question-assets/curriculum-qa.ts");
const {
  canTransitionQuestionAssetStatus,
  questionAssetStatusTransitions,
  isSupportedQuestionAssetStatus,
  normalizeQuestionAssetStatus,
} = await import("../data/question-asset-qa.ts");
const {
  englishSourceRowsToQuestionAssetRows,
  parseQuestionAssetCsv,
} = await import("../lib/question-assets/english-source-assets.ts");

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

const englishHeaders = [
  "Question ID",
  "Subject",
  "Year",
  "World",
  "Level",
  "Topic",
  "Learning Objective",
  "Curriculum Alignment",
  "Cambridge Alignment",
  "Question Type",
  "Question",
  "Instructions",
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Correct Answer",
  "Explanation",
  "LearnBot Tip",
  "Voice Script",
  "Visual Type",
  "Visual Description",
  "Difficulty",
  "XP",
  "Status",
  "Version",
  "QA Notes",
];

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function makeRow(overrides = {}) {
  return {
    "Question ID": "FW-Y1-L01-Q001",
    "Question Pool Version": "1.0",
    Status: "Approved",
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
  writeCsvFile(file, rows);
  return file;
}

function writeCsvFile(file, rows) {
  writeCsvFileWithHeaders(file, headers, rows);
}

function writeCsvFileWithHeaders(file, csvHeaders, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const lines = [csvHeaders.join(","), ...rows.map((row) => csvHeaders.map((header) => csvEscape(row[header])).join(","))];
  fs.writeFileSync(file, `${lines.join("\n")}\n`, "utf8");
}

function makeTempDir(slug) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `learnplay-${slug}-`));
}

function writeForestCsv(importsDir, level, rows) {
  const filePath = path.join(importsDir, `forest-l${String(level).padStart(2, "0")}.csv`);
  writeCsvFile(filePath, rows);
  return filePath;
}

function run(rows, sheet = "Forest L01") {
  return importQuestionAssets({ filePath: writeCsv(rows), sheet });
}

function makeEnglishRow(overrides = {}) {
  return {
    "Question ID": "ENG-Y1-L01-Q001",
    Subject: "English",
    Year: "1",
    World: "Forest World",
    Level: "1",
    Topic: "Letters",
    "Learning Objective": "Match uppercase and lowercase letters.",
    "Curriculum Alignment": "KSSR Year 1 English early literacy",
    "Cambridge Alignment": "Cambridge Primary Stage 1 early reading",
    "Question Type": "Multiple Choice",
    Question: "Which lowercase letter matches A?",
    Instructions: "Look at the capital letter and choose the matching small letter.",
    "Option A": "a",
    "Option B": "b",
    "Option C": "c",
    "Option D": "d",
    "Correct Answer": "a",
    Explanation: "Uppercase A matches lowercase a.",
    "LearnBot Tip": "Look for the same letter shape.",
    "Voice Script": "Which lowercase letter matches A?",
    "Visual Type": "letter-card",
    "Visual Description": "Show a large uppercase A with four lowercase letter cards.",
    Difficulty: "Easy",
    XP: "10",
    Status: "Approved",
    Version: "1.0.0",
    "QA Notes": "Template test row.",
    ...overrides,
  };
}

function writeEnglishCsv(rows) {
  const file = path.join(os.tmpdir(), `learnplay-english-import-test-${Date.now()}-${Math.random()}.csv`);
  writeCsvFileWithHeaders(file, englishHeaders, rows);
  return file;
}

function runEnglish(rows, overrides = {}) {
  return importQuestionAssets({
    filePath: writeEnglishCsv(rows),
    sheet: "Forest L01",
    subject: "english",
    year: 1,
    world: "forest-world",
    level: 1,
    ...overrides,
  });
}

{
  const result = run([makeRow()]);
  assert.equal(result.report.totalSourceRows, 1);
  assert.equal(result.report.importedRows, 1);
  assert.equal(result.rowsToWrite[0].Options, "2|3|4");
  assert.equal(result.report.publishableRows, 0);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.report.skippedRows, 0);
}

{
  const templateHeader = fs.readFileSync(path.resolve("ENGLISH_QUESTION_TEMPLATE.csv"), "utf8").trim().split(",");
  assert.deepEqual(templateHeader, englishHeaders);
}

{
  const result = runEnglish([makeEnglishRow()]);
  assert.equal(result.report.totalSourceRows, 1);
  assert.equal(result.report.importedRows, 1);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.rowsToWrite[0].Subject, "English");
  assert.equal(result.rowsToWrite[0].World, "Forest World");
  assert.ok(result.report.outputJsonPath.includes("content\\question-assets\\english\\year-1\\forest-world") || result.report.outputJsonPath.includes("content/question-assets/english/year-1/forest-world"));
  assert.ok(result.report.reportJsonPath.includes("generated\\question-assets\\english") || result.report.reportJsonPath.includes("generated/question-assets/english"));
}

{
  const result = runEnglish([
    makeEnglishRow({
      Status: "Review",
      "Question ID": "ENG-Y1-L01-Q999",
      "Question Type": "Drag and Drop (Future)",
    }),
  ]);
  assert.equal(result.report.importedRows, 0);
  assert.equal(result.report.skippedRows, 1);
  assert.equal(result.report.rejectedRows, 0);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.report.skippedRowDetails[0].questionId, "ENG-Y1-L01-Q999");
}

{
  const result = runEnglish([
    makeEnglishRow({
      "Question Type": "Drag and Drop (Future)",
    }),
  ]);
  assert.equal(result.report.importedRows, 0);
  assert.equal(result.report.rejectedRows, 1);
  assert.ok(result.report.errorCount > 0);
}

{
  const result = runEnglish([makeEnglishRow(), makeEnglishRow()]);
  assert.equal(result.report.importedRows, 0);
  assert.ok(result.report.errorCount > 0);
  assert.ok(result.report.duplicateIds.length > 0);
}

{
  const result = runEnglish([
    makeEnglishRow({
      Subject: "Mathematics",
    }),
  ]);
  assert.equal(result.report.importedRows, 0);
  assert.ok(result.report.errorCount > 0);
  assert.ok(result.report.issues.some((issue) => issue.field === "Subject"));
}

{
  const rows = [
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q001", "Question Type": "Multiple Choice", "Correct Answer": "a" }),
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q002", "Question Type": "Tap Correct", "Option A": "cat", "Option B": "dog", "Option C": "", "Option D": "", "Correct Answer": "cat" }),
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q003", "Question Type": "Fill Missing Letter", Question: "Fill the missing letter: c_t", "Option A": "", "Option B": "", "Option C": "", "Option D": "", "Correct Answer": "a" }),
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q004", "Question Type": "Fill Missing Word", Question: "I see a ____.", "Option A": "", "Option B": "", "Option C": "", "Option D": "", "Correct Answer": "cat" }),
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q005", "Question Type": "Text Input", Question: "Type the word cat.", "Option A": "", "Option B": "", "Option C": "", "Option D": "", "Correct Answer": "cat" }),
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q006", "Question Type": "True or False", Question: "A is an uppercase letter.", "Option A": "", "Option B": "", "Option C": "", "Option D": "", "Correct Answer": "True" }),
    makeEnglishRow({ "Question ID": "ENG-Y1-L01-Q007", "Question Type": "Match Pairs", "Option A": "A=a", "Option B": "B=b", "Option C": "", "Option D": "", "Correct Answer": "A=a;B=b" }),
  ];
  const result = runEnglish(rows);
  const rendererSummary = summarizeRendererSupport(result.rowsToWrite);
  assert.equal(result.report.importedRows, rows.length);
  assert.equal(result.report.errorCount, 0);
  assert.equal(rendererSummary.unsupported.length, 0);
  assert.equal(result.report.outputJsonPath.includes("active-content-manifest"), false);
  assert.equal(result.report.reportJsonPath.includes("active-content-manifest"), false);
}

{
  assert.equal(normalizeQuestionAssetStatus(" review "), "Review");
  assert.equal(isSupportedQuestionAssetStatus("Approved"), true);
  assert.equal(isSupportedQuestionAssetStatus("Pending"), false);
  assert.equal(canTransitionQuestionAssetStatus("Draft", "Review"), true);
  assert.equal(canTransitionQuestionAssetStatus("Review", "Approved"), true);
  assert.equal(canTransitionQuestionAssetStatus("Review", "Draft"), false);
  assert.deepEqual(questionAssetStatusTransitions.Review, ["Needs Revision", "Approved", "Rejected", "Archived"]);
}

{
  const csvText = [
    englishHeaders.join(","),
    englishHeaders.map((header) => csvEscape(makeEnglishRow({ Status: "Review" })[header])).join(","),
  ].join("\n");
  const sourceRows = parseQuestionAssetCsv(csvText);
  const assetRows = englishSourceRowsToQuestionAssetRows(sourceRows);
  assert.equal(assetRows.length, 1);
  assert.equal(assetRows[0].Status, "Review");
  assert.equal(assetRows[0].Subject, "English");
  assert.equal(assetRows[0]["Review Status"], "Review");
}

{
  const imported = run([
    makeRow({
      "Question ID": "FW-Y1-L01-Q101",
      Question: "Repeated wording test?",
      "Final Explanation": "Repeated explanation.",
      "LearnBot Tip": "Repeated tip.",
      "Option A": "same distractor",
      "Option B": "3",
      "Option C": "other distractor",
      "Correct Answer": "3",
    }),
    makeRow({
      "Question ID": "FW-Y1-L01-Q102",
      Question: "Repeated wording test?",
      "Final Explanation": "Repeated explanation.",
      "LearnBot Tip": "Repeated tip.",
      "Option A": "same distractor",
      "Option B": "3",
      "Option C": "different distractor",
      "Correct Answer": "3",
    }),
  ]).rowsToWrite;
  const summary = buildCurriculumQaSummary(imported, "QA duplicate test");
  assert.equal(summary.totalRows, 2);
  assert.equal(summary.duplicates.questionText.length, 1);
  assert.equal(summary.duplicates.explanations.length, 1);
  assert.equal(summary.duplicates.learnBotTips.length, 1);
  assert.equal(summary.approvalReadiness.structurallyValidRows, 2);
}

{
  const imported = run([
    makeRow({
      "Question ID": "FW-Y1-L01-Q201",
      "Learning Objective": "",
      "Curriculum Alignment": "",
      "Voice Script": "",
    }),
  ]).rowsToWrite;
  const summary = buildCurriculumQaSummary(imported, "QA coverage test");
  assert.equal(summary.curriculumCoverage.missingCurriculumAlignment, 1);
  assert.equal(summary.curriculumCoverage.missingLearningObjective, 1);
  assert.equal(summary.curriculumCoverage.missingVoiceScript, 1);
  assert.ok(summary.validationErrors.length > 0);
}

{
  const imported = run([
    makeRow({ "Question ID": "FW-Y1-L01-Q301" }),
  ]).rowsToWrite.map((row) => ({ ...row, Status: "Pending" }));
  const summary = buildCurriculumQaSummary(imported, "QA unsupported status test");
  assert.equal(summary.statusCounts.Unsupported, 1);
  assert.ok(summary.qaWarnings.some((issue) => issue.field === "Status" && issue.message.includes("Unsupported QA status")));
}
{
  const result = run([makeRow({ Status: "  approved  " })]);
  assert.equal(result.report.importedRows, 1);
  assert.equal(result.report.errorCount, 0);
}

{
  const result = run([makeRow({ "Question Type": "Drag and Drop (Future)" })]);
  assert.equal(result.report.importedRows, 0);
  assert.equal(result.report.rejectedRows, 1);
  assert.ok(result.report.errorCount > 0);
}

{
  const result = run([
    makeRow({
      Status: "Review",
      "Question Type": "Drag and Drop (Future)",
      "Question ID": "FW-Y1-L01-Q999",
    }),
  ]);
  assert.equal(result.report.importedRows, 0);
  assert.equal(result.report.skippedRows, 1);
  assert.equal(result.report.rejectedRows, 0);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.report.skippedRowDetails[0].questionId, "FW-Y1-L01-Q999");
  assert.equal(result.report.skippedRowDetails[0].status, "Review");
  assert.equal(result.report.skippedRowDetails[0].questionType, "Drag and Drop (Future)");
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
  const result = run([makeRow({ "Question Type": "Tap Correct Group", "Option A": "Group A: 3 apples", "Option B": "Group B: 5 apples", "Option C": "", "Correct Answer": "Group B" })]);
  assert.equal(result.report.errorCount, 0);
}

{
  const result = run([makeRow({ "Question Type": "Tap Correct Group", "Option A": "Group A: 4 ducks", "Option B": "Group B: 4 ducks", "Option C": "", "Correct Answer": "Both" })]);
  assert.equal(result.report.errorCount, 0);
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
  const result = run([makeRow({ "Question Type": "Match Pairs", "Option A": "1=one", "Option B": "2=two", "Correct Answer": "1=one;2=two" })]);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.report.rendererLimitations.length, 0);
}

{
  const result = run([makeRow({ "Question Type": "Match Pairs", "Option A": "1 one", "Option B": "2 two", "Correct Answer": "1 one;2 two" })]);
  assert.equal(result.report.errorCount, 0);
  assert.equal(result.report.rendererLimitations.length, 1);
}

{
  const pairResult = buildLegacyMatchPairs({
    options: ["1=one", "2=two", "3=three"],
    correctAnswer: "1=one;2=two;3=three",
    questionId: "match-pairs-state-test",
  });
  assert.equal(pairResult.pairs.length, 3);

  const question = {
    questionId: "match-pairs-state-test",
    prompt: "Match numbers and words.",
    interactionType: "match-pairs",
    interaction: {
      pairs: pairResult.pairs,
      leftItems: pairResult.pairs.map((pair) => pair.left),
      rightItems: pairResult.pairs.map((pair) => pair.right),
      minPairsToComplete: pairResult.pairs.length,
    },
    answerSpec: { pairIds: pairResult.pairs.map((pair) => pair.id) },
    gradingSpec: { strategy: "exact-pairs" },
    explanation: "Match each number to its word.",
    visualMetadata: null,
    accessibilityText: "Match numbers and words.",
  };

  let state = createInitialMatchPairsState();
  state = selectMatchPairItem({ question, state, side: "left", itemId: pairResult.pairs[0].left.id });
  assert.equal(state.selectedLeftId, pairResult.pairs[0].left.id);
  state = selectMatchPairItem({ question, state, side: "right", itemId: pairResult.pairs[1].right.id });
  assert.equal(state.lastResult, "incorrect");
  assert.equal(state.matchedPairIds.length, 0);

  state = selectMatchPairItem({ question, state, side: "right", itemId: pairResult.pairs[0].right.id });
  assert.equal(state.lastResult, "correct");
  assert.deepEqual(state.matchedPairIds, [pairResult.pairs[0].id]);

  const lockedState = selectMatchPairItem({ question, state, side: "left", itemId: pairResult.pairs[0].left.id });
  assert.deepEqual(lockedState, state);

  state = selectMatchPairItem({ question, state, side: "left", itemId: pairResult.pairs[1].left.id });
  state = selectMatchPairItem({ question, state, side: "right", itemId: pairResult.pairs[1].right.id });
  state = selectMatchPairItem({ question, state, side: "left", itemId: pairResult.pairs[2].left.id });
  state = selectMatchPairItem({ question, state, side: "right", itemId: pairResult.pairs[2].right.id });
  assert.equal(isMatchPairsComplete(question, state.matchedPairIds), true);
  assert.equal(state.completed, true);

  const parsed = parseMatchPairsState(serializeMatchPairsState(state));
  assert.equal(parsed?.completed, true);
  assert.equal(parsed?.matchedPairIds.length, 3);
}

{
  const pairResult = buildLegacyMatchPairs({
    options: ["1=one", "1=one", "2=two"],
    correctAnswer: "1=one;1=one;2=two",
    questionId: "match-pairs-duplicate-test",
  });
  assert.equal(pairResult.pairs.length, 2);
  assert.ok(pairResult.warnings.some((warning) => warning.includes("duplicate")));
}

{
  const pairResult = buildLegacyMatchPairs({
    options: ["one", "two"],
    correctAnswer: "one;two",
    questionId: "match-pairs-malformed-test",
  });
  assert.equal(pairResult.pairs.length, 0);
  assert.ok(pairResult.warnings.some((warning) => warning.includes("parseable")));
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
      Status: "Approved",
      "Review Status": "Pending",
      Year: "Year 1",
      Level: "Level 01",
      "Question Type": questionType,
      Question: `Imported Review/Pending question ${questionNumber}`,
      "Option A": questionType === "Match Pairs" ? "1=one" : "1",
      "Option B": questionType === "Match Pairs" ? "2=two" : "2",
      "Option C": questionType === "Match Pairs" ? "" : "3",
      "Correct Answer": questionType === "Match Pairs" ? "1=one;2=two" : "2",
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
  assert.equal(result.report.skippedRows, 0);
  assert.equal(session.eligibleCount, 30);
  assert.equal(session.selectedQuestions.length, 10);
  assert.equal(new Set(session.selectedQuestionIds).size, 10);
  assert.equal(rendererSummary.unsupported.length, 0);
  assert.equal(rendererSummary.previewFallback.find((item) => item.questionType === "Match Pairs")?.count, undefined);
  assert.equal(rendererSummary.supported.find((item) => item.questionType === "Match Pairs")?.count, 10);
}

{
  const importsDir = makeTempDir("batch-discovery");
  writeForestCsv(importsDir, 2, [makeRow({ "Question ID": "FW-Y1-L02-Q001", Level: "2" })]);
  writeForestCsv(importsDir, 1, [makeRow()]);
  const discovered = discoverYear1ForestCsvFiles(importsDir);
  assert.deepEqual(discovered.map((item) => item.level), [1, 2]);
}

{
  const importsDir = makeTempDir("batch-success-imports");
  const outputDir = makeTempDir("batch-success-output");
  const reportDir = makeTempDir("batch-success-report");
  writeForestCsv(importsDir, 1, [makeRow()]);
  writeForestCsv(importsDir, 2, [makeRow({ "Question ID": "FW-Y1-L02-Q001", Level: "2", Question: "Level 2 question" })]);
  const batch = processYear1ForestBatch({
    importsDir,
    outputDir,
    reportDir,
    requireAllLevels: false,
  });
  assert.equal(batch.failed, false);
  assert.equal(batch.totals.levelsPassed, 2);
  assert.equal(batch.totals.importedRows, 2);
  assert.equal(batch.totals.skippedRows, 0);
  assert.ok(fs.existsSync(path.join(outputDir, "forest-l01-imported.json")));
  assert.ok(fs.existsSync(path.join(outputDir, "forest-l02-imported.json")));
  assert.ok(fs.existsSync(path.join(reportDir, "year-1-forest-batch-import-report.json")));
}

{
  const importsDir = makeTempDir("batch-missing-levels");
  writeForestCsv(importsDir, 1, [makeRow()]);
  assert.throws(
    () => processYear1ForestBatch({ importsDir, outputDir: makeTempDir("batch-missing-output"), reportDir: makeTempDir("batch-missing-report") }),
    /Missing expected Forest CSV file/,
  );
}

{
  const importsDir = makeTempDir("batch-mismatch-imports");
  const outputDir = makeTempDir("batch-mismatch-output");
  const reportDir = makeTempDir("batch-mismatch-report");
  const previousOutput = path.join(outputDir, "forest-l02-imported.json");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(previousOutput, "previous valid output", "utf8");
  writeForestCsv(importsDir, 1, [makeRow()]);
  writeForestCsv(importsDir, 2, [makeRow({ "Question ID": "FW-Y1-L03-Q001", Level: "3", Question: "Wrong level question" })]);
  const batch = processYear1ForestBatch({
    importsDir,
    outputDir,
    reportDir,
    requireAllLevels: false,
  });
  assert.equal(batch.failed, true);
  assert.equal(batch.results[1].status, "FAIL");
  assert.equal(fs.readFileSync(previousOutput, "utf8"), "previous valid output");
}

{
  const importsDir = makeTempDir("batch-duplicate-imports");
  writeForestCsv(importsDir, 1, [makeRow(), makeRow()]);
  const batch = processYear1ForestBatch({
    importsDir,
    outputDir: makeTempDir("batch-duplicate-output"),
    reportDir: makeTempDir("batch-duplicate-report"),
    requireAllLevels: false,
  });
  assert.equal(batch.failed, true);
  assert.equal(batch.results[0].status, "FAIL");
  assert.ok(batch.results[0].errorCount > 0);
}

{
  const importsDir = makeTempDir("batch-empty-imports");
  writeForestCsv(importsDir, 1, []);
  const batch = processYear1ForestBatch({
    importsDir,
    outputDir: makeTempDir("batch-empty-output"),
    reportDir: makeTempDir("batch-empty-report"),
    requireAllLevels: false,
  });
  assert.equal(batch.failed, true);
  assert.equal(batch.results[0].importedRows, 0);
}

{
  const rows = Array.from({ length: 12 }, (_, index) =>
    makeRow({
      "Question ID": `FW-Y1-L02-Q${String(index + 1).padStart(3, "0")}`,
      Year: "Year 1",
      Level: "Level 02",
      Question: `Level 2 random question ${index + 1}`,
    }),
  );
  const result = run(rows, "Forest L02");
  const questions = result.rowsToWrite.map((row) => ({ questionId: row["Question ID"] }));
  const session = selectForestYear1RandomSession({
    level: 2,
    questions,
    assetRows: result.rowsToWrite,
    validQuestionIds: result.rowsToWrite.map((row) => row["Question ID"]),
    seed: "level-2-only-test",
  });
  assert.equal(session.eligibleCount, 12);
  assert.equal(session.selectedQuestions.length, 10);
  assert.equal(new Set(session.selectedQuestionIds).size, 10);
  assert.ok(session.selectedQuestionIds.every((id) => id.includes("-L02-")));
}

console.log("Question asset import tests passed.");
