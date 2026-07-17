import type {
  ForestL01QuestionAssetRow,
  QuestionAssetValidationIssue,
} from "../../data/question-asset-schema";

const questionAssetQaStatuses = [
  "Draft",
  "Review",
  "Needs Revision",
  "Approved",
  "Rejected",
  "Archived",
] as const;

type QuestionAssetQaStatus = (typeof questionAssetQaStatuses)[number];

const normalizedStatusMap = new Map<string, QuestionAssetQaStatus>(
  questionAssetQaStatuses.map((status) => [status.toLocaleLowerCase("en"), status]),
);

function normalizeQuestionAssetStatus(status: string): QuestionAssetQaStatus | null {
  return normalizedStatusMap.get(status.trim().toLocaleLowerCase("en")) ?? null;
}

type DuplicateGroup = {
  value: string;
  questionIds: string[];
  rowNumbers: number[];
};

export type CurriculumQaSummary = {
  sourceName: string;
  totalRows: number;
  statusCounts: Record<QuestionAssetQaStatus | "Unsupported", number>;
  levelCounts: Record<string, number>;
  typeCounts: Record<string, number>;
  validationWarnings: QuestionAssetValidationIssue[];
  validationErrors: QuestionAssetValidationIssue[];
  qaWarnings: QuestionAssetValidationIssue[];
  duplicates: {
    questionText: DuplicateGroup[];
    explanations: DuplicateGroup[];
    learnBotTips: DuplicateGroup[];
    distractors: DuplicateGroup[];
  };
  curriculumCoverage: {
    missingCurriculumAlignment: number;
    missingLearningObjective: number;
    missingVisualDescription: number;
    missingVoiceScript: number;
  };
  approvalReadiness: {
    structurallyValidRows: number;
    publishableRows: number;
    reviewRows: number;
    needsRevisionRows: number;
    approvedRows: number;
    blockedByErrors: number;
    warningOnlyRows: number;
  };
};

function text(row: Partial<ForestL01QuestionAssetRow>, field: keyof ForestL01QuestionAssetRow) {
  return String(row[field] ?? "").trim();
}

function normalize(value: string) {
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

function addQaWarning(
  issues: QuestionAssetValidationIssue[],
  row: Partial<ForestL01QuestionAssetRow>,
  rowIndex: number,
  field: QuestionAssetValidationIssue["field"],
  message: string,
) {
  issues.push({
    questionId: text(row, "Question ID") || `row-${rowIndex + 1}`,
    rowNumber: rowIndex + 1,
    field,
    severity: "warning",
    message,
  });
}

function addValidationIssue(
  issues: QuestionAssetValidationIssue[],
  row: Partial<ForestL01QuestionAssetRow>,
  rowIndex: number,
  field: QuestionAssetValidationIssue["field"],
  severity: "warning" | "error",
  message: string,
) {
  issues.push({
    questionId: text(row, "Question ID") || `row-${rowIndex + 1}`,
    rowNumber: rowIndex + 1,
    field,
    severity,
    message,
  });
}

function correctAnswerMatchesOption(options: string[], correctAnswer: string) {
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  return options.some((option) => normalizeAnswer(option) === normalizedCorrect);
}

function correctAnswerMatchesTapTarget(options: string[], correctAnswer: string) {
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  if (["both", "both groups", "same"].includes(normalizedCorrect)) return options.length >= 2;
  return options.some((option) => {
    const groupLabel = normalizeAnswer(option.split(":")[0] ?? "");
    const optionValue = normalizeAnswer(option.replace(/^Group\s+[A-D]\s*:\s*/i, ""));
    return normalizeAnswer(option) === normalizedCorrect || groupLabel === normalizedCorrect || optionValue === normalizedCorrect;
  });
}

function countLegacyMatchPairs(options: string[], correctAnswer: string) {
  const sourceItems = correctAnswer
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
  const fallbackItems = options.map((option) => option.trim()).filter(Boolean);
  const pairs = (sourceItems.length > 0 ? sourceItems : fallbackItems)
    .map((item) => item.match(/^(.+?)(?:=|->|-)(.+)$/))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => `${normalizeAnswer(match[1])}=>${normalizeAnswer(match[2])}`);
  return new Set(pairs).size;
}

