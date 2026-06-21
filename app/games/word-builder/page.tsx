import { FeatureUnavailablePage } from "@/components/FeatureUnavailablePage";
import { isFeatureActive } from "@/data/feature-flags";
import {
  WordBuilderGame,
  type WordChallenge,
} from "@/components/WordBuilderGame";

const challenges: WordChallenge[] = [
  {
    prompt: "CAT",
    answer: "CAT",
    letters: ["T", "A", "C", "S", "P"],
  },
  {
    prompt: "DOG",
    answer: "DOG",
    letters: ["G", "D", "O", "B", "M"],
  },
  {
    prompt: "SUN",
    answer: "SUN",
    letters: ["N", "U", "S", "T", "A"],
  },
  {
    prompt: "BOOK",
    answer: "BOOK",
    letters: ["O", "K", "B", "O", "L"],
  },
  {
    prompt: "FISH",
    answer: "FISH",
    letters: ["H", "F", "I", "S", "R"],
  },
  {
    prompt: "TREE",
    answer: "TREE",
    letters: ["E", "T", "R", "A", "E"],
  },
  {
    prompt: "STAR",
    answer: "STAR",
    letters: ["R", "S", "T", "P", "A"],
  },
  {
    prompt: "MILK",
    answer: "MILK",
    letters: ["K", "M", "I", "L", "N"],
  },
  {
    prompt: "HAPPY",
    answer: "HAPPY",
    letters: ["P", "H", "Y", "A", "P"],
  },
  {
    prompt: "SMILE",
    answer: "SMILE",
    letters: ["E", "S", "M", "L", "I"],
  },
];

export default function WordBuilderPage() {
  if (!isFeatureActive("englishWordBuilder")) {
    return <FeatureUnavailablePage featureId="englishWordBuilder" />;
  }
  return (
    <main className="bg-cream">
      <WordBuilderGame
        title="English Word Builder"
        description="Tap letters in the right order, build each word, and earn XP for every correct answer."
        challenges={challenges}
      />
    </main>
  );
}

