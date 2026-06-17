import { MvpPage } from "@/components/mvp/MvpShell";
import { SubjectSelection } from "@/components/mvp/SubjectSelection";

export const metadata = {
  title: "MVP Subject Selection",
  description: "Choose a LearnPlay MVP subject and view local progress.",
};

export default function MvpSubjectsPage() {
  return (
    <MvpPage
      eyebrow="Subject Selection"
      title="Choose Your Learning Adventure"
      description="Mathematics Forest World is playable now. Other subject paths are ready to expand later."
    >
      <SubjectSelection />
    </MvpPage>
  );
}