function validateQuestionAssetRowsForQa(rows: ForestL01QuestionAssetRow[]) {
  const issues: QuestionAssetValidationIssue[] = [];
  const supportedTypes = new Set([
    "Multiple Choice",
    "Count & Type",
    "Tap Correct Group",
    "Tap Correct",
    "Fill Missing Number",
    "Fill Missing Letter",
    "Fill Missing Word",
    "Text Input",
    "Match Pairs",
    "True or False",
  ]);

  rows.forEach((row, rowIndex) => {
    const requiredFields: (keyof ForestL01QuestionAssetRow)[] = [
      "Question ID",
      "Status",
      "Subject",
      "Year",
      "World",
      "Level",
      "Topic",
      "Learning Objective",
      "Difficulty",
      "Question Type",
      "Question",
      "Correct Answer",
      "Final Explanation",
    ];

    requiredFields.forEach((field) => {
      if (!text(row, field)) addValidationIssue(issues, row, rowIndex, field, "error", `Missing ${field}.`);
    });

    const questionType = text(row, "Question Type");
    const options = splitOptions(text(row, "Options"));
    const correctAnswer = text(row, "Correct Answer");

    if (!supportedTypes.has(questionType)) {
      addValidationIssue(issues, row, rowIndex, "Question Type", "error", `Unsupported question type: ${questionType || "(blank)"}.`);
    }

    if (questionType === "Multiple Choice") {
      if (options.length < 2) addValidationIssue(issues, row, rowIndex, "Options", "error", "Multiple Choice requires at least 2 options.");
      else if (!correctAnswerMatchesOption(options, correctAnswer)) addValidationIssue(issues, row, rowIndex, "Correct Answer", "error", "Correct Answer must match one option.");
    }

    if (questionType === "Tap Correct" || questionType === "Tap Correct Group") {
      if (options.length < 2) addValidationIssue(issues, row, rowIndex, "Options", "error", "Tap Correct requires at least 2 tap targets.");
      else if (!correctAnswerMatchesTapTarget(options, correctAnswer)) addValidationIssue(issues, row, rowIndex, "Correct Answer", "error", "Correct Answer must match one tap target.");
    }

    if (questionType === "True or False" && !["true", "false", "yes", "no", "correct", "incorrect"].includes(normalizeAnswer(correctAnswer))) {
      addValidationIssue(issues, row, rowIndex, "Correct Answer", "error", "True or False rows must use True or False as the correct answer.");
    }

    if (questionType === "Match Pairs" && countLegacyMatchPairs(options, correctAnswer) < 2) {
      addValidationIssue(issues, row, rowIndex, "Question Type", "warning", "Match Pairs should include at least 2 complete left = right pairs.");
    }

    if (!text(row, "Assessment Eligible")) addValidationIssue(issues, row, rowIndex, "Assessment Eligible", "warning", "Missing assessment eligibility.");
    if (!text(row, "Teaching Notes")) addValidationIssue(issues, row, rowIndex, "Teaching Notes", "warning", "Teaching notes are missing.");
    if (!text(row, "Required Assets")) addValidationIssue(issues, row, rowIndex, "Required Assets", "warning", "Required assets are missing or inferred.");
    if (!text(row, "Version Notes")) addValidationIssue(issues, row, rowIndex, "Version Notes", "warning", "Version notes are missing.");
  });

  const rowsWithErrors = new Set(issues.filter((issue) => issue.severity === "error").map((issue) => issue.rowNumber));
  const validRows = rows.length - rowsWithErrors.size;
  const publishableRows = rows.filter((row, index) => {
    if (rowsWithErrors.has(index + 1)) return false;
    return (
      normalizeQuestionAssetStatus(text(row, "Status")) === "Approved" &&
      normalizeQuestionAssetStatus(text(row, "Review Status")) === "Approved" &&
      text(row, "Assessment Eligible") !== "" &&
      text(row, "Version Notes") !== "" &&
      text(row, "Teaching Notes") !== "" &&
      text(row, "Required Assets") !== ""
    );
  }).length;

  return { issues, validRows, publishableRows };
}
function pushGroup(
  groups: Map<string, { value: string; rowNumbers: number[]; questionIds: string[] }>,
  value: string,
  row: ForestL01QuestionAssetRow,
  rowIndex: number,
) {
  const normalizedValue = normalize(value);
  if (!normalizedValue) return;
  const current = groups.get(normalizedValue) ?? {
    value: value.trim().replace(/\s+/g, " "),
    rowNumbers: [],
    questionIds: [],
  };
  current.rowNumbers.push(rowIndex + 1);
  current.questionIds.push(text(row, "Question ID") || `row-${rowIndex + 1}`);
  groups.set(normalizedValue, current);
}

