import { createHash } from "node:crypto";
import { readFile, readdir, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const questionBankRoot = path.join(
  projectRoot,
  "content",
  "question-bank",
  "mathematics",
  "year-1",
  "forest-world",
);
const generatedRoot = path.join(projectRoot, "generated");
const manifestPath = path.join(generatedRoot, "active-content-manifest.json");

const REQUIRED_FIELDS = [
  "questionId",
  "curriculumTopicId",
  "subject",
  "year",
  "worldId",
  "level",
  "nodeType",
  "packageType",
  "mvpStatus",
  "status",
  "approvedBy",
  "approvalDate",
  "version",
  "effectiveDate",
  "question",
  "options",
  "correctAnswer",
  "explanation",
  "xpReward",
  "visualMetadata",
];

const EXPECTED_NODE_TYPES = new Map([
  [1, "Learn"],
  [2, "Practice"],
  [3, "Mini Game"],
  [4, "Learn"],
  [5, "Practice"],
  [6, "Mini Game"],
  [7, "Learn"],
  [8, "Review"],
  [9, "Challenge"],
  [10, "Boss"],
]);

const errors = [];
const warnings = [];
const records = [];

function addError(location, message) {
  errors.push(`${location}: ${message}`);
}

function isFilled(value) {
  return value !== null && value !== undefined && (typeof value !== "string" || value.trim() !== "");
}

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function hasPlaceholder(value) {
  return typeof value !== "string" || /\b(?:placeholder|lorem ipsum|todo|tbd|coming soon)\b/i.test(value);
}

function validateQuestion(question, fileName, expectedLevel, index) {
  const location = `${fileName}[${index}]${question?.questionId ? ` (${question.questionId})` : ""}`;
  if (!question || typeof question !== "object" || Array.isArray(question)) {
    addError(location, "question must be an object");
    return;
  }

  for (const field of REQUIRED_FIELDS) {
    if (!Object.hasOwn(question, field) || !isFilled(question[field])) {
      addError(location, `required field ${field} is missing or empty`);
    }
  }

  if (question.subject !== "mathematics") addError(location, "subject must be mathematics");
  if (question.year !== 1) addError(location, "year must be 1");
  if (question.worldId !== "forest-world") addError(location, "worldId must be forest-world");
  if (question.level !== expectedLevel) addError(location, `level must match level-${expectedLevel}.json`);
  if (question.nodeType !== EXPECTED_NODE_TYPES.get(expectedLevel)) {
    addError(location, `nodeType must be ${EXPECTED_NODE_TYPES.get(expectedLevel)} for level ${expectedLevel}`);
  }
  if (question.packageType !== "mvp-free") addError(location, "packageType must be mvp-free");
  if (question.mvpStatus !== "active-pilot") addError(location, "mvpStatus must be active-pilot");
  if (question.status !== "active") addError(location, "status must be active");
  if (question.approvedBy !== "Fara") addError(location, "approvedBy must be Fara");
  if (!isIsoDate(question.approvalDate)) addError(location, "approvalDate must be a filled YYYY-MM-DD date");
  if (!isIsoDate(question.effectiveDate)) addError(location, "effectiveDate must be a filled YYYY-MM-DD date");
  if (hasPlaceholder(question.question) || question.question.trim().length < 5) {
    addError(location, "question is blank, incomplete, or placeholder content");
  }
  if (hasPlaceholder(question.explanation) || question.explanation.trim().length < 8) {
    addError(location, "explanation is blank, incomplete, or placeholder content");
  }

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    addError(location, "options must contain exactly four answers");
  } else {
    const options = question.options.map((option) => String(option).trim());
    if (options.some((option) => option === "")) addError(location, "options cannot be blank");
    if (new Set(options).size !== options.length) addError(location, "options must be unique");
    if (!options.includes(String(question.correctAnswer).trim())) {
      addError(location, "correctAnswer must exist in options");
    }
  }

  if (!Number.isInteger(question.xpReward) || question.xpReward <= 0) {
    addError(location, "xpReward must be a positive integer");
  }
  if (!question.visualMetadata || typeof question.visualMetadata !== "object" || Array.isArray(question.visualMetadata)) {
    addError(location, "visualMetadata must be an object");
  } else {
    if (!isFilled(question.visualMetadata.visualType)) addError(location, "visualMetadata.visualType is required");
    if (!isFilled(question.visualMetadata.reviewStatus)) addError(location, "visualMetadata.reviewStatus is required");
    if (question.visualMetadata.reviewStatus === "needs-review") {
      addError(location, "active content cannot have visualMetadata.reviewStatus needs-review");
    }
    if (question.visualMetadata.reviewStatus !== "ready") {
      addError(location, "active visualMetadata.reviewStatus must be ready");
    }
  }
}

