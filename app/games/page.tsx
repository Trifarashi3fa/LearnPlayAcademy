import { GameCard } from "@/components/GameCard";
import { PageLayout, PageSection } from "@/components/PageLayout";

const games = [
  {
    title: "Math Quiz Battle",
    description: "A playable 10-question math quiz where learners answer questions, earn score, and collect XP.",
    badge: "Playable",
    tone: "yellow" as const,
    href: "/games/math-quiz-battle",
  },
  {
    title: "Word Builder",
    description: "A word-making challenge for spelling, vocabulary, and reading confidence.",
    badge: "English",
    tone: "green" as const,
    href: "#",
  },
  {
    title: "Science Explorer",
    description: "A discovery-style card for science facts, mini missions, and curious questions.",
    badge: "Science",
    tone: "blue" as const,
    href: "#",
  },
];

export default function GamesPage() {
  return (
    <PageLayout
      eyebrow="Demo games"
      title="Game previews and playable demos"
      description="Math Quiz Battle is playable with local questions and frontend-only score tracking. Other cards remain visual placeholders for future games."
      heroTone="yellow"
    >
      <PageSection>
        <div className="grid gap-5 md:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
