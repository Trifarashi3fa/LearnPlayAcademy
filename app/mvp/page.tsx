import Image from "next/image";
import { mvpSubjects } from "@/data/mvp-forest-world";
import { MvpTopBar, PrimaryLink } from "@/components/mvp/MvpShell";

export const metadata = {
  title: "LearnPlay MVP",
  description: "A local-only LearnPlay Academy MVP with Forest World questions, XP, stars, rewards, and parent progress.",
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
                LearnPlay Academy MVP
              </p>
              <h1 className="mt-3 text-5xl font-black leading-tight md:text-7xl">
                Learn. Play. Grow.
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">
                Start a child-friendly Forest World math adventure with local JSON questions, XP, stars, badges, and progress saved on this device.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryLink href="/mvp/subjects" tone="blue">Start Learning</PrimaryLink>
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
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <h2 className="text-3xl font-black">Choose a subject</h2>
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