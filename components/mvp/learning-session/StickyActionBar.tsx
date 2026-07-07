"use client";

import { MvpButton, MvpButtonLink } from "@/components/mvp/MvpUi";

type StickyActionBarProps = {
  answered: boolean;
  lastQuestion: boolean;
  explanationOpen: boolean;
  onToggleExplanation: () => void;
  onNext: () => void;
};

export function StickyActionBar({
  answered,
  lastQuestion,
  explanationOpen,
  onToggleExplanation,
  onNext,
}: StickyActionBarProps) {
  return (
    <nav
      className="min-h-[4.7rem] border-t border-[#DDE8F5] bg-white/95 px-2 pt-2 shadow-[0_-8px_24px_rgba(8,43,128,0.1)] backdrop-blur sm:px-5 sm:pt-3"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Question actions"
    >
      <div className="mx-auto grid max-w-[96rem] min-w-0 grid-cols-[auto_1fr] items-center gap-2 sm:flex sm:gap-3">
        <MvpButtonLink href="/mvp/world-map" tone="white" className="shrink-0 px-3 sm:px-4">
          Exit
        </MvpButtonLink>

        <p className="hidden min-w-0 flex-1 text-center text-sm font-bold text-[#5B6B94] md:block" aria-live="polite">
          {answered ? "Check the notes, then continue your mission." : "Choose an answer to unlock the learning notes."}
        </p>

        {answered ? (
          <MvpButton
            tone="soft"
            onClick={onToggleExplanation}
            aria-expanded={explanationOpen}
            aria-controls="question-explanation-drawer"
            className="shrink-0 px-3 sm:px-4"
          >
            {explanationOpen ? "Hide notes" : "Learning notes"}
          </MvpButton>
        ) : null}

        <MvpButton
          onClick={onNext}
          disabled={!answered}
          className="col-span-2 min-w-0 px-4 sm:col-span-1 sm:flex-none sm:min-w-48"
        >
          {answered ? (lastQuestion ? "Finish Level" : "Next Question") : "Select an answer"}
        </MvpButton>
      </div>
    </nav>
  );
}
