import type { Metadata } from "next";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how LearnPlay Academy handles parent accounts, nickname-based child profiles, local progress, and synced learning progress.",
  openGraph: {
    title: "LearnPlay Academy Privacy Policy",
    description:
      "A parent-friendly overview of the data LearnPlay Academy uses to support learning progress.",
  },
};

const sections = [
  {
    title: "MVP / beta policy",
    copy: "This page describes the current LearnPlay Academy MVP data model. It is practical product wording, not a formal legal opinion, and should receive legal review before public launch.",
    tone: "blue" as const,
  },
  {
    title: "Parent account data",
    copy: "A parent account uses an email address, password handled by Supabase Auth, and a simple parent profile record. The profile may store the email address and a display name based on the email prefix.",
    tone: "yellow" as const,
  },
  {
    title: "Child profile data",
    copy: "The MVP supports one child profile. It asks for a nickname, Year 1 level, avatar choice, and selected-profile status. It does not ask for a child legal name, date of birth, school, home address, phone number, or precise location.",
    tone: "green" as const,
  },
  {
    title: "Learning progress",
    copy: "Forest World progress may include current world, current level, completed levels, level stars, XP, total stars, badges, completed worlds, unlocked worlds, questions answered, correct answers, question-attempt summaries, and last played or updated timestamps.",
    tone: "purple" as const,
  },
  {
    title: "Local and synced progress",
    copy: "Progress is saved locally in the browser first. If a parent is logged in and a child profile is selected, level-completion checkpoints can sync to the Supabase child_progress table. Clearing local device data clears browser progress only and does not delete synced child progress.",
    tone: "pink" as const,
  },
  {
    title: "Deleting child profile data",
    copy: "Parents can delete the child profile from the account page. The current database links child progress to the child profile, so deleting the profile may also remove linked saved child progress. The UI warns before this action.",
    tone: "white" as const,
  },
  {
    title: "Analytics and performance",
    copy: "The app includes Vercel Analytics and Speed Insights to understand website usage and performance. The MVP does not use these tools to ask for child legal names, school details, addresses, phone numbers, or precise location.",
    tone: "blue" as const,
  },
  {
    title: "Parent control",
    copy: "Parents can create, update, or delete the one MVP child profile from the account page. For account access or deletion support beyond the current UI, contact LearnPlay Academy by email.",
    tone: "yellow" as const,
  },
  {
    title: "Payments",
    copy: "LearnPlay Academy does not process payments yet. If premium plans are added later, payment information should be handled by a secure payment provider and explained before purchase.",
    tone: "green" as const,
  },
  {
    title: "Contact",
    copy: "For privacy questions, email support@learnplayacademy.com. Do not treat this page as a claim of COPPA, GDPR, PDPA, or other legal compliance until formal legal review is complete.",
    tone: "white" as const,
  },
];

export default function PrivacyPage() {
  return (
    <PageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      description="A parent-friendly MVP overview of the account, child profile, and progress data LearnPlay currently uses."
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
