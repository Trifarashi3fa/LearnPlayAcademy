import type { MvpQuestion } from "@/data/mvp-forest-world";

type QuestionCardProps = {
  question: MvpQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
};

const answerLabels = ["A", "B", "C", "D"];

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionCardProps) {
  const answered = selectedAnswer !== null;

  return (
    <section
      className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby={`${question.id}-prompt`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#EAF6FF] px-3 py-1.5 text-xs font-black uppercase text-[#0B63F6]">
          {question.topic}
        </span>
        <span className="rounded-full bg-[#FFF3C4] px-3 py-1.5 text-xs font-black capitalize text-[#082B80]">
          {question.difficulty}
        </span>
      </div>

      <h2
        id={`${question.id}-prompt`}
        className="mt-5 text-2xl font-black leading-snug text-[#082B80] sm:text-3xl"
      >
        {question.question}
      </h2>

      <fieldset className="mt-6">
        <legend className="sr-only">Choose one answer</legend>
        <div className="grid gap-3">
          {question.options.map((option, index) => {
            const selected = selectedAnswer === option;
            const correct = option === question.correctAnswer;
            const stateClass = !answered
              ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EAF6FF]"
              : correct
                ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]"
                : selected
                  ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
                  : "border-[#DDE8F5] bg-white text-[#5B6B94] opacity-75";

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelectAnswer(option)}
                disabled={answered}
                aria-pressed={selected}
                className={`flex min-h-16 w-full items-center gap-3 rounded-[1.25rem] border-2 px-4 py-3 text-left text-base font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${stateClass}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6FF] text-sm font-black text-[#0B63F6]">
                  {answerLabels[index]}
                </span>
                <span className="min-w-0 flex-1">{option}</span>
                {answered && correct ? (
                  <span className="text-xs font-black uppercase text-[#15803D]">Correct</span>
                ) : null}
                {answered && selected && !correct ? (
                  <span className="text-xs font-black uppercase text-[#B91C1C]">Review</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}