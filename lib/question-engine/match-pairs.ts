import type {
  MatchPair,
  MatchPairItem,
  NormalizedMatchPairsQuestion,
} from "@/data/question-engine-types";

export const matchPairsCompleteAnswer = "__learnplay_match_pairs_complete__";

export type MatchPairsSerializedState = {
  kind: "match-pairs-state";
  selectedLeftId: string | null;
  selectedRightId: string | null;
  matchedPairIds: string[];
  attempts: number;
  completed: boolean;
  lastResult: "correct" | "incorrect" | null;
};

export type MatchPairsSelectionState = MatchPairsSerializedState;

export type LegacyMatchPairBuildResult = {
  pairs: MatchPair[];
  warnings: string[];
};

function slugify(value: string, fallback: string) {
  const slug = value
    .trim()
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || fallback;
}

function normalizePairLabel(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeMatchPairComparable(value: string) {
  return normalizePairLabel(value).toLocaleLowerCase("en");
}

export function parseLegacyMatchPairText(value: string) {
  const text = normalizePairLabel(value);
  if (!text) return null;

  const separatorMatch = text.match(/\s*(?:=|->|→|-)\s*/);
  if (!separatorMatch?.[0]) return null;

  const separatorIndex = text.indexOf(separatorMatch[0]);
  const left = normalizePairLabel(text.slice(0, separatorIndex));
  const right = normalizePairLabel(text.slice(separatorIndex + separatorMatch[0].length));

  if (!left || !right) return null;
  return { left, right };
}

function itemId(side: "left" | "right", label: string, index: number) {
  return `${side}-${String(index + 1).padStart(2, "0")}-${slugify(label, "item")}`;
}

function pairId(left: string, right: string, index: number) {
  return `pair-${String(index + 1).padStart(2, "0")}-${slugify(left, "left")}-${slugify(right, "right")}`;
}

function uniquePairKey(left: string, right: string) {
  return `${normalizeMatchPairComparable(left)}=>${normalizeMatchPairComparable(right)}`;
}

export function buildLegacyMatchPairs({
  options,
  correctAnswer,
  questionId,
  visualRef,
}: {
  options: string[];
  correctAnswer: string;
  questionId: string;
  visualRef?: string;
}): LegacyMatchPairBuildResult {
  const warnings: string[] = [];
  const sourceItems = correctAnswer
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
  const fallbackItems = options.map((option) => option.trim()).filter(Boolean);
  const rawPairs = (sourceItems.length > 0 ? sourceItems : fallbackItems)
    .map(parseLegacyMatchPairText)
    .filter((pair): pair is { left: string; right: string } => pair !== null);

  if (rawPairs.length === 0) {
    warnings.push(
      `${questionId}: Match Pairs source did not include parseable left = right pair data.`,
    );
    return { pairs: [], warnings };
  }

  const seen = new Set<string>();
  const pairs: MatchPair[] = [];

  rawPairs.forEach((rawPair) => {
    const key = uniquePairKey(rawPair.left, rawPair.right);
    if (seen.has(key)) {
      warnings.push(
        `${questionId}: duplicate Match Pairs pair ignored: ${rawPair.left} = ${rawPair.right}.`,
      );
      return;
    }
    seen.add(key);
    const index = pairs.length;
    const left: MatchPairItem = {
      id: itemId("left", rawPair.left, index),
      label: rawPair.left,
      visualRef,
      accessibilityLabel: `Left item ${rawPair.left}`,
    };
    const right: MatchPairItem = {
      id: itemId("right", rawPair.right, index),
      label: rawPair.right,
      visualRef,
      accessibilityLabel: `Right item ${rawPair.right}`,
    };
    pairs.push({
      id: pairId(rawPair.left, rawPair.right, index),
      left,
      right,
    });
  });

  if (pairs.length < 2) {
    warnings.push(`${questionId}: Match Pairs should include at least 2 complete pairs.`);
  }

  return { pairs, warnings };
}

export function orderRightItemsForPreview(pairs: MatchPair[]) {
  if (pairs.length <= 2) return pairs.map((pair) => pair.right).reverse();
  const rightItems = pairs.map((pair) => pair.right);
  return [...rightItems.slice(1), rightItems[0]];
}

export function createInitialMatchPairsState(): MatchPairsSelectionState {
  return {
    kind: "match-pairs-state",
    selectedLeftId: null,
    selectedRightId: null,
    matchedPairIds: [],
    attempts: 0,
    completed: false,
    lastResult: null,
  };
}

export function serializeMatchPairsState(state: MatchPairsSelectionState) {
  return JSON.stringify(state);
}

export function parseMatchPairsState(value: string | null): MatchPairsSelectionState | null {
  if (!value) return null;
  if (value === matchPairsCompleteAnswer) {
    return {
      ...createInitialMatchPairsState(),
      completed: true,
      lastResult: "correct",
    };
  }

  try {
    const parsed = JSON.parse(value) as Partial<MatchPairsSelectionState>;
    if (parsed.kind !== "match-pairs-state") return null;
    return {
      kind: "match-pairs-state",
      selectedLeftId: parsed.selectedLeftId ?? null,
      selectedRightId: parsed.selectedRightId ?? null,
      matchedPairIds: Array.isArray(parsed.matchedPairIds) ? parsed.matchedPairIds : [],
      attempts: typeof parsed.attempts === "number" ? parsed.attempts : 0,
      completed: Boolean(parsed.completed),
      lastResult:
        parsed.lastResult === "correct" || parsed.lastResult === "incorrect"
          ? parsed.lastResult
          : null,
    };
  } catch {
    return null;
  }
}

export function findPairForSelection(
  question: NormalizedMatchPairsQuestion,
  leftId: string | null,
  rightId: string | null,
) {
  if (!leftId || !rightId) return null;
  return question.interaction.pairs.find(
    (pair) => pair.left.id === leftId && pair.right.id === rightId,
  );
}

export function isMatchPairsComplete(
  question: NormalizedMatchPairsQuestion,
  matchedPairIds: string[],
) {
  const matched = new Set(matchedPairIds);
  return question.answerSpec.pairIds.every((pairIdValue) => matched.has(pairIdValue));
}

export function selectMatchPairItem({
  question,
  state,
  side,
  itemId: selectedItemId,
}: {
  question: NormalizedMatchPairsQuestion;
  state: MatchPairsSelectionState;
  side: "left" | "right";
  itemId: string;
}): MatchPairsSelectionState {
  if (state.completed) return state;

  const matched = new Set(state.matchedPairIds);
  const selectedPair = question.interaction.pairs.find(
    (pair) => pair.left.id === selectedItemId || pair.right.id === selectedItemId,
  );
  if (selectedPair && matched.has(selectedPair.id)) return state;

  const nextState: MatchPairsSelectionState = {
    ...state,
    selectedLeftId: side === "left" ? selectedItemId : state.selectedLeftId,
    selectedRightId: side === "right" ? selectedItemId : state.selectedRightId,
    lastResult: null,
  };

  if (!nextState.selectedLeftId || !nextState.selectedRightId) return nextState;

  const correctPair = findPairForSelection(
    question,
    nextState.selectedLeftId,
    nextState.selectedRightId,
  );
  const nextMatchedIds = correctPair
    ? Array.from(new Set([...nextState.matchedPairIds, correctPair.id]))
    : nextState.matchedPairIds;
  const completed = isMatchPairsComplete(question, nextMatchedIds);

  return {
    ...nextState,
    selectedLeftId: correctPair ? null : nextState.selectedLeftId,
    selectedRightId: correctPair ? null : nextState.selectedRightId,
    matchedPairIds: nextMatchedIds,
    attempts: nextState.attempts + 1,
    completed,
    lastResult: correctPair ? "correct" : "incorrect",
  };
}
