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

type PilotQuestionEnginePreviewProps = {
  pilotQuestions: PilotQuestionRecord[];
  assetRows?: AssetRow[];
  assetValidation?: AssetValidationSummary;
  importedAssetQuestions?: NormalizedQuestion[];
  assetImportErrors?: QuestionAssetImportError[];
};

type RandomMode = "valid" | "publishable";

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

  return "";
}

function getRowsByMode(
  assetRows: AssetRow[],
  assetValidation: AssetValidationSummary | undefined,
  mode: RandomMode,
) {
  if (!assetValidation) return [];
  const allowedIds = new Set(
    assetValidation.rowResults
      .filter((result) => (mode === "publishable" ? result.isPublishable : result.isValid))
      .map((result) => result.questionId),
  );
  return assetRows.filter((row) => allowedIds.has(row["Question ID"]));
}

function pickRandomRows(rows: AssetRow[], count: number) {
  return [...rows]
    .map((row) => ({ row, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, Math.min(count, rows.length))
    .map((item) => item.row);
}

function countByQuestionType(rows: AssetRow[]) {
  return rows.reduce<Record<string, number>>((counts, row) => {
    const type = row["Question Type"] || "Unknown";
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {});
}

function AssetValidationPanel({
  assetRows = [],
  assetValidation,
  assetImportErrors = [],
}: {
  assetRows?: AssetRow[];
  assetValidation?: AssetValidationSummary;
  assetImportErrors?: QuestionAssetImportError[];
}) {
  if (!assetValidation) return null;

  const typeCounts = countByQuestionType(assetRows);
  const statusTone =
    assetValidation.errorCount > 0 || assetImportErrors.length > 0
      ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
      : assetValidation.warningCount > 0
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
            Forest L01 Asset Validation
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-[#5B6B94]">
            Local asset rows are validated and imported separately from the
            approved production manifest. Production gameplay is unchanged.
          </p>
        </div>
        <div className={`rounded-2xl border-2 px-4 py-3 text-sm font-black ${statusTone}`}>
          {assetValidation.errorCount + assetImportErrors.length} errors - {assetValidation.warningCount} warnings
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl bg-[#EAF6FF] p-4">
          <p className="text-xs font-black uppercase text-[#0B63F6]">Total rows</p>
          <p className="mt-1 text-3xl font-black">{assetValidation.totalRows}</p>
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
          <p className="mt-1 text-3xl font-black">{assetValidation.validRows - assetImportErrors.length}</p>
        </div>
        <div className="rounded-2xl bg-[#FFF7D6] p-4">
          <p className="text-xs font-black uppercase text-[#082B80]">Warnings</p>
          <p className="mt-1 text-3xl font-black">{assetValidation.warningCount}</p>
        </div>
        <div className="rounded-2xl bg-[#FEE2E2] p-4">
          <p className="text-xs font-black uppercase text-[#7F1D1D]">Errors</p>
          <p className="mt-1 text-3xl font-black">{assetValidation.errorCount + assetImportErrors.length}</p>
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

      {assetValidation.issues.length > 0 || assetImportErrors.length > 0 ? (
        <div className="mt-5 grid max-h-96 gap-2 overflow-y-auto pr-1">
          {assetValidation.issues.map((issue) => (
            <div
              key={`${issue.questionId}-${issue.field}-${issue.message}`}
              className={`rounded-2xl border p-3 text-sm font-bold ${
                issue.severity === "error"
                  ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
                  : "border-[#FFD76A] bg-[#FFF7D6] text-[#082B80]"
              }`}
            >
              Row {issue.rowNumber} - {issue.questionId} - {issue.field}: {issue.message}
            </div>
          ))}
          {assetImportErrors.map((issue) => (
            <div
              key={`${issue.questionId}-${issue.rowNumber}-${issue.message}`}
              className="rounded-2xl border border-[#EF4444] bg-[#FEE2E2] p-3 text-sm font-bold text-[#7F1D1D]"
            >
              Row {issue.rowNumber} - {issue.questionId} - Import: {issue.message}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-2xl border border-[#22C55E] bg-[#DCFCE7] p-3 text-sm font-black text-[#14532D]">
          Import validation passed for the Forest L01 asset rows.
        </p>
      )}
    </section>
  );
}

function RandomSessionPreview({
  assetRows = [],
  assetValidation,
}: {
  assetRows?: AssetRow[];
  assetValidation?: AssetValidationSummary;
}) {
  const [mode, setMode] = useState<RandomMode>("valid");
  const availableRows = useMemo(
    () => getRowsByMode(assetRows, assetValidation, mode),
    [assetRows, assetValidation, mode],
  );
  const [sessionRows, setSessionRows] = useState<AssetRow[]>([]);

  function generateSession() {
    setSessionRows(pickRandomRows(availableRows, 10));
  }

  useEffect(() => {
    if (availableRows.length > 0) {
      setSessionRows(pickRandomRows(availableRows, 10));
    } else {
      setSessionRows([]);
    }
  }, [availableRows]);

  if (!assetValidation) return null;

  return (
    <section className="rounded-[2rem] border border-[#BFD7FF] bg-[#EAF6FF] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#0B63F6]">
            Forest L01 Random Session Preview
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#082B80]">
            Random 10-question session
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-6 text-[#5B6B94]">
            This preview samples local asset rows only. It does not affect
            progress, XP, badges, or the production manifest.
          </p>
        </div>
        <button
          type="button"
          onClick={generateSession}
          disabled={availableRows.length === 0}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-5 py-3 text-sm font-black text-white transition hover:bg-[#084FC5] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-not-allowed disabled:bg-[#C9D7EA] disabled:text-[#5B6B94]"
        >
          Generate New Random Session
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["valid", "publishable"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-black capitalize transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
              mode === option
                ? "bg-[#0B63F6] text-white"
                : "bg-white text-[#082B80] hover:bg-[#F8FBFF]"
            }`}
          >
            Random from {option} rows
          </button>
        ))}
      </div>

      {mode === "publishable" && availableRows.length === 0 ? (
        <p className="mt-5 rounded-2xl border-2 border-[#FFD76A] bg-[#FFF7D6] p-4 text-sm font-black leading-6 text-[#082B80]">
          No publishable rows yet. Mark Status and Review Status as Approved to
          test publishable mode.
        </p>
      ) : null}

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {sessionRows.map((row, index) => (
          <article
            key={`${row["Question ID"]}-${index}`}
            className="rounded-2xl border border-[#DDE8F5] bg-white p-3"
          >
            <p className="text-xs font-black uppercase text-[#FF4FB8]">
              Session {index + 1}
            </p>
            <h3 className="mt-1 text-sm font-black text-[#082B80]">
              {row["Question ID"]}
            </h3>
            <p className="mt-2 text-xs font-bold text-[#5B6B94]">
              {row["Question Type"]}
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
                {selectedAnswer ?? "No answer selected"}
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
  assetRows,
  assetValidation,
  importedAssetQuestions = [],
  assetImportErrors = [],
}: PilotQuestionEnginePreviewProps) {
  const questions = useMemo(
    () => pilotQuestions.map(normalizePilotQuestion),
    [pilotQuestions],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const activeQuestion = questions[activeIndex];
  const answerResult = activeQuestion ? checkAnswer(activeQuestion, selectedAnswer) : null;

  useEffect(() => {
    if (assetValidation) {
      console.info("[LearnPlay A9] Forest L01 asset validation", assetValidation);
    }
    if (assetImportErrors.length > 0) {
      console.warn("[LearnPlay A9] Forest L01 asset import warnings", assetImportErrors);
    }
  }, [assetValidation, assetImportErrors]);

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

        <AssetValidationPanel
          assetRows={assetRows}
          assetValidation={assetValidation}
          assetImportErrors={assetImportErrors}
        />
        <RandomSessionPreview assetRows={assetRows} assetValidation={assetValidation} />
        <ImportedAssetQuestionPreview questions={importedAssetQuestions} />

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
                  {selectedAnswer ?? "No answer selected"}
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