import Image from "next/image";

type XPRewardCardProps = {
  correct: boolean;
  xpGained: number;
  levelXp: number;
};

export function XPRewardCard({ correct, xpGained, levelXp }: XPRewardCardProps) {
  return (
    <section
      className={`rounded-[1.5rem] border p-4 ${
        correct
          ? "border-[#22C55E]/40 bg-[#DCFCE7]"
          : "border-[#FF4FA0]/30 bg-[#FFF0F7]"
      }`}
      aria-live="polite"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Image
            src="/rewards/star.png"
            alt="Star reward"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
        </span>
        <div>
          <p className={`text-lg font-black ${correct ? "text-[#15803D]" : "text-[#B91C1C]"}`}>
            {correct ? `Correct! +${xpGained} XP` : "Good effort. Review the explanation."}
          </p>
          <p className="mt-1 text-sm font-bold text-[#5B6B94]">
            {correct
              ? `You have earned ${levelXp} XP in this level so far.`
              : "No XP this time. The learning notes will help with the next mission."}
          </p>
        </div>
      </div>
    </section>
  );
}