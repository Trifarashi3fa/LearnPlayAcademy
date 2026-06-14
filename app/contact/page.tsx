import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact LearnPlay Academy for support, privacy questions, account help, and parent enquiries.",
  openGraph: {
    title: "Contact LearnPlay Academy",
    description:
      "Get support for LearnPlay Academy accounts, progress, and parent questions.",
  },
};

const supportTopics = [
  {
    title: "Account help",
    copy: "Questions about login, registration, student profiles, or dashboard access.",
    tone: "blue" as const,
  },
  {
    title: "Learning support",
    copy: "Questions about activities, subjects, progress, XP, and rewards.",
    tone: "green" as const,
  },
  {
    title: "Privacy requests",
    copy: "Questions about profile details, progress data, or account information.",
    tone: "yellow" as const,
  },
];

export default function ContactPage() {
  return (
    <PageLayout
      eyebrow="Contact"
      title="How can we help?"
      description="For LearnPlay Academy support, parent questions, or account help, contact the team by email."
      heroTone="blue"
    >
      <PageSection>
        <Card tone="white" className="mx-auto max-w-3xl text-center shadow-playful">
          <h2 className={typography.h3}>Email support</h2>
          <p className={`mx-auto mt-3 max-w-2xl ${typography.small}`}>
            Send your question to support@learnplayacademy.com. Include the account
            email and a short description so support can understand the request.
          </p>
          <div className="mt-6">
            <Button href="mailto:support@learnplayacademy.com" variant="blue">
              Email LearnPlay Support
            </Button>
          </div>
        </Card>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {supportTopics.map((topic) => (
            <Card key={topic.title} tone={topic.tone}>
              <h2 className="text-xl font-black text-ink">{topic.title}</h2>
              <p className={`mt-3 ${typography.small}`}>{topic.copy}</p>
            </Card>
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}