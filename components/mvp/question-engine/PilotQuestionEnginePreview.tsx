"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ExactBooleanGradingSpec,
  ExactNumberGradingSpec,
  NormalizedCountObjectsQuestion,
  NormalizedFillInBlankQuestion,
  NormalizedQuestion,
  NormalizedTextGradingSpec,
  NormalizedTrueFalseQuestion,
} from "@/data/question-engine-types";
import type {
  ForestL01QuestionAssetRow as AssetRow,
  QuestionAssetValidationSummary as AssetValidationSummary,
} from "@/data/question-asset-schema";
import type { QuestionAssetImportError } from "@/lib/question-assets/import-question-assets";
import {
  forestL01TargetDistribution,
  selectForestYear1RandomSession,
  summarizeRendererSupport,
} from "@/lib/question-assets/random-question-pool";
import { parseMatchPairsState } from "@/lib/question-engine/match-pairs";
import { QuestionRenderer } from "@/components/mvp/question-engine/QuestionRenderer";

export type PilotQuestionRecord = {
  questionId: string;
  question: string;
  explanation: string;
  interactionType: "true-false" | "count-objects" | "fill-in-blank";
  interaction: Record<string, unknown>;
  answerSpec: Record<string, unknown>;
  gradingSpec: Record<string, unknown>;
  visualMetadata?: unknown;
  accessibilityText?: string;
  difficulty?: string;
  topic?: string;
  subtopic?: string;
  status?: string;
  mvpStatus?: string;
};

type AssetImportReport = {
  sourceType?: string;
  requestedSheet?: string;
  detectedWorksheet?: string | null;
  detectedQuestionIdPrefix?: string | null;
  detectedSubject?: string | null;
  detectedYear?: number | null;
  detectedWorld?: string | null;
  detectedLevel?: number | null;
  totalSourceRows?: number;
  importedRows?: number;
  rejectedRows?: number;
  warningCount?: number;
  errorCount?: number;
  sourceMismatch?: {
    hasMismatch?: boolean;
    message?: string;
    expectedLevel?: number | null;
    detectedLevel?: number | null;
  };
  rendererLimitations?: Array<{ questionId?: string; message?: string }>;
};

export type AssetPreviewSource = {
  id: string;
  label: string;
  rows: AssetRow[];
  validation: AssetValidationSummary;
  importedQuestions: NormalizedQuestion[];
  importErrors: QuestionAssetImportError[];
  importReport?: AssetImportReport;
};

type PilotQuestionEnginePreviewProps = {
  pilotQuestions: PilotQuestionRecord[];
  assetSources?: AssetPreviewSource[];
  assetRows?: AssetRow[];
  assetValidation?: AssetValidationSummary;
  importedAssetQuestions?: NormalizedQuestion[];
  assetImportErrors?: QuestionAssetImportError[];
  randomPoolPreviewEnabled?: boolean;
};


function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asNumberArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is number => typeof item === "number" && Number.isFinite(item))
    : [];
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizePilotQuestion(record: PilotQuestionRecord): NormalizedQuestion {
  if (record.interactionType === "true-false") {
    const question: NormalizedTrueFalseQuestion = {
      questionId: record.questionId,
      prompt: record.question,
      interactionType: "true-false",
      interaction: {
        trueLabel: asString(record.interaction.trueLabel, "True"),
        falseLabel: asString(record.interaction.falseLabel, "False"),
      },
      answerSpec: {
        correctValue: asBoolean(record.answerSpec.correctValue),
      },
      gradingSpec: { strategy: "exact-boolean" } satisfies ExactBooleanGradingSpec,
      explanation: record.explanation,
      visualMetadata: record.visualMetadata ?? null,
      accessibilityText: record.accessibilityText ?? record.question,
    };
    return question;
  }

  if (record.interactionType === "count-objects") {
    const numericChoices = asNumberArray(record.interaction.numericChoices);
    const question: NormalizedCountObjectsQuestion = {
      questionId: record.questionId,
      prompt: record.question,
      interactionType: "count-objects",
      interaction: {
        responseMode: "numeric-choice",
        numericChoices: numericChoices.length > 0 ? numericChoices : undefined,
      },
      answerSpec: {
        expectedCount: asNumber(record.answerSpec.expectedCount),
      },
      gradingSpec: { strategy: "exact-number" } satisfies ExactNumberGradingSpec,
      explanation: record.explanation,
      visualMetadata: record.visualMetadata ?? null,
      accessibilityText: record.accessibilityText ?? record.question,
    };
    return question;
  }

  const question: NormalizedFillInBlankQuestion = {
    questionId: record.questionId,
    prompt: record.question,
    interactionType: "fill-in-blank",
    interaction: {
      template: asString(record.interaction.template, record.question),
      blankId: asString(record.interaction.blankId, "answer"),
      inputMode: asString(record.interaction.inputMode, "text") === "numeric" ? "numeric" : "text",
      placeholder: asString(record.interaction.placeholder, "Type your answer"),
    },
    answerSpec: {
      acceptedAnswers: asStringArray(record.answerSpec.acceptedAnswers),
    },
    gradingSpec: {
      strategy: "normalized-text",
      trimWhitespace: record.gradingSpec.trimWhitespace !== false,
      caseSensitive: record.gradingSpec.caseSensitive === true,
      collapseWhitespace: record.gradingSpec.collapseWhitespace !== false,
      numericNormalization: record.gradingSpec.numericNormalization === true,
    } satisfies NormalizedTextGradingSpec,
    explanation: record.explanation,
    visualMetadata: record.visualMetadata ?? null,
    accessibilityText: record.accessibilityText ?? record.question,
  };
  return question;
}

