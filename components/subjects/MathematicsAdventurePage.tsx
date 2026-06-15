import Image from "next/image";
import { Button } from "@/components/Button";
import { PremiumMathematicsExperience } from "@/components/mathematics/PremiumMathematicsExperience";
import {
  guestHowItWorks,
  mathGames,
  mathLevels,
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
  return isRegistered ? (
    <PremiumMathematicsExperience studentName={studentName} />
  ) : (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <GuestMathExperience />
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

      <DemoGamesSection />
      <UnlockAdventureBanner />
      <DifficultyPreview />
      <HowItWorksSection />

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

function DemoGamesSection() {
  return (
    <section id="free-games" className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
            Free Demo
          </p>
          <h2 className="mt-2 text-3xl font-black text-[#082B80] sm:text-4xl">
            Try 5 Free Math Adventures
          </h2>
          <p className="mt-2 text-base font-bold text-[#5B6B94]">
            Guest users can access selected Year 1 to Year 3 demo games.
          </p>
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
          {["*", "7", "+", "="].map((symbol) => (
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
    <div className="relative h-44 overflow-hidden rounded-[1.5rem] bg-white shadow-inner">
      <Image
        src={game.imageSrc}
        alt={game.imageAlt}
        fill
        sizes="(min-width: 1024px) 220px, (min-width: 640px) 45vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-1 text-[#FFC83D]" aria-label={`${value} star rating`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= value ? "opacity-100" : "opacity-25"}>
          *
        </span>
      ))}
    </div>
  );
}

function GuestGameCard({ game }: { game: MathGame }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-playful">
      <GameThumbnail game={game} />
      <div className="mt-4 flex flex-wrap gap-2 px-1">
        <span className="rounded-full bg-[#FF4FB8] px-3 py-1 text-xs font-black text-white">
          {game.badge}
        </span>
        <span className="rounded-full bg-[#EEF7FF] px-3 py-1 text-xs font-black text-[#0B63F6]">
          {game.yearLabel}
        </span>
        <span className="rounded-full bg-[#FFF3C4] px-3 py-1 text-xs font-black text-[#082B80]">
          {game.difficulty}
        </span>
      </div>
      <h3 className="mt-4 px-1 text-xl font-black text-[#082B80]">{game.title}</h3>
      <p className="mt-2 flex-1 px-1 text-sm font-bold leading-6 text-[#5B6B94]">
        {game.description}
      </p>
      <div className="mt-4 px-1">
        <StarRating value={game.rating} />
      </div>
      <Button href={game.href} variant="blue" className="mt-5 w-full">
        Try Demo
      </Button>
    </article>
  );
}

function UnlockAdventureBanner() {
  const worlds = [
    "Forest World",
    "Mountain World",
    "Ocean World",
    "Space World",
    "Galaxy World",
  ];
  const benefits = [
    "5 Learning Worlds",
    "20 Premium Activities",
    "Progress Tracking",
    "Badges & Rewards",
    "Explanation Notes",
    "Fun Learning Adventures",
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#FAD1E5] bg-gradient-to-br from-[#FFF7ED] via-white to-[#FFE8F4] p-6 shadow-playful md:p-8">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#FFC83D]/30" />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
              Premium Adventure
            </p>
            <h2 className="mt-2 text-3xl font-black text-[#082B80]">
              Unlock the Full Adventure
            </h2>
            <p className="mt-3 max-w-xl text-base font-bold leading-7 text-[#5B6B94]">
              Register to access all learning worlds and 20 premium activities.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {worlds.map((world) => (
                <span key={world} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#082B80] shadow-sm">
                  {world}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white/80 p-5 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <span key={benefit} className="rounded-2xl bg-[#EEF7FF] px-4 py-3 text-sm font-black text-[#082B80]">
                  + {benefit}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Button href="/register" variant="primary" className="w-full">
                Register Now
              </Button>
              <p className="mt-3 text-center text-sm font-bold text-[#5B6B94]">
                Already have an account? <a href="/login" className="font-black text-[#0B63F6] underline-offset-4 hover:underline">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DifficultyPreview() {
  return (
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

function HowItWorksSection() {
  return (
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
  );
}