import type { Metadata } from "next";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { SubjectCard } from "@/components/SubjectCard";

export const metadata: Metadata = {
  title: "Subjects",
  description:
    "Explore playful subject areas for children aged 7 to 12, including Mathematics, English, Science, Bahasa Melayu, Critical Thinking, and Life Skills.",
  openGraph: {
    title: "Core Skills Made Playful",
    description:
      "School-friendly subject practice through games, quizzes, and rewards.",
  },
};

const subjects = [
  {
    title: "Mathematics",
    description:
      "Build number confidence with addition, subtraction, patterns, and everyday problem solving.",
    icon: "123",
    tone: "yellow" as const,
  },
  {
    title: "English",
    description:
      "Practice vocabulary, spelling, reading, and sentence skills through short activities.",
    icon: "ABC",
    tone: "green" as const,
  },
  {
    title: "Science",
    description:
      "Explore living things, space, materials, experiments, and the world around us.",
    icon: "SCI",
    tone: "blue" as const,
  },
  {
    title: "Bahasa Melayu",
    description:
      "Strengthen word recognition, spelling, basic grammar, and everyday language confidence.",
    icon: "BM",
    tone: "purple" as const,
  },
  {
    title: "Critical Thinking",
    description:
      "Strengthen logic, memory, planning, pattern spotting, and puzzle-solving habits.",
    icon: "WHY",
    tone: "pink" as const,
  },
  {
    title: "Life Skills",
    description:
      "Learn helpful habits, kindness, money basics, safety awareness, and practical choices.",
    icon: "LIFE",
    tone: "purple" as const,
  },
];

export default function SubjectsPage() {
  return (
    <PageLayout
      eyebrow="Subjects"
      title="Core Skills Made Playful"
      description="LearnPlay Academy organizes learning around school-friendly subjects and confidence-building practice for children aged 7 to 12."
      heroTone="blue"
    >
      <PageSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.title} {...subject} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}