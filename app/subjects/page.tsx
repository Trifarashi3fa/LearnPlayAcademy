import { PageLayout, PageSection } from "@/components/PageLayout";
import { SubjectCard } from "@/components/SubjectCard";

const subjects = [
  {
    title: "Mathematics",
    description: "Build confidence with numbers, patterns, and everyday problem solving.",
    icon: "123",
    tone: "yellow" as const,
  },
  {
    title: "English",
    description: "Practice vocabulary, spelling, reading, and sentence skills.",
    icon: "ABC",
    tone: "green" as const,
  },
  {
    title: "Science",
    description: "Explore living things, space, experiments, and the world around us.",
    icon: "SCI",
    tone: "blue" as const,
  },
  {
    title: "Critical Thinking",
    description: "Strengthen logic, memory, planning, and puzzle-solving habits.",
    icon: "WHY",
    tone: "pink" as const,
  },
  {
    title: "Life Skills",
    description: "Learn helpful habits, kindness, money basics, and practical choices.",
    icon: "LIFE",
    tone: "purple" as const,
  },
];

export default function SubjectsPage() {
  return (
    <PageLayout
      eyebrow="Subjects"
      title="Core skills, made playful"
      description="LearnPlay Academy organizes lessons around school-friendly subjects and confidence-building practice for children aged 7 to 12."
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
