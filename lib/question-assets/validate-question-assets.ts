import {
  forestL01AssetColumns,
  supportedForestL01QuestionTypes,
  type ForestL01AssetColumn,
  type ForestL01QuestionAssetRow,
  type ParsedForestL01QuestionAsset,
  type QuestionAssetValidationIssue,
  type QuestionAssetValidationSummary,
} from "@/data/question-asset-schema";

const supportedQuestionTypeSet = new Set<string>(supportedForestL01QuestionTypes);
const repeatedVisualObjectWarningThreshold = 8;

function text(row: Partial<ForestL01QuestionAssetRow>, field: ForestL01AssetColumn) {
  return String(row[field] ?? "").trim();
}

function normalizeForDuplicateCheck(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");
}

function normalizeAnswer(value: string) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  const numeric = Number(trimmed.replace(/,/g, ""));
  if (trimmed !== "" && Number.isFinite(numeric)) return String(numeric);
  return trimmed.toLocaleLowerCase("en");
}

function splitOptions(value: string) {
  return value
    .split("|")
    .map((option) => option.trim())
    .filter(Boolean);
}

function addIssue(
  issues: QuestionAssetValidationIssue[],
  row: Partial<ForestL01QuestionAssetRow>,
  rowIndex: number,
  field: QuestionAssetValidationIssue["field"],
  message: string,
  severity: "warning" | "error" = "warning",
) {
  issues.push({
    questionId: text(row, "Question ID") || `row-${rowIndex + 1}`,
    rowNumber: rowIndex + 1,
    field,
    severity,
    message,
  });
}

function parseBoolean(value: string) {
  return ["yes", "true", "y", "1"].includes(value.trim().toLocaleLowerCase("en"));
}

function isApproved(value: string) {
  return value.trim().toLocaleLowerCase("en") === "approved";
}

function optionsAreUnique(options: string[]) {
  return new Set(options.map(normalizeAnswer)).size === options.length;
}

function correctAnswerMatchesOption(options: string[], correctAnswer: string) {
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  return options.some((option) => normalizeAnswer(option) === normalizedCorrect);
}

export function parseForestL01AssetRows(
  rows: ForestL01QuestionAssetRow[],
): ParsedForestL01QuestionAsset[] {
  return rows.map((row) => ({
    questionId: text(row, "Question ID"),
    status: text(row, "Status"),
    reviewStatus: text(row, "Review Status"),
    subject: text(row, "Subject"),
    year: Number(text(row, "Year")),
    world: text(row, "World"),
    level: Number(text(row, "Level")),
    topic: text(row, "Topic"),
    subtopic: text(row, "Subtopic"),
    learningObjective: text(row, "Learning Objective"),
    difficulty: text(row, "Difficulty"),
    questionType: text(row, "Question Type"),
    question: text(row, "Question"),
    visualObject: text(row, "Visual Object"),
    visualDescription: text(row, "Visual Description"),
    options: splitOptions(text(row, "Options")),
    correctAnswer: text(row, "Correct Answer"),
    steps: [text(row, "Step 1"), text(row, "Step 2"), text(row, "Step 3")],
    finalExplanation: text(row, "Final Explanation"),
    learnBotTip: text(row, "LearnBot Tip"),
    assessmentEligible: parseBoolean(text(row, "Assessment Eligible")),
    curriculumAlignment: text(row, "Curriculum Alignment"),
    estimatedTime: text(row, "Estimated Time"),
    voiceScript: text(row, "Voice Script"),
    teachingNotes: text(row, "Teaching Notes"),
    requiredAssets: text(row, "Required Assets"),
    versionNotes: text(row, "Version Notes"),
  }));
}

