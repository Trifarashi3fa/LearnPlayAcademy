import { notFound } from "next/navigation";
import { LevelIntroClient } from "@/components/mvp/LevelIntroClient";
import { MvpPage } from "@/components/mvp/MvpShell";
import { getScienceLevel, scienceLevels } from "@/data/mvp-science-world";

type ScienceLevelPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return scienceLevels.map((level) => ({
    level: String(level.level),
  }));
}

export async function generateMetadata({ params }: ScienceLevelPageProps) {
  const { level } = await params;
  const levelData = getScienceLevel(Number(level));

  return {
    title: levelData ? `Science Level ${levelData.level}` : "Science Level",
    description: levelData?.description ?? "LearnPlay Science level.",
  };
}

export default async function ScienceLevelPage({ params }: ScienceLevelPageProps) {
  const { level } = await params;
  const levelData = getScienceLevel(Number(level));

  if (!levelData) {
    notFound();
  }

  return (
    <MvpPage
      eyebrow={`Science Level ${levelData.level}`}
      title={levelData.title}
      description={levelData.description}
    >
      <LevelIntroClient level={levelData} />
    </MvpPage>
  );
}
