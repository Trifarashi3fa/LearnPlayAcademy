import { AuthForm } from "@/components/auth/AuthForm";
import { PageLayout, PageSection } from "@/components/PageLayout";

export default function RegisterPage() {
  return (
    <PageLayout
      eyebrow="Join LearnPlay"
      title="Create your student account"
      description="Register with an email and password to start saving dashboard progress later."
      heroTone="yellow"
    >
      <PageSection>
        <AuthForm mode="register" />
      </PageSection>
    </PageLayout>
  );
}
