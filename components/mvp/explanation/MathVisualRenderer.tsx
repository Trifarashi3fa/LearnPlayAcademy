import type { ReactNode } from "react";
import { objectVisualMap, type VisualObjectName } from "@/data/object-visual-map";
import { MathObjectIcon } from "@/components/mvp/explanation/MathObjectIcon";
import type {
  VisualLearningModel,
  VisualSceneContext,
} from "@/data/mvp-forest-world";

type MathVisualRendererProps = {
  visual: VisualLearningModel;
  revealAnswer: boolean;
  compact?: boolean;
};

export function MathVisualRenderer({
  visual,
  revealAnswer,
  compact = false,
}: MathVisualRendererProps) {
  if (visual.type === "subtraction" && visual.groups.length >= 2) {
    return <SubtractionVisual visual={visual} revealAnswer={revealAnswer} compact={compact} />;
  }

  if (visual.type === "comparison" && visual.groups.length >= 2) {
    return <ComparisonVisual visual={visual} revealAnswer={revealAnswer} compact={compact} />;
  }

  const operator = visual.type === "addition"
    ? "+"
    : visual.type === "matching"
      ? "matches"
      : null;
  const hasGroups = visual.groups.length > 0;
  const equation = revealAnswer
    ? visual.equation
    : visual.equation?.replace(/=\s*.+$/, "= ?");

  if (!hasGroups && !equation && !(revealAnswer && visual.answerVisual)) return null;

  return (
    <VisualFrame visual={visual} compact={compact}>
      {hasGroups ? (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {visual.groups.map((count, index) => (
            <div key={`${visual.object}-${count}-${index}`} className="contents">
              {index > 0 && operator ? <Operator value={operator} /> : null}
              <ObjectGroup
                count={count}
                object={visual.objects?.[index] ?? visual.object}
                context={visual.context}
                compact={compact}
              />
            </div>
          ))}
          {visual.type === "matching" && !revealAnswer ? <Operator value="?" /> : null}
          {revealAnswer && visual.answerVisual ? (
            <><Operator value="=" /><Answer value={visual.answerVisual} /></>
          ) : null}
        </div>
      ) : null}
      {equation ? (
        <p className={`text-center font-black text-[#082B80] ${hasGroups ? "mt-4" : ""} ${compact ? "text-lg" : "text-2xl"}`}>
          {equation}
        </p>
      ) : null}
      {!hasGroups && revealAnswer && visual.answerVisual ? (
        <div className="mt-5 text-center"><Answer value={visual.answerVisual} prefix="Answer: " /></div>
      ) : null}
    </VisualFrame>
  );
}

function SubtractionVisual({ visual, revealAnswer, compact = false }: MathVisualRendererProps) {
  const total = visual.groups[0];
  const removed = visual.groups[1];
  const remaining = Math.max(0, total - removed);

  return (
    <VisualFrame visual={visual} compact={compact}>
      <div className="text-center">
        <p className="mb-3 text-xs font-black uppercase text-[#5B6B94]">
          Start with {total}. Cross out {removed}.
        </p>
        <ObjectGroup
          count={total}
          object={visual.objects?.[0] ?? visual.object}
          context={visual.context}
          compact={compact}
          crossOutCount={removed}
        />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <span className="text-xl font-black text-[#082B80]">{total}</span>
          <Operator value="-" />
          <span className="text-xl font-black text-[#EF4444]">{removed}</span>
          <Operator value="=" />
          {revealAnswer ? <Answer value={String(remaining)} /> : <Operator value="?" />}
        </div>
        {revealAnswer ? (
          <div className="mt-5">
            <p className="mb-2 text-xs font-black uppercase text-[#15803D]">{remaining} left</p>
            <ObjectGroup count={remaining} object={visual.objects?.[0] ?? visual.object} context="none" compact />
          </div>
        ) : null}
      </div>
    </VisualFrame>
  );
}

function ComparisonVisual({ visual, revealAnswer, compact = false }: MathVisualRendererProps) {
  const [first, second] = visual.groups;
  const symbol = visual.comparisonSymbol ?? (first > second ? ">" : "<");
  const firstObject = visual.objects?.[0] ?? visual.object;
  const secondObject = visual.objects?.[1] ?? visual.object;
  const answerNumber = Number(visual.answerVisual?.match(/\d+/)?.[0]);
  return (
    <VisualFrame visual={visual} compact={compact}>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <ComparisonGroup label={`Group A: ${first} ${objectVisualMap[firstObject].plural}`} correct={revealAnswer && answerNumber === first}><ObjectGroup count={first} object={firstObject} context={visual.context} compact={compact} /></ComparisonGroup>
        <Operator value={symbol} />
        <ComparisonGroup label={`Group B: ${second} ${objectVisualMap[secondObject].plural}`} correct={revealAnswer && answerNumber === second}><ObjectGroup count={second} object={secondObject} context={visual.context} compact={compact} /></ComparisonGroup>
      </div>
      {revealAnswer && visual.answerVisual ? <div className="mt-5 text-center"><Answer value={visual.answerVisual} prefix="Correct group: " /></div> : null}
    </VisualFrame>
  );
}

