import { ProgressBar } from "@/components/mvp/MvpShell";

type ProgressTrackerProps = {
  level: number;
  nodeType: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  xp: number;
  compact?: boolean;
};

export function ProgressTracker({
  level,
  nodeType,
  questionNumber,
  totalQuestions,
  score,
  xp,
  compact = false,
}: ProgressTrackerProps) {
  const percent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <section
      className={compact ? "border-b border-[#DDE8F5] bg-white px-3 py-2 sm:px-5" : "rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm sm:p-5"}
      aria-label="Level progress"
    >
      <div className={`mx-auto grid max-w-[96rem] gap-3 ${compact ? "grid-cols-[1fr_auto] items-center" : "lg:grid-cols-[1fr_auto] lg:items-center"}`}>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className={compact ? "hidden sm:block" : ""}>
              <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Forest World - Level {level}</p>
              <h2 className="mt-0.5 text-base font-black text-[#082B80]">{nodeType} Mission</h2>
            </div>
            <p className="text-sm font-black text-[#5B6B94]">Question {questionNumber} of {totalQuestions}</p>
          </div>
          <div className={compact ? "mt-2" : "mt-4"}><ProgressBar value={percent} /></div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <Status label="Progress" value={`${percent}%`} compact={compact} />
          <Status label="Score" value={`${score}/${totalQuestions}`} compact={compact} />
          <Status label="XP" value={String(xp)} compact={compact} />
        </div>
      </div>
    </section>
  );
}

function Status({ label, value, compact }: { label: string; value: string; compact: boolean }) {
  return (
    <div className={`rounded-xl bg-[#EAF6FF] text-center ${compact ? "min-w-14 px-2 py-1.5" : "min-w-20 px-3 py-2"}`}>
      <p className="text-[0.6rem] font-black uppercase text-[#5B6B94]">{label}</p>
      <p className="mt-0.5 text-sm font-black text-[#082B80]">{value}</p>
    </div>
  );
}