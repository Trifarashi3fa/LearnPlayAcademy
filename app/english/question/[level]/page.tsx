import { notFound } from "next/navigation";
import { QuestionPlayer } from "@/components/mvp/QuestionPlayer";
import { englishLevels, getEnglishLevel } from "@/data/mvp-english-world";

type EnglishQuestionPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return englishLevels.map((level) => ({
    level: String(level.level),
  }));
}

export async function generateMetadata({ params }: EnglishQuestionPageProps) {
  const { level } = await params;
  const levelData = getEnglishLevel(Number(level));

  return {
    title: levelData ? `English Questions Level ${levelData.level}` : "English Questions",
    description: levelData?.description ?? "LearnPlay English question page.",
  };
}

export default async function EnglishQuestionPage({ params }: EnglishQuestionPageProps) {
  const { level } = await params;
  const levelData = getEnglishLevel(Number(level));

  if (!levelData) {
    notFound();
  }

  return <QuestionPlayer level={levelData} />;
}
