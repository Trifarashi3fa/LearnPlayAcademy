import { MvpPage } from "@/components/mvp/MvpShell";
import { ParentDashboardClient } from "@/components/mvp/ParentDashboardClient";

export const metadata = {
  title: "MVP Parent Dashboard",
  description: "View child progress, accuracy, mastery, and Forest World completion.",
};

export default function MvpParentDashboardPage() {
  return (
    <MvpPage
      eyebrow="Parent Dashboard"
      title="Child Progress Overview"
      description="A simple parent view showing subject progress, world progress, levels completed, questions answered, accuracy, and mastery level."
    >
      <ParentDashboardClient />
    </MvpPage>
  );
}