function normalizeTextAnswer(value: string, question: NormalizedFillInBlankQuestion) {
  let normalized = value;
  if (question.gradingSpec.trimWhitespace) normalized = normalized.trim();
  if (question.gradingSpec.collapseWhitespace) normalized = normalized.replace(/\s+/g, " ");
  if (!question.gradingSpec.caseSensitive) normalized = normalized.toLocaleLowerCase("en");
  if (question.gradingSpec.numericNormalization && normalized !== "" && Number.isFinite(Number(normalized))) {
    normalized = String(Number(normalized));
  }
  return normalized;
}

function checkAnswer(question: NormalizedQuestion, selectedAnswer: string | null) {
  if (selectedAnswer === null) return null;

  if (question.interactionType === "multiple-choice") {
    const correctChoice = question.interaction.choices.find(
      (choice) => choice.id === question.answerSpec.correctChoiceId,
    );
    return selectedAnswer === correctChoice?.label;
  }

  if (question.interactionType === "true-false") {
    const selectedValue =
      selectedAnswer === question.interaction.trueLabel ||
      selectedAnswer.toLocaleLowerCase("en") === "true";
    return selectedValue === question.answerSpec.correctValue;
  }

  if (question.interactionType === "count-objects") {
    return Number(selectedAnswer) === question.answerSpec.expectedCount;
  }

  if (question.interactionType === "tap-answer") {
    const correctTarget = question.interaction.targets.find(
      (target) => target.id === question.answerSpec.correctTargetId,
    );
    return selectedAnswer === correctTarget?.label || selectedAnswer === correctTarget?.id;
  }

  if (question.interactionType === "fill-in-blank") {
    const actual = normalizeTextAnswer(selectedAnswer, question);
    const accepted = question.answerSpec.acceptedAnswers.map((answer) =>
      normalizeTextAnswer(answer, question),
    );
    return accepted.includes(actual);
  }

  if (question.interactionType === "match-pairs") {
    return parseMatchPairsState(selectedAnswer)?.completed ?? false;
  }

  return false;
}

function expectedAnswer(question: NormalizedQuestion) {
  if (question.interactionType === "multiple-choice") {
    return question.interaction.choices.find(
      (choice) => choice.id === question.answerSpec.correctChoiceId,
    )?.label ?? "";
  }

  if (question.interactionType === "true-false") {
    return question.answerSpec.correctValue
      ? question.interaction.trueLabel
      : question.interaction.falseLabel;
  }

  if (question.interactionType === "count-objects") {
    return String(question.answerSpec.expectedCount);
  }

  if (question.interactionType === "tap-answer") {
    return question.interaction.targets.find(
      (target) => target.id === question.answerSpec.correctTargetId,
    )?.label ?? "";
  }

  if (question.interactionType === "fill-in-blank") {
    return question.answerSpec.acceptedAnswers[0] ?? "";
  }

  if (question.interactionType === "match-pairs") {
    return `${question.interaction.pairs.length} matched pairs`;
  }

  return "";
}

function selectedAnswerSummary(question: NormalizedQuestion, selectedAnswer: string | null) {
  if (selectedAnswer === null) return "No answer selected";
  if (question.interactionType !== "match-pairs") return selectedAnswer;

  const state = parseMatchPairsState(selectedAnswer);
  if (!state) return "No match-pairs state yet";
  return state.completed
    ? "All pairs matched"
    : `${state.matchedPairIds.length} matched, ${state.attempts} attempt(s)`;
}

