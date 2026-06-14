import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Science Explorer",
  description:
    "Start the LearnPlay Academy Science Explorer module with quizzes, facts, activities, learning paths, XP, and badges.",
  openGraph: {
    title: "Science Explorer | LearnPlay Academy",
    description:
      "A child-friendly Science Explorer start screen that opens the full Science Content Factory.",
  },
};

const highlights = [
  "Choose quizzes by age and difficulty.",
  "Explore kid-friendly science facts.",
  "Complete hands-on activities with safety notes.",
  "Follow learning paths and collect badges.",
  "Science XP saves on this device using local progress.",
];

export default function ScienceExplorerGamePage() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <Card className="shadow-playful" tone="blue">
          <span className="inline-flex rounded-full bg-sky px-4 py-2 text-sm font-black text-white">
            Science Game
          </span>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <h1 className="text-4xl font-black text-ink sm:text-5xl">
                Science Explorer
              </h1>
              <p className="mt-4 text-lg font-bold leading-8 text-ink/70">
                Explore quizzes, facts, activities, and learning paths while
                earning Science XP and badges.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 text-center">
              <Image
                src="/learnplay-academy-logo.png"
                alt="LearnPlay Academy logo"
                width={180}
                height={180}
                className="mx-auto h-40 w-40 object-contain"
                priority
              />
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-white p-6">
            <h2 className="text-2xl font-black text-sky">How to play</h2>
            <ul className="mt-4 space-y-3 text-base font-bold leading-7 text-ink/75">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/science" variant="blue">
              Start Science Explorer
            </Button>
            <Button href="/games" variant="secondary">
              Back to Games
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}