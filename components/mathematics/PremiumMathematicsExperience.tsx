import Image from "next/image";
import Link from "next/link";
import {
  activityTopics,
  mathDashboardStats,
  missionChecklist,
  premiumActivities,
  premiumBenefits,
  premiumLearningWorlds,
  type LearningWorld,
  type PremiumActivity,
} from "@/data/mathematics-premium";

type PremiumMathematicsExperienceProps = {
  studentName: string;
};

export function PremiumMathematicsExperience({
  studentName,
}: PremiumMathematicsExperienceProps) {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <DashboardHeader />
        <HeroDashboard studentName={studentName} />
      </section>

      <section id="worlds" className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <SectionHeader
          eyebrow="Learning Worlds"
          title="Your Learning Adventure"
          description="Explore worlds, earn stars, and unlock new activities step by step."
        />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {premiumLearningWorlds.map((world) => (
            <LearningWorldCard key={world.id} world={world} />
          ))}
        </div>
      </section>

      <section id="activities" className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <SectionHeader
              eyebrow="All Activities"
              title="20 Activities Across 5 Levels"
              description="Paid learners can open every activity, track progress, and resume learning."
            />
            <select
              className="w-full rounded-full border border-[#DDE8F5] bg-white px-4 py-3 text-sm font-black text-[#082B80] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 sm:w-56"
              defaultValue="All Topics"
              aria-label="Topic filter"
            >
              {activityTopics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <DifficultyFilter />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {premiumActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] bg-[#EAF6FF] p-5 md:grid-cols-2 lg:grid-cols-4">
          {premiumBenefits.map((benefit) => (
            <article key={benefit.title} className="rounded-[1.25rem] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black">{benefit.title}</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="game-preview" className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <GameQuestionCard />
        <ExplanationNotesPanel />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <CurriculumAlignmentCard />
      </section>
    </main>
  );
}

export function DashboardHeader() {
  const navItems = [
    { label: "Worlds", href: "#worlds" },
    { label: "Activities", href: "#activities" },
    { label: "Game Preview", href: "#game-preview" },
    { label: "Rewards", href: "#benefits" },
    { label: "Parents", href: "#parents" },
  ];

  return (
    <header className="mb-5 rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/learnplay-academy-logo.png"
            alt="LearnPlay Academy logo"
            width={58}
            height={58}
            className="h-14 w-14 rounded-2xl object-contain"
            priority
          />
          <div>
            <p className="text-xl font-black">
              LearnPlay Mathematics<span aria-hidden="true">&trade;</span>
            </p>
            <p className="text-sm font-black text-[#0B63F6]">
              Learn &bull; Play &bull; Master
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Mathematics page navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-black text-[#082B80] transition hover:bg-[#EEF7FF] hover:text-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#FFF3C4] px-4 py-2 text-sm font-black">
            1250 stars
          </span>
          <span className="rounded-full bg-[#EEF7FF] px-4 py-2 text-sm font-black text-[#0B63F6]">
            Notifications
          </span>
          <Image
            src="/assets/math-premium/dashboard-hero.png"
            alt="Student avatar"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}

function HeroDashboard({ studentName }: { studentName: string }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white shadow-playful">
      <div className="grid gap-0 lg:grid-cols-[1.3fr_0.9fr]">
        <ProgressCard studentName={studentName} />
        <MissionCard />
      </div>
    </section>
  );
}

export function ProgressCard({ studentName }: { studentName: string }) {
  return (
    <article className="relative overflow-hidden bg-gradient-to-br from-[#0B63F6] via-[#3B5BFF] to-[#8B5CF6] p-6 text-white md:p-8">
      <div className="absolute bottom-0 left-0 h-24 w-full rounded-t-[70%] bg-[#22C55E]/20" />
      <div className="relative grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
        <Image
          src="/assets/math-premium/dashboard-hero.png"
          alt="Happy student mascot"
          width={180}
          height={210}
          className="mx-auto h-52 w-44 object-contain"
          priority
        />
        <div>
          <p className="text-lg font-black">Welcome back,</p>
          <h1 className="text-5xl font-black leading-tight md:text-6xl">
            {studentName || "Alex"}!
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-black">
              Level 12 Explorer
            </span>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-black">
              Progress 68%
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {mathDashboardStats.map((stat) => (
              <StatBadge key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
          <div className="mt-5 rounded-2xl bg-white p-4 text-[#082B80]">
            <div className="flex items-center justify-between text-sm font-black">
              <span>Your Progress</span>
              <span>68%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#EAF6FF]">
              <div className="h-full w-[68%] rounded-full bg-[#22C55E]" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/95 px-4 py-4 text-center text-[#082B80]">
      <p className="text-2xl font-black">{value}</p>
      <p className="text-xs font-black uppercase text-[#5B6B94]">{label}</p>
    </div>
  );
}

export function MissionCard() {
  return (
    <article className="flex h-full flex-col justify-center bg-white p-6 md:p-8">
      <div className="rounded-[1.75rem] border border-[#8B5CF6]/30 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-black">Today&apos;s Mission</h2>
        <div className="mt-4 space-y-3">
          {missionChecklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-[#F8FBFF] px-4 py-3">
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
                item.complete ? "bg-[#22C55E] text-white" : "bg-white text-[#5B6B94] ring-1 ring-[#DDE8F5]"
              }`}>
                {item.complete ? "OK" : ""}
              </span>
              <span className="text-sm font-black">{item.label}</span>
            </div>
          ))}
        </div>
        <Link
          href="#activities"
          className="mt-5 flex min-h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#0B63F6] px-5 py-4 text-center font-black text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
        >
          Reward: 50 Stars
        </Link>
      </div>
    </article>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-black leading-tight text-[#082B80] md:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-base font-bold leading-7 text-[#5B6B94]">
        {description}
      </p>
    </div>
  );
}

export function LearningWorldCard({ world }: { world: LearningWorld }) {
  const href = world.locked ? "/register" : "#activities";

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-[#DDE8F5] transition hover:-translate-y-1 hover:shadow-playful focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
    >
      <div className="relative aspect-[4/3]">
        <Image src={world.imageSrc} alt={world.imageAlt} fill sizes="240px" className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-black uppercase text-[#5B6B94]">{world.level}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-black ${world.locked ? "bg-[#EEF7FF] text-[#5B6B94]" : "bg-[#22C55E] text-white"}`}>
            {world.locked ? "Locked" : "Open"}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-black">{world.name}</h3>
        <p className="mt-1 text-sm font-bold text-[#5B6B94]">{world.year}</p>
        <p className="mt-2 min-h-12 text-sm font-bold leading-6 text-[#5B6B94]">
          {world.description}
        </p>
        <div className="mt-3 flex items-center justify-between text-sm font-black">
          <span>{world.progress}%</span>
          <span>{world.stars} stars</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#EAF6FF]">
          <div className="h-full rounded-full bg-[#FFC83D]" style={{ width: `${world.progress}%` }} />
        </div>
      </div>
    </Link>
  );
}

export function DifficultyFilter() {
  const filters = ["All (20)", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-label="Activity level filters">
      {filters.map((filter, index) => (
        <a
          key={filter}
          href="#activities"
          className={`rounded-xl px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
            index === 0
              ? "bg-[#0B63F6] text-white"
              : "bg-[#EEF7FF] text-[#082B80] hover:bg-[#DDEBFF]"
          }`}
        >
          {filter}
        </a>
      ))}
    </div>
  );
}

export function ActivityCard({ activity }: { activity: PremiumActivity }) {
  const href = activity.locked ? "/register" : "#game-preview";

  return (
    <Link
      href={href}
      className={`group block overflow-hidden rounded-[1.5rem] border border-[#DDE8F5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-playful focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${activity.locked ? "opacity-80" : ""}`}
    >
      <div className="relative aspect-[4/3]">
        <Image src={activity.imageSrc} alt={activity.imageAlt} fill sizes="220px" className="object-cover" />
        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E] text-sm font-black text-white shadow-sm">
          {activity.number}
        </span>
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#EEF7FF] px-3 py-2 text-xs font-black text-[#0B63F6]">
            Level {activity.level}
          </span>
          <span className="text-xs font-black text-[#5B6B94]">
            {activity.locked ? "Locked" : `${activity.progress}%`}
          </span>
        </div>
        <h3 className="min-h-12 text-lg font-black leading-6">{activity.title}</h3>
        <StarRating value={activity.rating} />
        <div className="mt-4 flex items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#EAF6FF]">
            <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${activity.progress}%` }} />
          </div>
          <span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${
            activity.locked ? "bg-[#EEF7FF] text-[#5B6B94]" : "bg-[#22C55E] text-white"
          }`}>
            {activity.locked ? "L" : "P"}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="mt-2 flex gap-1 text-sm text-[#FFC83D]" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= value ? "opacity-100" : "opacity-30"}>
          *
        </span>
      ))}
    </div>
  );
}

export function GameQuestionCard() {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white shadow-playful">
      <div className="flex flex-col gap-3 bg-gradient-to-r from-[#0B63F6] to-[#082B80] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black">Level 2 - Mountain World</p>
          <h2 className="text-3xl font-black">Addition Quest</h2>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-black">
          <span>Stars +10</span>
          <span>Score 20</span>
        </div>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr_180px]">
        <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-[#EAF6FF]">
          <Image src="/assets/math-premium/addition-question.png" alt="Blue and yellow birds addition question" fill sizes="420px" className="object-cover" />
        </div>
        <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-[#DDE8F5]">
          <p className="text-2xl font-black leading-9">
            If there are 7 blue birds and 5 yellow birds, how many birds are there altogether?
          </p>
          <div className="mt-5 grid gap-3">
            {["10", "11", "12", "13"].map((answer) => (
              <button
                key={answer}
                type="button"
                className={`rounded-2xl border px-5 py-4 text-left font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
                  answer === "12"
                    ? "border-[#22C55E] bg-[#22C55E]/15 text-[#15803D]"
                    : "border-[#DDE8F5] bg-white text-[#082B80] hover:bg-[#EEF7FF]"
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-3">
          <ActionButton label="Hint" />
          <ActionButton label="Explanation" />
          <ActionButton label="Voice" />
        </div>
      </div>
    </article>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <a
      href="#explanation-notes"
      className="rounded-2xl border border-[#DDE8F5] bg-white px-4 py-4 text-center text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EEF7FF] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
    >
      {label}
    </a>
  );
}

export function ExplanationNotesPanel() {
  return (
    <article id="explanation-notes" className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful">
      <h2 className="text-3xl font-black">Step-by-Step Explanation</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Explanation note tabs">
        {["Hint", "Steps", "Visual", "Voice", "Parent Tip"].map((tab, index) => (
          <a
            key={tab}
            href="#explanation-notes"
            className={`rounded-xl px-4 py-2 text-sm font-black focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
              index === 1 ? "bg-[#0B63F6] text-white" : "bg-[#EEF7FF] text-[#082B80]"
            }`}
          >
            {tab}
          </a>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1fr_0.8fr]">
        <div className="rounded-[1.5rem] bg-[#EEF7FF] p-5">
          <p className="font-black">Hint</p>
          <p className="mt-2 text-sm font-bold text-[#5B6B94]">Think about counting forward.</p>
          <p className="mt-4 font-black">Steps</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            We add 7 and 5. Start with 7. Count 5 more: 8, 9, 10, 11, 12. So, 7 + 5 = 12.
          </p>
          <p className="mt-4 rounded-xl bg-white px-3 py-2 text-sm font-black">Answer: 12</p>
        </div>
        <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-[#DDE8F5]">
          <Image src="/assets/math-premium/explanation-visual.png" alt="Visual explanation showing 7 plus 5 equals 12" fill sizes="420px" className="object-cover" />
        </div>
        <div id="parents" className="rounded-[1.5rem] bg-[#FFF3C4] p-5">
          <p className="font-black">Parent Tip</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#082B80]">
            Encourage counting-on strategies. It helps build strong number sense.
          </p>
          <Image src="/assets/math-premium/learnbot-helper.png" alt="LearnBot helper mascot" width={160} height={120} className="mx-auto mt-5 h-32 w-40 object-contain" />
        </div>
      </div>
    </article>
  );
}

export function DemoGamesSection() {
  return null;
}

export function CurriculumAlignmentCard() {
  return (
    <aside className="rounded-[1.5rem] border border-[#DDE8F5] bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-[#0B63F6]">Curriculum Alignment</p>
      <h2 className="mt-2 text-2xl font-black">
        Aligned with Malaysian KSSR, Cambridge Primary and International Best Practices.
      </h2>
      <p className="mx-auto mt-2 max-w-3xl text-sm font-bold leading-6 text-[#5B6B94]">
        LearnPlay combines trusted curriculum standards into one adaptive learning adventure.
      </p>
    </aside>
  );
}