function ComparisonGroup({ label, correct, children }: { label: string; correct: boolean; children: ReactNode }) {
  return <div className={`rounded-[1.5rem] border-2 p-3 ${correct ? "border-[#22C55E] bg-[#DCFCE7]" : "border-transparent bg-white"}`}><p className="mb-3 text-center text-sm font-black text-[#082B80]">{label}</p>{children}</div>;
}
function VisualFrame({
  visual,
  compact,
  children,
}: {
  visual: VisualLearningModel;
  compact: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border border-[#DDE8F5] bg-[#F8FBFF] ${compact ? "p-4" : "p-5 sm:p-6"}`}
      role="img"
      aria-label={visual.accessibleLabel}
    >
      {children}
    </div>
  );
}

function ObjectGroup({
  count,
  object,
  context,
  compact,
  crossOutCount = 0,
}: {
  count: number;
  object: VisualObjectName;
  context: VisualSceneContext;
  compact: boolean;
  crossOutCount?: number;
}) {
  const safeCount = Math.max(0, Math.min(12, Math.round(count)));
  const items = Array.from({ length: safeCount }, (_, index) => index);
  const firstCrossedIndex = Math.max(0, safeCount - crossOutCount);

  return (
    <ContextScene context={context}>
      <div className="flex max-w-full flex-wrap justify-center gap-1.5" aria-label={`${count} ${objectVisualMap[object].plural}`}>
        {items.map((index) => {
          const crossed = crossOutCount > 0 && index >= firstCrossedIndex;
          return (
            <span key={index} className={`relative inline-flex ${crossed ? "opacity-45" : ""}`}>
              {object === "number" || object === "object" ? (
                <span className={`flex items-center justify-center rounded-full bg-[#0B63F6] font-black text-white ${compact ? "h-8 w-8 text-xs" : "h-11 w-11 text-sm"}`}>
                  {index + 1}
                </span>
              ) : (
                <MathObjectIcon object={object} className={compact ? "h-9 w-9" : "h-12 w-12 sm:h-14 sm:w-14"} />
              )}
              {crossed ? <span className="pointer-events-none absolute left-0 top-1/2 h-1 w-full -rotate-45 rounded-full bg-[#EF4444]" /> : null}
            </span>
          );
        })}
      </div>
    </ContextScene>
  );
}

function ContextScene({ context, children }: { context: VisualSceneContext; children: ReactNode }) {
  if (context === "basket") {
    return (
      <div className="relative min-w-44 pt-5">
        <span className="absolute left-1/2 top-0 h-16 w-32 -translate-x-1/2 rounded-t-full border-4 border-b-0 border-[#B96D18]" />
        <div className="relative rounded-b-[1.5rem] rounded-t-xl border-4 border-[#B96D18] bg-[#F6B94F] p-3 shadow-inner">{children}</div>
      </div>
    );
  }
  const sceneClass = {
    branch: "border-b-8 border-[#8B5A2B] bg-[#EAF6FF]",
    forest: "border-b-8 border-[#66CC00] bg-[#EAFBF0]",
    box: "border-4 border-[#B96D18] bg-[#F6B94F]",
    bag: "border-4 border-[#C58A42] bg-[#F5D39B]",
    path: "border-b-8 border-[#9CA3AF] bg-[#F3F4F6]",
    water: "border-b-8 border-[#38BDF8] bg-[#E0F7FF]",
    none: "border border-[#DDE8F5] bg-white",
  }[context];
  return <div className={`min-w-32 rounded-2xl p-3 shadow-sm ${sceneClass}`}>{children}</div>;
}

function Operator({ value }: { value: string }) {
  return <span className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-white px-3 text-xl font-black text-[#0B63F6] shadow-sm">{value}</span>;
}

function Answer({ value, prefix = "" }: { value: string; prefix?: string }) {
  return <span className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#DCFCE7] px-4 text-2xl font-black text-[#15803D] shadow-sm">{prefix}{value}</span>;
}