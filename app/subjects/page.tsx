import type { Metadata } from "next";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { SubjectCard } from "@/components/SubjectCard";
import { getSubjectHref, subjectPathways } from "@/data/subject-pathways";

export const metadata: Metadata = {
  title: "Subjects",
  description:
    "Explore clickable LearnPlay subject pathways for Mathematics, English, Science, Bahasa Melayu, Critical Thinking, and Life Skills.",
  openGraph: {
    title: "Core Skills Made Playful",
    description:
      "Choose a subject pathway, explore topics, and find games, quizzes, and assessments.",
  },
};

export default function SubjectsPage() {
  return (
    <PageLayout
      eyebrow="Subjects"
      title="Core Skills Made Playful"
      description="Choose a subject pathway, explore topics by level, and find games, quizzes, and assessments for each skill."
      heroTone="blue"
    >
      <PageSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjectPathways.map((subject) => (
            <SubjectCard
              key={subject.slug}
              title={subject.title}
              description={subject.description}
              icon={subject.icon}
              tone={subject.tone}
              href={getSubjectHref(subject.slug)}
            />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}