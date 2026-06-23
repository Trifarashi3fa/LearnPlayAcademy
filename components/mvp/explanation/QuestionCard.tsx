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

  return (
    <section className={`border border-[#DDE8F5] bg-white shadow-sm ${compact ? "rounded-[1.5rem] p-4" : "rounded-[2rem] p-5 sm:p-7"}`} aria-labelledby={`${question.id}-prompt`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#EAF6FF] px-3 py-1.5 text-xs font-black uppercase text-[#0B63F6]">Mathematics - {question.topic}</span>
        <span className="rounded-full bg-[#FFF3C4] px-3 py-1.5 text-xs font-black capitalize text-[#082B80]">{question.difficulty}</span>
      </div>
      <h2 id={`${question.id}-prompt`} className={`mt-4 font-black leading-snug text-[#082B80] ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>{question.question}</h2>
      <div className="mt-4"><MathVisualRenderer visual={visual} revealAnswer={false} compact={compact} /></div>
      <div className="mt-5">
        <QuestionRenderer
          question={normalizedQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      </div>
    </section>
  );
}