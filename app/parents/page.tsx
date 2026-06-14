import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "Parents",
  description:
    "Learn how LearnPlay Academy supports parents with age-appropriate activities, positive reinforcement, progress visibility, and a safe learning experience.",
  openGraph: {
    title: "LearnPlay Academy for Parents",
    description:
      "A warm, parent-friendly overview of LearnPlay benefits, safety, progress, and future plans.",
  },
};

const benefits = [
  {
    title: "Easy to Start",
    copy: "Children can begin with short activities and clear choices without a complicated setup.",
    tone: "blue" as const,
  },
  {
    title: "Age Appropriate",
    copy: "Activities are designed for primary-school learners aged 7 to 12.",
    tone: "yellow" as const,
  },
  {
    title: "Positive Reinforcement",
    copy: "XP, stars, badges, and encouraging messages help children stay motivated.",
    tone: "green" as const,
  },
  {
    title: "Progress Visibility",
    copy: "The dashboard helps families see completed activities, progress, and recent learning.",
    tone: "purple" as const,
  },
  {
    title: "Safe Learning Experience",
    copy: "LearnPlay focuses on learning activities, simple navigation, and family-friendly content.",
    tone: "pink" as const,
  },
];

const faqs = [
  {
    question: "What age is LearnPlay Academy for?",
    answer: "LearnPlay Academy is designed for children aged 7-12.",
  },
  {
    question: "Is this aligned with school learning?",
    answer:
      "The activities support foundational academic and life skills commonly developed during primary education.",
  },
  {
    question: "Do children need supervision?",
    answer:
      "Most activities are simple enough for children to complete independently, but parents can support younger learners when needed.",
  },
  {
    question: "How long are the activities?",
    answer:
      "Most activities are designed to be short and focused, usually around 5-10 minutes.",
  },
  {
    question: "Will there be premium plans?",
    answer:
      "Yes. LearnPlay Academy can support free and premium learning access as the platform grows.",
  },
];

export default function ParentsPage() {
  return (
    <PageLayout
      eyebrow="For parents"
      title="Learning support that feels positive at home"
      description="LearnPlay Academy helps families turn practice into short, motivating activities with clear progress and a child-friendly experience."
      heroTone="blue"
    >
      <PageSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <Card key={benefit.title} tone={benefit.tone}>
              <h2 className="text-xl font-black text-ink">{benefit.title}</h2>
              <p className={`mt-3 ${typography.small}`}>{benefit.copy}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <section className="bg-cloud" id="faq">
        <PageSection>
          <div className="mb-8 max-w-3xl">
            <p className={typography.eyebrow}>FAQ</p>
            <h2 className={typography.h2}>Common parent questions</h2>
          </div>
          <dl className="grid gap-5 md:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question} tone="white">
                <dt className="text-xl font-black text-ink">{faq.question}</dt>
                <dd className={`mt-3 ${typography.small}`}>{faq.answer}</dd>
              </Card>
            ))}
          </dl>
        </PageSection>
      </section>
    </PageLayout>
  );
}