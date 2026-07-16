"use client";

import { useEffect, useState } from "react";

import type {
  MatchPair,
  MatchPairItem,
  NormalizedMatchPairsQuestion,
} from "@/data/question-engine-types";
import {
  createInitialMatchPairsState,
  parseMatchPairsState,
  selectMatchPairItem,
  serializeMatchPairsState,
  type MatchPairsSelectionState,
} from "@/lib/question-engine/match-pairs";

type MatchPairsRendererProps = {
  question: NormalizedMatchPairsQuestion;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string | null) => void;
  compact?: boolean;
};

function findPairForItem(question: NormalizedMatchPairsQuestion, itemId: string) {
  return question.interaction.pairs.find(
    (pair) => pair.left.id === itemId || pair.right.id === itemId,
  );
}

function itemState({
  item,
  side,
  question,
  state,
}: {
  item: MatchPairItem;
  side: "left" | "right";
  question: NormalizedMatchPairsQuestion;
  state: MatchPairsSelectionState;
}) {
  const pair = findPairForItem(question, item.id);
  const matched = pair ? state.matchedPairIds.includes(pair.id) : false;
  const selected = side === "left" ? state.selectedLeftId === item.id : state.selectedRightId === item.id;
  const incorrect =
    selected &&
    state.lastResult === "incorrect" &&
    state.selectedLeftId !== null &&
    state.selectedRightId !== null;

  if (matched) {
    return "border-[#22C55E] bg-[#DCFCE7] text-[#14532D]";
  }
  if (incorrect) {
    return "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]";
  }
  if (selected) {
    return "border-[#0B63F6] bg-[#EAF6FF] text-[#082B80] ring-4 ring-[#0B63F6]/15";
  }
  return "border-[#DDE8F5] bg-white text-[#082B80] hover:border-[#0B63F6] hover:bg-[#EAF6FF]";
}

function PairColumn({
  title,
  side,
  items,
  question,
  state,
  compact,
  onChoose,
}: {
  title: string;
  side: "left" | "right";
  items: MatchPairItem[];
  question: NormalizedMatchPairsQuestion;
  state: MatchPairsSelectionState;
  compact: boolean;
  onChoose: (side: "left" | "right", itemId: string) => void;
}) {
  return (
    <div className="min-w-0 rounded-[1.25rem] border-2 border-[#DDE8F5] bg-[#F8FBFF] p-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#0B63F6]">
        {title}
      </p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => {
          const pair = findPairForItem(question, item.id);
          const locked = pair ? state.matchedPairIds.includes(pair.id) : false;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChoose(side, item.id)}
              disabled={locked || state.completed}
              aria-label={item.accessibilityLabel}
              aria-pressed={
                side === "left"
                  ? state.selectedLeftId === item.id
                  : state.selectedRightId === item.id
              }
              className={`flex min-h-12 items-center justify-between gap-3 rounded-[1rem] border-2 px-3 text-left font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-default ${compact ? "py-2 text-sm" : "py-3 text-base"} ${itemState({ item, side, question, state })}`}
            >
              <span className="min-w-0 flex-1 break-words">{item.label}</span>
              {locked ? (
                <span className="rounded-full bg-white px-2 py-1 text-[0.7rem] font-black uppercase text-[#15803D]">
                  Matched
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MatchedPairsSummary({
  question,
  state,
}: {
  question: NormalizedMatchPairsQuestion;
  state: MatchPairsSelectionState;
}) {
  const matched = new Set(state.matchedPairIds);
  const matchedPairs = question.interaction.pairs.filter((pair) => matched.has(pair.id));

  return (
    <div className="rounded-[1.1rem] border-2 border-[#BFD7FF] bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-black text-[#082B80]">
          Matched {state.matchedPairIds.length} of {question.interaction.pairs.length}
        </p>
        <span className="rounded-full bg-[#FFF7D6] px-3 py-1 text-xs font-black text-[#082B80]">
          Attempts: {state.attempts}
        </span>
      </div>
      {matchedPairs.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {matchedPairs.map((pair: MatchPair) => (
            <span
              key={pair.id}
              className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-black text-[#14532D]"
            >
              {pair.left.label} = {pair.right.label}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-xs font-bold text-[#5B6B94]">
          Tap one item from each side to make a match.
        </p>
      )}
    </div>
  );
}

export function MatchPairsRenderer({
  question,
  selectedAnswer,
  onSelectAnswer,
  compact = false,
}: MatchPairsRendererProps) {
  const [state, setState] = useState<MatchPairsSelectionState>(() =>
  createInitialMatchPairsState(),
);

  useEffect(() => {
    setState(createInitialMatchPairsState());
  }, [question.questionId]);

  useEffect(() => {
    if (selectedAnswer === null) {
      setState(createInitialMatchPairsState());
    }
  }, [selectedAnswer]);

  function publish(nextState: MatchPairsSelectionState) {
    setState(nextState);
    onSelectAnswer(serializeMatchPairsState(nextState));
  }

  function choose(side: "left" | "right", itemId: string) {
    publish(selectMatchPairItem({ question, state, side, itemId }));
  }

  function reset() {
    setState(createInitialMatchPairsState());
    onSelectAnswer(null);
  }

  const parsedExternalState = parseMatchPairsState(selectedAnswer);
  const displayState = parsedExternalState ?? state;

  return (
    <fieldset className="grid gap-3">
      <legend className="sr-only">Match each pair</legend>
      <div className="rounded-[1.25rem] border-2 border-[#DDE8F5] bg-[#F8FBFF] p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-wide text-[#0B63F6]">
            Match pairs
          </p>
          <span className="rounded-full bg-[#EAF6FF] px-3 py-1 text-xs font-black text-[#0B63F6]">
            {displayState.completed ? "Complete" : "Tap left, then right"}
          </span>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
          <PairColumn
            title="Left side"
            side="left"
            items={question.interaction.leftItems}
            question={question}
            state={displayState}
            compact={compact}
            onChoose={choose}
          />
          <div className="flex items-center justify-center text-2xl font-black text-[#0B63F6]">
            =
          </div>
          <PairColumn
            title="Right side"
            side="right"
            items={question.interaction.rightItems}
            question={question}
            state={displayState}
            compact={compact}
            onChoose={choose}
          />
        </div>
      </div>

      <MatchedPairsSummary question={question} state={displayState} />

      {displayState.lastResult === "incorrect" ? (
        <p className="rounded-[1rem] border-2 border-[#FCA5A5] bg-[#FEE2E2] p-3 text-sm font-black text-[#7F1D1D]">
          Nice try. Pick the item that has the same meaning.
        </p>
      ) : null}

      {displayState.completed ? (
        <p
          className="rounded-[1rem] border-2 border-[#22C55E] bg-[#DCFCE7] p-3 text-sm font-black text-[#14532D]"
          role="status"
        >
          Great matching. All pairs are complete.
        </p>
      ) : null}

      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-[#BFD7FF] bg-white px-5 py-3 text-sm font-black text-[#082B80] transition hover:border-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 sm:w-auto"
      >
        Reset pairs
      </button>
    </fieldset>
  );
}
