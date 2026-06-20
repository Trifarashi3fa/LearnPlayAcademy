import { ProgressBar } from "@/components/mvp/MvpShell";

type ProgressTrackerProps = {
  level: number;
  nodeType: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  xp: number;
};

export function ProgressTracker({
  level,
  nodeType,
  questionNumber,
  totalQuestions,
  score,
  xp,
}: ProgressTrackerProps) {
  const percent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <section
      className="rounded-[2rem] border border-[#DDE8F5] bg-white p-4 shadow-sm sm:p-5"
      aria-label="Level progress"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">
                Forest World - Level {level}
              </p>
              <h2 className="mt-1 text-xl font-black text-[#082B80]">{nodeType} Mission</h2>
            </div>
            <p className="text-sm font-black text-[#5B6B94]">
              Question {questionNumber} of {totalQuestions}
            </p>
          </div>
          <div className="mt-4">
            <ProgressBar value={percent} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Status label="Progress" value={`${percent}%`} />
          <Status label="Score" value={`${score}/${totalQuestions}`} />
          <Status label="Level XP" value={String(xp)} />
        </div>
      </div>
    </section>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-20 rounded-2xl bg-[#EAF6FF] px-3 py-2 text-center">
      <p className="text-[0.65rem] font-black uppercase text-[#5B6B94]">{label}</p>
      <p className="mt-1 text-base font-black text-[#082B80]">{value}</p>
    </div>
  );
}