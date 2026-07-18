import { MvpPage } from "@/components/mvp/MvpShell";
import { SubjectSelection } from "@/components/mvp/SubjectSelection";

export const metadata = {
  title: "Free Year 1 Forest World Subjects | LearnPlay Academy",
  description:
    "Choose Mathematics, English, or Science to play a free Year 1 Forest World starter path. Premium subject paths can be added later.",
};

export default function MvpSubjectsPage() {
  return (
    <MvpPage
      eyebrow="Subject Selection"
      title="Choose Your Learning Adventure"
      description="Mathematics, English, and Science open free Year 1 Forest World starter paths. Other subjects remain ready for future content packs."
    >
      <SubjectSelection />
    </MvpPage>
  );
}
