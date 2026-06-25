"use client";

import { useEffect, useMemo, useState } from "react";
import type { NormalizedFillInBlankQuestion } from "@/data/question-engine-types";

type FillBlankRendererProps = {
  question: NormalizedFillInBlankQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

function normalizeBlankAnswer(value: string) {
  return value.trim().toLowerCase();
}

export function FillBlankRenderer({
  question,
  selectedAnswer,
  onSelectAnswer,
  compact = false,
}: FillBlankRendererProps) {
  const [typedValue, setTypedValue] = useState("");
  const answered = selectedAnswer !== null;
  const normalizedTypedValue = normalizeBlankAnswer(typedValue);
  const acceptedAnswers = useMemo(
    () => question.answerSpec.acceptedAnswers.map(normalizeBlankAnswer),
    [question.answerSpec.acceptedAnswers],
  );
  const correct = answered && acceptedAnswers.includes(selectedAnswer ?? "");
  const inputId = `${question.questionId}-fill-blank`;
  const helperId = `${question.questionId}-fill-blank-help`;

  useEffect(() => {
    setTypedValue("");
  }, [question.questionId]);

  function submitAnswer() {
    if (answered || normalizedTypedValue.length === 0) return;
    onSelectAnswer(normalizedTypedValue);
  }

  return (
    <fieldset>
      <legend className="sr-only">Fill in the blank answer</legend>
      <div className="grid gap-3">
        <label htmlFor={inputId} className="text-sm font-black uppercase text-[#0B63F6]">
          Your answer
        </label>
        <input
          id={inputId}
          type={question.interaction.inputMode === "numeric" ? "number" : "text"}
          inputMode={question.interaction.inputMode === "numeric" ? "numeric" : "text"}
          value={typedValue}
          onChange={(event) => setTypedValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              submitAnswer();
            }
          }}
          disabled={answered}
          placeholder={question.interaction.placeholder}
          aria-label="Fill in the blank answer"
          aria-describedby={helperId}
          className={`min-h-14 w-full rounded-[1.1rem] border-2 bg-white px-4 font-black text-[#082B80] transition placeholder:text-[#8FA0C3] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-default ${compact ? "text-lg" : "text-2xl"} ${
            !answered
              ? "border-[#DDE8F5] focus:border-[#0B63F6]"
              : correct
                ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]"
                : "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
          }`}
        />
        <p id={helperId} className="text-sm font-bold leading-6 text-[#5B6B94]">
          Type your answer, then press Enter or tap Check Answer.
        </p>
        {answered ? (
          <div
            className={`rounded-[1.1rem] border-2 p-3 text-sm font-black ${
              correct
                ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]"
                : "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
            }`}
            role="status"
          >
            {correct ? "Correct" : "Review"}: {typedValue.trim() || selectedAnswer}
          </div>
        ) : null}
        <button
          type="button"
          onClick={submitAnswer}
          disabled={answered || normalizedTypedValue.length === 0}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-5 py-3 text-base font-black text-white transition hover:bg-[#084FC5] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-not-allowed disabled:bg-[#C9D7EA] disabled:text-[#5B6B94]"
        >
          Check Answer
        </button>
      </div>
    </fieldset>
  );
}