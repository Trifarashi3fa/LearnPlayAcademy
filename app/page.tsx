import Image from "next/image";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageSection } from "@/components/PageLayout";
import { SubjectCard } from "@/components/SubjectCard";
import { typography } from "@/components/theme";

const subjects = [
  {
    title: "Mathematics",
    description: "Number puzzles, quick quizzes, and playful problem solving.",
    icon: "123",
    tone: "yellow" as const,
  },
  {
    title: "English",
    description: "Vocabulary, spelling, and reading practice through games.",
    icon: "ABC",
    tone: "green" as const,
  },
  {
    title: "Science",
    description: "Curious experiments and facts for young explorers.",
    icon: "SCI",
    tone: "blue" as const,
  },
];

export default function Home() {
  return (
    <main>
      <section className="overflow-hidden bg-[#FFF6D8]">
        <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-5 py-14 sm:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className={typography.eyebrow}>Play. Learn. Grow.</p>
            <h1 className={`mt-4 max-w-3xl ${typography.display}`}>
              LearnPlay Academy
            </h1>
            <p className={`mt-6 max-w-2xl ${typography.body}`}>
              Bright, game-inspired lessons for children aged 7 to 12, with
              simple progress moments parents can feel good about.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/subjects">Start Learning</Button>
              <Button href="/games" variant="secondary">
                Try Demo Game
              </Button>
            </div>
          </div>
          <div className="relative min-h-[390px]">
            <div className="absolute left-2 top-4 h-24 w-24 rounded-full bg-coral/80" />
            <div className="absolute right-0 top-12 h-24 w-24 rounded-3xl bg-mint" />
            <div className="absolute bottom-4 left-8 h-20 w-20 rounded-3xl bg-purple" />
            <Card className="absolute inset-x-4 top-10 text-center shadow-playful" tone="white">
              <Image
                src="/learnplay-academy-logo.png"
                alt="LearnPlay Academy logo"
                width={280}
                height={280}
                className="mx-auto h-52 w-52 object-contain sm:h-64 sm:w-64"
                priority
              />
              <div className="mt-4 grid grid-cols-2 gap-4 text-left">
                <Card tone="yellow" className="p-4">
                  <p className="text-sm font-black text-ink/60">Streak</p>
                  <p className="text-3xl font-black text-ink">7 days</p>
                </Card>
                <Card tone="green" className="p-4">
                  <p className="text-sm font-black text-ink/60">Stars</p>
                  <p className="text-3xl font-black text-ink">42</p>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <PageSection>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={typography.eyebrow}>Subject previews</p>
            <h2 className={typography.h2}>Learning that feels active</h2>
          </div>
          <Button href="/subjects" variant="secondary" className="sm:self-center">
            See all subjects
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.title} {...subject} />
          ))}
        </div>
      </PageSection>

      <section className="bg-cloud">
        <PageSection className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="font-black text-sky">For parents</p>
            <h2 className={`mt-2 ${typography.h2}`}>
              Skill practice without the daily tug-of-war
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
            {[
              "Short, focused activities",
              "School-friendly subjects",
              "Reward moments that motivate",
            ].map((benefit) => (
              <Card key={benefit}>
                <p className="text-xl font-black text-ink">{benefit}</p>
              </Card>
            ))}
          </div>
        </PageSection>
      </section>
    </main>
  );
}
