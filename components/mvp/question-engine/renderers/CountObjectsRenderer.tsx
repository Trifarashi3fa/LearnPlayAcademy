import type { NormalizedCountObjectsQuestion } from "@/data/question-engine-types";

type CountObjectsRendererProps = {
  question: NormalizedCountObjectsQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

function getNumericChoices(question: NormalizedCountObjectsQuestion) {
  if (question.interaction.numericChoices?.length) {
    return question.interaction.numericChoices;
  }

  const answer = question.answerSpec.expectedCount;
  const start = Math.max(0, answer - 2);
  return Array.from({ length: 5 }, (_, index) => start + index);
}

export function CountObjectsRenderer({
  question,
  selectedAnswer,
  onSelectAnswer,
  compact = false,
}: CountObjectsRendererProps) {
  const answered = selectedAnswer !== null;
  const numericChoices = getNumericChoices(question);

  return (
    <fieldset>
      <legend className="sr-only">Choose the number of objects</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {numericChoices.map((choice) => {
          const answerLabel = String(choice);
          const selected = selectedAnswer === answerLabel;
          const correct = choice === question.answerSpec.expectedCount;
          const style = !answered
            ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EAF6FF]"
            : correct
              ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]"
              : selected
                ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
                : "border-[#DDE8F5] bg-white text-[#5B6B94] opacity-70";

          return (
            <button
              key={answerLabel}
              type="button"
              onClick={() => onSelectAnswer(answerLabel)}
              disabled={answered}
              aria-pressed={selected}
              className={`flex items-center justify-center rounded-[1.1rem] border-2 px-4 text-center font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-default ${compact ? "min-h-14 py-2 text-xl" : "min-h-20 py-4 text-2xl"} ${style}`}
            >
              <span>{answerLabel}</span>
              {answered && correct ? <span className="sr-only">Correct answer</span> : null}
              {answered && selected && !correct ? <span className="sr-only">Review this answer</span> : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}