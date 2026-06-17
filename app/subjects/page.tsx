import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subject Selection | LearnPlay Academy",
  description:
    "Choose a LearnPlay Academy subject. Mathematics Forest World is active for the MVP, with other subjects coming soon.",
  openGraph: {
    title: "Subject Selection | LearnPlay Academy",
    description:
      "Mathematics is active for the MVP. Other subjects are prepared for future content packs.",
  },
};

const subjects = [
  {
    title: "Mathematics",
    description: "Enter Forest World and play 10 guided math levels.",
    image: "/subjects/math.png",
    href: "/mvp/world-map",
    active: true,
  },
  {
    title: "English",
    description: "Reading and word activities are coming soon.",
    image: "/subjects/english.png",
    href: "/subjects",
    active: false,
  },
  {
    title: "Science",
    description: "Discovery activities are coming soon.",
    image: "/subjects/science.png",
    href: "/subjects",
    active: false,
  },
  {
    title: "Bahasa Melayu",
    description: "Vocabulary activities are coming soon.",
    image: "/subjects/bahasa-melayu.png",
    href: "/subjects",
    active: false,
  },
  {
    title: "Life Skills",
    description: "Safety, habits, and life skills activities are coming soon.",
    image: "/subjects/life-skills.png",
    href: "/subjects",
    active: false,
  },
  {
    title: "General Knowledge",
    description: "Mixed knowledge quizzes are coming soon.",
    image: "/subjects/general-knowledge.png",
    href: "/subjects",
    active: false,
  },
];

export default function SubjectsPage() {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="bg-[#EAF6FF]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
            Subject Selection
          </p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Choose your learning path
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">
            Mathematics is active for this MVP. Other subjects stay visible so the full LearnPlay structure is clear.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.title}
              href={subject.href}
              className={`group block rounded-[2rem] border bg-white p-5 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
                subject.active
                  ? "border-[#0B63F6] hover:-translate-y-1 hover:shadow-playful"
                  : "border-[#DDE8F5] opacity-85"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <Image
                  src={subject.image}
                  alt={`${subject.title} subject icon`}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain"
                />
                <span className={`rounded-full px-3 py-1 text-xs font-black ${
                  subject.active ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#FFF3C4] text-[#082B80]"
                }`}>
                  {subject.active ? "Active MVP" : "Coming Soon"}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black">{subject.title}</h2>
              <p className="mt-2 min-h-14 text-sm font-bold leading-6 text-[#5B6B94]">
                {subject.description}
              </p>
              <div className={`mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-black ${
                subject.active ? "bg-[#0B63F6] text-white" : "bg-[#EAF6FF] text-[#5B6B94]"
              }`}>
                {subject.active ? "Enter Forest World" : "Coming Soon"}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}