import { MathVisualRenderer } from "@/components/mvp/explanation/MathVisualRenderer";
import { QuestionRenderer } from "@/components/mvp/question-engine/QuestionRenderer";
import type { MvpQuestion, VisualLearningModel } from "@/data/mvp-forest-world";
import { normalizeQuestion } from "@/lib/question-engine/normalize-question";

type QuestionCardProps = {
  question: MvpQuestion;
  visual: VisualLearningModel;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

export function QuestionCard({ question, visual, selectedAnswer, onSelectAnswer, compact = false }: QuestionCardProps) {
  const normalizedQuestion = normalizeQuestion(question);
  const answered = selectedAnswer !== null;
  const answeredCorrectly = selectedAnswer === question.correctAnswer;
  const isComparisonQuestion = visual.type === "comparison";
  const compactQuestionControls = compact || isComparisonQuestion;

  return (
    <section
      className={`flex min-h-full flex-col border border-[#DDE8F5] bg-white shadow-playful transition-all duration-200 motion-reduce:transition-none lg:min-h-0 ${compact ? "rounded-[1.5rem] p-3 lg:p-3" : "rounded-[2rem] p-5 sm:p-7"}`}
      aria-labelledby={`${question.id}-prompt`}
    >
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#EAF6FF] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-wide text-[#0B63F6] sm:text-xs">
          Mathematics - {question.topic}
        </span>
        <span className="rounded-full bg-[#FFF3C4] px-3 py-1.5 text-[0.68rem] font-black capitalize text-[#082B80] sm:text-xs">
          {question.difficulty}
        </span>
        {answered ? (
          <span
            className={`lp-pop-on-change rounded-full px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-wide sm:text-xs ${
              answeredCorrectly ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#B91C1C]"
            }`}
            role="status"
            aria-live="polite"
          >
            {answeredCorrectly ? "Correct" : "Review"}
          </span>
        ) : null}
      </div>

      <h2
        id={`${question.id}-prompt`}
        className={`mt-2 shrink-0 font-black leading-tight text-[#082B80] ${isComparisonQuestion ? "text-[1.28rem] sm:text-[1.45rem] xl:text-[1.6rem]" : compact ? "text-[1.35rem] sm:text-2xl xl:text-[1.75rem]" : "text-3xl sm:text-4xl"}`}
      >
        {question.question}
      </h2>

      <div className={`${isComparisonQuestion ? "mt-1.5 p-1.5 sm:p-2" : "mt-2 p-2 sm:p-2.5"} shrink-0 overflow-visible rounded-[1.25rem] border border-[#DDE8F5] bg-[#F8FBFF] transition-all duration-200 motion-reduce:transition-none`}>
        <MathVisualRenderer visual={visual} revealAnswer={answered} compact={false} fitNarrow />
      </div>

      <div className={`${isComparisonQuestion ? "mt-1.5 sm:mt-2" : "mt-2 sm:mt-3"} shrink-0`}>
        <QuestionRenderer
          question={normalizedQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compactQuestionControls}
        />
      </div>
    </section>
  );
}