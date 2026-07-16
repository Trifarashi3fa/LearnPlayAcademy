import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const repoRoot = process.cwd();
const outputJsonPath = path.join(
  repoRoot,
  "content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json",
);
const reportJsonPath = path.join(
  repoRoot,
  "generated/question-assets/year-1-forest-l01-import-report.json",
);

const canonicalColumns = [
  "Question ID",
  "Status",
  "Review Status",
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
  "Options",
  "Correct Answer",
  "Step 1",
  "Step 2",
  "Step 3",
  "Final Explanation",
  "LearnBot Tip",
  "Assessment Eligible",
  "Curriculum Alignment",
  "Estimated Time",
  "Voice Script",
  "Teaching Notes",
  "Required Assets",
  "Version Notes",
];

const legacyColumns = [
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

const templateColumns = [
  ...legacyColumns,
  "Teaching Notes",
  "Required Assets",
  "Asset Source",
  "Content Owner",
  "QA Notes",
];

const supportedQuestionTypes = new Set([
  "Multiple Choice",
  "Count & Type",
  "Tap Correct Group",
  "Fill Missing Number",
  "Match Pairs",
  "True or False",
]);

const blockingRequiredFields = [
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
];

const aliases = new Map();
function addAlias(canonical, ...headers) {
  for (const header of [canonical, ...headers]) aliases.set(normalizeHeaderKey(header), canonical);
}

canonicalColumns.forEach((column) => addAlias(column));
addAlias("Question", "Prompt", "Question Text");
addAlias("Options", "Option A-D", "Answer Options");
addAlias("Correct Answer", "Answer");
addAlias("LearnBot Tip", "Coaching Tip");
addAlias("Visual Object", "Visual");
addAlias("Visual Description", "Visual Prompt");
addAlias("Estimated Time", "Estimated Time (Seconds)", "Estimated Time Seconds", "Estimated Duration");
addAlias("Required Assets", "Required Asset", "Asset Required");

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

function normalizeHeaderKey(value) {
  return String(value ?? "")
    .replace(/^\uFEFF/, "")
    .trim()
    .toLocaleLowerCase("en")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanHeader(value) {
  return String(value ?? "").replace(/^\uFEFF/, "").trim().replace(/\s+/g, " ");
}

function trimCell(value) {
  return String(value ?? "").replace(/^\uFEFF/, "").trim();
}

function normalizeAnswer(value) {
  const trimmed = trimCell(value).replace(/\s+/g, " ");
  const numeric = Number(trimmed.replace(/,/g, ""));
  if (trimmed !== "" && Number.isFinite(numeric)) return String(numeric);
  return trimmed.toLocaleLowerCase("en");
}

function normalizeContentStatus(value) {
  return trimCell(value).toLocaleLowerCase("en");
}

function isApprovedContentStatus(value) {
  return normalizeContentStatus(value) === "approved";
}

function skippedRowForStatus(row) {
  const status = trimCell(row.Status);
  return {
    questionId: row["Question ID"] || `row-${row.__sourceRowNumber ?? "unknown"}`,
    rowNumber: row.__sourceRowNumber ?? null,
    status: status || "(blank)",
    questionType: row["Question Type"] || "(blank)",
    reason: `Skipped before production schema validation because Status is ${status || "(blank)"}. Only Approved rows are imported.`,
  };
}

function correctAnswerMatchesTapTarget(options, correctAnswer) {
  const normalizedCorrect = normalizeAnswer(correctAnswer);
  if (["both", "both groups", "same"].includes(normalizedCorrect)) {
    return options.length >= 2;
  }

  return options.some((option) => {
    const normalizedOption = normalizeAnswer(option);
    const groupLabel = normalizeAnswer(String(option).split(":")[0] ?? "");
    const optionValue = normalizeAnswer(String(option).replace(/^Group\s+[A-D]\s*:\s*/i, ""));
    return (
      normalizedOption === normalizedCorrect ||
      groupLabel === normalizedCorrect ||
      optionValue === normalizedCorrect
    );
  });
}

function parseLegacyMatchPairText(value) {
  const text = trimCell(value).replace(/\s+/g, " ");
  if (!text) return null;
  const separatorMatch = text.match(/\s*(?:=|->|→|-)\s*/);
  if (!separatorMatch?.[0]) return null;
  const separatorIndex = text.indexOf(separatorMatch[0]);
  const left = trimCell(text.slice(0, separatorIndex));
  const right = trimCell(text.slice(separatorIndex + separatorMatch[0].length));
  return left && right ? { left, right } : null;
}

function legacyMatchPairStatus(options, correctAnswer) {
  const sourceItems = String(correctAnswer ?? "")
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
  const fallbackItems = options.map((option) => option.trim()).filter(Boolean);
  const pairs = (sourceItems.length > 0 ? sourceItems : fallbackItems)
    .map(parseLegacyMatchPairText)
    .filter(Boolean);
  const unique = new Set(
    pairs.map((pair) => `${normalizeAnswer(pair.left)}=>${normalizeAnswer(pair.right)}`),
  );
  return {
    pairCount: unique.size,
    dedicatedReady: unique.size >= 2,
  };
}

function decodeXml(value) {
  return String(value ?? "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseCsv(text) {
  const rows = [];
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
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  row.push(cell);
  if (row.some((value) => value !== "") || rows.length === 0) rows.push(row);
  return rows;
}

function readUInt32(buffer, offset) {
  return buffer.readUInt32LE(offset);
}

function readUInt16(buffer, offset) {
  return buffer.readUInt16LE(offset);
}

function readZipEntries(buffer) {
  let eocdOffset = -1;
  for (let index = buffer.length - 22; index >= 0; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) {
      eocdOffset = index;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error("Could not read XLSX central directory.");
  const entryCount = readUInt16(buffer, eocdOffset + 10);
  let directoryOffset = readUInt32(buffer, eocdOffset + 16);
  const entries = new Map();
  for (let entryIndex = 0; entryIndex < entryCount; entryIndex += 1) {
    if (buffer.readUInt32LE(directoryOffset) !== 0x02014b50) throw new Error("Invalid XLSX central directory entry.");
    const compression = readUInt16(buffer, directoryOffset + 10);
    const compressedSize = readUInt32(buffer, directoryOffset + 20);
    const fileNameLength = readUInt16(buffer, directoryOffset + 28);
    const extraLength = readUInt16(buffer, directoryOffset + 30);
    const commentLength = readUInt16(buffer, directoryOffset + 32);
    const localHeaderOffset = readUInt32(buffer, directoryOffset + 42);
    const fileName = buffer.subarray(directoryOffset + 46, directoryOffset + 46 + fileNameLength).toString("utf8");
    const localNameLength = readUInt16(buffer, localHeaderOffset + 26);
    const localExtraLength = readUInt16(buffer, localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    const data = compression === 0 ? compressed : zlib.inflateRawSync(compressed);
    entries.set(fileName, data.toString("utf8"));
    directoryOffset += 46 + fileNameLength + extraLength + commentLength;
  }
  return entries;
}

function attrs(value) {
  const result = {};
  for (const match of value.matchAll(/([A-Za-z_:][\w:.-]*)="([^"]*)"/g)) result[match[1]] = decodeXml(match[2]);
  return result;
}

function tagText(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match ? decodeXml(match[1].replace(/<[^>]+>/g, "")) : "";
}

function parseSharedStrings(xml) {
  if (!xml) return [];
  return Array.from(xml.matchAll(/<si[^>]*>([\s\S]*?)<\/si>/g)).map((match) =>
    decodeXml(Array.from(match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)).map((textMatch) => textMatch[1]).join("")),
  );
}

function columnIndex(cellRef) {
  const letters = String(cellRef).replace(/[0-9]/g, "");
  let value = 0;
  for (const letter of letters) value = value * 26 + (letter.charCodeAt(0) - 64);
  return value - 1;
}

function parseWorksheet(xml, sharedStrings) {
  const rows = [];
  for (const rowMatch of xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = [];
    for (const cellMatch of rowMatch[1].matchAll(/<c([^>]*)>([\s\S]*?)<\/c>/g)) {
      const cellAttrs = attrs(cellMatch[1]);
      const index = columnIndex(cellAttrs.r ?? "");
      const type = cellAttrs.t ?? "";
      const rawValue = tagText(cellMatch[2], "v") || tagText(cellMatch[2], "t");
      let value = rawValue;
      if (type === "s") value = sharedStrings[Number(rawValue)] ?? "";
      if (type === "inlineStr") value = tagText(cellMatch[2], "t");
      cells[index] = value;
    }
    rows.push(cells.map((value) => value ?? ""));
  }
  return rows;
}

function parseXlsx(filePath, sheetName) {
  const entries = readZipEntries(fs.readFileSync(filePath));
  const workbookXml = entries.get("xl/workbook.xml");
  const workbookRels = entries.get("xl/_rels/workbook.xml.rels");
  if (!workbookXml || !workbookRels) throw new Error("Invalid XLSX workbook.");
  const rels = new Map(Array.from(workbookRels.matchAll(/<Relationship([^>]*)\/>/g)).map((match) => {
    const relAttrs = attrs(match[1]);
    return [relAttrs.Id, relAttrs.Target];
  }));
  const sheets = Array.from(workbookXml.matchAll(/<sheet([^>]*)\/>/g)).map((match) => {
    const sheetAttrs = attrs(match[1]);
    return { name: sheetAttrs.name, relId: sheetAttrs["r:id"] };
  });
  const selectedSheet = sheets.find((sheet) => sheet.name === sheetName);
  if (!selectedSheet) throw new Error(`Sheet "${sheetName}" was not found. Available sheets: ${sheets.map((sheet) => sheet.name).join(", ")}`);
  const target = rels.get(selectedSheet.relId);
  if (!target) throw new Error(`Could not resolve worksheet for ${selectedSheet.name}.`);
  const normalizedTarget = target.startsWith("/") ? target.slice(1) : `xl/${target.replace(/^\.\.\//, "")}`;
  const worksheetXml = entries.get(normalizedTarget);
  if (!worksheetXml) throw new Error(`Worksheet XML not found: ${normalizedTarget}.`);
  return { rows: parseWorksheet(worksheetXml, parseSharedStrings(entries.get("xl/sharedStrings.xml") ?? "")), detectedWorksheet: selectedSheet.name };
}

function loadRows(filePath, sheetName) {
  const extension = path.extname(filePath).toLocaleLowerCase("en");
  if (extension === ".csv") return { rows: parseCsv(fs.readFileSync(filePath, "utf8")), sourceType: "CSV", detectedWorksheet: null };
  if (extension === ".xlsx") return { ...parseXlsx(filePath, sheetName), sourceType: "XLSX" };
  throw new Error("Unsupported file type. Please export a .csv or .xlsx file.");
}

function findHeaderRow(tableRows) {
  return tableRows.findIndex((row) => row.some((cell) => normalizeHeaderKey(cell) === "question id"));
}

function buildHeaderAudit(headers) {
  const mapped = headers.map((header) => ({
    originalHeader: header,
    canonicalField: aliases.get(normalizeHeaderKey(header)) ?? null,
  }));
  const canonicalFields = new Set(mapped.map((item) => item.canonicalField).filter(Boolean));
  const unknownHeaders = mapped.filter((item) => !item.canonicalField).map((item) => item.originalHeader).filter(Boolean);
  const missingRequiredHeaders = ["Question ID", "Question", "Correct Answer", "Question Type"].filter((field) => !canonicalFields.has(field));
  const optionalMissingHeaders = templateColumns.filter((field) => !headers.some((header) => normalizeHeaderKey(header) === normalizeHeaderKey(field)));
  return { detectedHeaders: headers, mapped, unknownHeaders, missingRequiredHeaders, optionalMissingHeaders };
}

function splitOptions(value) {
  return String(value ?? "").split("|").map((option) => option.trim()).filter(Boolean);
}

function normalizeQuestionType(value) {
  const key = normalizeHeaderKey(value);
  const map = {
    "multiple choice": "Multiple Choice",
    "mcq": "Multiple Choice",
    "count and type": "Count & Type",
    "count type": "Count & Type",
    "tap correct group": "Tap Correct Group",
    "fill missing number": "Fill Missing Number",
    "fill in blank": "Fill Missing Number",
    "match pairs": "Match Pairs",
    "true or false": "True or False",
    "true false": "True or False",
  };
  return map[key] ?? trimCell(value);
}

function deriveTeachingNotes(sourceRecord) {
  const explicit = trimCell(sourceRecord["Teaching Notes"]);
  if (explicit) return { value: explicit, status: "explicit" };
  const parts = [
    sourceRecord["Learning Objective"],
    sourceRecord["Step 1"],
    sourceRecord["Step 2"],
    sourceRecord["Step 3"],
    sourceRecord["LearnBot Tip"],
  ].map(trimCell).filter(Boolean);
  return { value: parts.join(" | "), status: parts.length > 0 ? "inferred" : "missing" };
}

function deriveRequiredAssets(sourceRecord) {
  const explicit = trimCell(sourceRecord["Required Assets"]);
  if (explicit) return { value: explicit, status: "explicit" };
  const flag = trimCell(sourceRecord["Visual Asset Required"]).toLocaleLowerCase("en");
  if (["no", "n", "false", "0"].includes(flag)) return { value: "", status: "not-required" };
  const object = trimCell(sourceRecord["Visual Object"]);
  const description = trimCell(sourceRecord["Visual Description"]);
  const type = normalizeQuestionType(sourceRecord["Question Type"]);
  const parts = [];
  if (object) parts.push(`visual:${object}`);
  if (type) parts.push(`type:${type}`);
  if (!object && description) parts.push(`visual-description:${description.slice(0, 60)}`);
  return { value: parts.join("|"), status: parts.length > 0 ? "inferred" : "missing" };
}

function sourceToAssetRows(tableRows) {
  const headerRowIndex = findHeaderRow(tableRows);
  if (headerRowIndex < 0) throw new Error("Could not find a header row with Question ID.");
  const headers = tableRows[headerRowIndex].map(cleanHeader);
  const headerAudit = buildHeaderAudit(headers);
  const sourceRows = tableRows.slice(headerRowIndex + 1).filter((row) => row.some((cell) => trimCell(cell) !== ""));
  const inferredFields = [];
  const explicitFields = [];
  const mappedRows = sourceRows.map((row, index) => {
    const rawRecord = {};
    headers.forEach((header, columnIndex) => {
      rawRecord[header] = trimCell(row[columnIndex]);
    });
    const sourceRecord = {};
    headerAudit.mapped.forEach(({ originalHeader, canonicalField }) => {
      if (!canonicalField) return;
      sourceRecord[canonicalField] = trimCell(rawRecord[originalHeader]);
    });
    ["Option A", "Option B", "Option C", "Option D", "Question Pool Version", "Visual Asset Required", "Reviewer", "Review Date", "Teaching Notes", "Required Assets"].forEach((field) => {
      sourceRecord[field] = trimCell(rawRecord[field] ?? sourceRecord[field]);
    });
    const rowOptions = splitOptions(sourceRecord.Options);
    const optionCells = ["Option A", "Option B", "Option C", "Option D"].map((field) => trimCell(rawRecord[field])).filter(Boolean);
    const options = rowOptions.length > 0 ? rowOptions : optionCells;
    if (options.length > 0) explicitFields.push({ rowNumber: index + 2, field: "Options", source: optionCells.length > 0 ? "Option A-D" : "Options" });
    const teachingNotes = deriveTeachingNotes(sourceRecord);
    const requiredAssets = deriveRequiredAssets(sourceRecord);
    if (teachingNotes.status === "explicit") explicitFields.push({ rowNumber: index + 2, field: "Teaching Notes" });
    else inferredFields.push({ rowNumber: index + 2, field: "Teaching Notes", status: teachingNotes.status });
    if (requiredAssets.status === "explicit") explicitFields.push({ rowNumber: index + 2, field: "Required Assets" });
    else inferredFields.push({ rowNumber: index + 2, field: "Required Assets", status: requiredAssets.status });
    const mappedRow = Object.fromEntries(canonicalColumns.map((column) => {
      if (column === "Options") return [column, options.join("|")];
      if (column === "Question Type") return [column, normalizeQuestionType(sourceRecord[column])];
      if (column === "Teaching Notes") return [column, teachingNotes.value];
      if (column === "Required Assets") return [column, requiredAssets.value];
      if (column === "Estimated Time") return [column, trimCell(sourceRecord["Estimated Time"] || rawRecord["Estimated Time (Seconds)"])];
      return [column, trimCell(sourceRecord[column])];
    }));
    Object.defineProperty(mappedRow, "__sourceRowNumber", {
      value: headerRowIndex + index + 2,
      enumerable: false,
    });
    return mappedRow;
  });
  return { headers, sourceRows, mappedRows, headerAudit, inferredFields, explicitFields };
}

function addIssue(issues, row, rowNumber, field, severity, message) {
  issues.push({ questionId: row?.["Question ID"] || `row-${rowNumber}`, rowNumber, field, severity, message });
}

function parseLevelFromSheet(sheet) {
  const match = String(sheet ?? "").match(/L(?:evel\s*)?0?(\d+)/i);
  return match ? Number(match[1]) : null;
}

function parseIdParts(id) {
  const match = String(id ?? "").match(/Y(\d+)-L0?(\d+)-Q/i);
  return match ? { year: Number(match[1]), level: Number(match[2]) } : null;
}

function detectSource(rows) {
  const ids = rows.map((row) => row["Question ID"]).filter(Boolean);
  const levels = new Map();
  const years = new Map();
  const subjects = new Map();
  const worlds = new Map();
  const prefixes = new Map();
  rows.forEach((row) => {
    const idParts = parseIdParts(row["Question ID"]);
    const level = Number(row.Level) || idParts?.level;
    const year = Number(row.Year) || idParts?.year;
    if (level) levels.set(level, (levels.get(level) ?? 0) + 1);
    if (year) years.set(year, (years.get(year) ?? 0) + 1);
    if (row.Subject) subjects.set(row.Subject, (subjects.get(row.Subject) ?? 0) + 1);
    if (row.World) worlds.set(row.World, (worlds.get(row.World) ?? 0) + 1);
    const prefix = String(row["Question ID"]).replace(/Q\d+$/i, "Q");
    if (prefix) prefixes.set(prefix, (prefixes.get(prefix) ?? 0) + 1);
  });
  const mostCommon = (map) => Array.from(map.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  return {
    questionIdPrefix: mostCommon(prefixes),
    subject: mostCommon(subjects),
    year: mostCommon(years),
    world: mostCommon(worlds),
    level: mostCommon(levels),
    ids,
  };
}

function validateRows(rows, missingRequiredHeaders, requestedSheet, filePath) {
  const issues = [];
  const ids = new Map();
  const expectedLevel = parseLevelFromSheet(requestedSheet);
  const detected = detectSource(rows);
  const sourceMismatch = {
    hasMismatch: false,
    message: "",
    expectedLevel,
    detectedLevel: detected.level,
  };
  if (expectedLevel && detected.level && expectedLevel !== detected.level) {
    sourceMismatch.hasMismatch = true;
    sourceMismatch.message = `Source mismatch: requested ${requestedSheet}, but imported rows look like Level ${String(detected.level).padStart(2, "0")} (${detected.questionIdPrefix ?? "unknown prefix"}). Export the correct Google Sheet tab before importing.`;
  }
  if (expectedLevel && /l0?(\d+)/i.test(path.basename(filePath))) {
    const filenameLevel = Number(path.basename(filePath).match(/l0?(\d+)/i)?.[1]);
    if (filenameLevel && filenameLevel !== expectedLevel) {
      sourceMismatch.hasMismatch = true;
      sourceMismatch.message = `Source mismatch: file name suggests Level ${filenameLevel}, but requested ${requestedSheet}.`;
    }
  }
  rows.forEach((row, index) => {
    const rowNumber = row.__sourceRowNumber ?? index + 2;
    for (const field of missingRequiredHeaders) addIssue(issues, row, rowNumber, field, "error", `Required header ${field} was not found.`);
    for (const field of blockingRequiredFields) {
      if (!row[field]) addIssue(issues, row, rowNumber, field, "error", `${field} is required.`);
    }
    const idParts = parseIdParts(row["Question ID"]);
    if (expectedLevel && idParts?.level && idParts.level !== expectedLevel) {
      addIssue(issues, row, rowNumber, "Source", "error", `Question ID level L${String(idParts.level).padStart(2, "0")} does not match requested ${requestedSheet}.`);
    }
    if (expectedLevel && Number(row.Level) && Number(row.Level) !== expectedLevel) {
      addIssue(issues, row, rowNumber, "Level", "error", `Level field ${row.Level} does not match requested ${requestedSheet}.`);
    }
    const id = normalizeAnswer(row["Question ID"]);
    if (id) ids.set(id, [...(ids.get(id) ?? []), rowNumber]);
    const type = row["Question Type"];
    const options = splitOptions(row.Options);
    const correct = normalizeAnswer(row["Correct Answer"]);
    if (!supportedQuestionTypes.has(type)) addIssue(issues, row, rowNumber, "Question Type", "error", `Unsupported question type: ${type || "(blank)"}.`);
    if (type === "Multiple Choice") {
      if (options.length < 2) addIssue(issues, row, rowNumber, "Options", "Multiple Choice requires at least 2 options.", "error");
      else if (!options.some((option) => normalizeAnswer(option) === correct)) addIssue(issues, row, rowNumber, "Correct Answer", "error", "Correct Answer must match one Multiple Choice option.");
    }
    if (type === "Tap Correct Group") {
      if (options.length < 2) addIssue(issues, row, rowNumber, "Options", "Tap Correct Group requires at least 2 tap targets.", "error");
      else if (!correctAnswerMatchesTapTarget(options, row["Correct Answer"])) addIssue(issues, row, rowNumber, "Correct Answer", "error", "Correct Answer must match one tap target.");
    }
    if (type === "True or False" && !["true", "false", "yes", "no", "correct", "incorrect"].includes(correct)) addIssue(issues, row, rowNumber, "Correct Answer", "error", "True or False rows must use True or False as the correct answer.");
    if (type === "Match Pairs") {
      const pairStatus = legacyMatchPairStatus(options, row["Correct Answer"]);
      if (!pairStatus.dedicatedReady) {
        addIssue(
          issues,
          row,
          rowNumber,
          "Question Type",
          "warning",
          "Match Pairs will use a safe fallback because fewer than 2 complete left = right pairs were found.",
        );
      }
    }
    if (["Multiple Choice", "Count & Type", "Tap Correct Group"].includes(type) && !row["Visual Description"]) addIssue(issues, row, rowNumber, "Visual Description", "Visual Description is required for this question type.", "error");
    if (!row["Teaching Notes"]) addIssue(issues, row, rowNumber, "Teaching Notes", "Teaching Notes were inferred or missing; review before approval.", "warning");
    else if (row["Teaching Notes"].includes("|")) addIssue(issues, row, rowNumber, "Teaching Notes", "Teaching Notes were inferred from existing explanation fields.", "warning");
    if (!row["Required Assets"]) addIssue(issues, row, rowNumber, "Required Assets", "Required Assets missing or not required.", "warning");
    else if (row["Required Assets"].startsWith("visual:") || row["Required Assets"].includes("type:")) addIssue(issues, row, rowNumber, "Required Assets", "Required Assets were inferred from legacy visual fields.", "warning");
    if (row.Status && row.Status !== "Approved") addIssue(issues, row, rowNumber, "Status", "warning", `Row is valid but not publishable because Status is ${row.Status}.`);
    if (row["Review Status"] && row["Review Status"] !== "Approved") addIssue(issues, row, rowNumber, "Review Status", "warning", `Row is valid but not publishable because Review Status is ${row["Review Status"]}.`);
    if (!row["Version Notes"]) addIssue(issues, row, rowNumber, "Version Notes", "Row is missing Version Notes.", "warning");
    if (!row["Assessment Eligible"]) addIssue(issues, row, rowNumber, "Assessment Eligible", "Assessment Eligible is blank.", "warning");
  });
  for (const [id, rowNumbers] of ids.entries()) {
    if (rowNumbers.length <= 1) continue;
    rowNumbers.forEach((rowNumber) => addIssue(issues, rows[rowNumber - 2], rowNumber, "Question ID", "error", `Duplicate Question ID: ${id}.`));
  }
  const rowResults = rows.map((row, index) => {
    const rowNumber = row.__sourceRowNumber ?? index + 2;
    const rowIssues = issues.filter((issue) => issue.rowNumber === rowNumber);
    const errors = rowIssues.filter((issue) => issue.severity === "error");
    const warnings = rowIssues.filter((issue) => issue.severity === "warning");
    const isValid = errors.length === 0;
    return {
      questionId: row["Question ID"] || `row-${rowNumber}`,
      rowNumber,
      isValid,
      isPublishable: isValid && isApprovedContentStatus(row.Status) && row["Review Status"] === "Approved" && row["Assessment Eligible"] !== "" && row["Version Notes"] !== "" && row["Teaching Notes"] !== "" && row["Required Assets"] !== "",
      errors,
      warnings,
    };
  });
  return {
    issues,
    rowResults,
    validRows: rowResults.filter((row) => row.isValid).length,
    publishableRows: rowResults.filter((row) => row.isPublishable).length,
    errorCount: issues.filter((issue) => issue.severity === "error").length,
    warningCount: issues.filter((issue) => issue.severity === "warning").length,
    detected,
    sourceMismatch,
  };
}

function countByType(rows) {
  return rows.reduce((counts, row) => {
    const type = row["Question Type"] || "Unknown";
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {});
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function importQuestionAssets({ filePath, sheet = "Forest L01", allowMismatch = false }) {
  const resolvedFilePath = path.resolve(filePath);
  if (!fs.existsSync(resolvedFilePath)) throw new Error(`File not found: ${resolvedFilePath}`);
  const loaded = loadRows(resolvedFilePath, sheet);
  const { sourceRows, mappedRows, headerAudit, inferredFields, explicitFields } = sourceToAssetRows(loaded.rows);
  const missingRequiredHeaders = headerAudit.missingRequiredHeaders;
  const approvedRows = mappedRows.filter((row) => isApprovedContentStatus(row.Status));
  const skippedRows = mappedRows.filter((row) => !isApprovedContentStatus(row.Status)).map(skippedRowForStatus);
  const validation = validateRows(approvedRows, missingRequiredHeaders, sheet, resolvedFilePath);
  const validRows = validation.sourceMismatch.hasMismatch && !allowMismatch ? [] : approvedRows.filter((_, index) => validation.rowResults[index]?.isValid);
  const importedRows = validRows.length;
  const rejectedRows = Math.max(0, approvedRows.length - importedRows);
  const rendererLimitations = approvedRows
    .filter((row) => {
      if (row["Question Type"] !== "Match Pairs") return false;
      return !legacyMatchPairStatus(splitOptions(row.Options), row["Correct Answer"]).dedicatedReady;
    })
    .map((row) => ({
      questionId: row["Question ID"],
      message: "Match Pairs will use the safe tap-answer fallback because canonical pair data is incomplete.",
    }));
  const report = {
    generatedAt: new Date().toISOString(),
    sourceFile: resolvedFilePath,
    sourceType: loaded.sourceType,
    requestedSheet: sheet,
    detectedWorksheet: loaded.detectedWorksheet,
    csvSheetNote: loaded.sourceType === "CSV" ? "CSV exports contain one tab only; --sheet is used for source validation." : null,
    outputJsonPath,
    reportJsonPath,
    detectedQuestionIdPrefix: validation.detected.questionIdPrefix,
    detectedSubject: validation.detected.subject,
    detectedYear: validation.detected.year,
    detectedWorld: validation.detected.world,
    detectedLevel: validation.detected.level,
    sourceMismatch: validation.sourceMismatch,
    totalSourceRows: sourceRows.length,
    sourceRows: sourceRows.length,
    approvedRows: approvedRows.length,
    skippedRows: skippedRows.length,
    skippedRowDetails: skippedRows,
    schemaValidRows: validation.validRows,
    validRows: validation.validRows,
    importedRows,
    rejectedRows,
    publishableRows: validation.publishableRows,
    warningCount: validation.warningCount,
    errorCount: validation.errorCount,
    duplicateIds: validation.issues.filter((issue) => issue.field === "Question ID" && issue.message.includes("Duplicate")),
    questionTypeDistribution: countByType(mappedRows),
    headerMappingAudit: headerAudit,
    inferredFieldsCount: inferredFields.length,
    explicitFieldsCount: explicitFields.length,
    inferredFields,
    explicitFields,
    rendererLimitations,
    issues: validation.issues,
    rowResults: validation.rowResults,
  };
  return { report, rowsToWrite: validRows, shouldWriteRows: !validation.sourceMismatch.hasMismatch || allowMismatch };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.file) {
    console.error('Usage: npm run import:questions -- --file "<path>" --sheet "Forest L01"');
    process.exit(1);
  }
  const result = importQuestionAssets({
    filePath: args.file,
    sheet: args.sheet ?? "Forest L01",
    allowMismatch: args["allow-mismatch"] === "true",
  });
  if (result.shouldWriteRows) writeJson(outputJsonPath, result.rowsToWrite);
  writeJson(reportJsonPath, result.report);
  console.log(`Source rows: ${result.report.totalSourceRows}`);
  console.log(`Imported rows: ${result.report.importedRows}`);
  console.log(`Skipped rows: ${result.report.skippedRows}`);
  console.log(`Rejected rows: ${result.report.rejectedRows}`);
  console.log(`Errors: ${result.report.errorCount}`);
  console.log(`Warnings: ${result.report.warningCount}`);
  if (result.report.sourceMismatch.hasMismatch) {
    console.error(result.report.sourceMismatch.message);
    console.error("JSON output was not overwritten with mismatched source rows.");
    process.exitCode = 1;
  } else if (result.report.errorCount > 0) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}
