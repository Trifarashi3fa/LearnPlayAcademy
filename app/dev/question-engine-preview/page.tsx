import { notFound } from "next/navigation";
import pilotQuestions from "@/content/question-bank/mathematics/year-1/forest-world/pilot-non-mcq.json";
import forestL01AssetRows from "@/content/question-assets/mathematics/year-1/forest-world/forest-l01-sample.json";
import { questionEngineFeatureFlags } from "@/data/feature-flags";
import type { ForestL01QuestionAssetRow } from "@/data/question-asset-schema";
import { importForestL01AssetRows } from "@/lib/question-assets/import-question-assets";
import { validateForestL01AssetRows } from "@/lib/question-assets/validate-question-assets";
import {
  PilotQuestionEnginePreview,
  type PilotQuestionRecord,
} from "@/components/mvp/question-engine/PilotQuestionEnginePreview";

export const metadata = {
  title: "Question Engine Preview | LearnPlay Academy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuestionEnginePreviewPage() {
  if (!questionEngineFeatureFlags.nonMCQPreview) {
    notFound();
  }

  const assetRows = forestL01AssetRows as ForestL01QuestionAssetRow[];
  const assetValidation = validateForestL01AssetRows(
    assetRows,
    "Forest L01 Question Asset Master sample",
  );
  const assetImport = importForestL01AssetRows(assetRows);

  return (
    <PilotQuestionEnginePreview
      pilotQuestions={pilotQuestions as PilotQuestionRecord[]}
      assetRows={assetRows}
      assetValidation={assetValidation}
      importedAssetQuestions={assetImport.questions}
      assetImportErrors={assetImport.errors}
    />
  );
}