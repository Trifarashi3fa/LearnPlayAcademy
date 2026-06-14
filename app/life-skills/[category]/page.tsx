import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CompleteLifeSkillButton } from "@/components/LifeSkillsProgressPanel";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";
import { getLifeSkillsCategory, lifeSkillsCategories } from "@/data/life-skills-content";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return lifeSkillsCategories.map((category) => ({
    category: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getLifeSkillsCategory(categoryId);

  if (!category) {
    return { title: "Life Skills" };
  }

  return {
    title: category.name,
    description: `${category.name} topics, quizzes, mini-game scenarios, progress labels, and badge rewards in LearnPlay Life Skills.`,
  };
}

export default async function LifeSkillsCategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = getLifeSkillsCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <PageLayout
      eyebrow="Life Skills"
      title={category.name}
      description={category.description}
      heroTone="yellow"
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
          <span>{category.name}</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card tone={category.colorTone}>
            <p className="text-sm font-black uppercase text-ink/60">Progress placeholder</p>
            <h2 className={`${typography.h3} mt-2`}>{category.badge}</h2>
            <p className={`mt-3 ${typography.small}`}>
              Complete a category review to save XP and badge progress locally on this device.
            </p>
            <div className="mt-5">
              <CompleteLifeSkillButton
                itemId={category.id}
                badge={category.badge}
                xpReward={50}
                type="category"
              />
            </div>
          </Card>

          <Card tone="white">
            <h2 className={typography.h3}>Topics</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.topics.map((topic) => (
                <div key={topic} className="rounded-3xl bg-cloud px-4 py-3 text-sm font-black text-ink">
                  {topic}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PageSection>

      <section className="bg-cloud">
        <PageSection>
          <div className="grid gap-5 lg:grid-cols-2">
            <Card tone="white">
              <h2 className={typography.h3}>Quiz Questions</h2>
              <div className="mt-5 space-y-4">
                {category.quizQuestions.map((question) => (
                  <div key={question.id} className="rounded-3xl bg-[#FFF6D8] p-4">
                    <p className="text-sm font-black uppercase text-sky">
                      {question.level} - {question.xpReward} XP
                    </p>
                    <h3 className="mt-2 text-lg font-black text-ink">{question.question}</h3>
                    <p className={`mt-2 ${typography.small}`}>
                      Answer: {question.correctAnswer}
                    </p>
                    <p className={`mt-2 ${typography.small}`}>{question.explanation}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card tone="white">
              <h2 className={typography.h3}>Game List</h2>
              <div className="mt-5 space-y-4">
                {category.games.map((game) => (
                  <div key={game.id} className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-black uppercase text-coral">{game.level}</p>
                    <h3 className="mt-2 text-lg font-black text-ink">{game.title}</h3>
                    <p className={`mt-2 ${typography.small}`}>{game.mission}</p>
                    <Button
                      href={`/life-skills/${category.id}/${game.id}`}
                      variant="blue"
                      className="mt-4"
                    >
                      Open Activity
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </PageSection>
      </section>
    </PageLayout>
  );
}