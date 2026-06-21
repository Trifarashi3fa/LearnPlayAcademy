import { FeatureUnavailablePage } from "@/components/FeatureUnavailablePage";
import { isFeatureActive } from "@/data/feature-flags";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { CompleteLifeSkillButton } from "@/components/LifeSkillsProgressPanel";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";
import {
  getLifeSkillsCategory,
  getLifeSkillsGame,
  lifeSkillsCategories,
} from "@/data/life-skills-content";

type ActivityPageProps = {
  params: Promise<{ category: string; activity: string }>;
};

export function generateStaticParams() {
  return lifeSkillsCategories.flatMap((category) =>
    category.games.map((game) => ({
      category: category.id,
      activity: game.id,
    })),
  );
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { category: categoryId, activity } = await params;
  const category = getLifeSkillsCategory(categoryId);
  const game = getLifeSkillsGame(categoryId, activity);

  if (!category || !game) {
    return { title: "Life Skills Activity" };
  }

  return {
    title: game.title,
    description: `${game.title} is a ${game.level} LearnPlay Life Skills activity in ${category.name}.`,
  };
}

export default async function LifeSkillsActivityPage({ params }: ActivityPageProps) {
  if (!isFeatureActive("lifeSkills")) {
    return <FeatureUnavailablePage featureId="lifeSkills" />;
  }
  const { category: categoryId, activity } = await params;
  const category = getLifeSkillsCategory(categoryId);
  const game = getLifeSkillsGame(categoryId, activity);

  if (!category || !game) {
    notFound();
  }

  return (
    <PageLayout
      eyebrow={`${category.name} Activity`}
      title={game.title}
      description={game.mission}
      heroTone="blue"
    >
      <PageSection>
        <nav className="mb-6 text-sm font-black text-ink/70" aria-label="Breadcrumb">
          <Link href="/" className="rounded-full hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/life-skills" className="rounded-full hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25">
            Life Skills
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/life-skills/${category.id}`} className="rounded-full hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25">
            {category.name}
          </Link>
          <span className="mx-2">/</span>
          <span>{game.title}</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card tone={category.colorTone}>
            <p className="text-sm font-black uppercase text-ink/60">
              {game.level} - {game.xpReward} XP
            </p>
            <h2 className={`${typography.h3} mt-2`}>Scenario</h2>
            <p className={`mt-3 ${typography.body}`}>{game.scenario}</p>
            <h3 className="mt-6 text-xl font-black text-ink">Choices</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {game.choices.map((choice) => (
                <div
                  key={choice}
                  className={`rounded-3xl px-4 py-3 text-sm font-black ${
                    choice === game.bestChoice ? "bg-mint text-ink" : "bg-white text-ink"
                  }`}
                >
                  {choice}
                </div>
              ))}
            </div>
          </Card>

          <Card tone="white">
            <h2 className={typography.h3}>Best Choice</h2>
            <p className="mt-3 text-lg font-black text-sky">{game.bestChoice}</p>
            <p className={`mt-3 ${typography.small}`}>{game.feedback}</p>
            <div className="mt-6">
              <CompleteLifeSkillButton
                itemId={`${category.id}-${game.id}`}
                badge={category.badge}
                xpReward={game.xpReward}
              />
            </div>
          </Card>
        </div>
      </PageSection>
    </PageLayout>
  );
}
