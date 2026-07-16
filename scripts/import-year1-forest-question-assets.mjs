import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importQuestionAssets } from "./import-question-assets.mjs";

const repoRoot = process.cwd();
const defaultImportsDir = path.join(
  repoRoot,
  "content/question-assets/imports/mathematics/year-1",
);
const defaultOutputDir = path.join(
  repoRoot,
  "content/question-assets/mathematics/year-1/forest-world",
);
const defaultReportDir = path.join(repoRoot, "generated/question-assets");

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      index += 1;
    } else {
      args[key] = "true";
    }
  }
  return args;
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function levelLabel(level) {
  return `L${String(level).padStart(2, "0")}`;
}

function sheetNameForLevel(level) {
  return `Forest ${levelLabel(level)}`;
}

function outputPathForLevel(outputDir, level) {
  return path.join(outputDir, `forest-l${String(level).padStart(2, "0")}-imported.json`);
}

function reportPathForLevel(reportDir, level) {
  return path.join(reportDir, `year-1-forest-l${String(level).padStart(2, "0")}-import-report.json`);
}

function detectLevelFromFilename(filePath) {
  const match = path.basename(filePath).match(/^forest-l(\d{2})\.csv$/i);
  return match ? Number(match[1]) : null;
}

export function discoverYear1ForestCsvFiles(importsDir = defaultImportsDir) {
  if (!fs.existsSync(importsDir)) {
    throw new Error(`Import directory not found: ${importsDir}`);
  }

  return fs
    .readdirSync(importsDir)
    .filter((fileName) => /^forest-l\d{2}\.csv$/i.test(fileName))
    .map((fileName) => ({
      level: detectLevelFromFilename(fileName),
      fileName,
      filePath: path.join(importsDir, fileName),
    }))
    .filter((item) => item.level !== null)
    .sort((a, b) => a.level - b.level);
}

function classifyRendererRows(rows) {
  const counts = rows.reduce((allCounts, row) => {
    const type = row["Question Type"] || "Unknown";
    allCounts[type] = (allCounts[type] ?? 0) + 1;
    return allCounts;
  }, {});

  const supportedTypes = new Set([
    "Multiple Choice",
    "Count & Type",
    "Tap Correct Group",
    "Fill Missing Number",
    "Match Pairs",
    "True or False",
  ]);

  return Object.entries(counts)
    .map(([questionType, count]) => {
      if (supportedTypes.has(questionType)) {
        return {
          questionType,
          status: "supported",
          count,
          message: `${questionType} renders through a dedicated question-engine renderer.`,
        };
      }
      return {
        questionType,
        status: "unsupported",
        count,
        message: `${questionType} is not supported by the dev preview renderer.`,
      };
    })
    .sort((a, b) => a.questionType.localeCompare(b.questionType));
}

function duplicateIdCount(report) {
  return Array.isArray(report.duplicateIds) ? report.duplicateIds.length : 0;
}

function buildLevelResult({ level, filePath, outputJsonPath, reportJsonPath, importResult }) {
  const report = {
    ...importResult.report,
    outputJsonPath,
    reportJsonPath,
    rendererClassifications: classifyRendererRows(importResult.rowsToWrite),
  };
  const blockingReasons = [];

  if (report.sourceMismatch?.hasMismatch) {
    blockingReasons.push(report.sourceMismatch.message || "Source mismatch detected.");
  }
  if (report.errorCount > 0) {
    blockingReasons.push(`${report.errorCount} blocking schema error(s).`);
  }
  if (duplicateIdCount(report) > 0) {
    blockingReasons.push(`${duplicateIdCount(report)} duplicate Question ID issue(s).`);
  }
  if (report.importedRows <= 0) {
    blockingReasons.push("Zero imported rows.");
  }

  return {
    status: blockingReasons.length > 0 ? "FAIL" : "PASS",
    level,
    levelLabel: levelLabel(level),
    sourcePath: filePath,
    outputJsonPath,
    reportJsonPath,
    detectedLevel: report.detectedLevel,
    detectedQuestionIdPrefix: report.detectedQuestionIdPrefix,
    sourceRows: report.totalSourceRows,
    importedRows: report.importedRows,
    skippedRows: report.skippedRows ?? 0,
    skippedRowDetails: report.skippedRowDetails ?? [],
    rejectedRows: report.rejectedRows,
    errorCount: report.errorCount,
    warningCount: report.warningCount,
    duplicateIds: report.duplicateIds ?? [],
    publishableRows: report.publishableRows,
    questionTypeDistribution: report.questionTypeDistribution ?? {},
    rendererClassifications: report.rendererClassifications,
    previewFallbackCounts: report.rendererClassifications
      .filter((item) => item.status === "preview-fallback")
      .reduce((counts, item) => {
        counts[item.questionType] = item.count;
        return counts;
      }, {}),
    blockingReasons,
    report,
    rowsToWrite: importResult.rowsToWrite,
  };
}

function summarize(results, discoveredFiles) {
  return {
    levelsDiscovered: discoveredFiles.length,
    levelsPassed: results.filter((result) => result.status === "PASS").length,
    levelsFailed: results.filter((result) => result.status === "FAIL").length,
    sourceRows: results.reduce((total, result) => total + (result.sourceRows ?? 0), 0),
    importedRows: results.reduce((total, result) => total + (result.importedRows ?? 0), 0),
    skippedRows: results.reduce((total, result) => total + (result.skippedRows ?? 0), 0),
    rejectedRows: results.reduce((total, result) => total + (result.rejectedRows ?? 0), 0),
    errors: results.reduce((total, result) => total + (result.errorCount ?? 0), 0),
    warnings: results.reduce((total, result) => total + (result.warningCount ?? 0), 0),
    duplicateIds: results.reduce((total, result) => total + duplicateIdCount(result), 0),
    publishableRows: results.reduce((total, result) => total + (result.publishableRows ?? 0), 0),
  };
}