function MatchPairsPreviewState({
  question,
  selectedAnswer,
}: {
  question: NormalizedQuestion;
  selectedAnswer: string | null;
}) {
  if (question.interactionType !== "match-pairs") return null;
  const state = parseMatchPairsState(selectedAnswer);

  return (
    <>
      <div className="rounded-2xl bg-white p-3">
        <dt className="text-[#5B6B94]">Selected left item</dt>
        <dd className="mt-1 break-words text-[#082B80]">
          {state?.selectedLeftId ?? "None"}
        </dd>
      </div>
      <div className="rounded-2xl bg-white p-3">
        <dt className="text-[#5B6B94]">Selected right item</dt>
        <dd className="mt-1 break-words text-[#082B80]">
          {state?.selectedRightId ?? "None"}
        </dd>
      </div>
      <div className="rounded-2xl bg-white p-3">
        <dt className="text-[#5B6B94]">Matched pairs</dt>
        <dd className="mt-1 break-words text-[#082B80]">
          {state?.matchedPairIds.length ?? 0} / {question.interaction.pairs.length}
        </dd>
      </div>
      <div className="rounded-2xl bg-white p-3">
        <dt className="text-[#5B6B94]">Attempts / completed</dt>
        <dd className="mt-1 break-words text-[#082B80]">
          {state?.attempts ?? 0} attempts, {state?.completed ? "complete" : "not complete"}
        </dd>
      </div>
    </>
  );
}

