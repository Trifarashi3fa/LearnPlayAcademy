import { Button } from "@/components/Button";
import { SubjectCard } from "@/components/SubjectCard";

const subjects = [
  {
    title: "Mathematics",
    description: "Number puzzles, quick quizzes, and playful problem solving.",
    icon: "123",
    color: "bg-sunshine",
  },
  {
    title: "English",
    description: "Vocabulary, spelling, and reading practice through games.",
    icon: "ABC",
    color: "bg-mint/80",
  },
  {
    title: "Science",
    description: "Curious experiments and facts for young explorers.",
    icon: "SCI",
    color: "bg-sky/20",
  },
];

export default function Home() {
  return (
    <main>
      <section className="overflow-hidden bg-[#fff7d8]">
        <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-5 py-14 sm:min-h-[620px] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-lg font-black text-coral">Play. Learn. Grow.</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight text-ink sm:text-6xl lg:text-7xl">
              LearnPlay Academy
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-ink/75">
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
          <div className="relative min-h-[360px]">
            <div className="absolute left-3 top-2 h-28 w-28 rounded-full bg-coral/90" />
            <div className="absolute right-0 top-10 h-24 w-24 rounded-3xl bg-mint" />
            <div className="absolute bottom-2 left-8 h-20 w-20 rounded-2xl bg-sky" />
            <div className="absolute inset-x-5 top-20 rounded-lg bg-white p-6 shadow-playful">
              <div className="rounded-lg bg-[#eff8ff] p-5">
                <p className="text-sm font-black uppercase tracking-wide text-sky">
                  Today&apos;s quest
                </p>
                <h2 className="mt-2 text-3xl font-black text-ink">
                  Solve 5 math puzzles
                </h2>
                <div className="mt-5 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <span
                      key={item}
                      className="grid aspect-square place-items-center rounded-2xl bg-white text-xl font-black text-coral shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-sunshine/70 p-4">
                  <p className="text-sm font-black text-ink/60">Streak</p>
                  <p className="text-3xl font-black text-ink">7 days</p>
                </div>
                <div className="rounded-lg bg-mint/50 p-4">
                  <p className="text-sm font-black text-ink/60">Stars</p>
                  <p className="text-3xl font-black text-ink">42</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-black text-coral">Subject previews</p>
            <h2 className="text-4xl font-black text-ink">Learning that feels active</h2>
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
      </section>

      <section className="bg-[#eaf7ff]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-1">
            <p className="font-black text-sky">For parents</p>
            <h2 className="mt-2 text-4xl font-black text-ink">
              Skill practice without the daily tug-of-war
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
            {[
              "Short, focused activities",
              "School-friendly subjects",
              "Reward moments that motivate",
            ].map((benefit) => (
              <div key={benefit} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-xl font-black text-ink">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
