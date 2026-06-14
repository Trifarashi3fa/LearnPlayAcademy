import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { PageLayout, PageSection } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a LearnPlay Academy account to start free learning activities and save student progress.",
  openGraph: {
    title: "Create a LearnPlay Academy account",
    description:
      "Start free learning activities and save student progress with LearnPlay Academy.",
  },
};

export default function RegisterPage() {
  return (
    <PageLayout
      eyebrow="Join LearnPlay"
      title="Create your student account"
      description="Start free learning activities and save progress as LearnPlay grows."
      heroTone="yellow"
    >
      <PageSection>
        <AuthForm mode="register" />
      </PageSection>
    </PageLayout>
  );
}