function duplicateGroups(
  groups: Map<string, { value: string; rowNumbers: number[]; questionIds: string[] }>,
  minCount = 2,
): DuplicateGroup[] {
  return Array.from(groups.values())
    .filter((group) => group.rowNumbers.length >= minCount)
    .map((group) => ({
      value: group.value,
      questionIds: group.questionIds,
      rowNumbers: group.rowNumbers,
    }));
}

function emptyStatusCounts(): Record<QuestionAssetQaStatus | "Unsupported", number> {
  return {
    Draft: 0,
    Review: 0,
    "Needs Revision": 0,
    Approved: 0,
    Rejected: 0,
    Archived: 0,
    Unsupported: 0,
  };
}

function increment(record: Record<string, number>, key: string) {
  record[key || "(blank)"] = (record[key || "(blank)"] ?? 0) + 1;
}

function rowHasErrors(issues: QuestionAssetValidationIssue[], rowNumber: number) {
  return issues.some((issue) => issue.rowNumber === rowNumber && issue.severity === "error");
}

export function buildCurriculumQaSummary(
  rows: ForestL01QuestionAssetRow[],
  sourceName = "Question Assets",
): CurriculumQaSummary {
  const structural = validateQuestionAssetRowsForQa(rows);
  const qaWarnings: QuestionAssetValidationIssue[] = [];
  const statusCounts = emptyStatusCounts();
  const levelCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};
  const questionText = new Map<string, { value: string; rowNumbers: number[]; questionIds: string[] }>();
  const explanations = new Map<string, { value: string; rowNumbers: number[]; questionIds: string[] }>();
  const learnBotTips = new Map<string, { value: string; rowNumbers: number[]; questionIds: string[] }>();
  const distractors = new Map<string, { value: string; rowNumbers: number[]; questionIds: string[] }>();

  let missingCurriculumAlignment = 0;
  let missingLearningObjective = 0;
  let missingVisualDescription = 0;
  let missingVoiceScript = 0;
  let reviewRows = 0;
  let needsRevisionRows = 0;
  let approvedRows = 0;

  rows.forEach((row, rowIndex) => {
    const status = normalizeQuestionAssetStatus(text(row, "Status"));
    if (status) {
      statusCounts[status] += 1;
      if (status === "Review") reviewRows += 1;
      if (status === "Needs Revision") needsRevisionRows += 1;
      if (status === "Approved") approvedRows += 1;
    } else {
      statusCounts.Unsupported += 1;
      addQaWarning(
        qaWarnings,
        row,
        rowIndex,
        "Status",
        `Unsupported QA status: ${text(row, "Status") || "(blank)"}. Use Draft, Review, Needs Revision, Approved, Rejected, or Archived.`,
      );
    }

    const reviewStatus = text(row, "Review Status");
    if (reviewStatus && !normalizeQuestionAssetStatus(reviewStatus)) {
      addQaWarning(
        qaWarnings,
        row,
        rowIndex,
        "Review Status",
        `Unsupported Review Status: ${reviewStatus}. Use the standardized QA statuses.`,
      );
    }

    increment(levelCounts, text(row, "Level"));
    increment(typeCounts, text(row, "Question Type"));

    pushGroup(questionText, text(row, "Question"), row, rowIndex);
    pushGroup(explanations, text(row, "Final Explanation"), row, rowIndex);
    pushGroup(learnBotTips, text(row, "LearnBot Tip"), row, rowIndex);

    const correctAnswer = normalizeAnswer(text(row, "Correct Answer"));
    const questionType = text(row, "Question Type");
    const options = splitOptions(text(row, "Options"));
    if (questionType !== "True or False") {
      options
        .filter((option) => normalizeAnswer(option) !== correctAnswer)
        .forEach((option) => pushGroup(distractors, option, row, rowIndex));
    }

    if (!text(row, "Curriculum Alignment")) {
      missingCurriculumAlignment += 1;
      addQaWarning(qaWarnings, row, rowIndex, "Curriculum Alignment", "Curriculum alignment is empty.");
    }
    if (!text(row, "Learning Objective")) {
      missingLearningObjective += 1;
      addQaWarning(qaWarnings, row, rowIndex, "Learning Objective", "Learning objective is empty.");
    }
    if (!text(row, "Visual Description")) {
      missingVisualDescription += 1;
      addQaWarning(qaWarnings, row, rowIndex, "Visual Description", "Visual description is empty.");
    }
    if (!text(row, "Voice Script")) {
      missingVoiceScript += 1;
      addQaWarning(qaWarnings, row, rowIndex, "Voice Script", "Voice script is empty.");
    }
    if (!text(row, "Final Explanation")) {
      addQaWarning(qaWarnings, row, rowIndex, "Final Explanation", "Explanation is empty.");
    }

    if (questionType === "Fill Missing Letter" && text(row, "Correct Answer").length !== 1) {
      addQaWarning(
        qaWarnings,
        row,
        rowIndex,
        "Correct Answer",
        "Fill Missing Letter should normally use one letter as the correct answer.",
      );
    }

    if (questionType === "Fill Missing Word" && /\s/.test(text(row, "Correct Answer"))) {
      addQaWarning(
        qaWarnings,
        row,
        rowIndex,
        "Correct Answer",
        "Fill Missing Word has a multi-word answer; confirm this is intentional.",
      );
    }

    if (questionType === "Text Input" && text(row, "Correct Answer").length > 30) {
      addQaWarning(
        qaWarnings,
        row,
        rowIndex,
        "Correct Answer",
        "Text Input answer is long for Year 1; review readability.",
      );
    }
  });

  const duplicateQuestionText = duplicateGroups(questionText);
  const duplicateExplanations = duplicateGroups(explanations);
  const duplicateLearnBotTips = duplicateGroups(learnBotTips);
  const repeatedDistractors = duplicateGroups(distractors, 5);

  for (const group of duplicateQuestionText) {
    for (const rowNumber of group.rowNumbers) {
      addQaWarning(qaWarnings, rows[rowNumber - 1], rowNumber - 1, "Question", "Duplicate question text found.");
    }
  }
  for (const group of duplicateExplanations) {
    for (const rowNumber of group.rowNumbers) {
      addQaWarning(
        qaWarnings,
        rows[rowNumber - 1],
        rowNumber - 1,
        "Final Explanation",
        "Duplicate explanation text found.",
      );
    }
  }
  for (const group of duplicateLearnBotTips) {
    for (const rowNumber of group.rowNumbers) {
      addQaWarning(
        qaWarnings,
        rows[rowNumber - 1],
        rowNumber - 1,
        "LearnBot Tip",
        "Duplicate LearnBot tip found.",
      );
    }
  }
  for (const group of repeatedDistractors) {
    for (const rowNumber of group.rowNumbers) {
      addQaWarning(
        qaWarnings,
        rows[rowNumber - 1],
        rowNumber - 1,
        "Options",
        `Distractor "${group.value}" is repeated across ${group.rowNumbers.length} rows.`,
      );
    }
  }

  const validationWarnings = structural.issues.filter((issue) => issue.severity === "warning");
  const validationErrors = structural.issues.filter((issue) => issue.severity === "error");
  const blockedRows = new Set(
    validationErrors.map((issue) => issue.rowNumber),
  );
  const warningRows = new Set(
    [...validationWarnings, ...qaWarnings]
      .map((issue) => issue.rowNumber)
      .filter((rowNumber) => !rowHasErrors(validationErrors, rowNumber)),
  );

  return {
    sourceName,
    totalRows: rows.length,
    statusCounts,
    levelCounts,
    typeCounts,
    validationWarnings,
    validationErrors,
    qaWarnings,
    duplicates: {
      questionText: duplicateQuestionText,
      explanations: duplicateExplanations,
      learnBotTips: duplicateLearnBotTips,
      distractors: repeatedDistractors,
    },
    curriculumCoverage: {
      missingCurriculumAlignment,
      missingLearningObjective,
      missingVisualDescription,
      missingVoiceScript,
    },
    approvalReadiness: {
      structurallyValidRows: structural.validRows,
      publishableRows: structural.publishableRows,
      reviewRows,
      needsRevisionRows,
      approvedRows,
      blockedByErrors: blockedRows.size,
      warningOnlyRows: warningRows.size,
    },
  };
}







