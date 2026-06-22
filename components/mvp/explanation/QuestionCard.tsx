import { MathVisualRenderer } from "@/components/mvp/explanation/MathVisualRenderer";
import type { MvpQuestion, VisualLearningModel } from "@/data/mvp-forest-world";

type QuestionCardProps = {
  question: MvpQuestion;
  visual: VisualLearningModel;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

const answerLabels = ["A", "B", "C", "D"];

export function QuestionCard({ question, visual, selectedAnswer, onSelectAnswer, compact = false }: QuestionCardProps) {
  const answered = selectedAnswer !== null;
  return (
    <section className={`border border-[#DDE8F5] bg-white shadow-sm ${compact ? "rounded-[1.5rem] p-4" : "rounded-[2rem] p-5 sm:p-7"}`} aria-labelledby={`${question.id}-prompt`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#EAF6FF] px-3 py-1.5 text-xs font-black uppercase text-[#0B63F6]">Mathematics - {question.topic}</span>
        <span className="rounded-full bg-[#FFF3C4] px-3 py-1.5 text-xs font-black capitalize text-[#082B80]">{question.difficulty}</span>
      </div>
      <h2 id={`${question.id}-prompt`} className={`mt-4 font-black leading-snug text-[#082B80] ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{question.question}</h2>
      <div className="mt-4"><MathVisualRenderer visual={visual} revealAnswer={false} compact={compact} /></div>
      <fieldset className="mt-5">
        <legend className="sr-only">Choose one answer</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const selected = selectedAnswer === option;
            const correct = option === question.correctAnswer;
            const style = !answered ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EAF6FF]" : correct ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]" : selected ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]" : "border-[#DDE8F5] bg-white text-[#5B6B94] opacity-70";
            return (
              <button key={option} type="button" onClick={() => onSelectAnswer(option)} disabled={answered} aria-pressed={selected} className={`flex items-center gap-3 rounded-[1.1rem] border-2 px-4 text-left font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-default ${compact ? "min-h-14 py-2 text-base" : "min-h-20 py-4 text-lg"} ${style}`}>
                <span className={`flex shrink-0 items-center justify-center rounded-xl bg-[#EAF6FF] text-sm font-black text-[#0B63F6] ${compact ? "h-9 w-9" : "h-11 w-11"}`}>{answerLabels[index]}</span>
                <span className="min-w-0 flex-1">{option}</span>
                {answered && correct ? <span className="text-xs font-black uppercase text-[#15803D]">Correct</span> : null}
                {answered && selected && !correct ? <span className="text-xs font-black uppercase text-[#B91C1C]">Review</span> : null}
              </button>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}