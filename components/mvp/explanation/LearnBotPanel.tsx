import Image from "next/image";
import {
  getLearnBotImage,
  getLearnBotMessage,
  type LearnBotState,
} from "@/components/mvp/explanation/learnbot-teaching";

type LearnBotPanelProps = {
  answered: boolean;
  correct: boolean;
  tip: string;
  compact?: boolean;
  state?: LearnBotState;
  messageSeed?: string;
  selectedAnswer?: string | null;
  correctAnswer?: string;
};

function getStateAccent(state: LearnBotState) {
  if (state === "correct" || state === "celebration" || state === "perfect" || state === "complete") {
    return {
      badge: "bg-[#DCFCE7] text-[#15803D]",
      glow: "from-[#DCFCE7] via-[#EAFBF0] to-[#EAF6FF]",
      bubble: "border-[#22C55E]/35",
      sparkle: "bg-[#FFC83D]",
    };
  }

  if (state === "incorrect") {
    return {
      badge: "bg-[#FFF0F7] text-[#B91C1C]",
      glow: "from-[#FFF0F7] via-white to-[#EAF6FF]",
      bubble: "border-[#FF4FA0]/30",
      sparkle: "bg-[#FF4FA0]",
    };
  }

  if (state === "boss") {
    return {
      badge: "bg-[#F3E8FF] text-[#6D28D9]",
      glow: "from-[#F3E8FF] via-[#EAF6FF] to-white",
      bubble: "border-[#8B5CF6]/35",
      sparkle: "bg-[#8B5CF6]",
    };
  }

  return {
    badge: "bg-[#EAF6FF] text-[#0B63F6]",
    glow: "from-[#EAFBF0] via-[#EAF6FF] to-white",
    bubble: "border-[#BDE7D0]",
    sparkle: "bg-[#66CC00]",
  };
}

export function LearnBotPanel({
  answered,
  correct,
  tip,
  compact = false,
  state,
  messageSeed,
  selectedAnswer,
  correctAnswer,
}: LearnBotPanelProps) {
  const learnBotState = state ?? (!answered ? "thinking" : correct ? "correct" : "incorrect");
  const image = getLearnBotImage(learnBotState);
  const message = getLearnBotMessage({
    state: learnBotState,
    seed: messageSeed,
    tip,
    selectedAnswer,
    correctAnswer,
  });
  const accent = getStateAccent(learnBotState);

  return (
    <aside
      className={`relative h-full min-h-0 overflow-hidden border border-[#BDE7D0] bg-gradient-to-br ${accent.glow} shadow-playful ${
        compact ? "rounded-[1.5rem] p-3 sm:p-4" : "rounded-[2rem] p-5"
      }`}
      aria-label="LearnBot teaching assistant"
      aria-live="polite"
    >
      <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/55" aria-hidden />
      <span className="absolute bottom-8 right-8 h-3 w-3 rounded-full bg-[#FFC83D] motion-safe:animate-pulse" aria-hidden />
      <span className={`absolute left-7 top-8 h-2.5 w-2.5 rounded-full ${accent.sparkle} motion-safe:animate-pulse`} aria-hidden />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <span className={`rounded-full px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-wide ${accent.badge}`}>
            {message.eyebrow}
          </span>
          <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-black text-[#082B80]" aria-hidden>
            LP
          </span>
        </div>

        <div className="grid min-h-0 flex-1 items-center gap-3 pt-3 sm:grid-cols-[minmax(8rem,42%)_1fr] lg:grid-cols-1">
          <div className="relative mx-auto flex w-full max-w-[15rem] items-end justify-center overflow-hidden bg-transparent sm:max-w-[17rem] lg:max-w-[18rem]">
            <div className="absolute bottom-1 h-1/2 w-4/5 rounded-full bg-[#BDE7D0]/55 blur-sm" aria-hidden />
            <Image
              src={image}
              alt="LearnBot teaching assistant"
              width={360}
              height={360}
              sizes={compact ? "(max-width: 640px) 42vw, 240px" : "320px"}
              className="relative h-auto max-h-[15rem] w-full object-contain drop-shadow-xl motion-safe:animate-pulse"
              priority={false}
            />
          </div>

          <div className="min-w-0">
            <h2 className={`font-black leading-tight text-[#082B80] ${compact ? "text-xl sm:text-2xl" : "text-3xl"}`}>
              {message.heading}
            </h2>
            <div className={`relative mt-3 rounded-[1.4rem] border bg-white/95 p-4 shadow-sm ${accent.bubble}`}>
              <span className="absolute -left-2 top-8 hidden h-4 w-4 rotate-45 border-b border-l border-inherit bg-white/95 sm:block lg:hidden" aria-hidden />
              <span className="absolute -top-2 left-10 h-4 w-4 rotate-45 border-l border-t border-inherit bg-white/95 sm:hidden lg:block" aria-hidden />
              <p className="text-base font-black leading-6 text-[#082B80]">{message.body}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{message.followUp}</p>
            </div>
          </div>
        </div>

        <div className="mt-3 shrink-0 rounded-[1.25rem] border border-white/80 bg-white/80 p-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#0B63F6]">Teaching shortcut</p>
          <p className="mt-1 text-sm font-bold leading-6 text-[#3F527E]">{tip}</p>
        </div>
      </div>
    </aside>
  );
}