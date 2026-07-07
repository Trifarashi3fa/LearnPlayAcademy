import { MvpMetricCard, MvpProgressBar } from "@/components/mvp/MvpUi";
import type { ProgressSyncStatus } from "@/lib/progress/child-progress";

type ProgressTrackerProps = {
  level: number;
  nodeType: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  xp: number;
  compact?: boolean;
  syncStatus?: ProgressSyncStatus;
};

export function ProgressTracker({
  level,
  nodeType,
  questionNumber,
  totalQuestions,
  score,
  xp,
  compact = false,
  syncStatus = "local-only",
}: ProgressTrackerProps) {
  const percent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <section
      className={compact ? "border-b border-[#DDE8F5] bg-white/95 px-3 py-2 backdrop-blur sm:px-5" : "rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm sm:p-5"}
      aria-label="Level progress"
    >
      <div className={`mx-auto grid max-w-[96rem] gap-2 ${compact ? "grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center" : "lg:grid-cols-[1fr_auto] lg:items-center"}`}>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={compact ? "hidden md:block" : ""}>
              <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Forest World - Level {level}</p>
              <h2 className="mt-0.5 text-base font-black text-[#082B80]">{nodeType} Mission</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <p key={`question-${questionNumber}`} className="lp-pop-on-change rounded-full bg-[#FFF3C4] px-3 py-1 text-xs font-black text-[#082B80] sm:text-sm">
                Question {questionNumber} of {totalQuestions}
              </p>
              <SaveStatus status={syncStatus} />
            </div>
          </div>
          <div className={compact ? "mt-2" : "mt-4"}>
            <MvpProgressBar value={percent} label="Level progress" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <Status label="Progress" value={`${percent}%`} compact={compact} tone="blue" />
          <Status label="Score" value={`${score}/${totalQuestions}`} compact={compact} tone="green" />
          <Status label="XP" value={String(xp)} compact={compact} tone="yellow" />
        </div>
      </div>
    </section>
  );
}

function SaveStatus({ status }: { status: ProgressSyncStatus }) {
  const label = {
    loading: "Loading",
    "local-only": "Local",
    "signed-out": "Local",
    "no-child-profile": "Profile needed",
    syncing: "Saving",
    synced: "Saved",
    error: "Save issue",
  }[status];

  const tone = status === "synced"
    ? "bg-[#DCFCE7] text-[#15803D]"
    : status === "syncing" || status === "loading"
      ? "bg-[#EAF6FF] text-[#0B63F6]"
      : status === "error"
        ? "bg-[#FEE2E2] text-[#B91C1C]"
        : "bg-[#FFF3C4] text-[#9A6700]";

  return (
    <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 text-[0.68rem] font-black ${tone}`} aria-live="polite">
      {label}
    </span>
  );
}

function Status({
  label,
  value,
  compact,
  tone,
}: {
  label: string;
  value: string;
  compact: boolean;
  tone: "blue" | "green" | "yellow";
}) {
  if (!compact) {
    return <MvpMetricCard label={label} value={value} tone={tone} />;
  }

  const toneClass = {
    blue: "bg-[#EAF6FF]",
    green: "bg-[#EAFBF0]",
    yellow: "bg-[#FFF7D6]",
  }[tone];

  return (
    <div key={`${label}-${value}`} className={`lp-pop-on-change min-w-0 rounded-xl px-2 py-1.5 text-center transition-all duration-200 motion-reduce:transition-none ${toneClass}`}>
      <p className="text-[0.58rem] font-black uppercase tracking-wide text-[#5B6B94]">{label}</p>
      <p className="mt-0.5 text-sm font-black text-[#082B80] sm:text-base">{value}</p>
    </div>
  );
}