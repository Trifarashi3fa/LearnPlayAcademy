import { FeatureUnavailablePage } from "@/components/FeatureUnavailablePage";
import { isFeatureActive } from "@/data/feature-flags";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { LifeSkillsProgressPanel } from "@/components/LifeSkillsProgressPanel";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";
import { lifeSkillsCategories } from "@/data/life-skills-content";

export const metadata: Metadata = {
  title: "Life Skills Content Factory",
  description:
    "Explore LearnPlay Life Skills categories, topics, quizzes, mini-game scenarios, badges, and local progress.",
  openGraph: {
    title: "LearnPlay Life Skills Content Factory",
    description:
      "A child-friendly Life Skills module with Digital Safety, AI Literacy, Financial Literacy, Emotional Intelligence, Problem Solving, and Healthy Habits.",
  },
};

export default function LifeSkillsPage() {
  if (!isFeatureActive("lifeSkills")) {
    return <FeatureUnavailablePage featureId="lifeSkills" />;
  }
  return (
    <PageLayout
      eyebrow="Life Skills"
      title="Life Skills Content Factory"
      description="Build real-world confidence with digital safety, AI literacy, money habits, emotions, problem solving, and healthy routines."
      heroTone="blue"
    >
      <PageSection>
        <nav className="mb-6 text-sm font-black text-ink/70" aria-label="Breadcrumb">
          <Link href="/" className="rounded-full hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Life Skills</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
          <LifeSkillsProgressPanel />
          <Card tone="blue">
            <h2 className={typography.h3}>Progression system</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <div key={level} className="rounded-3xl bg-white px-4 py-3 text-center text-sm font-black text-ink">
                  {level}
                </div>
              ))}
            </div>
            <p className={`mt-5 ${typography.small}`}>
              Version 1 uses static content and browser localStorage only. No database,
              login, payments, or backend setup is required for this module.
            </p>
          </Card>
        </div>
      </PageSection>

      <section className="bg-cloud">
        <PageSection>
          <div className="mb-8 max-w-3xl">
            <p className={typography.eyebrow}>Categories</p>
            <h2 className={typography.h2}>Choose a Life Skills path</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lifeSkillsCategories.map((category) => (
              <Card key={category.id} tone={category.colorTone}>
                <h2 className={typography.h3}>{category.name}</h2>
                <p className={`mt-3 ${typography.small}`}>{category.description}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white px-4 py-3 text-center">
                    <p className="text-2xl font-black text-ink">{category.topics.length}</p>
                    <p className="text-xs font-black uppercase text-ink/60">Topics</p>
                  </div>
                  <div className="rounded-3xl bg-white px-4 py-3 text-center">
                    <p className="text-2xl font-black text-ink">{category.games.length}</p>
                    <p className="text-xs font-black uppercase text-ink/60">Games</p>
                  </div>
                </div>
                <Button href={`/life-skills/${category.id}`} variant="blue" className="mt-5">
                  Start Learning
                </Button>
              </Card>
            ))}
          </div>
        </PageSection>
      </section>
    </PageLayout>
  );
}
