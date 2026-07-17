import type { ForestL01QuestionAssetRow } from "../../data/question-asset-schema";

export type EnglishQuestionAssetSourceRow = Record<string, string>;

export function parseQuestionAssetCsv(text: string): EnglishQuestionAssetSourceRow[] {
  const tableRows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
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
    } else if (char !== "\r") {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== "") || tableRows.length === 0) tableRows.push(row);

  const [headers = [], ...rows] = tableRows;
  return rows
    .filter((sourceRow) => sourceRow.some((value) => value.trim() !== ""))
    .map((sourceRow) => {
      const record: EnglishQuestionAssetSourceRow = {};
      headers.forEach((header, index) => {
        record[header.trim()] = String(sourceRow[index] ?? "").trim();
      });
      return record;
    });
}

function optionList(row: EnglishQuestionAssetSourceRow) {
  return ["Option A", "Option B", "Option C", "Option D"]
    .map((field) => row[field]?.trim() ?? "")
    .filter(Boolean)
    .join("|");
}

function normalizeQuestionType(value: string) {
  const key = value
    .trim()
    .toLocaleLowerCase("en")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const aliases: Record<string, string> = {
    "multiple choice": "Multiple Choice",
    mcq: "Multiple Choice",
    "match pairs": "Match Pairs",
    "tap correct": "Tap Correct",
    "tap correct answer": "Tap Correct",
    "fill missing letter": "Fill Missing Letter",
    "fill missing word": "Fill Missing Word",
    "text input": "Text Input",
    "type answer": "Text Input",
    "true false": "True or False",
    "true or false": "True or False",
  };

  return aliases[key] ?? value.trim();
}

export function englishSourceRowToQuestionAssetRow(
  row: EnglishQuestionAssetSourceRow,
): ForestL01QuestionAssetRow {
  const visualType = row["Visual Type"] || "english-card";
  const visualDescription = row["Visual Description"] || "";

  return {
    "Question ID": row["Question ID"] || "",
    Status: row.Status || "",
    "Review Status": row["Review Status"] || row.Status || "",
    Subject: row.Subject || "English",
    Year: row.Year || "1",
    World: row.World || "forest-world",
    Level: row.Level || "",
    Topic: row.Topic || "",
    Subtopic: row.Subtopic || "",
    "Learning Objective": row["Learning Objective"] || "",
    Difficulty: row.Difficulty || "",
    "Question Type": normalizeQuestionType(row["Question Type"] || ""),
    Question: row.Question || "",
    "Visual Object": visualType,
    "Visual Description": visualDescription,
    Options: optionList(row),
    "Correct Answer": row["Correct Answer"] || "",
    "Step 1": row["Step 1"] || "",
    "Step 2": row["Step 2"] || "",
    "Step 3": row["Step 3"] || "",
    "Final Explanation": row.Explanation || row["Final Explanation"] || "",
    "LearnBot Tip": row["LearnBot Tip"] || "",
    "Assessment Eligible": row["Assessment Eligible"] || "",
    "Curriculum Alignment": row["Curriculum Alignment"] || "",
    "Estimated Time": row["Estimated Time"] || "",
    "Voice Script": row["Voice Script"] || "",
    "Teaching Notes": row.Instructions || row["Teaching Notes"] || "",
    "Required Assets": row["Required Assets"] || (visualDescription ? `visual:${visualType}` : ""),
    "Version Notes": row.Version || row["Version Notes"] || "",
  };
}

export function englishSourceRowsToQuestionAssetRows(rows: EnglishQuestionAssetSourceRow[]) {
  return rows.map(englishSourceRowToQuestionAssetRow);
}



