import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { isFeatureActive, publicSubjectAvailability } from "@/data/feature-flags";

export const metadata: Metadata = {
  title: "LearnPlay Academy | Mathematics Year 1",
  description: "Start the approved LearnPlay Mathematics Year 1 Forest World Foundation MVP.",
};

const highlights = ["Mathematics Year 1", "10 guided levels", "100 approved pilot questions", "Local XP and rewards"];

export default function Home() {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="overflow-hidden bg-[#EAF6FF]">
        <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_440px] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">Foundation MVP</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-tight md:text-7xl">Mathematics Year 1 starts in Forest World.</h1>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-[#5B6B94]">Complete a clear 10-level learning path covering early numbers, counting, addition, subtraction, review, and the Forest Guardian challenge.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/subjects" variant="blue">Start Learning</Button>
              <Button href="/mvp/parent-dashboard" variant="secondary">Parent Dashboard</Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publicSubjectAvailability.map((subject) => {
                const active = isFeatureActive(subject.featureId);
                const content = <><span className="block">{subject.title}</span><span className="mt-1 block text-xs text-[#5B6B94]">{active ? "Active pilot" : "Coming soon"}</span></>;
                return active ? (
                  <Link key={subject.id} href={subject.href} className="rounded-3xl border border-[#0B63F6] bg-white px-4 py-3 text-center text-sm font-black shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">{content}</Link>
                ) : (
                  <div key={subject.id} aria-disabled="true" className="rounded-3xl border border-[#DDE8F5] bg-white/70 px-4 py-3 text-center text-sm font-black opacity-70">{content}</div>
                );
              })}
            </div>
          </div>
          <div className="relative rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#EAF6FF]"><Image src="/design-system/learnbot-reference.png" alt="LearnBot welcoming children to Forest World" width={520} height={420} className="h-72 w-full object-cover object-top" priority /></div>
            <h2 className="mt-5 text-3xl font-black">Forest World is open</h2>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">Other subjects and years remain safely preserved for later approval.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">{highlights.map((item) => <div key={item} className="rounded-2xl border border-[#DDE8F5] bg-[#FFFDF7] px-4 py-3 text-sm font-black">{item}</div>)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
