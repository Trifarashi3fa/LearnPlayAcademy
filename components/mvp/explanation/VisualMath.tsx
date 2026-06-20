import type {
  VisualLearningModel,
  VisualObjectName,
} from "@/data/mvp-forest-world";

type VisualMathProps = {
  visual: VisualLearningModel;
  revealAnswer: boolean;
  compact?: boolean;
};

const objectEmoji: Record<VisualObjectName, string> = {
  apple: "\u{1F34E}",
  star: "\u2B50",
  bird: "\u{1F426}",
  ball: "\u26BD",
  flower: "\u{1F33C}",
  duck: "\u{1F986}",
  orange: "\u{1F34A}",
  leaf: "\u{1F343}",
  shell: "\u{1F41A}",
  pencil: "\u270F\uFE0F",
  coin: "\u{1FA99}",
  tree: "\u{1F333}",
  berry: "\u{1FAD0}",
  nut: "\u{1F330}",
  butterfly: "\u{1F98B}",
  crayon: "\u{1F58D}\uFE0F",
  sticker: "\u2B50",
  fish: "\u{1F41F}",
  marble: "\u{1F535}",
  rabbit: "\u{1F407}",
  gem: "\u{1F48E}",
  badge: "\u{1F3C5}",
  firefly: "\u2728",
  box: "\u{1F4E6}",
  balloon: "\u{1F388}",
  stone: "\u{1FAA8}",
  number: "\u25CF",
  object: "\u25CF",
};

const objectLabels: Record<VisualObjectName, string> = {
  apple: "apples",
  star: "stars",
  bird: "birds",
  ball: "balls",
  flower: "flowers",
  duck: "ducks",
  orange: "oranges",
  leaf: "leaves",
  shell: "shells",
  pencil: "pencils",
  coin: "coins",
  tree: "trees",
  berry: "berries",
  nut: "nuts",
  butterfly: "butterflies",
  crayon: "crayons",
  sticker: "stickers",
  fish: "fish",
  marble: "marbles",
  rabbit: "rabbits",
  gem: "gems",
  badge: "badges",
  firefly: "fireflies",
  box: "boxes",
  balloon: "balloons",
  stone: "stones",
  number: "counting dots",
  object: "objects",
};

export function VisualMath({ visual, revealAnswer, compact = false }: VisualMathProps) {
  const operator =
    visual.type === "addition"
      ? "+"
      : visual.type === "subtraction"
        ? "-"
        : visual.type === "comparison"
          ? "or"
          : null;
  const questionEquation = visual.equation?.replace(/=\s*.+$/, "= ?");
  const equation = revealAnswer ? visual.equation : questionEquation;
  const hasGroups = visual.groups.length > 0;

  if (!hasGroups && !equation && !(revealAnswer && visual.answerVisual)) return null;

  return (
    <div
      className={`rounded-[1.5rem] border border-[#DDE8F5] bg-[#F8FBFF] ${compact ? "p-4" : "p-5 sm:p-6"}`}
      role="img"
      aria-label={visual.accessibleLabel}
    >
      {hasGroups ? (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {visual.groups.map((count, index) => (
            <div key={`${visual.object}-${count}-${index}`} className="contents">
              {index > 0 && operator ? (
                <span className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-white px-3 text-xl font-black text-[#0B63F6] shadow-sm">
                  {operator}
                </span>
              ) : null}
              <ObjectGroup
                count={count}
                object={visual.object}
                crossedOut={visual.type === "subtraction" && index === 1}
                compact={compact}
              />
            </div>
          ))}
          {revealAnswer && visual.answerVisual ? (
            <>
              <span className="text-sm font-black uppercase text-[#0B63F6]">
                {visual.type === "comparison" ? "Answer" : "="}
              </span>
              <span className="inline-flex min-h-14 min-w-14 items-center justify-center rounded-2xl bg-[#DCFCE7] px-4 text-2xl font-black text-[#15803D] shadow-sm">
                {visual.answerVisual}
              </span>
            </>
          ) : null}
        </div>
      ) : null}

      {equation ? (
        <p className={`text-center font-black text-[#082B80] ${hasGroups ? "mt-4" : ""} ${compact ? "text-lg" : "text-2xl"}`}>
          {equation}
        </p>
      ) : null}
      {!hasGroups && revealAnswer && visual.answerVisual ? (
        <div className="mt-5 text-center">
          <span className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#DCFCE7] px-5 text-2xl font-black text-[#15803D] shadow-sm">
            Answer: {visual.answerVisual}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function ObjectGroup({
  count,
  object,
  crossedOut,
  compact,
}: {
  count: number;
  object: VisualObjectName;
  crossedOut: boolean;
  compact: boolean;
}) {
  const safeCount = Math.max(0, Math.min(12, Math.round(count)));
  const items = Array.from({ length: safeCount }, (_, index) => index);
  const isCounter = object === "number" || object === "object";

  return (
    <div
      className={`relative flex max-w-full flex-wrap justify-center gap-1.5 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#DDE8F5] ${crossedOut ? "opacity-55" : ""}`}
      aria-label={`${count} ${objectLabels[object]}`}
    >
      {items.map((index) => (
        <span
          key={index}
          aria-hidden="true"
          className={
            isCounter
              ? `flex items-center justify-center rounded-full bg-[#0B63F6] font-black text-white ${compact ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"}`
              : `${compact ? "text-2xl" : "text-3xl sm:text-4xl"} leading-none`
          }
        >
          {isCounter ? index + 1 : objectEmoji[object]}
        </span>
      ))}
      {crossedOut ? (
        <span className="pointer-events-none absolute inset-x-3 top-1/2 h-1 -rotate-6 rounded-full bg-[#EF4444]" />
      ) : null}
    </div>
  );
}