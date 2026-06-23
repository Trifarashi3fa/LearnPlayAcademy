import type { NormalizedMultipleChoiceQuestion } from "@/data/question-engine-types";

type MultipleChoiceRendererProps = {
  question: NormalizedMultipleChoiceQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

const answerLabels = ["A", "B", "C", "D"];

export function MultipleChoiceRenderer({
  question,
  selectedAnswer,
  onSelectAnswer,
  compact = false,
}: MultipleChoiceRendererProps) {
  const answered = selectedAnswer !== null;

  return (
    <fieldset>
      <legend className="sr-only">Choose one answer</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {question.interaction.choices.map((choice, index) => {
          const selected = selectedAnswer === choice.label;
          const correct = choice.id === question.answerSpec.correctChoiceId;
          const style = !answered
            ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EAF6FF]"
            : correct
              ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]"
              : selected
                ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
                : "border-[#DDE8F5] bg-white text-[#5B6B94] opacity-70";

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelectAnswer(choice.label)}
              disabled={answered}
              aria-pressed={selected}
              className={`flex items-center gap-3 rounded-[1.1rem] border-2 px-4 text-left font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-default ${compact ? "min-h-14 py-2 text-base" : "min-h-20 py-4 text-lg"} ${style}`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-xl bg-[#EAF6FF] text-sm font-black text-[#0B63F6] ${compact ? "h-9 w-9" : "h-11 w-11"}`}
              >
                {answerLabels[index] ?? index + 1}
              </span>
              <span className="min-w-0 flex-1">{choice.label}</span>
              {answered && correct ? (
                <span className="text-xs font-black uppercase text-[#15803D]">
                  Correct
                </span>
              ) : null}
              {answered && selected && !correct ? (
                <span className="text-xs font-black uppercase text-[#B91C1C]">
                  Review
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}