import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subject Selection | LearnPlay Academy",
  description:
    "Choose a LearnPlay Academy subject. Mathematics Forest World is playable now, with other learning areas prepared for future content.",
  openGraph: {
    title: "Subject Selection | LearnPlay Academy",
    description:
      "Start with Mathematics Forest World and preview future LearnPlay subject areas.",
  },
};

const subjects = [
  {
    title: "Mathematics",
    description: "Play the free Forest World starter path with levels, questions, stars, and rewards.",
    image: "/subjects/math.png",
    href: "/mvp/world-map",
    active: true,
    meta: "Playable now",
    action: "Enter Forest World",
  },
  {
    title: "English",
    description: "Reading, spelling, and word-building adventures are planned for a future release.",
    image: "/subjects/english.png",
    href: "/subjects",
    active: false,
    meta: "Preview",
    action: "Coming Soon",
  },
  {
    title: "Science",
    description: "Discovery quests, facts, experiments, and science challenges can be added next.",
    image: "/subjects/science.png",
    href: "/subjects",
    active: false,
    meta: "Preview",
    action: "Coming Soon",
  },
  {
    title: "Bahasa Melayu",
    description: "Vocabulary, spelling, and sentence practice can become a language adventure.",
    image: "/subjects/bahasa-melayu.png",
    href: "/subjects",
    active: false,
    meta: "Preview",
    action: "Coming Soon",
  },
  {
    title: "Life Skills",
    description: "Healthy habits, safety, emotions, money basics, and responsibility can grow here.",
    image: "/subjects/life-skills.png",
    href: "/subjects",
    active: false,
    meta: "Preview",
    action: "Coming Soon",
  },
  {
    title: "General Knowledge",
    description: "Fun knowledge quests can help children explore the world around them.",
    image: "/subjects/general-knowledge.png",
    href: "/subjects",
    active: false,
    meta: "Preview",
    action: "Coming Soon",
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
            Choose a learning adventure
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">
            Subjects are guided learning paths. Start with Mathematics Forest World, then return here as new subjects are added.
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
                  : "border-[#DDE8F5] opacity-90"
              }`}
              aria-label={`${subject.title}: ${subject.action}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-[#EAF6FF] p-2">
                  <Image
                    src={subject.image}
                    alt={`${subject.title} learning adventure cover`}
                    width={96}
                    height={96}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${
                  subject.active ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#FFF3C4] text-[#082B80]"
                }`}>
                  {subject.meta}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black">{subject.title}</h2>
              <p className="mt-2 min-h-20 text-sm font-bold leading-6 text-[#5B6B94]">
                {subject.description}
              </p>
              <div className={`mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-black ${
                subject.active ? "bg-[#0B63F6] text-white" : "bg-[#EAF6FF] text-[#5B6B94]"
              }`}>
                {subject.action}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}