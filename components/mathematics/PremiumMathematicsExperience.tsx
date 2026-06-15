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
      <section className="mx-auto max-w-[1500px] px-4 py-6 lg:px-6">
        <div className="grid gap-5 xl:grid-cols-[0.56fr_0.44fr]">
          <div className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white shadow-playful">
            <DashboardHeader />
            <div className="grid gap-5 bg-gradient-to-br from-[#EAF6FF] via-white to-[#DFF3FF] p-5 lg:grid-cols-[0.95fr_1.05fr]">
              <ProgressCard studentName={studentName} />
              <MissionCard />
            </div>
            <section className="p-5">
              <div className="mb-4">
                <h2 className="text-2xl font-black">Your Learning Adventure</h2>
                <p className="text-sm font-bold text-[#5B6B94]">Explore worlds and level up!</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {premiumLearningWorlds.map((world) => (
                  <LearningWorldCard key={world.id} world={world} />
                ))}
              </div>
            </section>
            <section className="px-5 pb-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black">All Activities (20)</h2>
                  <p className="text-sm font-bold text-[#5B6B94]">Learn, play and master math skills!</p>
                </div>
                <Link
                  href="#all-premium-activities"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-black text-[#0B63F6] shadow-sm ring-1 ring-[#DDE8F5] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
                >
                  View All
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {premiumActivities.slice(0, 5).map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} compact />
                ))}
                <article className="flex min-h-[170px] flex-col items-center justify-center rounded-[1.25rem] border border-[#DDE8F5] bg-white p-4 text-center shadow-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EEF7FF] text-3xl font-black text-[#8B5CF6]">
                    +20
                  </div>
                  <p className="mt-3 text-sm font-black">See All 20 Activities</p>
                </article>
              </div>
            </section>
            <section className="px-5 pb-5">
              <div className="grid gap-3 rounded-[1.5rem] bg-[#EAF6FF] p-4 sm:grid-cols-2 lg:grid-cols-4">
                {premiumBenefits.map((benefit) => (
                  <div key={benefit.title} className="rounded-2xl bg-white/70 p-3">
                    <p className="text-sm font-black">{benefit.title}</p>
                    <p className="text-xs font-bold text-[#5B6B94]">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section id="all-premium-activities" className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-3xl font-black">All Activities</h2>
                <p className="text-sm font-bold text-[#5B6B94]">20 exciting activities across 5 levels</p>
              </div>
              <select className="rounded-full border border-[#DDE8F5] bg-white px-4 py-3 text-sm font-black text-[#082B80] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25" defaultValue="All Topics" aria-label="Topic filter">
                {activityTopics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </div>
            <DifficultyFilter />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {premiumActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-5 px-4 pb-8 lg:grid-cols-[0.54fr_0.46fr] lg:px-6">
        <GameQuestionCard />
        <ExplanationNotesPanel />
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-10 lg:px-6">
        <CurriculumAlignmentCard />
      </section>
    </main>
  );
}

export function DashboardHeader() {
  const navItems = ["Home", "Subjects", "Games", "Progress", "Rewards", "Parents"];

  return (
    <header className="grid gap-4 border-b border-[#DDE8F5] bg-white p-4 lg:grid-cols-[auto_1fr_auto] lg:items-center">
      <div className="flex items-center gap-3">
        <Image
          src="/learnplay-academy-logo.png"
          alt="LearnPlay Academy logo"
          width={54}
          height={54}
          className="h-14 w-14 rounded-2xl object-contain"
          priority
        />
        <div>
          <p className="text-xl font-black">LearnPlay Mathematics<span aria-hidden="true">&trade;</span></p>
          <p className="text-sm font-black text-[#0B63F6]">Learn &bull; Play &bull; Master</p>
        </div>
      </div>
      <nav className="flex flex-wrap justify-start gap-2 lg:justify-center" aria-label="Premium mathematics navigation">
        {navItems.map((item) => (
          <a
            key={item}
            href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
            className={`rounded-2xl px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
              item === "Subjects"
                ? "bg-[#0B63F6] text-white"
                : "text-[#082B80] hover:bg-[#EEF7FF]"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-[#FFF3C4] px-4 py-2 text-sm font-black">1250 stars</div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF7FF] font-black text-[#0B63F6]">!</div>
        <Image
          src="/assets/math-premium/dashboard-hero.png"
          alt="Student avatar"
          width={52}
          height={52}
          className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
        />
      </div>
    </header>
  );
}

export function ProgressCard({ studentName }: { studentName: string }) {
  return (
    <article className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#0B63F6] to-[#8B5CF6] p-5 text-white">
      <div className="absolute bottom-0 left-0 h-20 w-full rounded-t-[70%] bg-[#22C55E]/25" />
      <div className="relative grid gap-4 sm:grid-cols-[150px_1fr] sm:items-center">
        <Image
          src="/assets/math-premium/dashboard-hero.png"
          alt="Happy student mascot"
          width={150}
          height={180}
          className="mx-auto h-44 w-36 object-contain"
          priority
        />
        <div>
          <p className="text-lg font-black">Welcome back,</p>
          <h1 className="text-5xl font-black leading-none">{studentName || "Alex"}!</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-black">Level 12 Explorer</span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-black">Progress 68%</span>
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
    <div className="rounded-2xl bg-white/95 px-3 py-3 text-center text-[#082B80]">
      <p className="text-xl font-black">{value}</p>
      <p className="text-xs font-black">{label}</p>
    </div>
  );
}

export function MissionCard() {
  return (
    <article className="rounded-[1.5rem] border border-[#8B5CF6]/30 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Today&apos;s Mission</h2>
      <div className="mt-4 space-y-3">
        {missionChecklist.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-[#F8FBFF] px-3 py-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-md text-sm font-black ${
              item.complete ? "bg-[#22C55E] text-white" : "bg-white text-[#5B6B94] ring-1 ring-[#DDE8F5]"
            }`}>
              {item.complete ? "OK" : ""}
            </span>
            <span className="text-sm font-black">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#0B63F6] px-4 py-4 text-white">
        <p className="text-sm font-black">Reward: 50 Stars</p>
      </div>
    </article>
  );
}

export function LearningWorldCard({ world }: { world: LearningWorld }) {
  return (
    <article className="relative overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-[#DDE8F5]">
      <div className="relative h-36">
        <Image src={world.imageSrc} alt={world.imageAlt} fill sizes="180px" className="object-cover" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-black text-[#5B6B94]">{world.level}</p>
          <span className={`rounded-full px-2 py-1 text-[11px] font-black ${world.locked ? "bg-[#EEF7FF] text-[#5B6B94]" : "bg-[#22C55E] text-white"}`}>
            {world.locked ? "Locked" : "Open"}
          </span>
        </div>
        <h3 className="mt-1 text-base font-black">{world.name}</h3>
        <p className="mt-1 text-xs font-bold text-[#5B6B94]">{world.year}</p>
        <div className="mt-3 flex items-center justify-between text-xs font-black">
          <span>{world.progress}%</span>
          <span>{world.stars} stars</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#EAF6FF]">
          <div className="h-full rounded-full bg-[#FFC83D]" style={{ width: `${world.progress}%` }} />
        </div>
      </div>
    </article>
  );
}

export function DifficultyFilter() {
  const filters = ["All (20)", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-label="Activity level filters">
      {filters.map((filter, index) => (
        <button
          key={filter}
          type="button"
          className={`rounded-xl px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
            index === 0
              ? "bg-[#0B63F6] text-white"
              : "bg-[#EEF7FF] text-[#082B80] hover:bg-[#DDEBFF]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export function ActivityCard({
  activity,
  compact = false,
}: {
  activity: PremiumActivity;
  compact?: boolean;
}) {
  return (
    <article className={`group overflow-hidden rounded-[1.25rem] border border-[#DDE8F5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-playful ${activity.locked ? "opacity-75" : ""}`}>
      <div className={compact ? "relative h-24" : "relative h-28"}>
        <Image src={activity.imageSrc} alt={activity.imageAlt} fill sizes="180px" className="object-cover" />
        <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#22C55E] text-xs font-black text-white">
          {activity.number}
        </span>
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#EEF7FF] px-2 py-1 text-[11px] font-black text-[#0B63F6]">
            Level {activity.level}
          </span>
          <span className="text-[11px] font-black text-[#5B6B94]">
            {activity.locked ? "Locked" : `${activity.progress}%`}
          </span>
        </div>
        <h3 className="min-h-10 text-sm font-black leading-5">{activity.title}</h3>
        <StarRating value={activity.rating} />
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EAF6FF]">
            <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${activity.progress}%` }} />
          </div>
          <button
            type="button"
            disabled={activity.locked}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#22C55E]/25 ${
              activity.locked
                ? "bg-[#EEF7FF] text-[#5B6B94]"
                : "bg-[#22C55E] text-white hover:scale-105"
            }`}
            aria-label={`${activity.locked ? "Locked" : "Play"} ${activity.title}`}
          >
            {activity.locked ? "L" : "P"}
          </button>
        </div>
      </div>
    </article>
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
    <article id="games" className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white shadow-playful">
      <div className="flex flex-col gap-3 bg-gradient-to-r from-[#0B63F6] to-[#082B80] p-4 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black">Level 2 - Mountain World</p>
          <h2 className="text-2xl font-black">Addition Quest</h2>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-black">
          <span>Stars +10</span>
          <span>Score 20</span>
        </div>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-[0.95fr_1fr_0.6fr]">
        <div className="relative min-h-48 overflow-hidden rounded-[1.25rem] bg-[#EAF6FF]">
          <Image src="/assets/math-premium/addition-question.png" alt="Blue and yellow birds addition question" fill sizes="420px" className="object-cover" />
        </div>
        <div className="rounded-[1.25rem] bg-white p-4 shadow-sm ring-1 ring-[#DDE8F5]">
          <p className="text-xl font-black leading-8">
            If there are 7 blue birds and 5 yellow birds, how many birds are there altogether?
          </p>
          <div className="mt-4 grid gap-2">
            {["10", "11", "12", "13"].map((answer) => (
              <button
                key={answer}
                type="button"
                className={`rounded-2xl border px-4 py-3 text-left font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
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
    <button
      type="button"
      className="rounded-2xl border border-[#DDE8F5] bg-white px-4 py-4 text-sm font-black shadow-sm transition hover:-translate-y-0.5 hover:bg-[#EEF7FF] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
    >
      {label}
    </button>
  );
}

export function ExplanationNotesPanel() {
  return (
    <article id="progress" className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful">
      <h2 className="text-2xl font-black">Step-by-Step Explanation</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Explanation note tabs">
        {["Hint", "Steps", "Visual", "Voice", "Parent Tip"].map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`rounded-xl px-4 py-2 text-sm font-black focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
              index === 1 ? "bg-[#0B63F6] text-white" : "bg-[#EEF7FF] text-[#082B80]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1fr_0.8fr]">
        <div className="rounded-[1.25rem] bg-[#EEF7FF] p-4">
          <p className="font-black">Hint</p>
          <p className="mt-2 text-sm font-bold text-[#5B6B94]">Think about counting forward.</p>
          <p className="mt-4 font-black">Steps</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            We add 7 and 5. Start with 7. Count 5 more: 8, 9, 10, 11, 12. So, 7 + 5 = 12.
          </p>
          <p className="mt-4 rounded-xl bg-white px-3 py-2 text-sm font-black">Answer: 12</p>
        </div>
        <div className="relative min-h-52 overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-[#DDE8F5]">
          <Image src="/assets/math-premium/explanation-visual.png" alt="Visual explanation showing 7 plus 5 equals 12" fill sizes="420px" className="object-cover" />
        </div>
        <div className="rounded-[1.25rem] bg-[#FFF3C4] p-4">
          <p className="font-black">Parent Tip</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#082B80]">
            Encourage counting-on strategies. It helps build strong number sense.
          </p>
          <Image src="/assets/math-premium/learnbot-helper.png" alt="LearnBot helper mascot" width={130} height={100} className="mx-auto mt-4 h-24 w-32 object-contain" />
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
    <aside id="parents" className="rounded-[1.5rem] border border-[#DDE8F5] bg-white p-5 text-center shadow-sm">
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