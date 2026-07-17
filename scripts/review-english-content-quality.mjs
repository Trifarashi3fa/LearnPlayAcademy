import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceDir = path.join(repoRoot, "content/question-assets/imports/english/year-1");
const reportJsonPath = path.join(repoRoot, "generated/question-assets/english/content-quality-review.json");
const level1QaReportPath = path.join(repoRoot, "ENGLISH_LEVEL1_QA_REPORT.md");
const level1ImprovementReportPath = path.join(repoRoot, "ENGLISH_LEVEL1_IMPROVEMENT_REPORT.md");
const scorecardPath = path.join(repoRoot, "CONTENT_QUALITY_SCORECARD.md");

function parseCsv(text) {
  const tableRows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else cell += char;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      tableRows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  row.push(cell);
  if (row.some((value) => value.trim() !== "") || tableRows.length === 0) tableRows.push(row);
  const [headers = [], ...rows] = tableRows;
  return rows
    .filter((sourceRow) => sourceRow.some((value) => value.trim() !== ""))
    .map((sourceRow) => Object.fromEntries(headers.map((header, index) => [header.trim(), String(sourceRow[index] ?? "").trim()])));
}

function normalize(value) {
  return String(value ?? "")
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(a|an|the|is|are|to|of|and|or|in|on|for|this|that|with|which|letter|word|picture)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(value) {
  return normalize(value).split(" ").filter(Boolean);
}

function jaccard(a, b) {
  const left = new Set(words(a));
  const right = new Set(words(b));
  if (left.size === 0 && right.size === 0) return 1;
  const intersection = [...left].filter((item) => right.has(item)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

function optionValues(row) {
  return ["Option A", "Option B", "Option C", "Option D"]
    .map((field) => row[field])
    .filter(Boolean);
}

function groupExact(rows, field, minCount = 2) {
  const groups = new Map();
  rows.forEach((row) => {
    const key = normalize(row[field]);
    if (!key) return;
    const current = groups.get(key) ?? { value: row[field], questionIds: [], count: 0 };
    current.questionIds.push(row["Question ID"]);
    current.count += 1;
    groups.set(key, current);
  });
  return [...groups.values()].filter((group) => group.count >= minCount);
}

function groupSimilar(rows, field, threshold = 0.72) {
  const groups = [];
  rows.forEach((row) => {
    const value = row[field] ?? "";
    if (!value.trim()) return;
    const match = groups.find((group) => jaccard(group.value, value) >= threshold);
    if (match) {
      match.questionIds.push(row["Question ID"]);
      match.values.push(value);
    } else {
      groups.push({ value, questionIds: [row["Question ID"]], values: [value] });
    }
  });
  return groups.filter((group) => group.questionIds.length >= 2);
}

function repeatedDistractors(rows, minCount = 4) {
  const counts = new Map();
  rows.forEach((row) => {
    const correct = normalize(row["Correct Answer"]);
    optionValues(row)
      .filter((option) => normalize(option) !== correct)
      .forEach((option) => {
        const key = normalize(option);
        if (!key) return;
        const current = counts.get(key) ?? { value: option, questionIds: [], count: 0 };
        current.questionIds.push(row["Question ID"]);
        current.count += 1;
        counts.set(key, current);
      });
  });
  return [...counts.values()].filter((item) => item.count >= minCount);
}

function vocabularyStats(rows) {
  const tokens = rows.flatMap((row) => [
    ...words(row.Question),
    ...words(row.Explanation),
    ...words(row["LearnBot Tip"]),
    ...optionValues(row).flatMap(words),
  ]);
  const unique = new Set(tokens);
  const repeated = new Map();
  tokens.forEach((token) => repeated.set(token, (repeated.get(token) ?? 0) + 1));
  return {
    totalTokens: tokens.length,
    uniqueTokens: unique.size,
    diversityRatio: tokens.length === 0 ? 0 : unique.size / tokens.length,
    repeatedPatterns: [...repeated.entries()]
      .filter(([, count]) => count >= 10)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([token, count]) => ({ token, count })),
  };
}

function typeBalanceScore(rows) {
  const counts = new Map();
  rows.forEach((row) => counts.set(row["Question Type"], (counts.get(row["Question Type"]) ?? 0) + 1));
  const represented = counts.size;
  const largest = Math.max(...counts.values());
  const representationScore = Math.min(1, represented / 6) * 8;
  const dominancePenalty = largest > rows.length * 0.35 ? 4 : largest > rows.length * 0.3 ? 2 : 0;
  return Math.max(0, Math.round(representationScore + 7 - dominancePenalty));
}

function scoreLevel(rows) {
  const duplicateQuestionGroups = groupExact(rows, "Question");
  const duplicateExplanationGroups = groupExact(rows, "Explanation");
  const duplicateTipGroups = groupExact(rows, "LearnBot Tip");
  const similarQuestionGroups = groupSimilar(rows, "Question");
  const distractorGroups = repeatedDistractors(rows);
  const vocab = vocabularyStats(rows);
  const coverageMissing = rows.filter((row) => !row["Curriculum Alignment"] || !row["Learning Objective"]).length;
  const explanationWeak = rows.filter((row) => words(row.Explanation).length < 5 || words(row.Explanation).length > 22).length;
  const typeScore = typeBalanceScore(rows);
  const duplicateRate = (
    duplicateQuestionGroups.length +
    duplicateExplanationGroups.length +
    duplicateTipGroups.length +
    Math.max(0, similarQuestionGroups.length - 2)
  ) / Math.max(1, rows.length);
  const repeatedDistractorPenalty = Math.min(10, distractorGroups.reduce((total, group) => total + group.count, 0) / 3);

  const curriculumCoverage = Math.max(0, 20 - coverageMissing * 4);
  const vocabularyDiversity = Math.min(15, Math.round(vocab.diversityRatio * 90));
  const questionTypeBalance = typeScore;
  const explanationQuality = Math.max(0, 15 - explanationWeak * 1.5 - duplicateExplanationGroups.length * 2);
  const duplicateScore = Math.max(0, 15 - duplicateRate * 75);
  const distractorQuality = Math.max(0, 10 - repeatedDistractorPenalty);
  const acceptableStatuses = new Set(["Review", "Approved"]);
  const progressionConsistency = rows.every((row) => acceptableStatuses.has(row.Status)) ? 10 : 7;
  const score = Math.round(
    curriculumCoverage +
      vocabularyDiversity +
      questionTypeBalance +
      explanationQuality +
      duplicateScore +
      distractorQuality +
      progressionConsistency,
  );

  return {
    score: Math.max(0, Math.min(100, score)),
    factors: {
      curriculumCoverage,
      vocabularyDiversity,
      questionTypeBalance,
      explanationQuality: Math.round(explanationQuality),
      duplicateScore: Math.round(duplicateScore),
      distractorQuality: Math.round(distractorQuality),
      progressionConsistency,
    },
    warnings: Math.round(
      coverageMissing +
        explanationWeak +
        duplicateQuestionGroups.length +
        duplicateExplanationGroups.length +
        duplicateTipGroups.length +
        distractorGroups.length,
    ),
    duplicates: {
      questionText: duplicateQuestionGroups,
      similarQuestions: similarQuestionGroups,
      explanations: duplicateExplanationGroups,
      learnBotTips: duplicateTipGroups,
      distractors: distractorGroups,
    },
    vocabulary: vocab,
    statusCounts: rows.reduce((counts, row) => {
      const status = row.Status || "(blank)";
      counts[status] = (counts[status] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

function loadLevelFiles() {
  return fs
    .readdirSync(sourceDir)
    .filter((file) => /^forest-l\d{2}\.csv$/i.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => ({
      file,
      level: Number(file.match(/forest-l(\d{2})/i)?.[1] ?? 0),
      rows: parseCsv(fs.readFileSync(path.join(sourceDir, file), "utf8")),
    }));
}

function markdownList(items, formatter) {
  if (items.length === 0) return "- None";
  return items.map(formatter).join("\n");
}

function writeReports(analysis) {
  const level1 = analysis.levels.find((level) => level.level === 1);
  if (!level1) throw new Error("Level 1 analysis was not found.");

  const level1StatusCounts = level1.quality.statusCounts ?? {};
  const level1StatusText = Object.entries(level1StatusCounts).map(([status, count]) => `${status}: ${count}`).join(", ") || "None";

  const level1Qa = `# English Level 1 QA Report

## Summary

- Source file: \`content/question-assets/imports/english/year-1/forest-l01.csv\`
- Rows: ${level1.rows}
- Status counts: ${level1StatusText}
- Quality score: ${level1.quality.score}/100
- QA warning estimate: ${level1.quality.warnings}
- Duplicate groups: ${
    level1.quality.duplicates.questionText.length +
    level1.quality.duplicates.explanations.length +
    level1.quality.duplicates.learnBotTips.length +
    level1.quality.duplicates.distractors.length
  }

## Score Factors

| Factor | Score |
| --- | ---: |
| Curriculum coverage | ${level1.quality.factors.curriculumCoverage}/20 |
| Vocabulary diversity | ${level1.quality.factors.vocabularyDiversity}/15 |
| Question-type balance | ${level1.quality.factors.questionTypeBalance}/15 |
| Explanation quality | ${level1.quality.factors.explanationQuality}/15 |
| Duplicate reduction | ${level1.quality.factors.duplicateScore}/15 |
| Distractor quality | ${level1.quality.factors.distractorQuality}/10 |
| Progression consistency | ${level1.quality.factors.progressionConsistency}/10 |

## Duplicate Review

### Exact Question Text

${markdownList(level1.quality.duplicates.questionText, (group) => `- ${group.questionIds.join(", ")}: ${group.value}`)}

### Exact Explanations

${markdownList(level1.quality.duplicates.explanations, (group) => `- ${group.questionIds.join(", ")}: ${group.value}`)}

### Exact LearnBot Tips

${markdownList(level1.quality.duplicates.learnBotTips, (group) => `- ${group.questionIds.join(", ")}: ${group.value}`)}

### Repeated Distractors

${markdownList(level1.quality.duplicates.distractors, (group) => `- ${group.value}: ${group.count} uses (${group.questionIds.join(", ")})`)}

## Recommendation

Level 1 is ready for educator review when the reviewer accepts the remaining repeated beginner-letter patterns. It should remain \`Status=Review\` until formal approval.
`;

  const improvement = `# English Level 1 Improvement Report

## What Changed

Level 1 was optimized without changing the educational objective: alphabet recognition.

Improvements made:

- Rewrote repetitive prompts into more varied child-friendly wording.
- Diversified distractor options across letter recognition, alphabet order, and case matching.
- Rewrote explanations so each answer teaches a small concept.
- Rewrote LearnBot tips to reduce repeated coaching language.
- Rewrote voice scripts to be more natural and speakable.
- Improved visual descriptions so the intended learning visual is clearer.
- Kept all rows in \`Status=Review\`.

## Before and After Targets

Baseline reflects the pre-optimization Level 1 quality scan from this phase.

| Metric | Baseline | Target | Current | Change |
| --- | ---: | ---: | ---: | ---: |
| QA warning estimate | 21 | Under 10 | ${level1.quality.warnings} | ${21 - level1.quality.warnings} fewer warnings |
| Duplicate groups | 4 | 0 | ${
    level1.quality.duplicates.questionText.length +
    level1.quality.duplicates.explanations.length +
    level1.quality.duplicates.learnBotTips.length +
    level1.quality.duplicates.distractors.length
  } | ${4 - (level1.quality.duplicates.questionText.length + level1.quality.duplicates.explanations.length + level1.quality.duplicates.learnBotTips.length + level1.quality.duplicates.distractors.length)} fewer groups |
| Quality score | 76 | Above 90 | ${level1.quality.score} | +${level1.quality.score - 76} points |

## Remaining Issues

${level1.quality.warnings < 10 ? "- No high-priority automated content warning remains under the current quality scoring rules." : "- Some repetition remains and should be reviewed."}

## Approval Readiness

Recommendation: Level 1 is suitable for human English educator review, but not automatic approval. Keep \`Status=Review\` until KSSR/Cambridge alignment and classroom suitability are manually confirmed.
`;

  const rows = analysis.levels.map((level) => `| Forest L${String(level.level).padStart(2, "0")} | ${level.rows} | ${level.quality.score} | ${level.quality.warnings} | ${
    level.quality.duplicates.questionText.length +
    level.quality.duplicates.explanations.length +
    level.quality.duplicates.learnBotTips.length +
    level.quality.duplicates.distractors.length
  } |`);
  const scorecard = `# Content Quality Scorecard

## Overall Readiness

- Overall score: ${analysis.overallScore}/100
- Total source rows: ${analysis.totalRows}
- English gameplay active: No
- English import performed: No
- Production manifest modified: No

## Level Scores

| Level | Rows | Quality Score | Warning Estimate | Duplicate Groups |
| --- | ---: | ---: | ---: | ---: |
${rows.join("\n")}

## Overall Recommendation

Continue optimizing Levels 2-10 before any English pilot activation. Level 1 is the strongest candidate for the first educator review pass.

## Scoring Factors

Scores use:

- Curriculum coverage
- Vocabulary diversity
- Question-type balance
- Explanation quality
- Duplicate rate
- Distractor quality
- Progression consistency

Warnings are advisory review signals. They do not activate or block gameplay by themselves.
`;

  fs.writeFileSync(level1QaReportPath, level1Qa, "utf8");
  fs.writeFileSync(level1ImprovementReportPath, improvement, "utf8");
  fs.writeFileSync(scorecardPath, scorecard, "utf8");
}

const levels = loadLevelFiles().map((level) => ({
  level: level.level,
  file: level.file,
  rows: level.rows.length,
  quality: scoreLevel(level.rows),
}));
const totalRows = levels.reduce((total, level) => total + level.rows, 0);
const overallScore = Math.round(levels.reduce((total, level) => total + level.quality.score, 0) / Math.max(1, levels.length));
const analysis = { generatedAt: new Date().toISOString(), totalRows, overallScore, levels };

fs.mkdirSync(path.dirname(reportJsonPath), { recursive: true });
fs.writeFileSync(reportJsonPath, `${JSON.stringify(analysis, null, 2)}\n`, "utf8");
writeReports(analysis);
console.log(JSON.stringify({ totalRows, overallScore, level1: levels.find((level) => level.level === 1)?.quality }, null, 2));
