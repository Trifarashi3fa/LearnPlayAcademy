import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import pilotQuestions from "@/content/question-bank/mathematics/year-1/forest-world/pilot-non-mcq.json";
import forestL01AssetRows from "@/content/question-assets/mathematics/year-1/forest-world/forest-l01-sample.json";
import { questionEngineFeatureFlags } from "@/data/feature-flags";
import type { ForestL01QuestionAssetRow } from "@/data/question-asset-schema";
import { importForestL01AssetRows } from "@/lib/question-assets/import-question-assets";
import { validateForestL01AssetRows } from "@/lib/question-assets/validate-question-assets";
import {
  PilotQuestionEnginePreview,
  type AssetPreviewSource,
  type PilotQuestionRecord,
} from "@/components/mvp/question-engine/PilotQuestionEnginePreview";

export const metadata = {
  title: "Question Engine Preview | LearnPlay Academy",
  robots: {
    index: false,
    follow: false,
  },
};

function createPreviewSource(id: string, label: string, rows: ForestL01QuestionAssetRow[], importReport?: AssetPreviewSource["importReport"]): AssetPreviewSource {
  const assetValidation = validateForestL01AssetRows(rows, label);
  const assetImport = importForestL01AssetRows(rows);
  return {
    id,
    label,
    rows,
    validation: assetValidation,
    importedQuestions: assetImport.questions,
    importErrors: assetImport.errors,
    importReport,
  };
}

function readJsonFile<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function loadImportedForestSources({
  subject,
  labelPrefix,
  reportDir,
}: {
  subject: "mathematics" | "english";
  labelPrefix: string;
  reportDir: string;
}): AssetPreviewSource[] {
  const repoRoot = process.cwd();
  const importedDir = path.join(
    /* turbopackIgnore: true */ repoRoot,
    `content/question-assets/${subject}/year-1/forest-world`,
  );
  const resolvedReportDir = path.join(/* turbopackIgnore: true */ repoRoot, reportDir);

  if (!fs.existsSync(importedDir)) return [];

  return fs
    .readdirSync(importedDir)
    .filter((fileName) => /^forest-l\d{2}-imported\.json$/i.test(fileName))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => {
      const levelMatch = fileName.match(/forest-l(\d{2})-imported\.json/i);
      const levelCode = levelMatch?.[1] ?? "01";
      const rows = readJsonFile<ForestL01QuestionAssetRow[]>(
        path.join(importedDir, fileName),
      );
      const report = readJsonFile<AssetPreviewSource["importReport"]>(
        path.join(resolvedReportDir, `year-1-forest-l${levelCode}-import-report.json`),
      );

      if (!rows) return null;

      return createPreviewSource(
        `${subject}-imported-forest-l${levelCode}`,
        `${labelPrefix} L${levelCode}`,
        rows,
        report ?? undefined,
      );
    })
    .filter((source): source is AssetPreviewSource => source !== null);
}

function loadImportedYear1ForestSources(): AssetPreviewSource[] {
  return [
    ...loadImportedForestSources({
      subject: "mathematics",
      labelPrefix: "Imported Mathematics Year 1 Forest",
      reportDir: "generated/question-assets",
    }),
    ...loadImportedForestSources({
      subject: "english",
      labelPrefix: "Imported English Year 1 Forest",
      reportDir: "generated/question-assets/english",
    }),
  ];
}

export default function QuestionEnginePreviewPage() {
  if (!questionEngineFeatureFlags.nonMCQPreview) {
    notFound();
  }

  const assetSources = [
    createPreviewSource(
      "fixed-sample",
      "Existing fixed sample",
      forestL01AssetRows as ForestL01QuestionAssetRow[],
    ),
    ...loadImportedYear1ForestSources(),
  ];

  return (
    <PilotQuestionEnginePreview
      pilotQuestions={pilotQuestions as PilotQuestionRecord[]}
      assetSources={assetSources}
      randomPoolPreviewEnabled={questionEngineFeatureFlags.forestL01RandomPoolPreview}
    />
  );
}
