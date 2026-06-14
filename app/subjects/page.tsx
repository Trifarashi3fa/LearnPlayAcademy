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
      "Develop number sense, problem-solving skills, patterns, measurement, and logical reasoning through interactive activities.",
    icon: "123",
    tone: "yellow" as const,
  },
  {
    title: "English",
    description:
      "Build reading comprehension, vocabulary, grammar, spelling, and communication skills through engaging exercises.",
    icon: "ABC",
    tone: "green" as const,
  },
  {
    title: "Science",
    description:
      "Explore living things, Earth science, experiments, space, and scientific thinking through discovery-based learning.",
    icon: "SCI",
    tone: "blue" as const,
  },
  {
    title: "Bahasa Melayu",
    description:
      "Improve vocabulary, reading, comprehension, grammar, and communication skills aligned with primary learning needs.",
    icon: "BM",
    tone: "purple" as const,
  },
  {
    title: "Critical Thinking",
    description:
      "Strengthen logic, memory, reasoning, creativity, and problem-solving skills through puzzles and challenges.",
    icon: "WHY",
    tone: "pink" as const,
  },
  {
    title: "Life Skills",
    description:
      "Develop confidence, responsibility, communication, emotional awareness, safety knowledge, and financial literacy.",
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