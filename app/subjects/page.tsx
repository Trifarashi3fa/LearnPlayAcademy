import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isFeatureActive, publicSubjectAvailability } from "@/data/feature-flags";

export const metadata: Metadata = {
  title: "Subjects | LearnPlay Academy",
  description: "Mathematics, English, and Science Year 1 Forest World packages are active in LearnPlay Academy.",
};

export default function SubjectsPage() {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="bg-[#EAF6FF]"><div className="mx-auto max-w-6xl px-5 py-14 lg:px-8"><p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">Foundation MVP</p><h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight md:text-6xl">Choose an active learning adventure</h1><p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">Mathematics, English, and Science Year 1 Forest World packages are currently active. Other subjects are preserved for future approved expansion.</p></div></section>
      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publicSubjectAvailability.map((subject) => {
          const active = isFeatureActive(subject.featureId);
          const card = <article className={`h-full rounded-[2rem] border bg-white p-5 shadow-sm ${active ? "border-[#0B63F6]" : "border-[#DDE8F5] opacity-70"}`}><div className="flex items-start justify-between gap-4"><div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-[#EAF6FF] p-2"><Image src={subject.image} alt={`${subject.title} learning cover`} width={96} height={96} className="h-full w-full rounded-2xl object-cover" /></div><span className={`rounded-full px-3 py-1 text-xs font-black ${active ? "bg-[#22C55E]/15 text-[#15803D]" : "bg-[#FFF3C4]"}`}>{active ? "Active pilot" : "Coming soon"}</span></div><h2 className="mt-5 text-2xl font-black">{subject.title}</h2><p className="mt-2 min-h-20 text-sm font-bold leading-6 text-[#5B6B94]">{subject.description}</p><span className={`mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-base font-black ${active ? "bg-[#0B63F6] text-white" : "bg-[#EAF6FF] text-[#5B6B94]"}`}>{active ? "Enter Forest World" : "Not active"}</span></article>;
          return active ? <Link key={subject.id} href={subject.href} className="block rounded-[2rem] transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">{card}</Link> : <div key={subject.id} aria-disabled="true">{card}</div>;
        })}
      </div></section>
    </main>
  );
}
