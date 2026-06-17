import Image from "next/image";
import { mvpSubjects } from "@/data/mvp-forest-world";
import { MvpTopBar, PrimaryLink } from "@/components/mvp/MvpShell";

export const metadata = {
  title: "Free Math Starter World | LearnPlay Academy",
  description:
    "Start LearnPlay Academy with one free Forest World, 10 guided levels, and 100 child-friendly math questions saved locally on this device.",
};

export default function MvpHomePage() {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="bg-[#EAF6FF]">
        <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
          <MvpTopBar />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
                Free Math Starter World
              </p>
              <h1 className="mt-3 text-5xl font-black leading-tight md:text-7xl">
                Forest World
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">
                Start with one free Math World: 10 guided Forest World levels, 100 local JSON questions, XP, stars, badges, and progress saved on this device.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryLink href="/mvp/world-map" tone="blue">Start Forest World</PrimaryLink>
                <PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 text-center shadow-playful">
              <Image
                src="/mascots/learnbot.png"
                alt="LearnBot mascot"
                width={260}
                height={220}
                className="mx-auto h-52 w-64 object-contain"
                priority
              />
              <p className="mt-4 text-2xl font-black">LearnBot is ready!</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
                Unlock premium worlds to continue learning after Forest World.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
            Free package structure
          </p>
          <h2 className="mt-2 text-3xl font-black">1 Free World. 10 Levels. 100 Questions.</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Forest World", "Only free playable world"],
              ["10 guided levels", "Learn, practice, mini game, review, challenge, and boss"],
              ["100 questions", "Numbers, counting, addition, subtraction, review, and boss quiz"],
            ].map(([title, description]) => (
              <div key={title} className="rounded-[1.5rem] bg-[#EAF6FF] p-4">
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mt-10 text-3xl font-black">Choose a subject</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mvpSubjects.map((subject) => (
            <a
              key={subject.id}
              href={subject.enabled ? "/mvp/world-map" : "/mvp/subjects"}
              className="rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-playful focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF6FF] text-lg font-black text-[#0B63F6]">
                {subject.icon}
              </span>
              <h3 className="mt-4 text-2xl font-black">{subject.title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
                {subject.description}
              </p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}