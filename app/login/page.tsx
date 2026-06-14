import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { PageLayout, PageSection } from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to LearnPlay Academy to continue learning activities and view student progress.",
  openGraph: {
    title: "Log in to LearnPlay Academy",
    description:
      "Continue learning activities and view student progress in LearnPlay Academy.",
  },
};

export default function LoginPage() {
  return (
    <PageLayout
      eyebrow="Welcome back"
      title="Log in to LearnPlay Academy"
      description="Use your email and password to continue learning and view progress."
      heroTone="blue"
    >
      <PageSection>
        <AuthForm mode="login" />
      </PageSection>
    </PageLayout>
  );
}