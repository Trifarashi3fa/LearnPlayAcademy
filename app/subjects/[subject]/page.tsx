import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MathematicsMvpPage } from "@/components/mvp/MathematicsMvpPage";

type SubjectDetailPageProps = {
  params: Promise<{ subject: string }>;
};

const subjectDetails = [
  {
    slug: "mathematics",
    title: "Mathematics",
    description: "Enter Forest World and complete the active LearnPlay MVP path.",
    active: true,
  },
  {
    slug: "english",
    title: "English",
    description: "English activities are coming soon.",
    active: false,
  },
  {
    slug: "science",
    title: "Science",
    description: "Science activities are coming soon.",
    active: false,
  },
  {
    slug: "bahasa-melayu",
    title: "Bahasa Melayu",
    description: "Bahasa Melayu activities are coming soon.",
    active: false,
  },
  {
    slug: "critical-thinking",
    title: "Critical Thinking",
    description: "Critical Thinking activities are coming soon.",
    active: false,
  },
  {
    slug: "life-skills",
    title: "Life Skills",
    description: "Life Skills activities are coming soon.",
    active: false,
  },
];

export function generateStaticParams() {
  return subjectDetails.map((subject) => ({
    subject: subject.slug,
  }));
}

export async function generateMetadata({
  params,
}: SubjectDetailPageProps): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = subjectDetails.find((item) => item.slug === subjectSlug);

  if (!subject) {
    return { title: "Subject" };
  }

  return {
    title: `${subject.title} | LearnPlay Academy`,
    description: subject.description,
  };
}

export default async function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  const { subject: subjectSlug } = await params;
  const subject = subjectDetails.find((item) => item.slug === subjectSlug);

  if (!subject) {
    notFound();
  }

  if (subject.slug === "mathematics") {
    return <MathematicsMvpPage />;
  }

  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="mx-auto max-w-4xl px-5 py-16 text-center lg:px-8">
        <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
          Coming Soon
        </p>
        <h1 className="mt-3 text-5xl font-black">{subject.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">
          {subject.description} Mathematics Forest World is active now for the MVP.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/subjects/mathematics"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-6 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            Open Mathematics
          </Link>
          <Link
            href="/subjects"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-base font-black text-[#082B80] ring-2 ring-[#DDE8F5] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            Back to Subjects
          </Link>
        </div>
      </section>
    </main>
  );
}