function toBatchReportLevelResult(result) {
  return {
    status: result.status,
    level: result.level,
    levelLabel: result.levelLabel,
    sourcePath: result.sourcePath,
    outputJsonPath: result.outputJsonPath,
    reportJsonPath: result.reportJsonPath,
    detectedLevel: result.detectedLevel,
    detectedQuestionIdPrefix: result.detectedQuestionIdPrefix,
    sourceRows: result.sourceRows,
    importedRows: result.importedRows,
    skippedRows: result.skippedRows,
    skippedRowDetails: result.skippedRowDetails,
    rejectedRows: result.rejectedRows,
    errorCount: result.errorCount,
    warningCount: result.warningCount,
    duplicateIds: result.duplicateIds,
    publishableRows: result.publishableRows,
    questionTypeDistribution: result.questionTypeDistribution,
    rendererClassifications: result.rendererClassifications,
    previewFallbackCounts: result.previewFallbackCounts,
    blockingReasons: result.blockingReasons,
  };
}

export function processYear1ForestBatch({
  importsDir = defaultImportsDir,
  outputDir = defaultOutputDir,
  reportDir = defaultReportDir,
  requireAllLevels = true,
  writeBatchReport = true,
} = {}) {
  const discoveredFiles = discoverYear1ForestCsvFiles(importsDir);
  const discoveredLevels = discoveredFiles.map((item) => item.level);
  const expectedLevels = Array.from({ length: 10 }, (_, index) => index + 1);
  const missingLevels = expectedLevels.filter((level) => !discoveredLevels.includes(level));

  if (requireAllLevels && missingLevels.length > 0) {
    throw new Error(`Missing expected Forest CSV file(s): ${missingLevels.map(levelLabel).join(", ")}.`);
  }

  const results = [];

  for (const item of discoveredFiles) {
    const outputJsonPath = outputPathForLevel(outputDir, item.level);
    const reportJsonPath = reportPathForLevel(reportDir, item.level);
    const importResult = importQuestionAssets({
      filePath: item.filePath,
      sheet: sheetNameForLevel(item.level),
    });
    const levelResult = buildLevelResult({
      level: item.level,
      filePath: item.filePath,
      outputJsonPath,
      reportJsonPath,
      importResult,
    });

    results.push(levelResult);

    if (levelResult.status === "PASS") {
      writeJson(outputJsonPath, levelResult.rowsToWrite);
      writeJson(reportJsonPath, levelResult.report);
    } else {
      writeJson(reportJsonPath, levelResult.report);
      break;
    }
  }

  const totals = summarize(results, discoveredFiles);
  const batchReport = {
    generatedAt: new Date().toISOString(),
    discoveredFiles: discoveredFiles.map((item) => item.filePath),
    processingOrder: discoveredFiles.map((item) => levelLabel(item.level)),
    results: results.map(toBatchReportLevelResult),
    totals,
  };
  const batchReportPath = path.join(reportDir, "year-1-forest-batch-import-report.json");

  if (writeBatchReport) writeJson(batchReportPath, batchReport);

  return {
    discoveredFiles,
    results,
    totals,
    batchReport,
    batchReportPath,
    failed: results.some((result) => result.status === "FAIL"),
  };
}

function printSummary(batchResult) {
  console.log("Year 1 Forest World Batch Import");
  console.log("");
  batchResult.results.forEach((result) => {
    console.log(
      `${result.levelLabel} ${result.status} | source ${result.sourceRows} | imported ${result.importedRows} | skipped ${result.skippedRows} | rejected ${result.rejectedRows} | errors ${result.errorCount} | warnings ${result.warningCount}`,
    );
    if (result.status === "FAIL") {
      result.blockingReasons.forEach((reason) => console.error(`  - ${reason}`));
    }
  });
  console.log("");
  console.log("Totals:");
  console.log(`- Levels discovered: ${batchResult.totals.levelsDiscovered}`);
  console.log(`- Levels passed: ${batchResult.totals.levelsPassed}`);
  console.log(`- Levels failed: ${batchResult.totals.levelsFailed}`);
  console.log(`- Source rows: ${batchResult.totals.sourceRows}`);
  console.log(`- Imported rows: ${batchResult.totals.importedRows}`);
  console.log(`- Skipped rows: ${batchResult.totals.skippedRows}`);
  console.log(`- Rejected rows: ${batchResult.totals.rejectedRows}`);
  console.log(`- Errors: ${batchResult.totals.errors}`);
  console.log(`- Warnings: ${batchResult.totals.warnings}`);
  console.log(`- Duplicate IDs: ${batchResult.totals.duplicateIds}`);
  console.log(`- Publishable rows: ${batchResult.totals.publishableRows}`);
  console.log(`- Batch report: ${batchResult.batchReportPath}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const batchResult = processYear1ForestBatch({
    importsDir: args["imports-dir"] ? path.resolve(args["imports-dir"]) : defaultImportsDir,
    outputDir: args["output-dir"] ? path.resolve(args["output-dir"]) : defaultOutputDir,
    reportDir: args["report-dir"] ? path.resolve(args["report-dir"]) : defaultReportDir,
    requireAllLevels: args["require-all-levels"] !== "false",
  });
  printSummary(batchResult);
  if (batchResult.failed) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
