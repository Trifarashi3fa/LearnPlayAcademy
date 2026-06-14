import { GameCard } from "@/components/GameCard";

const games = [
  {
    title: "Math Quiz Battle",
    description: "A fast, friendly quiz card where learners answer math questions and collect stars.",
    badge: "Numbers",
    accent: "bg-sunshine/80 text-ink",
  },
  {
    title: "Word Builder",
    description: "A word-making challenge for spelling, vocabulary, and reading confidence.",
    badge: "English",
    accent: "bg-mint/70 text-ink",
  },
  {
    title: "Science Explorer",
    description: "A discovery-style card for science facts, mini missions, and curious questions.",
    badge: "Science",
    accent: "bg-sky/15 text-sky",
  },
];

export default function GamesPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <p className="font-black text-sky">Demo games</p>
      <h1 className="mt-3 text-5xl font-black text-ink">Clickable game previews</h1>
      <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-ink/70">
        Colorful game cards show the direction for future interactive learning
        experiences across math, English, and science.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.title} {...game} />
        ))}
      </div>
    </main>
  );
}
