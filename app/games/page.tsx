import { GameCard } from "@/components/GameCard";

const games = [
  {
    title: "Math Quiz Battle",
    description: "A playable 10-question math quiz where learners answer questions, earn score, and collect XP.",
    badge: "Playable",
    accent: "bg-sunshine/80 text-ink",
    href: "/games/math-quiz-battle",
  },
  {
    title: "Word Builder",
    description: "A word-making challenge for spelling, vocabulary, and reading confidence.",
    badge: "English",
    accent: "bg-mint/70 text-ink",
    href: "#",
  },
  {
    title: "Science Explorer",
    description: "A discovery-style card for science facts, mini missions, and curious questions.",
    badge: "Science",
    accent: "bg-sky/15 text-sky",
    href: "#",
  },
];

export default function GamesPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <p className="font-black text-sky">Demo games</p>
      <h1 className="mt-3 text-5xl font-black text-ink">Clickable game previews</h1>
      <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-ink/70">
        Math Quiz Battle is now playable with local questions and frontend-only
        score tracking. Other cards remain visual placeholders for future games.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </div>
    </main>
  );
}
