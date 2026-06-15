import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { MathematicsAdventurePage } from "@/components/subjects/MathematicsAdventurePage";
import { typography } from "@/components/theme";
import {
  difficultyLevels,
  getSubjectPathway,
  subjectPathways,
  type DifficultyLevel,
  type SubjectTopic,
} from "@/data/subject-pathways";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type SubjectDetailPageProps = {
  params: Promise<{ subject: string }>;
};

type MathViewer = {
  isRegistered: boolean;
  studentName: string;
};

type ProfileRow = {
  display_name: string | null;
  student_name: string | null;
};

const levelTone: Record<DifficultyLevel, "blue" | "yellow" | "purple"> = {
  Beginner: "blue",
  Intermediate: "yellow",
  Advanced: "purple",
};

export function generateStaticParams() {
  return subjectPathways.map((subject) => ({
    subject: subject.slug,
  }));
}

export async function generateMetadata({
  params,
}: SubjectDetailPageProps): Promise<Metadata> {
  const { subject: subjectSlug } = await params;
  const subject = getSubjectPathway(subjectSlug);

  if (!subject) {
    return { title: "Subject" };
  }

  if (subject.slug === "mathematics") {
    return {
      title: "LearnPlay Mathematics | LearnPlay Academy",
      description:
        "LearnPlay Mathematics premium learning adventure for Year 1 to Year 6 students, with learning worlds, activities, stars, badges, progress, and explanation notes.",
      openGraph: {
        title: "LearnPlay Mathematics",
        description:
          "Learn, play, and master mathematics through worlds, activities, games, progress, stars, and badges.",
      },
    };
  }

  return {
    title: subject.title,
    description: `${subject.title} pathway with Beginner, Intermediate, and Advanced topics, games, quizzes, and assessments.`,
    openGraph: {
      title: `${subject.title} Learning Pathway`,
      description: subject.description,
    },
  };
}

async function getMathViewer(): Promise<MathViewer> {
  if (!isSupabaseConfigured()) {
    return { isRegistered: false, studentName: "Alex" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isRegistered: false, studentName: "Alex" };
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name,student_name")
      .eq("id", user.id)
      .maybeSingle<ProfileRow>();

    return {
      isRegistered: true,
      studentName:
        profile?.student_name ??
        profile?.display_name ??
        user.email?.split("@")[0] ??
        "Alex",
    };
  } catch {
    return { isRegistered: false, studentName: "Alex" };
  }
}

export default async function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  const { subject: subjectSlug } = await params;
  const subject = getSubjectPathway(subjectSlug);

  if (!subject) {
    notFound();
  }

  if (subject.slug === "mathematics") {
    const mathViewer = await getMathViewer();

    return (
      <MathematicsAdventurePage
        isRegistered={mathViewer.isRegistered}
        studentName={mathViewer.studentName}
      />
    );
  }

  return (
    <PageLayout
      eyebrow="Subject Pathway"
      title={subject.title}
      description={subject.description}
      heroTone="yellow"
    >
      <PageSection>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button href="/subjects" variant="secondary">
            Back to Subjects
          </Button>
          <div className="flex flex-wrap gap-2">
            {difficultyLevels.map((level) => (
              <a
                key={level}
                href={`#${level.toLowerCase()}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-black text-ink shadow-sm transition hover:text-sky focus:outline-none focus:ring-4 focus:ring-sky/25"
              >
                {level}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {difficultyLevels.map((level) => {
            const topics = subject.topics.filter((topic) => topic.level === level);

            return (
              <section key={level} id={level.toLowerCase()} aria-labelledby={`${level}-heading`}>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className={typography.eyebrow}>{level}</p>
                    <h2 id={`${level}-heading`} className={typography.h2}>
                      {level} Topics
                    </h2>
                  </div>
                  <span className="rounded-full bg-cloud px-4 py-2 text-sm font-black text-ink">
                    {topics.length} topics
                  </span>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {topics.map((topic) => (
                    <TopicCard key={`${level}-${topic.name}`} topic={topic} tone={levelTone[level]} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </PageSection>
    </PageLayout>
  );
}

function TopicCard({
  topic,
  tone,
}: {
  topic: SubjectTopic;
  tone: "blue" | "yellow" | "purple";
}) {
  return (
    <Card tone="white" className="h-full">
      <span className={`inline-flex rounded-full px-3 py-1 text-sm font-black ${
        tone === "blue"
          ? "bg-sky/15 text-sky"
          : tone === "yellow"
            ? "bg-sunshine/70 text-ink"
            : "bg-purple/15 text-purple"
      }`}>
        {topic.level}
      </span>
      <h2 className={`${typography.h3} mt-4`}>{topic.name}</h2>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <Stat label="Games" value={topic.games} />
        <Stat label="Quizzes" value={topic.quizzes} />
        <Stat label="Assessments" value={topic.assessments} />
      </div>

      <div className="mt-5 space-y-3">
        <ResourceRow label="Game" title={topic.gameTitle} href={topic.gameHref} />
        <ResourceRow label="Quiz" title={topic.quizTitle} />
        <ResourceRow label="Assessment" title={topic.assessmentTitle} />
      </div>

      {topic.gameHref ? (
        <Button href={topic.gameHref} variant="blue" className="mt-5 w-full">
          Start Learning
        </Button>
      ) : (
        <span className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cloud px-6 py-3 text-base font-extrabold text-ink/60">
          Coming Soon
        </span>
      )}
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-cloud px-3 py-3">
      <p className="text-2xl font-black text-ink">{value}</p>
      <p className="text-xs font-black uppercase text-ink/60">{label}</p>
    </div>
  );
}

function ResourceRow({
  label,
  title,
  href,
}: {
  label: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white px-4 py-3">
      <p className="text-xs font-black uppercase text-ink/50">{label}</p>
      {href ? (
        <a
          href={href}
          className="mt-1 inline-flex rounded-full text-sm font-black text-sky hover:underline focus:outline-none focus:ring-4 focus:ring-sky/25"
        >
          {title}
        </a>
      ) : (
        <p className="mt-1 text-sm font-black text-ink">
          {title} <span className="text-ink/50">(Coming Soon)</span>
        </p>
      )}
    </div>
  );
}