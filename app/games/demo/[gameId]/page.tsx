import { FeatureUnavailablePage } from "@/components/FeatureUnavailablePage";
import { isFeatureActive } from "@/data/feature-flags";
import type { Metadata } from "next";
import { DemoMathGame } from "@/components/games/DemoMathGame";
import { getMathDemoGame, mathDemoGames } from "@/data/math-demo-games";

type DemoGamePageProps = {
  params: Promise<{ gameId: string }>;
};

export function generateStaticParams() {
  return mathDemoGames.map((game) => ({
    gameId: game.id,
  }));
}

export async function generateMetadata({
  params,
}: DemoGamePageProps): Promise<Metadata> {
  const { gameId } = await params;
  const game = getMathDemoGame(gameId);

  if (!game) {
    return {
      title: "Math Demo Game",
      description: "Return to Mathematics to choose a LearnPlay Academy demo game.",
    };
  }

  return {
    title: game.title,
    description: `${game.title} is a Year 1 to Year 3 LearnPlay Academy math demo game about ${game.topic.toLowerCase()}.`,
    openGraph: {
      title: `${game.title} | LearnPlay Academy`,
      description: game.description,
    },
  };
}

export default async function DemoGamePage({ params }: DemoGamePageProps) {
  if (!isFeatureActive("mathQuickGames")) {
    return <FeatureUnavailablePage featureId="mathQuickGames" />;
  }
  const { gameId } = await params;
  const game = getMathDemoGame(gameId);

  return <DemoMathGame game={game} />;
}
