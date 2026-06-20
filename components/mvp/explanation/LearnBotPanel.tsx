import Image from "next/image";

type LearnBotPanelProps = {
  answered: boolean;
  correct: boolean;
  tip: string;
};

export function LearnBotPanel({ answered, correct, tip }: LearnBotPanelProps) {
  const image = !answered
    ? "/mascots/learnbot-thinking.png"
    : correct
      ? "/mascots/learnbot-happy.png"
      : "/mascots/learnbot-explaining.png";
  const heading = !answered
    ? "Think it through"
    : correct
      ? "Brilliant work!"
      : "Let us learn together";
  const encouragement = !answered
    ? "Read the question slowly. You can solve it one small step at a time."
    : correct
      ? "You found the answer. Read the notes to make the idea stick."
      : "A wrong answer is part of learning. Use the notes and try the next mission with confidence.";

  return (
    <aside
      className="overflow-hidden rounded-[2rem] border border-[#BDE7D0] bg-[#EAFBF0] p-5 shadow-sm"
      aria-label="LearnBot helper"
      aria-live="polite"
    >
      <div className="mx-auto h-40 w-40">
        <Image
          src={image}
          alt="LearnBot helping with the mathematics question"
          width={220}
          height={220}
          className="h-full w-full object-contain"
        />
      </div>
      <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#15803D]">
        LearnBot Helper
      </p>
      <h2 className="mt-1 text-2xl font-black text-[#082B80]">{heading}</h2>
      <p className="mt-3 text-sm font-bold leading-6 text-[#3F527E]">{encouragement}</p>
      <div className="mt-4 rounded-2xl bg-white p-4">
        <p className="text-xs font-black uppercase text-[#0B63F6]">LearnBot Tip</p>
        <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{tip}</p>
      </div>
    </aside>
  );
}