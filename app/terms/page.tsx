import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Read the LearnPlay Academy terms for account use, parent supervision, educational support, and future premium plans.",
  openGraph: {
    title: "LearnPlay Academy Terms",
    description:
      "Parent-friendly terms for using LearnPlay Academy as a learning support platform.",
  },
};

const terms = [
  {
    title: "Learning support",
    copy: "LearnPlay Academy provides practice activities, games, quizzes, rewards, and progress tools. It supports learning but does not guarantee academic outcomes.",
    tone: "blue" as const,
  },
  {
    title: "Parent supervision",
    copy: "Parents or guardians are responsible for deciding how children use the platform and for helping younger learners with account access when needed.",
    tone: "yellow" as const,
  },
  {
    title: "Account use",
    copy: "Parents should use their own email address, keep passwords private, and manage the child profile. The MVP child profile should use a nickname only.",
    tone: "green" as const,
  },
  {
    title: "Progress and rewards",
    copy: "XP, levels, stars, badges, question-attempt summaries, and progress dashboards are designed to encourage practice. They are motivational tools and may change as the platform grows.",
    tone: "purple" as const,
  },
  {
    title: "Child profile and data",
    copy: "The current MVP does not ask for a child legal name, date of birth, school, address, phone number, or precise location. It uses a nickname-based child profile and learning progress records.",
    tone: "blue" as const,
  },
  {
    title: "Local and synced progress",
    copy: "Some progress is stored on the local device. Logged-in parent accounts with a selected child profile may also sync level-completion progress to Supabase. Clearing local device data does not delete synced child progress.",
    tone: "yellow" as const,
  },
  {
    title: "Future premium plans",
    copy: "LearnPlay Academy may add premium access later. Any future paid features should be explained clearly before purchase.",
    tone: "pink" as const,
  },
  {
    title: "Contact",
    copy: "For questions about these terms, email support@learnplayacademy.com. These MVP terms should be reviewed by a legal professional before commercial launch and are not a formal compliance statement.",
    tone: "white" as const,
  },
];

export default function TermsPage() {
  return (
    <PageLayout
      eyebrow="Terms"
      title="Terms of Use"
      description="Simple, parent-friendly terms for using LearnPlay Academy as a learning support platform."
      heroTone="yellow"
    >
      <PageSection>
        <div className="grid gap-5 md:grid-cols-2">
          {terms.map((term) => (
            <Card key={term.title} tone={term.tone}>
              <h2 className={typography.h3}>{term.title}</h2>
              <p className={`mt-3 ${typography.small}`}>{term.copy}</p>
            </Card>
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
