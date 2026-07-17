import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { questionEngineFeatureFlags } from "@/data/feature-flags";
import { educationalQaChecklist } from "@/data/question-asset-qa";
import { isDevRouteAccessAllowed } from "@/lib/dev-routes/access";
import {
  buildCurriculumQaSummary,
  type CurriculumQaSummary,
} from "@/lib/question-assets/curriculum-qa";
import {
  englishSourceRowsToQuestionAssetRows,
  parseQuestionAssetCsv,
} from "@/lib/question-assets/english-source-assets";

export const metadata = {
  title: "Curriculum QA | LearnPlay Academy",
  robots: {
    index: false,
    follow: false,
  },
};

type QaSource = {
  fileName: string;
  summary: CurriculumQaSummary;
};

function loadEnglishSources(): QaSource[] {
  const sourceDir = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    "content",
    "question-assets",
    "imports",
    "english",
    "year-1",
  );

  if (!fs.existsSync(sourceDir)) return [];

  return fs
    .readdirSync(sourceDir)
    .filter((fileName) => /^forest-l\d{2}\.csv$/i.test(fileName))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => {
      const csv = fs.readFileSync(path.join(sourceDir, fileName), "utf8");
      const sourceRows = parseQuestionAssetCsv(csv);
      const assetRows = englishSourceRowsToQuestionAssetRows(sourceRows);
      return {
        fileName,
        summary: buildCurriculumQaSummary(assetRows, `English Year 1 ${fileName}`),
      };
    });
}

function countTotal(sources: QaSource[], getValue: (summary: CurriculumQaSummary) => number) {
  return sources.reduce((total, source) => total + getValue(source.summary), 0);
}

function mergeCounts(sources: QaSource[], getCounts: (summary: CurriculumQaSummary) => Record<string, number>) {
  return sources.reduce<Record<string, number>>((merged, source) => {
    for (const [key, value] of Object.entries(getCounts(source.summary))) {
      merged[key] = (merged[key] ?? 0) + value;
    }
    return merged;
  }, {});
}

function CountList({ counts }: { counts: Record<string, number> }) {
  const entries = Object.entries(counts).filter(([, count]) => count > 0);
  if (entries.length === 0) return <p className="text-sm text-[#5B6B94]">No rows yet.</p>;

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(([label, count]) => (
        <div key={label} className="rounded-2xl border border-[#D8E6FF] bg-white p-3">
          <p className="text-xs font-black uppercase text-[#5B6B94]">{label}</p>
          <p className="mt-1 text-2xl font-black text-[#06318F]">{count}</p>
        </div>
      ))}
    </div>
  );
}

function SourceSummary({ source }: { source: QaSource }) {
  const { summary } = source;
  const duplicateCount =
    summary.duplicates.questionText.length +
    summary.duplicates.explanations.length +
    summary.duplicates.learnBotTips.length +
    summary.duplicates.distractors.length;

  return (
    <details className="rounded-3xl border border-[#D8E6FF] bg-white p-5 shadow-sm">
      <summary className="cursor-pointer text-lg font-black text-[#06318F]">
        {source.fileName} - {summary.totalRows} rows - {summary.approvalReadiness.reviewRows} in review
      </summary>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section>
          <h3 className="text-sm font-black uppercase text-[#FF4FA3]">By status</h3>
          <div className="mt-3">
            <CountList counts={summary.statusCounts} />
          </div>
        </section>
        <section>
          <h3 className="text-sm font-black uppercase text-[#FF4FA3]">By type</h3>
          <div className="mt-3">
            <CountList counts={summary.typeCounts} />
          </div>
        </section>
        <section className="rounded-2xl bg-[#F5F8FF] p-4">
          <h3 className="text-sm font-black uppercase text-[#5B6B94]">Approval readiness</h3>
          <p className="mt-2 text-sm text-[#24406F]">
            Valid rows: {summary.approvalReadiness.structurallyValidRows}. Publishable rows:{" "}
            {summary.approvalReadiness.publishableRows}. Blocked by errors:{" "}
            {summary.approvalReadiness.blockedByErrors}.
          </p>
        </section>
        <section className="rounded-2xl bg-[#FFF7D8] p-4">
          <h3 className="text-sm font-black uppercase text-[#8A5A00]">QA signals</h3>
          <p className="mt-2 text-sm text-[#5C4613]">
            Validation warnings: {summary.validationWarnings.length}. QA warnings:{" "}
            {summary.qaWarnings.length}. Duplicate groups: {duplicateCount}.
          </p>
        </section>
      </div>
    </details>
  );
}

