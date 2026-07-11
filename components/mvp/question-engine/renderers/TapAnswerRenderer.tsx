import type { NormalizedTapAnswerQuestion } from "@/data/question-engine-types";
import { MathObjectIcon } from "@/components/mvp/explanation/MathObjectIcon";
import type { VisualObjectName } from "@/data/object-visual-map";

type TapAnswerRendererProps = {
  question: NormalizedTapAnswerQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  compact?: boolean;
};

type ComparisonGroup = {
  id: string;
  label: string;
  count: number;
  object: string;
};

type AssetVisualMetadata = {
  comparisonGroups?: ComparisonGroup[];
  matchPairTodo?: boolean;
};

const supportedObjectNames = new Set<VisualObjectName>([
  "apple",
  "leaf",
  "mushroom",
  "pinecone",
  "fish",
  "bee",
  "star",
  "number",
  "stone",
]);

function getAssetVisualMetadata(value: unknown): AssetVisualMetadata {
  if (!value || typeof value !== "object") return {};
  const metadata = value as AssetVisualMetadata;
  return metadata;
}

function asVisualObjectName(value: string): VisualObjectName {
  return supportedObjectNames.has(value as VisualObjectName)
    ? (value as VisualObjectName)
    : "object";
}

function ComparisonGroupVisual({
  question,
  selectedAnswer,
}: {
  question: NormalizedTapAnswerQuestion;
  selectedAnswer: string | null;
}) {
  const metadata = getAssetVisualMetadata(question.visualMetadata);
  const groups = metadata.comparisonGroups;
  if (!groups?.length) return null;

  const answered = selectedAnswer !== null;

  return (
    <div className="mb-4 rounded-[1.25rem] border-2 border-[#DDE8F5] bg-[#F8FBFF] p-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#0B63F6]">
        Compare the groups
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {groups.map((group) => {
          const target = question.interaction.targets.find(
            (item) => item.label === group.label || item.id === group.id,
          );
          const correct = target?.id === question.answerSpec.correctTargetId;
          const selected =
            selectedAnswer === target?.label || selectedAnswer === target?.id;
          const highlighted = answered && correct;
          const objectName = asVisualObjectName(group.object);

          return (
            <div
              key={group.id}
              className={`rounded-[1.1rem] border-2 p-3 transition ${
                highlighted
                  ? "border-[#22C55E] bg-[#DCFCE7]"
                  : selected
                    ? "border-[#EF4444] bg-[#FEE2E2]"
                    : "border-[#DDE8F5] bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-black text-[#082B80]">{group.label}</p>
                <span className="rounded-full bg-[#EAF6FF] px-3 py-1 text-xs font-black text-[#0B63F6]">
                  {group.count} counters
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {Array.from({ length: group.count }, (_, index) => (
                  <MathObjectIcon
                    key={`${group.id}-${index}`}
                    object={objectName}
                    className={compactIconClass(group.count)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function compactIconClass(count: number) {
  return count > 7 ? "h-8 w-8" : "h-10 w-10";
}

export function TapAnswerRenderer({
  question,
  selectedAnswer,
  onSelectAnswer,
  compact = false,
}: TapAnswerRendererProps) {
  const answered = selectedAnswer !== null;
  const metadata = getAssetVisualMetadata(question.visualMetadata);

  return (
    <fieldset>
      <legend className="sr-only">Tap the correct answer</legend>
      <ComparisonGroupVisual question={question} selectedAnswer={selectedAnswer} />
      {metadata.matchPairTodo ? (
        <div className="mb-4 rounded-[1.1rem] border-2 border-[#FFD76A] bg-[#FFF7D6] p-3 text-sm font-black leading-6 text-[#082B80]">
          TODO: Match Pairs is previewing as tap-answer. A dedicated Match Pair
          interaction renderer is still needed before production activation.
        </div>
      ) : null}
      <div className="grid gap-2 sm:grid-cols-2">
        {question.interaction.targets.map((target) => {
          const selected = selectedAnswer === target.label || selectedAnswer === target.id;
          const correct = target.id === question.answerSpec.correctTargetId;
          const style = !answered
            ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EAF6FF]"
            : correct
              ? "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]"
              : selected
                ? "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]"
                : "border-[#DDE8F5] bg-white text-[#5B6B94] opacity-70";

          return (
            <button
              key={target.id}
              type="button"
              onClick={() => onSelectAnswer(target.label)}
              disabled={answered}
              aria-label={target.accessibilityLabel}
              aria-pressed={selected}
              className={`flex items-center gap-3 rounded-[1.1rem] border-2 px-4 text-left font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-default ${compact ? "min-h-14 py-2 text-base" : "min-h-20 py-4 text-lg"} ${style}`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-xl bg-[#EAF6FF] text-sm font-black text-[#0B63F6] ${compact ? "h-9 w-9" : "h-11 w-11"}`}
              >
                Tap
              </span>
              <span className="min-w-0 flex-1">{target.label}</span>
              {answered && correct ? (
                <span className="text-xs font-black uppercase text-[#15803D]">
                  Correct
                </span>
              ) : null}
              {answered && selected && !correct ? (
                <span className="text-xs font-black uppercase text-[#B91C1C]">
                  Review
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
