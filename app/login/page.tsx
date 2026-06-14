import { AuthForm } from "@/components/auth/AuthForm";
import { PageLayout, PageSection } from "@/components/PageLayout";

export default function LoginPage() {
  return (
    <PageLayout
      eyebrow="Welcome back"
      title="Log in to LearnPlay Academy"
      description="Use your email and password to continue to your dashboard."
      heroTone="blue"
    >
      <PageSection>
        <AuthForm mode="login" />
      </PageSection>
    </PageLayout>
  );
}
