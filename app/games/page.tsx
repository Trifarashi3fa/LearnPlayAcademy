import type { Metadata } from "next";
import { GameCard } from "@/components/GameCard";
import { PageLayout, PageSection } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Play LearnPlay Academy learning games that build math, English, science, and Bahasa Melayu skills for children aged 7 to 12.",
  openGraph: {
    title: "Learning Games That Build Real Skills",
    description:
      "Selected activities are available now, with new learning games added regularly.",
  },
};

const games = [
  {
    title: "Math Quiz Battle",
    description:
      "Answer math questions one at a time, build score confidence, and earn XP for steady practice.",
    badge: "Playable",
    tone: "yellow" as const,
    href: "/games/math-quiz-battle",
    actionLabel: "Play Now",
  },
  {
    title: "English Word Builder",
    description:
      "Tap letters in order, build words, and strengthen spelling through a focused word challenge.",
    badge: "Playable",
    tone: "green" as const,
    href: "/games/word-builder",
    actionLabel: "Play Now",
  },
  {
    title: "Science Explorer",
    description:
      "Explore quizzes, facts, activities, learning paths, XP, and badges in the Science Explorer module.",
    badge: "Playable",
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
      eyebrow="Learning games"
      title="Learning Games That Build Real Skills"
      description="Selected activities are available now, with new activities added regularly for children aged 7 to 12."
      heroTone="yellow"
    >
      <PageSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}