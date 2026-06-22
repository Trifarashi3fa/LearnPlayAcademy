import Image from "next/image";

type XPRewardCardProps = {
  correct: boolean;
  xpGained: number;
  levelXp: number;
  compact?: boolean;
};

export function XPRewardCard({ correct, xpGained, levelXp, compact = false }: XPRewardCardProps) {
  return (
    <section
      className={`rounded-[1.25rem] border ${compact ? "p-3" : "p-4"} ${correct ? "border-[#22C55E]/40 bg-[#DCFCE7]" : "border-[#FF4FA0]/30 bg-[#FFF0F7]"}`}
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className={`flex shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${compact ? "h-11 w-11" : "h-14 w-14"}`}>
          <Image src="/rewards/star.png" alt="Star reward" width={44} height={44} className={compact ? "h-9 w-9 object-contain" : "h-11 w-11 object-contain"} />
        </span>
        <div>
          <p className={`font-black ${compact ? "text-base" : "text-lg"} ${correct ? "text-[#15803D]" : "text-[#B91C1C]"}`}>
            {correct ? `Correct! +${xpGained} XP` : "Good effort. Review the explanation."}
          </p>
          <p className="mt-0.5 text-xs font-bold text-[#5B6B94]">
            {correct ? `${levelXp} XP earned in this level.` : "Use the learning notes before the next mission."}
          </p>
        </div>
      </div>
    </section>
  );
}