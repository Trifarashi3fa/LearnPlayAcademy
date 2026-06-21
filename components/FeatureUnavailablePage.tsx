import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { featureAvailability, type FeatureId } from "@/data/feature-flags";

export function FeatureUnavailablePage({ featureId }: { featureId: FeatureId }) {
  const feature = featureAvailability[featureId];

  return (
    <PageLayout
      eyebrow="Foundation MVP"
      title={`${feature.label} is coming soon`}
      description={feature.description}
      heroTone="blue"
    >
      <PageSection>
        <Card className="mx-auto max-w-3xl text-center shadow-playful" tone="yellow">
          <p className="text-sm font-black uppercase text-coral">Current active learning product</p>
          <h2 className="mt-3 text-3xl font-black text-ink">Mathematics Year 1 - Forest World</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-7 text-ink/70">
            This module is safely preserved for future expansion, but it is not part of the current approved pilot.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/mvp/world-map" variant="blue">Enter Forest World</Button>
            <Button href="/subjects" variant="secondary">Back to Subjects</Button>
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}