export default function CurriculumQaPage() {
  if (!isDevRouteAccessAllowed() || !questionEngineFeatureFlags.nonMCQPreview) {
    notFound();
  }

  const sources = loadEnglishSources();
  const statusCounts = mergeCounts(sources, (summary) => summary.statusCounts);
  const levelCounts = mergeCounts(sources, (summary) => summary.levelCounts);
  const typeCounts = mergeCounts(sources, (summary) => summary.typeCounts);
  const totalRows = countTotal(sources, (summary) => summary.totalRows);
  const totalWarnings = countTotal(
    sources,
    (summary) => summary.validationWarnings.length + summary.qaWarnings.length,
  );
  const totalErrors = countTotal(sources, (summary) => summary.validationErrors.length);
  const publishableRows = countTotal(sources, (summary) => summary.approvalReadiness.publishableRows);
  const duplicateGroups = countTotal(
    sources,
    (summary) =>
      summary.duplicates.questionText.length +
      summary.duplicates.explanations.length +
      summary.duplicates.learnBotTips.length +
      summary.duplicates.distractors.length,
  );

  return (
    <main className="min-h-screen bg-[#F7FAFF] px-5 py-8 text-[#062B7A]">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase text-[#FF4FA3]">Developer Only</p>
          <h1 className="mt-2 text-3xl font-black">Curriculum QA Dashboard</h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold text-[#5B6B94]">
            Review source question assets before they are promoted to imported JSON or a production
            manifest. English gameplay remains inactive.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-[#5B6B94]">Rows</p>
            <p className="mt-2 text-3xl font-black">{totalRows}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-[#5B6B94]">Publishable</p>
            <p className="mt-2 text-3xl font-black">{publishableRows}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-[#5B6B94]">Warnings</p>
            <p className="mt-2 text-3xl font-black">{totalWarnings}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-[#5B6B94]">Errors</p>
            <p className="mt-2 text-3xl font-black">{totalErrors}</p>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Questions by status</h2>
            <div className="mt-4">
              <CountList counts={statusCounts} />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Questions by level</h2>
            <div className="mt-4">
              <CountList counts={levelCounts} />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black">Questions by type</h2>
            <div className="mt-4">
              <CountList counts={typeCounts} />
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Duplicate and coverage summary</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F5F8FF] p-4">
              <p className="text-xs font-black uppercase text-[#5B6B94]">Duplicate groups</p>
              <p className="mt-1 text-2xl font-black">{duplicateGroups}</p>
            </div>
            <div className="rounded-2xl bg-[#F5F8FF] p-4">
              <p className="text-xs font-black uppercase text-[#5B6B94]">Curriculum coverage</p>
              <p className="mt-1 text-sm font-bold">
                Missing fields are shown inside each source section.
              </p>
            </div>
            <div className="rounded-2xl bg-[#F5F8FF] p-4">
              <p className="text-xs font-black uppercase text-[#5B6B94]">Approval readiness</p>
              <p className="mt-1 text-sm font-bold">
                Review rows are valid for QA but not publishable until Approved.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Educational QA checklist</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {educationalQaChecklist.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#D8E6FF] p-4">
                <p className="font-black">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-[#5B6B94]">{item.reviewerPrompt}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-black">Source files</h2>
          {sources.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="font-semibold text-[#5B6B94]">No English source CSV files found.</p>
            </div>
          ) : (
            sources.map((source) => <SourceSummary key={source.fileName} source={source} />)
          )}
        </section>
      </div>
    </main>
  );
}

