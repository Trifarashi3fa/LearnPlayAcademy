import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeatureUnavailablePage } from "@/components/FeatureUnavailablePage";
import { EnglishMvpPage } from "@/components/mvp/EnglishMvpPage";
import { MathematicsMvpPage } from "@/components/mvp/MathematicsMvpPage";
import { ScienceMvpPage } from "@/components/mvp/ScienceMvpPage";
import { getSubjectFeatureId, isFeatureActive, publicSubjectAvailability } from "@/data/feature-flags";

type SubjectDetailPageProps = { params: Promise<{ subject: string }> };

export function generateStaticParams() {
  return [...publicSubjectAvailability.map((subject) => ({ subject: subject.id })), { subject: "critical-thinking" }];
}

export async function generateMetadata({ params }: SubjectDetailPageProps): Promise<Metadata> {
  const { subject } = await params;
  const item = publicSubjectAvailability.find((candidate) => candidate.id === subject);
  return { title: item ? `${item.title} | LearnPlay Academy` : "Subject | LearnPlay Academy", description: item?.description ?? "LearnPlay subject availability." };
}

export default async function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  const { subject } = await params;
  if (subject === "mathematics") {
    return isFeatureActive("mathematicsYear1ForestWorld")
      ? <MathematicsMvpPage />
      : <FeatureUnavailablePage featureId="mathematicsYear1ForestWorld" />;
  }
  if (subject === "english") {
    return isFeatureActive("englishYear1ForestWorld")
      ? <EnglishMvpPage />
      : <FeatureUnavailablePage featureId="englishYear1ForestWorld" />;
  }
  if (subject === "science") {
    return isFeatureActive("scienceYear1ForestWorld")
      ? <ScienceMvpPage />
      : <FeatureUnavailablePage featureId="scienceYear1ForestWorld" />;
  }
  const featureId = getSubjectFeatureId(subject);
  if (!featureId) notFound();
  if (!isFeatureActive(featureId)) return <FeatureUnavailablePage featureId={featureId} />;
  notFound();
}
