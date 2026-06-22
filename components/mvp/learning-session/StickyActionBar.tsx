"use client";

import Link from "next/link";

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
      className="sticky bottom-0 z-50 shrink-0 border-t border-[#DDE8F5] bg-white/95 px-3 pt-3 shadow-[0_-8px_24px_rgba(8,43,128,0.08)] backdrop-blur sm:px-5"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-label="Question actions"
    >
      <div className="mx-auto flex max-w-[96rem] items-center gap-2 sm:gap-3">
        <Link
          href="/mvp/world-map"
          className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#DDE8F5] px-4 text-sm font-black transition hover:border-[#0B63F6] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
        >
          Exit
        </Link>

        <p className="hidden min-w-0 flex-1 text-center text-sm font-bold text-[#5B6B94] md:block" aria-live="polite">
          {answered ? "Review the explanation or continue when ready." : "Choose one answer to continue."}
        </p>

        {answered ? (
          <button
            type="button"
            onClick={onToggleExplanation}
            aria-expanded={explanationOpen}
            aria-controls="question-explanation-drawer"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#EAF6FF] px-4 text-sm font-black text-[#0B63F6] transition hover:bg-[#DCEEFF] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            {explanationOpen ? "Hide notes" : "Explanation"}
          </button>
        ) : null}

        <button
          type="button"
          onClick={onNext}
          disabled={!answered}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#0B63F6] px-5 text-base font-black text-white shadow-sm transition hover:bg-[#084FC5] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 disabled:cursor-not-allowed disabled:bg-[#C9D7EA] disabled:text-[#5B6B94] sm:flex-none sm:min-w-44 motion-reduce:transition-none"
        >
          {answered ? (lastQuestion ? "Finish Level" : "Next Question") : "Select an answer"}
        </button>
      </div>
    </nav>
  );
}