export function validateForestL01AssetRows(
  rows: ForestL01QuestionAssetRow[],
  sourceName = "Forest L01 Question Asset Sample",
): QuestionAssetValidationSummary {
  const issues: QuestionAssetValidationIssue[] = [];
  const questionWordings = new Map<string, number[]>();
  const visualObjects = new Map<string, number[]>();
  const questionIds = new Map<string, number[]>();

  rows.forEach((row, rowIndex) => {
    for (const column of forestL01AssetColumns) {
      if (!(column in row)) {
        addIssue(issues, row, rowIndex, column, `Missing asset column: ${column}`, "error");
      }
    }

    for (const field of [
      "Question ID",
      "Subject",
      "Year",
      "World",
      "Level",
      "Difficulty",
      "Question Type",
      "Question",
      "Correct Answer",
      "Step 1",
      "Step 2",
      "Step 3",
      "Final Explanation",
    ] as const) {
      if (!text(row, field)) addIssue(issues, row, rowIndex, field, `Missing ${field}.`, "error");
    }

    const questionType = text(row, "Question Type");
    const options = splitOptions(text(row, "Options"));
    const correctAnswer = text(row, "Correct Answer");

    if (!supportedQuestionTypeSet.has(questionType)) {
      addIssue(
        issues,
        row,
        rowIndex,
        "Question Type",
        `Unsupported question type: ${questionType || "(blank)"}.`,
        "error",
      );
    }

    if (questionType === "Multiple Choice") {
      if (options.length < 2) {
        addIssue(issues, row, rowIndex, "Options", "Multiple Choice requires at least 2 usable options.", "error");
      } else if (!correctAnswerMatchesOption(options, correctAnswer)) {
        addIssue(issues, row, rowIndex, "Correct Answer", "Correct Answer must match one Multiple Choice option.", "error");
      }
      if (options.length >= 2 && !optionsAreUnique(options)) {
        addIssue(issues, row, rowIndex, "Options", "Duplicate answer options found.", "warning");
      }
    }

    if (questionType === "Tap Correct Group") {
      if (options.length < 2) {
        addIssue(issues, row, rowIndex, "Options", "Tap Correct Group requires at least 2 usable tap targets.", "error");
      } else if (!correctAnswerMatchesOption(options, correctAnswer)) {
        addIssue(issues, row, rowIndex, "Correct Answer", "Correct Answer must match one tap target.", "error");
      }
    }

    if (questionType === "Match Pairs") {
      addIssue(issues, row, rowIndex, "Question Type", "Match Pairs imports for preview only; dedicated renderer is not complete.", "warning");
    }

    if (questionType === "True or False" && !["true", "false", "yes", "no", "correct", "incorrect"].includes(normalizeAnswer(correctAnswer))) {
      addIssue(issues, row, rowIndex, "Correct Answer", "True or False rows must use True or False as the correct answer.", "error");
    }

    if (["Count & Type", "Tap Correct Group", "Multiple Choice"].includes(questionType) && !text(row, "Visual Description")) {
      addIssue(issues, row, rowIndex, "Visual Description", "Missing visual description.", "error");
    }

    if (!text(row, "Assessment Eligible")) {
      addIssue(issues, row, rowIndex, "Assessment Eligible", "Missing assessment eligibility.", "warning");
    }

    if (!text(row, "LearnBot Tip")) {
      addIssue(issues, row, rowIndex, "LearnBot Tip", "Missing LearnBot tip.", "warning");
    }

    if (!text(row, "Teaching Notes")) {
      addIssue(issues, row, rowIndex, "Teaching Notes", "Teaching notes are missing and should be reviewed before approval.", "warning");
    }

    if (!text(row, "Required Assets")) {
      addIssue(issues, row, rowIndex, "Required Assets", "Required assets are missing or inferred and should be reviewed before approval.", "warning");
    }

    if (!isApproved(text(row, "Status"))) {
      addIssue(
        issues,
        row,
        rowIndex,
        "Status",
        `Row is valid but not publishable because Status is ${text(row, "Status") || "(blank)"}.`,
        "warning",
      );
    }

    if (!isApproved(text(row, "Review Status"))) {
      addIssue(
        issues,
        row,
        rowIndex,
        "Review Status",
        `Row is valid but not publishable because Review Status is ${text(row, "Review Status") || "(blank)"}.`,
        "warning",
      );
    }

    if (!text(row, "Version Notes")) {
      addIssue(issues, row, rowIndex, "Version Notes", "Row is missing Version Notes.", "warning");
    }

    const normalizedQuestionId = normalizeForDuplicateCheck(text(row, "Question ID"));
    if (normalizedQuestionId) {
      questionIds.set(normalizedQuestionId, [
        ...(questionIds.get(normalizedQuestionId) ?? []),
        rowIndex,
      ]);
    }

    const normalizedQuestion = normalizeForDuplicateCheck(text(row, "Question"));
    if (normalizedQuestion) {
      questionWordings.set(normalizedQuestion, [
        ...(questionWordings.get(normalizedQuestion) ?? []),
        rowIndex,
      ]);
    }

    const normalizedVisualObject = normalizeForDuplicateCheck(text(row, "Visual Object"));
    if (normalizedVisualObject) {
      visualObjects.set(normalizedVisualObject, [
        ...(visualObjects.get(normalizedVisualObject) ?? []),
        rowIndex,
      ]);
    }
  });

  for (const duplicateRows of questionIds.values()) {
    if (duplicateRows.length <= 1) continue;
    for (const rowIndex of duplicateRows) {
      addIssue(
        issues,
        rows[rowIndex],
        rowIndex,
        "Question ID",
        "Duplicate question ID in the local asset file.",
        "error",
      );
    }
  }

  for (const duplicateRows of questionWordings.values()) {
    if (duplicateRows.length <= 1) continue;
    for (const rowIndex of duplicateRows) {
      addIssue(
        issues,
        rows[rowIndex],
        rowIndex,
        "Question",
        "Repeated question wording in the local asset pool.",
        "warning",
      );
    }
  }

  for (const repeatedRows of visualObjects.values()) {
    if (repeatedRows.length <= repeatedVisualObjectWarningThreshold) continue;
    for (const rowIndex of repeatedRows) {
      addIssue(
        issues,
        rows[rowIndex],
        rowIndex,
        "Visual Object",
        `Visual object is repeated more than ${repeatedVisualObjectWarningThreshold} times.`,
        "warning",
      );
    }
  }

  const rowResults = rows.map((row, rowIndex) => {
    const questionId = text(row, "Question ID") || `row-${rowIndex + 1}`;
    const rowIssues = issues.filter(
      (issue) => issue.rowNumber === rowIndex + 1 && issue.questionId === questionId,
    );
    const errors = rowIssues.filter((issue) => issue.severity === "error");
    const warnings = rowIssues.filter((issue) => issue.severity === "warning");
    const isValid = errors.length === 0;
    const isPublishable =
      isValid &&
      isApproved(text(row, "Status")) &&
      isApproved(text(row, "Review Status")) &&
      text(row, "Assessment Eligible") !== "" &&
      text(row, "Version Notes") !== "" &&
      text(row, "Teaching Notes") !== "" &&
      text(row, "Required Assets") !== "" &&
      text(row, "Question Type") !== "Match Pairs";

    return {
      questionId,
      rowNumber: rowIndex + 1,
      isValid,
      isPublishable,
      errors,
      warnings,
    };
  });

  const errorCount = issues.filter((issue) => issue.severity === "error").length;
  const warningCount = issues.filter((issue) => issue.severity === "warning").length;
  const validRows = rowResults.filter((result) => result.isValid).length;
  const publishableRows = rowResults.filter((result) => result.isPublishable).length;

  return {
    sourceName,
    totalRows: rows.length,
    supportedRows: rows.filter((row) => supportedQuestionTypeSet.has(text(row, "Question Type"))).length,
    validRows,
    publishableRows,
    nonPublishableRows: rows.length - publishableRows,
    warningCount,
    errorCount,
    issues,
    rowResults,
  };
}