import type { VisualLearningType } from "@/data/mvp-forest-world";

export function HintPanel({
  hint,
  type,
}: {
  hint: string;
  type: VisualLearningType;
}) {
  const rule = {
    counting: "Point to each object once as you count.",
    addition: "Addition joins groups together.",
    subtraction: "Subtraction takes part of a group away.",
    comparison: "Count both groups before choosing.",
    matching: "The number must match the amount shown.",
    none: "Look for the number pattern or clue.",
  }[type];

  return (
    <aside className="rounded-[2rem] border border-[#FFD76A] bg-[#FFF7D6] p-5 shadow-sm" aria-label="Question hint">
      <p className="text-xs font-black uppercase tracking-wide text-[#B66A00]">Helpful Hint</p>
      <h2 className="mt-2 text-xl font-black text-[#082B80]">Try this</h2>
      <p className="mt-3 text-sm font-bold leading-6 text-[#5B6B94]">{hint}</p>
      <div className="mt-4 rounded-2xl bg-white/90 p-3">
        <p className="text-xs font-black uppercase text-[#0B63F6]">Math rule</p>
        <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">{rule}</p>
      </div>
    </aside>
  );
}