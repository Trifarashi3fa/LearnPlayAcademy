import type { Metadata } from "next";
import Link from "next/link";
import { GameCard } from "@/components/GameCard";
import { PageLayout, PageSection } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Quick LearnPlay Academy practice games for children. Use Subjects for guided learning paths and Games for short practice activities.",
  openGraph: {
    title: "Quick Practice Games | LearnPlay Academy",
    description:
      "Short practice activities for children, separate from guided subject pathways.",
  },
};

const games = [
  {
    title: "Math Quiz Battle",
    description:
      "A short math practice game. For the full guided math path, start Mathematics in Subjects.",
    badge: "Quick Practice",
    tone: "yellow" as const,
    href: "/games/math-quiz-battle",
    actionLabel: "Play Practice",
  },
  {
    title: "English Word Builder",
    description:
      "Tap letters in order, build words, and strengthen spelling through a focused word challenge.",
    badge: "Quick Practice",
    tone: "green" as const,
    href: "/games/word-builder",
    actionLabel: "Play Practice",
  },
  {
    title: "Science Explorer",
    description:
      "Explore quizzes, facts, activities, learning paths, XP, and badges in the Science Explorer module.",
    badge: "Explore",
    tone: "blue" as const,
    href: "/games/science-explorer",
    actionLabel: "Explore",
  },
  {
    title: "Bahasa Melayu Builder",
    description:
      "Practice everyday words, spelling patterns, and simple language confidence.",
    badge: "Practice",
    tone: "purple" as const,
    href: "/games#bahasa-melayu-builder",
    id: "bahasa-melayu-builder",
    actionLabel: "Explore",
  },
];

export default function GamesPage() {
  return (
    <PageLayout
      eyebrow="Quick practice"
      title="Games Are Short Practice Activities"
      description="The Games tab is for quick play. The Subjects tab is for guided learning paths with worlds, levels, progress, and rewards."
      heroTone="yellow"
    >
      <PageSection>
        <div className="mb-8 rounded-[2rem] border border-sky/20 bg-sky/10 p-6">
          <h2 className="text-2xl font-black text-ink">Subjects vs Games</h2>
          <p className="mt-2 max-w-3xl text-base font-bold leading-7 text-ink/70">
            Choose <strong>Subjects</strong> when a child wants a step-by-step learning path. Choose <strong>Games</strong> for short practice sessions.
          </p>
          <Link
            href="/subjects"
            className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-sky px-6 py-3 text-base font-black text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky/25"
          >
            Go to Guided Subjects
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}