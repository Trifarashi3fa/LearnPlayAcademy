import type { NormalizedQuestion } from "@/data/question-engine-types";
import { MultipleChoiceRenderer } from "@/components/mvp/question-engine/renderers/MultipleChoiceRenderer";

type QuestionRendererProps = {
  question: NormalizedQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

function UnsupportedQuestionMessage({ interactionType }: { interactionType: string }) {
  return (
    <div
      className="rounded-[1.25rem] border-2 border-[#FFD76A] bg-[#FFF7D6] p-4 text-sm font-bold leading-6 text-[#082B80]"
      role="status"
    >
      This activity type is being prepared for LearnPlay. Please try another
      question for now.
      <span className="sr-only">Unsupported question type: {interactionType}</span>
    </div>
  );
}

export function QuestionRenderer({
  question,
  selectedAnswer,
  onSelectAnswer,
  compact = false,
}: QuestionRendererProps) {
  switch (question.interactionType) {
    case "multiple-choice":
      return (
        <MultipleChoiceRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      );
    default:
      return <UnsupportedQuestionMessage interactionType={question.interactionType} />;
  }
}