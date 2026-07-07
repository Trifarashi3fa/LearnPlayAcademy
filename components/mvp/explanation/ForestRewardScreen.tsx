import Image from "next/image";
import Link from "next/link";
import { MvpStatusPill } from "@/components/mvp/MvpUi";
import { PrimaryLink } from "@/components/mvp/MvpShell";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import {
  getLearnBotImage,
  getLearnBotMessage,
} from "@/components/mvp/explanation/learnbot-teaching";
import type { ProgressSyncStatus } from "@/lib/progress/child-progress";

const levelSkills: Record<number, string> = {
  1: "Numbers 1-10",
  2: "Counting objects",
  3: "Number matching",
  4: "Simple addition",
  5: "Addition practice",
  6: "Addition mini game thinking",
  7: "Simple subtraction",
  8: "Reviewing numbers and operations",
  9: "Mixed number challenge",
  10: "Forest Guardian boss review",
};

export function ForestRewardScreen({
  level,
  worldComplete,
  correctCount,
  totalQuestions,
  starsEarned,
  xpEarned,
  totalStars,
  totalXp,
  syncStatus = "local-only",
  lastSyncedAt = null,
}: {
  level: number;
  worldComplete: boolean;
  correctCount: number;
  totalQuestions: number;
  starsEarned: number;
  xpEarned: number;
  totalStars?: number;
  totalXp?: number;
  syncStatus?: ProgressSyncStatus;
  lastSyncedAt?: string | null;
}) {
  const badgeName = worldComplete ? forestWorldIdentity.completionBadge : `Level ${level} Badge`;
  const skillLearned = levelSkills[level] ?? "Forest mathematics";
  const learnBotMessage = getLearnBotMessage({
    state: "celebration",
    seed: `${level}-${correctCount}-${starsEarned}`,
    focus: "completion",
  });
  const displayedTotalStars = totalStars ?? starsEarned;
  const displayedTotalXp = totalXp ?? xpEarned;
  const nextLevel = level < 10 ? level + 1 : null;

  return (
    <section className="lp-reveal-soft relative overflow-hidden rounded-[2rem] border border-[#BDE7D0] bg-gradient-to-br from-[#EAFBF0] via-white to-[#FFF3C4] p-5 shadow-playful sm:p-8">
      <span className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#66CC00]/15" />
      <span className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-[#FF4FA0]/15" />
      <span className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[#FFC83D]/20" />
      <span className="absolute left-8 top-8 h-3 w-3 rounded-full bg-[#FFC83D] motion-safe:animate-pulse" aria-hidden />
      <span className="absolute right-1/4 top-16 h-2 w-2 rounded-full bg-[#8B5CF6] motion-safe:animate-pulse" aria-hidden />
      <span className="absolute bottom-12 left-1/3 h-2.5 w-2.5 rounded-full bg-[#22C55E] motion-safe:animate-pulse" aria-hidden />

      <div className="relative grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
        <div className="text-center">
          <div className="lp-pop-on-change mx-auto max-w-64 overflow-hidden rounded-[2rem] border-8 border-white bg-[#FFF3C4] p-3 shadow-playful sm:max-w-80">
            <Image src="/rewards/badge.png" alt={badgeName} width={360} height={360} className="aspect-square w-full rounded-[1.25rem] object-cover" priority />
          </div>
          <p className="mt-4 inline-flex rounded-full bg-[#082B80] px-5 py-2 text-sm font-black text-white">{badgeName}</p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">{worldComplete ? "Forest Guardian Victory" : "Level Completed"}</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-[#082B80] sm:text-5xl">{worldComplete ? "Forest Guardian defeated!" : `Level ${level} complete!`}</h2>
          <p className="mt-4 text-base font-bold leading-7 text-[#5B6B94] sm:text-lg sm:leading-8">{worldComplete ? "You completed all 10 Forest World missions, earned the Forest Explorer Badge, and finished the Forest Guardian challenge." : nextLevel ? `Excellent effort. Level ${nextLevel} is now unlocked for your next Forest World mission.` : "Excellent effort. Your next Forest World mission is ready."}</p>

          <div className="mt-4 rounded-[1.25rem] bg-white/85 p-3 shadow-sm" aria-live="polite">
            <MvpStatusPill tone={syncTone(syncStatus)}>{syncLabel(syncStatus)}</MvpStatusPill>
            <p className="mt-2 text-xs font-bold leading-5 text-[#5B6B94]">
              {lastSyncedAt ? `Last saved: ${new Date(lastSyncedAt).toLocaleString()}` : "Progress saves to the selected child profile after each completed level."}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <RewardStat label="Correct" value={`${correctCount}/${totalQuestions}`} />
            <RewardStat label="Stars earned" value={String(starsEarned)} />
            <RewardStat label="XP earned" value={String(xpEarned)} />
            <RewardStat label={worldComplete ? "Total stars" : "Skill learned"} value={worldComplete ? String(displayedTotalStars) : skillLearned} />
            <RewardStat label="Unlocked" value={nextLevel ? `Level ${nextLevel}` : "Forest complete"} />
          </div>

          {worldComplete ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <RewardStat label="Total XP" value={String(displayedTotalXp)} />
              <RewardStat label="World badge" value="Unlocked" />
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 rounded-[1.5rem] bg-white/90 p-4 shadow-sm sm:grid-cols-[6rem_1fr] sm:items-center" aria-live="polite">
            <div className="relative mx-auto h-24 w-24 shrink-0 bg-transparent">
              <Image src={getLearnBotImage("celebration")} alt="LearnBot celebrating the reward" fill sizes="96px" className="object-contain drop-shadow-sm" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wide text-[#15803D]">{learnBotMessage.eyebrow}</p>
              <p className="mt-1 text-lg font-black text-[#082B80]">{learnBotMessage.heading}</p>
              <div className="relative mt-2 rounded-2xl bg-[#EAFBF0] p-3">
                <span className="absolute -top-1 left-8 h-3 w-3 rotate-45 bg-[#EAFBF0]" aria-hidden />
                <p className="text-sm font-black leading-6 text-[#14532D]">{learnBotMessage.body}</p>
                <p className="mt-1 text-xs font-bold leading-5 text-[#5B6B94]">{learnBotMessage.followUp}</p>
              </div>
            </div>
          </div>

          {worldComplete ? <AssessmentComingSoon /> : null}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {level < 10 ? (
              <PrimaryLink href={`/mvp/level/${level + 1}`} tone="green">Continue</PrimaryLink>
            ) : (
              <PrimaryLink href="/mvp/rewards" tone="green">View Badge</PrimaryLink>
            )}
            <PrimaryLink href="/mvp/world-map" tone="blue">Back to Map</PrimaryLink>
            <PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function syncLabel(status: ProgressSyncStatus) {
  if (status === "synced") return "Saved to child profile";
  if (status === "syncing" || status === "loading") return "Saving progress";
  if (status === "no-child-profile") return "Create child profile to save";
  if (status === "error") return "Save issue";
  return "Local progress only";
}

function syncTone(status: ProgressSyncStatus): "blue" | "green" | "yellow" | "red" {
  if (status === "synced") return "green";
  if (status === "syncing" || status === "loading") return "blue";
  if (status === "error") return "red";
  return "yellow";
}

function AssessmentComingSoon() {
  return (
    <section className="mt-6 rounded-[1.5rem] border border-[#DDE8F5] bg-white/95 p-4 shadow-sm" aria-labelledby="forest-assessment-heading">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Coming soon</p>
          <h3 id="forest-assessment-heading" className="mt-1 text-2xl font-black text-[#082B80]">Ready for Forest Assessment?</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            Assessment helps show what your child has learned. This will become a simple check-up after Forest World practice.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-80">
          <AssessmentOption title="Free Assessment" detail="5 questions" />
          <AssessmentOption title="Premium Assessment" detail="20 questions" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          disabled
          className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full bg-[#C9D7EA] px-5 text-sm font-black text-[#5B6B94]"
        >
          Assessment coming soon
        </button>
        <Link
          href="/mvp/parent-dashboard"
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#DDE8F5] bg-white px-5 text-sm font-black text-[#082B80] transition hover:border-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
        >
          View parent progress
        </Link>
      </div>
    </section>
  );
}

function AssessmentOption({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[1.25rem] bg-[#EAF6FF] p-3">
      <p className="text-sm font-black text-[#082B80]">{title}</p>
      <p className="mt-1 text-xs font-bold text-[#5B6B94]">{detail}</p>
    </div>
  );
}

function RewardStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="lp-pop-on-change rounded-[1.25rem] bg-white p-4 text-center shadow-sm transition-all duration-200 motion-reduce:transition-none">
      <p className="text-xs font-black uppercase tracking-wide text-[#5B6B94]">{label}</p>
      <p className="mt-1 break-words text-2xl font-black text-[#082B80]">{value}</p>
    </div>
  );
}