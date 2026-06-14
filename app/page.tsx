import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageSection } from "@/components/PageLayout";
import { SubjectCard } from "@/components/SubjectCard";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "Learning Made Fun. Progress Made Visible.",
  description:
    "LearnPlay Academy offers interactive games, quizzes, rewards, and progress visibility for children aged 7 to 12.",
  openGraph: {
    title: "Learning Made Fun. Progress Made Visible.",
    description:
      "Interactive games, quizzes, rewards, and progress visibility for children aged 7 to 12.",
  },
};

const subjects = [
  {
    title: "Mathematics",
    description: "Number fluency, patterns, and everyday problem solving.",
    icon: "123",
    tone: "yellow" as const,
  },
  {
    title: "English",
    description: "Vocabulary, spelling, reading, and sentence practice.",
    icon: "ABC",
    tone: "green" as const,
  },
  {
    title: "Science",
    description: "Discovery activities that encourage observation and curiosity.",
    icon: "SCI",
    tone: "blue" as const,
  },
];

const stats = [
  "50+ Activities",
  "5 Learning Areas",
  "100+ Questions",
  "Ages 7-12",
];

const parentBenefits = [
  "Short Activities",
  "Positive Motivation",
  "School-Friendly Skills",
  "Progress Tracking",
  "Safe Learning Environment",
];

const plans = [
  {
    title: "Free Starter",
    copy: "Selected activities available now for families to explore LearnPlay at home.",
    tone: "blue" as const,
  },
  {
    title: "Premium Learning",
    copy: "More subjects, rewards, and guided practice paths planned for future release.",
    tone: "yellow" as const,
  },
  {
    title: "Family Plan",
    copy: "Tools for multiple learners and parent-friendly progress views are coming soon.",
    tone: "green" as const,
  },
];

export default function Home() {
  return (
    <main>
      <section className="overflow-hidden bg-[#FFF6D8]">
        <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-5 py-14 sm:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className={typography.eyebrow}>For curious children aged 7-12</p>
            <h1 className={`mt-4 max-w-3xl ${typography.display}`}>
              Learning Made Fun. Progress Made Visible.
            </h1>
            <p className={`mt-6 max-w-2xl ${typography.body}`}>
              LearnPlay Academy blends interactive games, quick quizzes, rewards,
              and clear progress moments so children can practice skills with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/register">Start Free Learning</Button>
              <Button href="/games" variant="secondary">
                Explore Activities
              </Button>
            </div>
          </div>
          <div className="relative min-h-[390px]" aria-label="LearnPlay progress preview">
            <div className="absolute left-2 top-4 h-24 w-24 rounded-full bg-coral/80" />
            <div className="absolute right-0 top-12 h-24 w-24 rounded-3xl bg-mint" />
            <div className="absolute bottom-4 left-8 h-20 w-20 rounded-3xl bg-purple" />
            <Card className="absolute inset-x-4 top-10 text-center shadow-playful" tone="white">
              <Image
                src="/learnplay-academy-logo.png"
                alt="LearnPlay Academy child-friendly learning logo"
                width={280}
                height={280}
                className="mx-auto h-52 w-52 object-contain sm:h-64 sm:w-64"
                priority
              />
              <div className="mt-4 grid grid-cols-2 gap-4 text-left">
                <Card tone="yellow" className="p-4">
                  <p className="text-sm font-black text-ink/60">Streak</p>
                  <p className="text-3xl font-black text-ink">7 days</p>
                </Card>
                <Card tone="green" className="p-4">
                  <p className="text-sm font-black text-ink/60">Stars</p>
                  <p className="text-3xl font-black text-ink">42</p>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <PageSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat} tone="white" className="text-center">
              <p className="text-2xl font-black text-ink">{stat}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection className="pt-0">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={typography.eyebrow}>Learning areas</p>
            <h2 className={typography.h2}>Practice that feels active</h2>
          </div>
          <Button href="/subjects" variant="secondary" className="sm:self-center">
            See all subjects
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.title} {...subject} />
          ))}
        </div>
      </PageSection>

      <section className="bg-cloud">
        <PageSection>
          <div className="max-w-3xl">
            <p className="font-black text-sky">For parents</p>
            <h2 className={`mt-2 ${typography.h2}`}>
              Support daily practice without the pressure
            </h2>
            <p className={`mt-4 ${typography.body}`}>
              LearnPlay is designed to feel welcoming for children while giving
              parents a clearer view of learning habits and progress.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {parentBenefits.map((benefit) => (
              <Card key={benefit}>
                <p className="text-xl font-black text-ink">{benefit}</p>
              </Card>
            ))}
          </div>
        </PageSection>
      </section>

      <PageSection>
        <div className="mb-8 max-w-3xl">
          <p className={typography.eyebrow}>Coming soon</p>
          <h2 className={typography.h2}>Plans for every learning stage</h2>
          <p className={`mt-4 ${typography.body}`}>
            LearnPlay is growing step by step, with selected activities available now
            and new activities added regularly.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.title} tone={plan.tone}>
              <h3 className={typography.h3}>{plan.title}</h3>
              <p className={`mt-3 ${typography.small}`}>{plan.copy}</p>
            </Card>
          ))}
        </div>
      </PageSection>
    </main>
  );
}