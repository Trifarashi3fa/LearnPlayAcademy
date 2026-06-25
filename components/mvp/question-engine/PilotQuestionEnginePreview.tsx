"use client";

import { useMemo, useState } from "react";
import type {
  ExactBooleanGradingSpec,
  ExactNumberGradingSpec,
  NormalizedCountObjectsQuestion,
  NormalizedFillInBlankQuestion,
  NormalizedQuestion,
  NormalizedTextGradingSpec,
  NormalizedTrueFalseQuestion,
} from "@/data/question-engine-types";
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

  if (question.interactionType === "true-false") {
    const selectedValue =
      selectedAnswer === question.interaction.trueLabel ||
      selectedAnswer.toLocaleLowerCase("en") === "true";
    return selectedValue === question.answerSpec.correctValue;
  }

  if (question.interactionType === "count-objects") {
    return Number(selectedAnswer) === question.answerSpec.expectedCount;
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
  if (question.interactionType === "true-false") {
    return question.answerSpec.correctValue
      ? question.interaction.trueLabel
      : question.interaction.falseLabel;
  }

  if (question.interactionType === "count-objects") {
    return String(question.answerSpec.expectedCount);
  }

  if (question.interactionType === "fill-in-blank") {
    return question.answerSpec.acceptedAnswers[0] ?? "";
  }

  return "";
}

export function PilotQuestionEnginePreview({
  pilotQuestions,
}: PilotQuestionEnginePreviewProps) {
  const questions = useMemo(
    () => pilotQuestions.map(normalizePilotQuestion),
    [pilotQuestions],
  );
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