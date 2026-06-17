import { MvpPage } from "@/components/mvp/MvpShell";
import { SubjectSelection } from "@/components/mvp/SubjectSelection";

export const metadata = {
  title: "Free Math Starter World Subjects | LearnPlay Academy",
  description:
    "Choose Mathematics to play the free Forest World starter path. Premium subject paths can be added later.",
};

export default function MvpSubjectsPage() {
  return (
    <MvpPage
      eyebrow="Subject Selection"
      title="Choose Your Learning Adventure"
      description="Mathematics opens the Free Math Starter World: Forest World. Other subjects remain ready for future content packs."
    >
      <SubjectSelection />
    </MvpPage>
  );
}