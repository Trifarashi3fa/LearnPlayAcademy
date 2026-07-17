import { MathObjectIcon } from "@/components/mvp/explanation/MathObjectIcon";
import type { VisualLearningModel } from "@/data/mvp-forest-world";
import { getObjectVisual, type VisualObjectName } from "@/data/object-visual-map";

const MAX_VISIBLE_OBJECTS = 10;

function safeCount(value: number | undefined) {
  return Number.isFinite(value) && value ? Math.max(0, Math.round(value)) : 0;
}

function labelFor(object: VisualObjectName, count: number) {
  const label = getObjectVisual(object);
  return count === 1 ? label.singular : label.plural;
}

function getGroupObject(visual: VisualLearningModel, index: number) {
  return visual.objects?.[index] ?? visual.object;
}

function getAnswerText(visual: VisualLearningModel, correctAnswer: string) {
  return visual.answerVisual ?? correctAnswer;
}

function getAnswerNumber(visual: VisualLearningModel, correctAnswer: string) {
  const answer = getAnswerText(visual, correctAnswer);
  const match = answer.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function ObjectStrip({
  object,
  count,
  crossed = 0,
  label,
  tone = "blue",
}: {
  object: VisualObjectName;
  count: number;
  crossed?: number;
  label?: string;
  tone?: "blue" | "green" | "yellow";
}) {
  const visibleCount = Math.min(safeCount(count), MAX_VISIBLE_OBJECTS);
  const extraCount = Math.max(0, safeCount(count) - visibleCount);
  const toneClass = {
    blue: "border-[#DDE8F5] bg-[#F8FBFF]",
    green: "border-[#22C55E]/45 bg-[#ECFDF3]",
    yellow: "border-[#FFD76A] bg-[#FFF9DB]",
  }[tone];

  return (
    <div className={`min-w-0 rounded-[0.9rem] border px-2 py-1.5 ${toneClass}`}>
      {label ? (
        <p className="mb-0.5 truncate text-[0.65rem] font-black uppercase tracking-wide text-[#5B6B94]">{label}</p>
      ) : null}
      <div className="flex min-h-7 flex-wrap items-center justify-center gap-1">
        {Array.from({ length: visibleCount }).map((_, index) => {
          const isCrossed = index < crossed;
          return (
            <span
              key={`${object}-${index}`}
              className={`relative flex h-6 w-6 items-center justify-center rounded-xl bg-white shadow-sm ${
                isCrossed ? "opacity-45" : ""
              }`}
              aria-hidden
            >
              <MathObjectIcon object={object} className="h-4 w-4" />
              {isCrossed ? (
                <span className="absolute left-1 right-1 top-1/2 h-0.5 -rotate-12 rounded-full bg-[#EF4444]" />
              ) : null}
            </span>
          );
        })}
        {extraCount > 0 ? (
          <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-[#082B80]">+{extraCount}</span>
        ) : null}
      </div>
    </div>
  );
}

function Operator({ children }: { children: string }) {
  return (
    <span className="mx-auto flex h-7 min-w-7 items-center justify-center rounded-xl bg-white px-2 text-base font-black text-[#0B63F6] shadow-sm">
      {children}
    </span>
  );
}

function AnswerPill({ children }: { children: string }) {
  return (
    <div className="flex min-h-8 items-center justify-center rounded-[1rem] border border-[#22C55E]/45 bg-[#DCFCE7] px-2.5 text-center text-base font-black text-[#15803D]">
      {children}
    </div>
  );
}

function NumberTile({ value, active = false }: { value: number; active?: boolean }) {
  return (
    <span
      className={`flex h-7 min-w-7 items-center justify-center rounded-xl px-2 text-sm font-black shadow-sm ${
        active ? "border-2 border-[#22C55E] bg-[#DCFCE7] text-[#15803D]" : "border border-[#DDE8F5] bg-white text-[#082B80]"
      }`}
    >
      {value}
    </span>
  );
}

function buildSequence(groups: number[], answerNumber: number | null) {
  const numbers = [...groups];
  if (answerNumber !== null && !numbers.includes(answerNumber)) numbers.push(answerNumber);
  return [...new Set(numbers)].sort((left, right) => left - right);
}

function CountingVisual({ visual, correctAnswer }: { visual: VisualLearningModel; correctAnswer: string }) {
  const total = safeCount(visual.groups[0]) || getAnswerNumber(visual, correctAnswer) || 0;
  const object = getGroupObject(visual, 0);

  return (
    <div className="grid gap-1.5">
      <ObjectStrip object={object} count={total} label={`Count ${labelFor(object, total)}`} tone="blue" />
      <div className="grid grid-cols-[auto_1fr] items-center gap-1.5">
        <Operator>=</Operator>
        <AnswerPill>{getAnswerText(visual, correctAnswer)}</AnswerPill>
      </div>
    </div>
  );
}

function AdditionVisual({ visual, correctAnswer }: { visual: VisualLearningModel; correctAnswer: string }) {
  const groups = visual.groups.map((count, index) => ({
    count: safeCount(count),
    object: getGroupObject(visual, index),
    label: `Group ${String.fromCharCode(65 + index)}: ${safeCount(count)}`,
  }));

  return (
    <div className="grid gap-1.5">
      <div className="flex flex-wrap items-stretch justify-center gap-1.5">
        {groups.map((group, index) => (
          <div key={`${group.object}-${group.count}-${index}`} className="flex min-w-0 flex-1 basis-[8rem] items-center gap-1.5">
            {index > 0 ? <Operator>+</Operator> : null}
            <div className="min-w-0 flex-1">
              <ObjectStrip object={group.object} count={group.count} label={group.label} tone="blue" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-1.5">
        <Operator>=</Operator>
        <AnswerPill>{getAnswerText(visual, correctAnswer)}</AnswerPill>
      </div>
    </div>
  );
}

function SubtractionVisual({ visual, correctAnswer }: { visual: VisualLearningModel; correctAnswer: string }) {
  const total = safeCount(visual.groups[0]);
  const removed = safeCount(visual.groups[1]);
  const remaining = getAnswerNumber(visual, correctAnswer) ?? Math.max(0, total - removed);
  const object = getGroupObject(visual, 0);

  return (
    <div className="grid gap-1.5">
      <ObjectStrip object={object} count={total} crossed={removed} label={`Start: ${total}`} tone="yellow" />
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1.5">
        <Operator>-</Operator>
        <p className="rounded-[1rem] bg-white px-2.5 py-1.5 text-sm font-black text-[#3F527E]">
          Cross out {removed}. Count what is left.
        </p>
      </div>
      <AnswerPill>{String(remaining) + " left"}</AnswerPill>
    </div>
  );
}

function ComparisonVisual({ visual, correctAnswer }: { visual: VisualLearningModel; correctAnswer: string }) {
  const first = safeCount(visual.groups[0]);
  const second = safeCount(visual.groups[1]);
  const firstObject = getGroupObject(visual, 0);
  const secondObject = getGroupObject(visual, 1);
  const answerNumber = getAnswerNumber(visual, correctAnswer);
  const firstIsAnswer = answerNumber === first && first !== second;
  const secondIsAnswer = answerNumber === second && first !== second;
  const relationship = visual.equation ?? `${first} ${first > second ? ">" : first < second ? "<" : "="} ${second}`;

  return (
    <div className="grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
      <ObjectStrip object={firstObject} count={first} label={`Group A: ${first}`} tone={firstIsAnswer ? "green" : "blue"} />
      <Operator>{visual.comparisonSymbol ?? (first === second ? "=" : "vs")}</Operator>
      <ObjectStrip object={secondObject} count={second} label={`Group B: ${second}`} tone={secondIsAnswer ? "green" : "blue"} />
      <div className="sm:col-span-3">
        <AnswerPill>{relationship}</AnswerPill>
      </div>
    </div>
  );
}

function SequenceVisual({ visual, correctAnswer }: { visual: VisualLearningModel; correctAnswer: string }) {
  const answerNumber = getAnswerNumber(visual, correctAnswer);
  const sequence = buildSequence(visual.groups, answerNumber);

  if (sequence.length === 0) {
    return (
      <div className="grid gap-1.5">
        <p className="rounded-[1rem] bg-[#F8FBFF] px-2.5 py-1.5 text-sm font-black text-[#3F527E]">
          Use the number clue in the question.
        </p>
        <AnswerPill>{getAnswerText(visual, correctAnswer)}</AnswerPill>
      </div>
    );
  }

  return (
    <div className="grid gap-1.5">
      <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-[1rem] border border-[#DDE8F5] bg-[#F8FBFF] p-2">
        {sequence.map((number, index) => (
          <span key={number} className="flex items-center gap-1.5">
            <NumberTile value={number} active={number === answerNumber} />
            {index < sequence.length - 1 ? <span className="text-sm font-black text-[#5B6B94]">-&gt;</span> : null}
          </span>
        ))}
      </div>
      <AnswerPill>{getAnswerText(visual, correctAnswer)}</AnswerPill>
    </div>
  );
}

export function CompactExplanationVisual({
  visual,
  correctAnswer,
}: {
  visual: VisualLearningModel;
  correctAnswer: string;
}) {
  const content = {
    counting: <CountingVisual visual={visual} correctAnswer={correctAnswer} />,
    addition: <AdditionVisual visual={visual} correctAnswer={correctAnswer} />,
    subtraction: <SubtractionVisual visual={visual} correctAnswer={correctAnswer} />,
    comparison: <ComparisonVisual visual={visual} correctAnswer={correctAnswer} />,
    matching: <CountingVisual visual={visual} correctAnswer={correctAnswer} />,
    none: <SequenceVisual visual={visual} correctAnswer={correctAnswer} />,
  }[visual.type];

  return (
    <div className="max-w-full overflow-visible rounded-[1rem] border border-[#DDE8F5] bg-white p-1.5">
      <p className="mb-1 text-[0.64rem] font-black uppercase tracking-wide text-[#FF4FA0]">Visual recap</p>
      {content}
    </div>
  );
}
