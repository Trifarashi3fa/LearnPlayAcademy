import { notFound } from "next/navigation";
import { QuestionPlayer } from "@/components/mvp/QuestionPlayer";
import { forestLevels, getForestLevel } from "@/data/mvp-forest-world";

type QuestionPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return forestLevels.map((level) => ({
    level: String(level.level),
  }));
}

export async function generateMetadata({ params }: QuestionPageProps) {
  const { level } = await params;
  const levelData = getForestLevel(Number(level));

  return {
    title: levelData ? `MVP Questions Level ${levelData.level}` : "MVP Questions",
    description: levelData?.description ?? "LearnPlay MVP question page.",
  };
}

export default async function MvpQuestionPage({ params }: QuestionPageProps) {
  const { level } = await params;
  const levelData = getForestLevel(Number(level));

  if (!levelData) {
    notFound();
  }

  return <QuestionPlayer level={levelData} />;
}