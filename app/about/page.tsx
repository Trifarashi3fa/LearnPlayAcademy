import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export default function AboutPage() {
  return (
    <PageLayout
      eyebrow="About"
      title="LearnPlay Academy helps children learn school skills through games, quizzes, and rewards."
      heroTone="yellow"
    >
      <PageSection className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Games",
            copy: "Learning starts with playful challenges that feel inviting and age-appropriate.",
            tone: "blue" as const,
          },
          {
            title: "Quizzes",
            copy: "Short practice moments help children build steady confidence over time.",
            tone: "green" as const,
          },
          {
            title: "Rewards",
            copy: "Stars, streaks, and celebration moments make progress feel visible.",
            tone: "pink" as const,
          },
        ].map((item) => (
          <Card key={item.title} tone={item.tone}>
            <h2 className={typography.h3}>{item.title}</h2>
            <p className={`mt-3 ${typography.small}`}>{item.copy}</p>
          </Card>
        ))}
      </PageSection>
    </PageLayout>
  );
}
