import { notFound } from "next/navigation";
import pilotQuestions from "@/content/question-bank/mathematics/year-1/forest-world/pilot-non-mcq.json";
import forestL01AssetRows from "@/content/question-assets/mathematics/year-1/forest-world/forest-l01-sample.json";
import importedForestL01Rows from "@/content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json";
import forestL01ImportReport from "@/generated/question-assets/year-1-forest-l01-import-report.json";
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
    createPreviewSource(
      "imported-forest-l01",
      "Imported Year 1 Forest L01",
      importedForestL01Rows as ForestL01QuestionAssetRow[],
      forestL01ImportReport as AssetPreviewSource["importReport"],
    ),
  ];

  return (
    <PilotQuestionEnginePreview
      pilotQuestions={pilotQuestions as PilotQuestionRecord[]}
      assetSources={assetSources}
      randomPoolPreviewEnabled={questionEngineFeatureFlags.forestL01RandomPoolPreview}
    />
  );
}
