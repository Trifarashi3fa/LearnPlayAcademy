import { SubjectCard } from "@/components/SubjectCard";

const subjects = [
  {
    title: "Mathematics",
    description: "Build confidence with numbers, patterns, and everyday problem solving.",
    icon: "123",
    color: "bg-sunshine",
  },
  {
    title: "English",
    description: "Practice vocabulary, spelling, reading, and sentence skills.",
    icon: "ABC",
    color: "bg-mint/80",
  },
  {
    title: "Science",
    description: "Explore living things, space, experiments, and the world around us.",
    icon: "SCI",
    color: "bg-sky/20",
  },
  {
    title: "Critical Thinking",
    description: "Strengthen logic, memory, planning, and puzzle-solving habits.",
    icon: "WHY",
    color: "bg-coral/20",
  },
  {
    title: "Life Skills",
    description: "Learn helpful habits, kindness, money basics, and practical choices.",
    icon: "LIFE",
    color: "bg-[#f1e7ff]",
  },
];

export default function SubjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <p className="font-black text-coral">Subjects</p>
      <h1 className="mt-3 text-5xl font-black text-ink">Core skills, made playful</h1>
      <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-ink/70">
        LearnPlay Academy organizes lessons around school-friendly subjects and
        confidence-building practice for children aged 7 to 12.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.title} {...subject} />
        ))}
      </div>
    </main>
  );
}
