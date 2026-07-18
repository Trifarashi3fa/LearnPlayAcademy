import { notFound } from "next/navigation";
import { LevelIntroClient } from "@/components/mvp/LevelIntroClient";
import { MvpPage } from "@/components/mvp/MvpShell";
import { englishLevels, getEnglishLevel } from "@/data/mvp-english-world";

type EnglishLevelPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return englishLevels.map((level) => ({
    level: String(level.level),
  }));
}

export async function generateMetadata({ params }: EnglishLevelPageProps) {
  const { level } = await params;
  const levelData = getEnglishLevel(Number(level));

  return {
    title: levelData ? `English Level ${levelData.level}` : "English Level",
    description: levelData?.description ?? "LearnPlay English level.",
  };
}

export default async function EnglishLevelPage({ params }: EnglishLevelPageProps) {
  const { level } = await params;
  const levelData = getEnglishLevel(Number(level));

  if (!levelData) {
    notFound();
  }

  return (
    <MvpPage
      eyebrow={`English Level ${levelData.level}`}
      title={levelData.title}
      description={levelData.description}
    >
      <LevelIntroClient level={levelData} />
    </MvpPage>
  );
}
