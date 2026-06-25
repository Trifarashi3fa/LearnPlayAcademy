import { notFound } from "next/navigation";
import pilotQuestions from "@/content/question-bank/mathematics/year-1/forest-world/pilot-non-mcq.json";
import {
  PilotQuestionEnginePreview,
  type PilotQuestionRecord,
} from "@/components/mvp/question-engine/PilotQuestionEnginePreview";

export const metadata = {
  title: "Question Engine Preview | LearnPlay Academy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuestionEnginePreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <PilotQuestionEnginePreview
      pilotQuestions={pilotQuestions as PilotQuestionRecord[]}
    />
  );
}