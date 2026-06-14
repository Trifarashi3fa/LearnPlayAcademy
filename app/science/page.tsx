import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { ScienceContentFactory } from "@/components/ScienceContentFactory";

export const metadata: Metadata = {
  title: "Science Explorer",
  description:
    "Explore LearnPlay Academy science quizzes, facts, activities, learning paths, XP, badges, and local progress tracking.",
  openGraph: {
    title: "LearnPlay Academy Science Explorer",
    description:
      "A child-friendly science module with quizzes, facts, activities, learning paths, XP, and badges.",
  },
};

export default function SciencePage() {
  return (
    <PageLayout
      eyebrow="Science Explorer"
      title="Science Content Factory"
      description="Explore quizzes, facts, hands-on activities, and guided learning paths with XP and badges saved on this device."
      heroTone="blue"
    >
      <ScienceContentFactory />
    </PageLayout>
  );
}