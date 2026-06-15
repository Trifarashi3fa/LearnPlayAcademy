import { Button } from "@/components/Button";
import {
  guestHowItWorks,
  mathBadges,
  mathGames,
  mathLevels,
  recentAchievements,
  registeredGameProgress,
  registeredQuestionPreview,
  type MathGame,
  type MathLevel,
} from "@/data/mathematics-adventure";

type MathematicsAdventurePageProps = {
  isRegistered: boolean;
  studentName?: string;
};

export function MathematicsAdventurePage({
  isRegistered,
  studentName = "Alex",
}: MathematicsAdventurePageProps) {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      {isRegistered ? (
        <RegisteredMathExperience studentName={studentName} />
      ) : (
        <GuestMathExperience />
      )}
    </main>
  );
}

function GuestMathExperience() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#EAF6FF]">
        <PlayfulBackground />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-18">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-black uppercase text-[#FF4FB8] shadow-sm">
              Mathematics Adventure
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#082B80] sm:text-6xl">
              Learn Math. Play. Grow. Shine!
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-extrabold leading-8 text-[#5B6B94]">
              Fun math games for Year 1 to Year 6. Start your learning adventure today!
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#free-games" variant="blue">
                Try Free Games
              </Button>
              <Button href="#how-it-works" variant="secondary">
                How It Works
              </Button>
              <Button href="/login" variant="purple">
                Login / Register
              </Button>
            </div>
          </div>
          <MathHeroScene />
        </div>
      </section>

      <section id="free-games" className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
              Free demo content
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#082B80] sm:text-4xl">
              Try 5 Year 1 to Year 3 Math Games
            </h2>
          </div>
          <span className="rounded-full bg-[#EEF7FF] px-4 py-2 text-sm font-black text-[#0B63F6]">
            Limited demo access
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {mathGames.map((game) => (
            <GuestGameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
        <div className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-playful md:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#14B8A6]">
                Unlock the full journey
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#082B80]">
                Register to unlock more games, track your progress and get full access!
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href="/register" variant="green">
                Register Now
              </Button>
              <Button href="/login" variant="secondary">
                I Already Have an Account
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#EEF7FF]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
                Preview every stage
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#082B80] sm:text-4xl">
                5 Difficulty Levels
              </h2>
            </div>
            <p className="max-w-xl text-base font-bold leading-7 text-[#5B6B94]">
              Guest users can preview all levels visually and play limited demo content.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {mathLevels.map((level) => (
              <GuestLevelCard key={level.level} level={level} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {guestHowItWorks.map((item, index) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFC83D] text-xl font-black text-[#082B80]">
                {index + 1}
              </span>
              <h2 className="mt-5 text-2xl font-black text-[#082B80]">{item.title}</h2>
              <p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#0B63F6] p-8 text-center text-white shadow-playful">
          <p className="text-lg font-black">Start your math adventure now!</p>
          <div className="mt-5 flex justify-center">
            <Button href="/register" variant="secondary">
              Register Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function RegisteredMathExperience({ studentName }: { studentName: string }) {
  return (
    <>
      <section className="bg-[#EAF6FF]">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-playful md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full bg-[#14B8A6]/15 px-4 py-2 text-sm font-black uppercase text-[#0F766E]">
                  Registered learner dashboard
                </p>
                <h1 className="mt-5 text-4xl font-black leading-tight text-[#082B80] sm:text-5xl">
                  Welcome back, {studentName}!
                </h1>
                <p className="mt-4 max-w-2xl text-lg font-extrabold leading-8 text-[#5B6B94]">
                  Continue your Year 1 to Year 6 math journey with rewards, explanations, and progress you can see.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <StatTile label="Coins" value="240" icon="$" tone="yellow" />
                <StatTile label="Stars" value="86" icon="*" tone="pink" />
                <div className="rounded-[1.5rem] bg-[#EEF7FF] p-5 sm:col-span-2">
                  <label htmlFor="math-year" className="text-sm font-black uppercase text-[#5B6B94]">
                    Year selector
                  </label>
                  <select
                    id="math-year"
                    defaultValue="Year 3"
                    className="mt-3 w-full rounded-full border border-[#DDE8F5] bg-white px-4 py-3 text-base font-black text-[#082B80] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
                  >
                    {["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6"].map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.5rem] bg-[#EEF7FF] p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#FFC83D] text-3xl font-black text-[#082B80]">
                    {studentName.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase text-[#5B6B94]">User avatar</p>
                    <p className="text-xl font-black text-[#082B80]">Math Adventurer</p>
                  </div>
                </div>
                <div className="mt-5">
                  <ProgressBar label="Overall progress" value={68} colorClass="bg-[#0B63F6]" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <article className="rounded-[1.5rem] bg-[#FFF3C4] p-5">
                  <p className="text-sm font-black uppercase text-[#5B6B94]">Daily learning goal</p>
                  <p className="mt-2 text-3xl font-black text-[#082B80]">10 min</p>
                  <p className="mt-2 text-sm font-bold text-[#5B6B94]">6 minutes completed today</p>
                </article>
                <article className="rounded-[1.5rem] bg-[#F3E8FF] p-5">
                  <p className="text-sm font-black uppercase text-[#5B6B94]">Badges / rewards</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {mathBadges.map((badge) => (
                      <span key={badge} className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#082B80]">
                        {badge}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
              Continue Learning
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#082B80] sm:text-4xl">
              Pick up where you stopped
            </h2>
          </div>
          <article className="rounded-[2rem] border border-[#DDE8F5] bg-[#EEF7FF] p-6">
            <p className="text-sm font-black uppercase text-[#5B6B94]">Recommended next</p>
            <h3 className="mt-2 text-2xl font-black text-[#082B80]">Add It Up - Level 3</h3>
            <p className="mt-2 text-base font-bold text-[#5B6B94]">
              Practice addition facts and earn more stars.
            </p>
            <div className="mt-5">
              <Button href="/games/math-quiz-battle" variant="blue">
                Continue Learning
              </Button>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {mathGames.map((game) => {
            const gameProgress = registeredGameProgress.find((item) => item.gameId === game.id);

            return (
              <RegisteredGameCard key={game.id} game={game} progress={gameProgress} />
            );
          })}
        </div>
      </section>

      <section className="bg-[#EEF7FF]">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
            Difficulty Levels
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#082B80] sm:text-4xl">
            Level progress and stage locks
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {mathLevels.map((level) => (
              <RegisteredLevelCard key={level.level} level={level} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <article className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
            Recent Achievements
          </p>
          <div className="mt-5 grid gap-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement} className="flex items-center gap-3 rounded-3xl bg-[#FFF3C4] px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFC83D] font-black text-[#082B80]">
                  *
                </span>
                <span className="font-black text-[#082B80]">{achievement}</span>
              </div>
            ))}
          </div>
        </article>

        <QuestionFlowPreview />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <article className="rounded-[2rem] border border-[#DDE8F5] bg-[#EAF6FF] p-6 shadow-sm md:p-8">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl font-black text-[#0B63F6]">
              ?
            </span>
            <div>
              <h2 className="text-3xl font-black text-[#082B80]">Need Help?</h2>
              <p className="mt-2 text-lg font-bold text-[#5B6B94]">
                Simple explanations for every question.
              </p>
            </div>
            <Button href="#question-flow" variant="secondary">
              Learn More
            </Button>
          </div>
        </article>
      </section>
    </>
  );
}

function PlayfulBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-8 top-10 h-20 w-20 rounded-full bg-white/70" />
      <div className="absolute left-28 top-16 h-10 w-10 rounded-full bg-white/80" />
      <div className="absolute right-20 top-14 h-24 w-24 rounded-full bg-[#FFC83D]/40" />
      <div className="absolute bottom-0 left-0 h-24 w-full rounded-t-[60%] bg-[#22C55E]/15" />
      <div className="absolute bottom-10 right-16 text-5xl font-black text-[#FF4FB8]/25">+</div>
      <div className="absolute left-1/2 top-16 text-6xl font-black text-[#8B5CF6]/20">=</div>
    </div>
  );
}

function MathHeroScene() {
  return (
    <div className="relative min-h-[360px] rounded-[2.5rem] border border-white/80 bg-white/70 p-6 shadow-playful backdrop-blur">
      <div className="absolute left-8 top-8 rounded-full bg-[#FFC83D] px-4 py-2 text-lg font-black text-[#082B80]">
        + - x / =
      </div>
      <div className="absolute right-8 top-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#FF4FB8] text-3xl font-black text-white">
        12
      </div>
      <div className="absolute bottom-10 left-8 right-8 rounded-[2rem] bg-[#EAF6FF] p-6">
        <div className="grid grid-cols-3 gap-4">
          <HeroCharacter label="Student" colorClass="bg-[#0B63F6]" />
          <HeroCharacter label="Mascot" colorClass="bg-[#FF9F1C]" />
          <HeroCharacter label="Helper" colorClass="bg-[#8B5CF6]" />
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          {["â˜…", "7", "+", "="].map((symbol) => (
            <span
              key={symbol}
              className="flex h-12 items-center justify-center rounded-2xl bg-white text-2xl font-black text-[#082B80] shadow-sm"
            >
              {symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroCharacter({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <div className="text-center">
      <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${colorClass} text-3xl font-black text-white`}>
        :)
      </div>
      <p className="mt-2 text-xs font-black uppercase text-[#5B6B94]">{label}</p>
    </div>
  );
}

function GameThumbnail({ game }: { game: MathGame }) {
  return (
    <div
      role="img"
      aria-label={`${game.title} colourful math thumbnail`}
      className={`relative h-36 overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${game.thumbnailClass} p-4`}
    >
      <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/60" />
      <div className="absolute -bottom-6 left-6 h-20 w-28 rounded-t-full bg-[#22C55E]/30" />
      <div className="grid grid-cols-2 gap-3">
        {game.symbols.map((symbol) => (
          <span
            key={`${game.id}-${symbol}`}
            className="flex h-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#082B80] shadow-sm"
          >
            {symbol}
          </span>
        ))}
      </div>
    </div>
  );
}

function GuestGameCard({ game }: { game: MathGame }) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-playful">
      <GameThumbnail game={game} />
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#FFC83D] px-3 py-1 text-xs font-black text-[#082B80]">
          {game.badge}
        </span>
        <span className="rounded-full bg-[#EEF7FF] px-3 py-1 text-xs font-black text-[#0B63F6]">
          {game.yearLabel}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-black text-[#082B80]">{game.title}</h3>
      <p className="mt-2 flex-1 text-sm font-bold leading-6 text-[#5B6B94]">
        {game.description}
      </p>
      <Button href={game.href} variant="blue" className="mt-5 w-full">
        Try Demo
      </Button>
    </article>
  );
}

function GuestLevelCard({ level }: { level: MathLevel }) {
  return (
    <article className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${level.colorClass} text-lg font-black text-white`}>
        {level.level}
      </div>
      <h3 className="mt-4 text-xl font-black text-[#082B80]">
        Level {level.level}: {level.label}
      </h3>
      <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
        {level.description}
      </p>
      <div className="mt-4 rounded-full bg-[#EEF7FF] px-3 py-2 text-xs font-black text-[#5B6B94]">
        Preview available
      </div>
    </article>
  );
}

function RegisteredGameCard({
  game,
  progress,
}: {
  game: MathGame;
  progress?: { currentLevel: string; progressStatus: string; progress: number };
}) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm">
      <GameThumbnail game={game} />
      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#22C55E]/15 px-3 py-1 text-xs font-black text-[#15803D]">
          Unlocked
        </span>
        <span className="text-xs font-black text-[#5B6B94]">
          {progress?.currentLevel ?? "Level 1"}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-black text-[#082B80]">{game.title}</h3>
      <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
        {progress?.progressStatus ?? "Ready to play"}
      </p>
      <div className="mt-4">
        <ProgressBar label="Progress status" value={progress?.progress ?? 0} colorClass="bg-[#22C55E]" />
      </div>
      <Button href={game.href} variant="green" className="mt-5 w-full">
        Play
      </Button>
    </article>
  );
}

function RegisteredLevelCard({ level }: { level: MathLevel }) {
  return (
    <article className={`rounded-[2rem] border p-5 shadow-sm ${level.reached ? "border-[#DDE8F5] bg-white" : "border-[#DDE8F5] bg-white/70"}`}>
      <div className="flex items-center justify-between gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${level.colorClass} text-lg font-black text-white`}>
          {level.level}
        </div>
        <LockBadge locked={!level.reached} />
      </div>
      <h3 className="mt-4 text-xl font-black text-[#082B80]">
        Level {level.level}: {level.label}
      </h3>
      <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
        {level.description}
      </p>
      <div className="mt-4 flex gap-1 text-[#FFC83D]" aria-label={`${level.stars} stars`}>
        {[1, 2, 3].map((star) => (
          <span key={star} className={star <= level.stars ? "opacity-100" : "opacity-25"}>
            â˜…
          </span>
        ))}
      </div>
      <div className="mt-4">
        <ProgressBar label="Progress" value={level.progress} colorClass={level.colorClass} />
      </div>
    </article>
  );
}

function ProgressBar({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-black uppercase text-[#5B6B94]">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white ring-1 ring-[#DDE8F5]">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function LockBadge({ locked }: { locked: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${locked ? "bg-[#EEF7FF] text-[#5B6B94]" : "bg-[#22C55E]/15 text-[#15803D]"}`}>
      {locked ? "Locked" : "Unlocked"}
    </span>
  );
}

function StatTile({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: string;
  tone: "yellow" | "pink";
}) {
  return (
    <article className={`rounded-[1.5rem] p-5 ${tone === "yellow" ? "bg-[#FFF3C4]" : "bg-[#FFE8F4]"}`}>
      <p className="text-sm font-black uppercase text-[#5B6B94]">{label}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-4xl font-black text-[#082B80]">{value}</p>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-black text-[#082B80]">
          {icon}
        </span>
      </div>
    </article>
  );
}

function QuestionFlowPreview() {
  return (
    <article id="question-flow" className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-[#14B8A6]">
        Registered question flow
      </p>
      <h2 className="mt-2 text-3xl font-black text-[#082B80]">
        Explanations after every answer
      </h2>
      <div className="mt-5 rounded-[1.5rem] bg-[#EEF7FF] p-5">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0B63F6]">
            {registeredQuestionPreview.difficulty}
          </span>
          <span className="rounded-full bg-[#FFF3C4] px-3 py-1 text-xs font-black text-[#082B80]">
            Stars earned: {registeredQuestionPreview.starsEarned}
          </span>
        </div>
        <p className="mt-4 text-xl font-black text-[#082B80]">
          {registeredQuestionPreview.question}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {registeredQuestionPreview.answers.map((answer) => (
            <div
              key={answer}
              className={`rounded-2xl border px-4 py-3 text-center font-black ${
                answer === registeredQuestionPreview.correctAnswer
                  ? "border-[#22C55E] bg-[#22C55E]/15 text-[#15803D]"
                  : "border-[#DDE8F5] bg-white text-[#082B80]"
              }`}
            >
              {answer}
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-white p-4">
          <p className="text-sm font-black uppercase text-[#22C55E]">Instant feedback</p>
          <p className="mt-1 text-base font-bold text-[#5B6B94]">
            Correct. {registeredQuestionPreview.explanation}
          </p>
        </div>
        <div className="mt-4 rounded-2xl bg-[#FFF3C4] p-4">
          <p className="text-sm font-black uppercase text-[#082B80]">Progress update</p>
          <p className="mt-1 text-base font-bold text-[#5B6B94]">
            {registeredQuestionPreview.progressUpdate}
          </p>
        </div>
      </div>
    </article>
  );
}