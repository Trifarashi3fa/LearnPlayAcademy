import { notFound } from "next/navigation";
import { LevelIntroClient } from "@/components/mvp/LevelIntroClient";
import { MvpPage } from "@/components/mvp/MvpShell";
import { forestLevels, getForestLevel } from "@/data/mvp-forest-world";

type LevelPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return forestLevels.map((level) => ({
    level: String(level.level),
  }));
}

export async function generateMetadata({ params }: LevelPageProps) {
  const { level } = await params;
  const levelData = getForestLevel(Number(level));

  return {
    title: levelData ? `MVP Level ${levelData.level}` : "MVP Level",
    description: levelData?.description ?? "LearnPlay MVP level.",
  };
}

export default async function MvpLevelPage({ params }: LevelPageProps) {
  const { level } = await params;
  const levelData = getForestLevel(Number(level));

  if (!levelData) {
    notFound();
  }

  return (
    <MvpPage
      eyebrow={`Level ${levelData.level}`}
      title={levelData.title}
      description={levelData.description}
    >
      <LevelIntroClient level={levelData} />
    </MvpPage>
  );
}