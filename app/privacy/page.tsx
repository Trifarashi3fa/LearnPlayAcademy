import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how LearnPlay Academy handles account details, student profiles, XP, scores, and learning progress.",
  openGraph: {
    title: "LearnPlay Academy Privacy Policy",
    description:
      "A parent-friendly overview of the data LearnPlay Academy uses to support learning progress.",
  },
};

const sections = [
  {
    title: "Information we collect",
    copy: "LearnPlay Academy may store an email address, student profile details such as name, age, grade level, and favorite subject, plus learning progress such as XP, levels, scores, game history, and subject progress.",
    tone: "blue" as const,
  },
  {
    title: "How information is used",
    copy: "This information is used to let students sign in, save progress, show dashboard summaries, personalize the learning experience, and help families celebrate growth.",
    tone: "yellow" as const,
  },
  {
    title: "Children and families",
    copy: "LearnPlay Academy is designed for children aged 7 to 12 with parent-friendly oversight. Parents or guardians should help children create and manage accounts when needed.",
    tone: "green" as const,
  },
  {
    title: "Payments",
    copy: "LearnPlay Academy does not process payments yet. If premium plans are added later, payment information should be handled by a secure payment provider.",
    tone: "purple" as const,
  },
  {
    title: "Data access and updates",
    copy: "Families can update student profile details from the dashboard. For support with account information or deletion requests, contact LearnPlay Academy by email.",
    tone: "pink" as const,
  },
  {
    title: "Contact",
    copy: "For privacy questions, email support@learnplayacademy.com. This page is a practical project policy and should be reviewed by a legal professional before commercial launch.",
    tone: "white" as const,
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      description="A clear overview of the data LearnPlay Academy uses to support safe, visible learning progress."
      heroTone="blue"
    >
      <PageSection>
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} tone={section.tone}>
              <h2 className={typography.h3}>{section.title}</h2>
              <p className={`mt-3 ${typography.small}`}>{section.copy}</p>
            </Card>
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}