import { notFound } from "next/navigation";
import { QuestionPlayer } from "@/components/mvp/QuestionPlayer";
import { getScienceLevel, scienceLevels } from "@/data/mvp-science-world";

type ScienceQuestionPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return scienceLevels.map((level) => ({
    level: String(level.level),
  }));
}

export async function generateMetadata({ params }: ScienceQuestionPageProps) {
  const { level } = await params;
  const levelData = getScienceLevel(Number(level));

  return {
    title: levelData ? `Science Questions Level ${levelData.level}` : "Science Questions",
    description: levelData?.description ?? "LearnPlay Science question page.",
  };
}

export default async function ScienceQuestionPage({ params }: ScienceQuestionPageProps) {
  const { level } = await params;
  const levelData = getScienceLevel(Number(level));

  if (!levelData) {
    notFound();
  }

  return <QuestionPlayer level={levelData} />;
}
