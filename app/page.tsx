import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "LearnPlay Academy | Start Learning",
  description:
    "Start the LearnPlay Academy MVP with Mathematics, Forest World, 10 guided levels, local questions, XP, stars, rewards, and a parent dashboard.",
  openGraph: {
    title: "LearnPlay Academy | Start Learning",
    description:
      "A child-friendly learning adventure that starts with Mathematics Forest World.",
  },
};

const subjectButtons = [
  "Mathematics",
  "English",
  "Science",
  "Bahasa Melayu",
  "Life Skills",
  "General Knowledge",
];

export default function Home() {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="overflow-hidden bg-[#EAF6FF]">
        <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_420px] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
              LearnPlay Academy MVP
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight md:text-7xl">
              Start your learning adventure.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">
              Begin with Mathematics Forest World. Children answer local questions, earn XP, collect stars, unlock levels, and let parents view progress on this device.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/subjects" variant="blue">
                Start Learning
              </Button>
              <Button href="/mvp/parent-dashboard" variant="secondary">
                Parent Dashboard
              </Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {subjectButtons.map((subject) => (
                <Link
                  key={subject}
                  href={subject === "Mathematics" ? "/mvp/world-map" : "/subjects"}
                  className="rounded-3xl border border-[#DDE8F5] bg-white px-4 py-3 text-center text-sm font-black text-[#082B80] shadow-sm transition hover:-translate-y-0.5 hover:text-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
                >
                  {subject}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-[#DDE8F5] bg-white p-6 text-center shadow-playful">
            <Image
              src="/mascots/learnbot-front.png"
              alt="LearnBot mascot welcoming children to LearnPlay Academy"
              width={320}
              height={320}
              className="mx-auto h-72 w-72 object-contain"
              priority
            />
            <h2 className="mt-3 text-3xl font-black">LearnBot is ready</h2>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
              Follow the path: Subjects, Mathematics, Forest World, Levels, Questions, Rewards, Parent Dashboard.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}