function countByQuestionType(rows: AssetRow[]) {
  return rows.reduce<Record<string, number>>((counts, row) => {
    const type = row["Question Type"] || "Unknown";
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {});
}

function IssueList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "error" | "warning" | "info";
  items: string[];
}) {
  const toneClass =
    tone === "error"
      ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
      : tone === "warning"
        ? "border-[#FFD76A] bg-[#FFF7D6] text-[#082B80]"
        : "border-[#BFD7FF] bg-[#EAF6FF] text-[#082B80]";

  const visibleItems = items.slice(0, 10);

  return (
    <details className={`rounded-2xl border p-3 ${toneClass}`} open={tone === "error" && items.length > 0}>
      <summary className="cursor-pointer text-sm font-black">
        {title}: {items.length}
      </summary>
      {items.length > 0 ? (
        <>
          <ul className="mt-3 grid gap-2 text-sm font-bold leading-6">
            {visibleItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {items.length > visibleItems.length ? (
            <p className="mt-3 text-xs font-black uppercase">
              Showing first {visibleItems.length} of {items.length}. Open the JSON report for the full list.
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-sm font-bold">None found.</p>
      )}
    </details>
  );
}

function AssetValidationPanel({
  assetRows = [],
  assetValidation,
  assetImportErrors = [],
  assetImportReport,
}: {
  assetRows?: AssetRow[];
  assetValidation?: AssetValidationSummary;
  assetImportErrors?: QuestionAssetImportError[];
  assetImportReport?: AssetImportReport;
}) {
  if (!assetValidation) return null;

  const typeCounts = countByQuestionType(assetRows);
  const importedCount = Math.max(
    0,
    assetImportReport?.importedRows ?? assetValidation.validRows - assetImportErrors.length,
  );
  const rejectedCount = Math.max(
    0,
    assetImportReport?.rejectedRows ?? assetValidation.totalRows - importedCount,
  );
  const totalRows = assetImportReport?.totalSourceRows ?? assetValidation.totalRows;
  const hasSourceMismatch = assetImportReport?.sourceMismatch?.hasMismatch === true;
  const validationErrors = assetValidation.issues
    .filter((issue) => issue.severity === "error")
    .map((issue) => `Row ${issue.rowNumber} - ${issue.questionId} - ${issue.field}: ${issue.message}`);
  const importErrors = assetImportErrors.map(
    (issue) => `Row ${issue.rowNumber} - ${issue.questionId} - Import: ${issue.message}`,
  );
  const publishabilityIssues = assetValidation.issues
    .filter((issue) => issue.severity === "warning" && ["Status", "Review Status", "Version Notes"].includes(issue.field))
    .map((issue) => `Row ${issue.rowNumber} - ${issue.questionId} - ${issue.field}: ${issue.message}`);
  const warnings = assetValidation.issues
    .filter((issue) => issue.severity === "warning" && !["Status", "Review Status", "Version Notes"].includes(issue.field))
    .map((issue) => `Row ${issue.rowNumber} - ${issue.questionId} - ${issue.field}: ${issue.message}`);
  const rendererSupport = summarizeRendererSupport(assetRows);
  const rendererClassifications = rendererSupport.items.map(
    (item) => `${item.questionType}: ${item.status} (${item.count}) - ${item.message}`,
  );
  const previewRendererFallbacks = [
    ...rendererSupport.previewFallback.map(
      (item) => `${item.questionType}: ${item.count} preview through a safe fallback. ${item.message}`,
    ),
    ...rendererSupport.previewOnlyLimitation.map(
      (item) => `${item.questionType}: ${item.count} preview-only limitation. ${item.message}`,
    ),
    ...(assetImportReport?.rendererLimitations ?? []).map(
      (item) => `${item.questionId ?? "Report"}: ${item.message ?? "Renderer limitation."}`,
    ),
  ];
  const unsupportedRenderers = rendererSupport.unsupported.map(
    (item) => `${item.questionType}: ${item.count} unsupported. ${item.message}`,
  );
  const missingVisuals = assetValidation.issues
    .filter((issue) => ["Visual Description", "Visual Object", "Required Assets"].includes(issue.field))
    .map((issue) => `Row ${issue.rowNumber} - ${issue.questionId} - ${issue.field}: ${issue.message}`);
  const duplicateIds = assetValidation.issues
    .filter((issue) => issue.field === "Question ID" && issue.message.toLocaleLowerCase("en").includes("duplicate"))
    .map((issue) => `Row ${issue.rowNumber} - ${issue.questionId}: ${issue.message}`);
  const missingExplanations = assetValidation.issues
    .filter((issue) => ["Step 1", "Step 2", "Step 3", "Final Explanation", "Teaching Notes", "LearnBot Tip"].includes(issue.field))
    .map((issue) => `Row ${issue.rowNumber} - ${issue.questionId} - ${issue.field}: ${issue.message}`);
  const statusTone =
    validationErrors.length > 0 || importErrors.length > 0
      ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
      : warnings.length > 0
        ? "border-[#FFD76A] bg-[#FFF7D6] text-[#082B80]"
        : "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]";

  return (
    <section className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
            Question Asset Import Layer
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#082B80]">
            Forest L01 Asset QA
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-[#5B6B94]">
            Local asset rows are validated and imported separately from the
            approved production manifest. Production gameplay is unchanged.
          </p>
        </div>
        <div className={`rounded-2xl border-2 px-4 py-3 text-sm font-black ${statusTone}`}>
          {validationErrors.length + importErrors.length} errors - {assetValidation.warningCount} warnings
        </div>
      </div>

      {assetImportReport ? (
        <div className={`mt-5 rounded-2xl border-2 p-4 text-sm font-black leading-6 ${
          hasSourceMismatch
            ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
            : "border-[#BFD7FF] bg-[#EAF6FF] text-[#082B80]"
        }`}>
          <p>
            Source: {assetImportReport.sourceType ?? "Local JSON"} / Requested:{" "}
            {assetImportReport.requestedSheet ?? "Forest L01"} / Detected level:{" "}
            {assetImportReport.detectedLevel ?? "not detected"} / Prefix:{" "}
            {assetImportReport.detectedQuestionIdPrefix ?? "not detected"}
          </p>
          {hasSourceMismatch ? (
            <p className="mt-2">{assetImportReport.sourceMismatch?.message}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl bg-[#EAF6FF] p-4">
          <p className="text-xs font-black uppercase text-[#0B63F6]">Total rows</p>
          <p className="mt-1 text-3xl font-black">{totalRows}</p>
        </div>
        <div className="rounded-2xl bg-[#DCFCE7] p-4">
          <p className="text-xs font-black uppercase text-[#14532D]">Valid rows</p>
          <p className="mt-1 text-3xl font-black">{assetValidation.validRows}</p>
        </div>
        <div className="rounded-2xl bg-[#F3E8FF] p-4">
          <p className="text-xs font-black uppercase text-[#8B5CF6]">Publishable</p>
          <p className="mt-1 text-3xl font-black">{assetValidation.publishableRows}</p>
        </div>
        <div className="rounded-2xl bg-[#FFF7D6] p-4">
          <p className="text-xs font-black uppercase text-[#082B80]">Imported</p>
          <p className="mt-1 text-3xl font-black">{importedCount}</p>
        </div>
        <div className="rounded-2xl bg-[#FFF7D6] p-4">
          <p className="text-xs font-black uppercase text-[#082B80]">Rejected</p>
          <p className="mt-1 text-3xl font-black">{rejectedCount}</p>
        </div>
        <div className="rounded-2xl bg-[#FEE2E2] p-4">
          <p className="text-xs font-black uppercase text-[#7F1D1D]">Errors</p>
          <p className="mt-1 text-3xl font-black">{validationErrors.length + importErrors.length}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {Object.entries(typeCounts).map(([type, count]) => (
          <span
            key={type}
            className="rounded-full bg-[#F3E8FF] px-3 py-2 text-xs font-black text-[#8B5CF6]"
          >
            {type}: {count}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <IssueList title="Errors" tone="error" items={[...validationErrors, ...importErrors]} />
        <IssueList title="Publishability issues" tone="warning" items={publishabilityIssues} />
        <IssueList title="Warnings" tone="warning" items={warnings} />
        <IssueList title="Renderer classifications" tone="info" items={rendererClassifications} />
        <IssueList title="Preview fallback / limitations" tone="info" items={previewRendererFallbacks} />
        <IssueList title="Unsupported renderers" tone="error" items={unsupportedRenderers} />
        <IssueList title="Missing visuals/assets" tone="error" items={missingVisuals} />
        <IssueList title="Duplicate IDs" tone="error" items={duplicateIds} />
        <IssueList title="Missing explanations/teaching notes" tone="error" items={missingExplanations} />
      </div>
    </section>
  );
}

function RandomSessionPreview({
  assetRows = [],
  assetValidation,
  assetImportReport,
  importedQuestions = [],
  enabled = false,
}: {
  assetRows?: AssetRow[];
  assetValidation?: AssetValidationSummary;
  assetImportReport?: AssetImportReport;
  importedQuestions?: NormalizedQuestion[];
  enabled?: boolean;
}) {
  const [seedIndex, setSeedIndex] = useState(1);
  const validQuestionIds = useMemo(
    () =>
      assetValidation?.rowResults
        .filter((result) => result.isValid)
        .map((result) => result.questionId) ?? [],
    [assetValidation],
  );
  const session = useMemo(
    () =>
      selectForestYear1RandomSession({
        level: assetImportReport?.detectedLevel ?? 1,
        questions: importedQuestions,
        assetRows,
        validQuestionIds,
        seed: `forest-l01-preview-${seedIndex}`,
      }),
    [assetImportReport?.detectedLevel, assetRows, importedQuestions, seedIndex, validQuestionIds],
  );

  if (!assetValidation) return null;

  const duplicateCount =
    session.selectedQuestionIds.length - new Set(session.selectedQuestionIds).size;

  return (
    <section className="rounded-[2rem] border border-[#BFD7FF] bg-[#EAF6FF] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#0B63F6]">
            Forest L01 Random Pool Preview
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#082B80]">
            Random 10-question session
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-[#5B6B94]">
            This dev-only preview samples valid imported asset questions with a
            target mix of interaction types. Production Forest gameplay still
            uses the approved active manifest.
          </p>
          <p className="mt-2 max-w-3xl text-xs font-black uppercase tracking-wide text-[#5B6B94]">
            Dataset: {assetImportReport?.requestedSheet ?? "Forest L01"} / Source:{" "}
            {assetImportReport?.sourceType ?? "local JSON"} / Detected level:{" "}
            {assetImportReport?.detectedLevel ?? "not detected"}
          </p>
          <p className="mt-2 max-w-3xl text-xs font-bold leading-5 text-[#5B6B94]">
            Publishability does not control dev-preview eligibility. Review/Pending
            rows can be sampled here when they are structurally valid and imported.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSeedIndex((current) => current + 1)}
          disabled={!enabled || session.eligibleCount < 10}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-5 py-3 text-sm font-black text-white transition hover:bg-[#084FC5] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-not-allowed disabled:bg-[#C9D7EA] disabled:text-[#5B6B94]"
        >
          Generate New Random Session
        </button>
      </div>

      {!enabled ? (
        <p className="mt-5 rounded-2xl border-2 border-[#FFD76A] bg-[#FFF7D6] p-4 text-sm font-black leading-6 text-[#082B80]">
          Random pool preview is disabled outside the development preview flag.
        </p>
      ) : null}

      {enabled && session.eligibleCount < 10 ? (
        <p className="mt-5 rounded-2xl border-2 border-[#FFD76A] bg-[#FFF7D6] p-4 text-sm font-black leading-6 text-[#082B80]">
          Random session unavailable: Forest L01 needs at least 10 dev-preview
          eligible imported questions, but this source has {session.eligibleCount}.
        </p>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-black uppercase text-[#0B63F6]">Dev-preview eligible pool</p>
          <p className="mt-1 text-3xl font-black text-[#082B80]">{session.eligibleCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-black uppercase text-[#0B63F6]">Selected</p>
          <p className="mt-1 text-3xl font-black text-[#082B80]">{session.selectedQuestions.length}</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-black uppercase text-[#0B63F6]">Duplicates</p>
          <p className="mt-1 text-3xl font-black text-[#082B80]">{duplicateCount}</p>
        </div>
        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-black uppercase text-[#0B63F6]">Seed</p>
          <p className="mt-1 text-xl font-black text-[#082B80]">{seedIndex}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#DDE8F5] bg-white p-4">
        <p className="text-xs font-black uppercase text-[#5B6B94]">Target mix</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(forestL01TargetDistribution).map(([type, count]) => (
            <span
              key={type}
              className="rounded-full bg-[#F3E8FF] px-3 py-2 text-xs font-black text-[#8B5CF6]"
            >
              {type}: {count}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#DDE8F5] bg-white p-4">
        <p className="text-xs font-black uppercase text-[#5B6B94]">Selected mix</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(session.typeDistribution).map(([type, count]) => (
            <span
              key={type}
              className="rounded-full bg-[#DCFCE7] px-3 py-2 text-xs font-black text-[#14532D]"
            >
              {type}: {count}
            </span>
          ))}
        </div>
      </div>

      {session.warnings.length > 0 ? (
        <div className="mt-5 grid gap-2">
          {session.warnings.map((warning, index) => (
            <p
              key={`${warning.code}-${warning.questionId ?? "pool"}-${index}`}
              className="rounded-2xl border border-[#FFD76A] bg-[#FFF7D6] p-3 text-sm font-bold leading-6 text-[#082B80]"
            >
              {warning.message}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {session.selectedQuestions.map((question, index) => (
          <article
            key={`${question.questionId}-${index}`}
            className="rounded-2xl border border-[#DDE8F5] bg-white p-3"
          >
            <p className="text-xs font-black uppercase text-[#FF4FB8]">
              Session {index + 1}
            </p>
            <h3 className="mt-1 break-words text-sm font-black text-[#082B80]">
              {question.questionId}
            </h3>
            <p className="mt-2 text-xs font-bold text-[#5B6B94]">
              {question.interactionType}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ImportedAssetQuestionPreview({
  questions,
}: {
  questions: NormalizedQuestion[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const activeQuestion = questions[activeIndex];
  const answerResult = activeQuestion ? checkAnswer(activeQuestion, selectedAnswer) : null;

  function selectQuestion(index: number) {
    setActiveIndex(index);
    setSelectedAnswer(null);
  }

  if (!activeQuestion) {
    return (
      <section className="rounded-[2rem] border border-[#FFD76A] bg-[#FFF7D6] p-5 text-sm font-black text-[#082B80]">
        No imported asset questions are ready to preview.
      </section>
    );
  }

  return (
    <section className="grid gap-5 rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
          Imported Asset Question Preview
        </p>
        <h2 className="mt-2 text-2xl font-black text-[#082B80]">
          Forest L01 sample through QuestionRenderer
        </h2>
        <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
          These imported local asset questions are dev-only and are not active
          Forest content.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {questions.slice(0, 12).map((question, index) => (
          <button
            key={question.questionId}
            type="button"
            onClick={() => selectQuestion(index)}
            className={`min-h-12 rounded-2xl border-2 px-3 py-2 text-left text-xs font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
              index === activeIndex
                ? "border-[#0B63F6] bg-[#EAF6FF] text-[#082B80]"
                : "border-[#DDE8F5] bg-white text-[#5B6B94] hover:border-[#0B63F6]"
            }`}
          >
            <span className="block text-[#FF4FB8]">{question.questionId}</span>
            <span className="block capitalize">{question.interactionType}</span>
          </button>
        ))}
      </div>

      <section className="grid gap-5 lg:grid-cols-[1fr_18rem]">
        <article className="rounded-[2rem] border border-[#DDE8F5] bg-[#F8FBFF] p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#EAF6FF] px-3 py-2 text-xs font-black uppercase text-[#0B63F6]">
              Imported asset
            </span>
            <span className="rounded-full bg-[#F3E8FF] px-3 py-2 text-xs font-black uppercase text-[#8B5CF6]">
              {activeQuestion.interactionType}
            </span>
          </div>
          <h3 className="text-2xl font-black leading-tight text-[#082B80]">
            {activeQuestion.prompt}
          </h3>
          <div className="mt-6">
            <QuestionRenderer
              question={activeQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={setSelectedAnswer}
            />
          </div>
        </article>

        <aside className="rounded-[2rem] border border-[#BFD7FF] bg-[#EAF6FF] p-5">
          <p className="text-xs font-black uppercase text-[#0B63F6]">
            Imported Preview State
          </p>
          <dl className="mt-4 grid gap-3 text-sm font-bold">
            <div className="rounded-2xl bg-white p-3">
              <dt className="text-[#5B6B94]">Selected answer</dt>
              <dd className="mt-1 break-words text-[#082B80]">
                {selectedAnswerSummary(activeQuestion, selectedAnswer)}
              </dd>
            </div>
            <div className="rounded-2xl bg-white p-3">
              <dt className="text-[#5B6B94]">Expected answer</dt>
              <dd className="mt-1 break-words text-[#082B80]">
                {expectedAnswer(activeQuestion)}
              </dd>
            </div>
            <div
              className={`rounded-2xl p-3 ${
                answerResult === null
                  ? "bg-white text-[#5B6B94]"
                  : answerResult
                    ? "bg-[#DCFCE7] text-[#14532D]"
                    : "bg-[#FEE2E2] text-[#7F1D1D]"
              }`}
              aria-live="polite"
            >
              <dt>Feedback</dt>
              <dd className="mt-1">
                {answerResult === null
                  ? "Choose an answer to test the imported renderer."
                  : answerResult
                    ? "Correct"
                    : "Review this answer"}
              </dd>
            </div>
            <MatchPairsPreviewState
              question={activeQuestion}
              selectedAnswer={selectedAnswer}
            />
          </dl>

          <button
            type="button"
            onClick={() => setSelectedAnswer(null)}
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[#BFD7FF] bg-white px-5 py-3 text-sm font-black text-[#082B80] transition hover:border-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            Reset answer
          </button>
        </aside>
      </section>
    </section>
  );
}

export function PilotQuestionEnginePreview({
  pilotQuestions,
  assetSources,
  assetRows,
  assetValidation,
  importedAssetQuestions = [],
  assetImportErrors = [],
  randomPoolPreviewEnabled = false,
}: PilotQuestionEnginePreviewProps) {
  const resolvedAssetSources = useMemo<AssetPreviewSource[]>(() => {
    if (assetSources?.length) return assetSources;
    if (assetRows && assetValidation) {
      return [
        {
          id: "fixed-sample",
          label: assetValidation.sourceName,
          rows: assetRows,
          validation: assetValidation,
          importedQuestions: importedAssetQuestions,
          importErrors: assetImportErrors,
        },
      ];
    }
    return [];
  }, [assetSources, assetRows, assetValidation, importedAssetQuestions, assetImportErrors]);
  const [activeAssetSourceId, setActiveAssetSourceId] = useState(
    resolvedAssetSources[0]?.id ?? "fixed-sample",
  );
  const activeAssetSource =
    resolvedAssetSources.find((source) => source.id === activeAssetSourceId) ??
    resolvedAssetSources[0];

  const questions = useMemo(
    () => pilotQuestions.map(normalizePilotQuestion),
    [pilotQuestions],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const activeQuestion = questions[activeIndex];
  const answerResult = activeQuestion ? checkAnswer(activeQuestion, selectedAnswer) : null;

  useEffect(() => {
    if (activeAssetSource) {
      console.info("[LearnPlay A11] Forest L01 asset validation", activeAssetSource.validation);
    }
    if (activeAssetSource?.importErrors.length) {
      console.warn("[LearnPlay A11] Forest L01 asset import warnings", activeAssetSource.importErrors);
    }
  }, [activeAssetSource]);

  function selectQuestion(index: number) {
    setActiveIndex(index);
    setSelectedAnswer(null);
  }

  if (!activeQuestion) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-[1.5rem] border-2 border-[#FFD76A] bg-[#FFF7D6] p-6 text-[#082B80]">
          No pilot questions found.
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FFFDF7] px-4 py-8 text-[#082B80]">
      <div className="mx-auto grid max-w-5xl gap-6">
        <section className="rounded-[2rem] border-2 border-[#FFD76A] bg-[#FFF7D6] p-5 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
            Developer Preview Only
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Question Engine Pilot Preview
          </h1>
          <p className="mt-3 max-w-3xl text-base font-bold leading-7 text-[#5B6B94]">
            Developer preview only. These questions are not active Forest content.
            This page does not save progress, award XP, update badges, or change the
            approved active manifest.
          </p>
        </section>

        {resolvedAssetSources.length > 1 ? (
          <section className="rounded-[1.5rem] border border-[#DDE8F5] bg-white p-4 shadow-sm">
            <p className="text-xs font-black uppercase text-[#FF4FB8]">
              Question asset source
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resolvedAssetSources.map((source) => (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => setActiveAssetSourceId(source.id)}
                  className={`min-h-11 rounded-full px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
                    activeAssetSource?.id === source.id
                      ? "bg-[#0B63F6] text-white"
                      : "bg-[#EAF6FF] text-[#082B80] hover:bg-[#DCEEFF]"
                  }`}
                >
                  {source.label}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <AssetValidationPanel
          assetRows={activeAssetSource?.rows}
          assetValidation={activeAssetSource?.validation}
          assetImportErrors={activeAssetSource?.importErrors ?? []}
          assetImportReport={activeAssetSource?.importReport}
        />
        <RandomSessionPreview
          assetRows={activeAssetSource?.rows}
          assetValidation={activeAssetSource?.validation}
          assetImportReport={activeAssetSource?.importReport}
          importedQuestions={activeAssetSource?.importedQuestions ?? []}
          enabled={randomPoolPreviewEnabled}
        />
        <ImportedAssetQuestionPreview questions={activeAssetSource?.importedQuestions ?? []} />

        <section className="grid gap-3 rounded-[1.5rem] border border-[#DDE8F5] bg-white p-4 shadow-sm sm:grid-cols-3">
          {questions.map((question, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={question.questionId}
                type="button"
                onClick={() => selectQuestion(index)}
                className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
                  active
                    ? "border-[#0B63F6] bg-[#EAF6FF] text-[#082B80]"
                    : "border-[#DDE8F5] bg-white text-[#5B6B94] hover:border-[#0B63F6]"
                }`}
              >
                <span className="block text-xs uppercase text-[#FF4FB8]">
                  Pilot {index + 1}
                </span>
                <span className="block">{question.interactionType}</span>
              </button>
            );
          })}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_18rem]">
          <article className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#EAF6FF] px-3 py-2 text-xs font-black uppercase text-[#0B63F6]">
                {pilotQuestions[activeIndex]?.topic ?? "Pilot"}
              </span>
              <span className="rounded-full bg-[#FFF7D6] px-3 py-2 text-xs font-black uppercase text-[#082B80]">
                {pilotQuestions[activeIndex]?.difficulty ?? "easy"}
              </span>
              <span className="rounded-full bg-[#F3E8FF] px-3 py-2 text-xs font-black uppercase text-[#8B5CF6]">
                {activeQuestion.interactionType}
              </span>
            </div>

            <h2 className="text-2xl font-black leading-tight sm:text-3xl">
              {activeQuestion.prompt}
            </h2>

            <div className="mt-6">
              <QuestionRenderer
                question={activeQuestion}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={setSelectedAnswer}
              />
            </div>
          </article>

          <aside className="rounded-[2rem] border border-[#DDE8F5] bg-[#EAF6FF] p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-[#0B63F6]">
              Preview State
            </p>
            <dl className="mt-4 grid gap-3 text-sm font-bold">
              <div className="rounded-2xl bg-white p-3">
                <dt className="text-[#5B6B94]">Selected answer</dt>
                <dd className="mt-1 break-words text-[#082B80]">
                  {selectedAnswerSummary(activeQuestion, selectedAnswer)}
                </dd>
              </div>
              <div className="rounded-2xl bg-white p-3">
                <dt className="text-[#5B6B94]">Expected answer</dt>
                <dd className="mt-1 break-words text-[#082B80]">
                  {expectedAnswer(activeQuestion)}
                </dd>
              </div>
              <div
                className={`rounded-2xl p-3 ${
                  answerResult === null
                    ? "bg-white text-[#5B6B94]"
                    : answerResult
                      ? "bg-[#DCFCE7] text-[#14532D]"
                      : "bg-[#FEE2E2] text-[#7F1D1D]"
                }`}
                aria-live="polite"
              >
                <dt>Feedback</dt>
                <dd className="mt-1">
                  {answerResult === null
                    ? "Choose an answer to test the renderer."
                    : answerResult
                      ? "Correct"
                      : "Review this answer"}
                </dd>
              </div>
              <MatchPairsPreviewState
                question={activeQuestion}
                selectedAnswer={selectedAnswer}
              />
            </dl>

            <button
              type="button"
              onClick={() => setSelectedAnswer(null)}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[#BFD7FF] bg-white px-5 py-3 text-sm font-black text-[#082B80] transition hover:border-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
            >
              Reset answer
            </button>
          </aside>
        </section>

        {selectedAnswer !== null ? (
          <section className="rounded-[1.5rem] border-2 border-[#BFD7FF] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase text-[#FF4FB8]">
              Explanation Preview
            </p>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
              {activeQuestion.explanation}
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}

