import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "About",
  description:
    "LearnPlay Academy helps children learn through play with games, quizzes, rewards, and parent-friendly progress visibility.",
  openGraph: {
    title: "Helping Children Learn Through Play",
    description:
      "Learn about the LearnPlay Academy mission and values: Learn, Play, Grow.",
  },
};

const values = [
  {
    title: "Learn",
    copy: "We focus on school-friendly skills children can practice in short, confidence-building sessions.",
    tone: "blue" as const,
  },
  {
    title: "Play",
    copy: "Games, quizzes, and rewards make practice feel welcoming instead of heavy.",
    tone: "yellow" as const,
  },
  {
    title: "Grow",
    copy: "Progress, badges, and encouragement help learners see effort as something worth celebrating.",
    tone: "green" as const,
  },
];

export default function AboutPage() {
  return (
    <PageLayout
      eyebrow="About"
      title="Helping Children Learn Through Play"
      description="LearnPlay Academy helps children build school skills through games, quizzes, rewards, and visible progress that parents can understand."
      heroTone="yellow"
    >
      <PageSection>
        <div className="max-w-3xl">
          <p className={typography.body}>
            Our mission is to make daily practice feel bright, manageable, and
            motivating for children aged 7 to 12. We are building a learning
            platform where children can strengthen core skills while families
            see progress in a simple, encouraging way.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <Card key={item.title} tone={item.tone}>
              <h2 className={typography.h3}>{item.title}</h2>
              <p className={`mt-3 ${typography.small}`}>{item.copy}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <section className="bg-cloud">
        <PageSection className="grid gap-6 md:grid-cols-2">
          <Card id="privacy" tone="white">
            <h2 className={typography.h3}>Privacy Policy</h2>
            <p className={`mt-3 ${typography.small}`}>
              LearnPlay Academy is designed with family trust in mind. Account
              information and learning progress are used to support the learning
              experience and are not presented as public content.
            </p>
          </Card>
          <Card id="terms" tone="white">
            <h2 className={typography.h3}>Terms</h2>
            <p className={`mt-3 ${typography.small}`}>
              LearnPlay Academy provides educational practice activities and
              progress tools. It does not guarantee outcomes or replace guidance
              from parents, teachers, or schools.
            </p>
          </Card>
        </PageSection>
      </section>
    </PageLayout>
  );
}