async function readLevelFiles() {
  let entries;
  try {
    entries = await readdir(questionBankRoot, { withFileTypes: true });
  } catch (error) {
    addError(questionBankRoot, `cannot read governed question bank: ${error.message}`);
    return;
  }

  const files = entries
    .filter((entry) => entry.isFile() && /^level-(?:[1-9]|10)\.json$/.test(entry.name))
    .map((entry) => ({
      name: entry.name,
      level: Number(entry.name.match(/^level-(\d+)\.json$/)[1]),
    }))
    .sort((a, b) => a.level - b.level);

  if (files.length !== 10) addError(questionBankRoot, `expected 10 level JSON files, found ${files.length}`);
  const foundLevels = new Set(files.map((file) => file.level));
  for (let level = 1; level <= 10; level += 1) {
    if (!foundLevels.has(level)) addError(questionBankRoot, `level-${level}.json is missing`);
  }

  for (const file of files) {
    let questions;
    try {
      questions = JSON.parse(await readFile(path.join(questionBankRoot, file.name), "utf8"));
    } catch (error) {
      addError(file.name, `invalid JSON: ${error.message}`);
      continue;
    }
    if (!Array.isArray(questions)) {
      addError(file.name, "file root must be an array");
      continue;
    }
    if (questions.length !== 10) addError(file.name, `expected 10 questions, found ${questions.length}`);
    questions.forEach((question, index) => {
      validateQuestion(question, file.name, file.level, index);
      records.push(question);
    });
  }
}

function validateCollection() {
  const activeApproved = records.filter(
    (record) =>
      record.status === "active" &&
      record.approvedBy === "Fara" &&
      isIsoDate(record.approvalDate) &&
      record.packageType === "mvp-free" &&
      record.mvpStatus === "active-pilot",
  );
  if (activeApproved.length !== 100) {
    addError("question bank", `expected exactly 100 active approved Forest questions, found ${activeApproved.length}`);
  }
  if (records.length !== 100) addError("question bank", `expected exactly 100 total records, found ${records.length}`);

  const ids = records.map((record) => record.questionId);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length > 0) addError("question bank", `duplicate questionId values: ${duplicateIds.join(", ")}`);
  return activeApproved;
}

function stableApprovedContent(recordsToPublish) {
  return [...recordsToPublish].sort((a, b) => a.level - b.level || a.questionId.localeCompare(b.questionId));
}

async function existingGeneratedAt(contentHash) {
  try {
    const existing = JSON.parse(await readFile(manifestPath, "utf8"));
    if (existing?.validationSummary?.contentHash === contentHash && typeof existing.generatedAt === "string") {
      return existing.generatedAt;
    }
  } catch {
    // A missing or stale manifest is replaced after successful validation.
  }
  return new Date().toISOString();
}

async function writeManifest(activeApproved) {
  const sorted = stableApprovedContent(activeApproved);
  const canonicalContent = JSON.stringify(sorted);
  const contentHash = createHash("sha256").update(canonicalContent).digest("hex");
  const questionsByLevel = {};
  const levels = [];
  for (let level = 1; level <= 10; level += 1) {
    const questions = sorted.filter((question) => question.level === level);
    questionsByLevel[String(level)] = questions;
    levels.push({
      level,
      nodeType: EXPECTED_NODE_TYPES.get(level),
      questionCount: questions.length,
      questionIds: questions.map((question) => question.questionId),
    });
  }

  const manifest = {
    generatedAt: await existingGeneratedAt(contentHash),
    subject: "mathematics",
    year: 1,
    worldId: "forest-world",
    questionCount: sorted.length,
    levels,
    questionsByLevel,
    validationSummary: {
      status: "passed",
      approvedQuestionCount: sorted.length,
      levelCount: levels.length,
      errors: 0,
      warnings: warnings.length,
      rulesChecked: [
        "required-fields",
        "mvp-approval",
        "scope-identity",
        "level-counts",
        "unique-question-ids",
        "answer-options",
        "explanations",
        "xp-rewards",
        "visual-review-status",
      ],
      contentHash,
    },
  };

  await mkdir(generatedRoot, { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

await readLevelFiles();
const activeApproved = validateCollection();

if (errors.length > 0) {
  await rm(manifestPath, { force: true });
  console.error(`Curriculum validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

await writeManifest(activeApproved);
console.log("Curriculum validation passed.");
console.log(`Validated questions: ${activeApproved.length}`);
console.log("Levels: 10 (10 approved questions each)");
console.log(`Manifest: ${path.relative(projectRoot, manifestPath)}`);
console.log(`Warnings: ${warnings.length}`);