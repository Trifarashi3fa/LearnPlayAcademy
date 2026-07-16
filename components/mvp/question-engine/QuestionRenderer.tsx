import type { NormalizedQuestion } from "@/data/question-engine-types";
import { CountObjectsRenderer } from "@/components/mvp/question-engine/renderers/CountObjectsRenderer";
import { FillBlankRenderer } from "@/components/mvp/question-engine/renderers/FillBlankRenderer";
import { MatchPairsRenderer } from "@/components/mvp/question-engine/renderers/MatchPairsRenderer";
import { MultipleChoiceRenderer } from "@/components/mvp/question-engine/renderers/MultipleChoiceRenderer";
import { TapAnswerRenderer } from "@/components/mvp/question-engine/renderers/TapAnswerRenderer";
import { TrueFalseRenderer } from "@/components/mvp/question-engine/renderers/TrueFalseRenderer";

type QuestionRendererProps = {
  question: NormalizedQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string | null) => void;
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
    case "true-false":
      return (
        <TrueFalseRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      );
    case "count-objects":
      return (
        <CountObjectsRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      );
    case "tap-answer":
      return (
        <TapAnswerRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      );
    case "fill-in-blank":
      return (
        <FillBlankRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      );
    case "match-pairs":
      return (
        <MatchPairsRenderer
          question={question}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={onSelectAnswer}
          compact={compact}
        />
      );
    default: {
      const unsupportedQuestion = question as { interactionType: string };
      return <UnsupportedQuestionMessage interactionType={unsupportedQuestion.interactionType} />;
    }
  }
}
