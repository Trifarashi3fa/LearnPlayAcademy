"use client";

import { useEffect, type ReactNode } from "react";

type ExplanationDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function ExplanationDrawer({ open, onClose, children }: ExplanationDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <aside
      id="question-explanation-drawer"
      aria-label="Question explanation"
      aria-hidden={!open}
      className={`fixed inset-x-1 top-[max(0.25rem,env(safe-area-inset-top))] bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#DDE8F5] bg-white shadow-[0_-12px_40px_rgba(8,43,128,0.18)] transition duration-200 motion-reduce:transition-none sm:inset-x-3 lg:static lg:inset-auto lg:h-full lg:max-h-none lg:rounded-[1.75rem] lg:shadow-sm ${
        open
          ? "translate-y-0 opacity-100 lg:flex"
          : "pointer-events-none translate-y-[120%] opacity-0 lg:hidden"
      }`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-[#DDE8F5] px-3 py-2 sm:px-4">
        <div>
          <p className="text-xs font-black uppercase text-[#FF4FA0]">Learning Notes</p>
          <h2 className="text-lg font-black text-[#082B80]">Understand the answer</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[#EAF6FF] px-3 text-sm font-black text-[#082B80] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          aria-label="Close explanation"
        >
          Close
        </button>
      </div>
      <div className="min-h-0 flex-1 touch-pan-y overflow-hidden overscroll-contain p-2 sm:p-3" style={{ WebkitOverflowScrolling: "touch" }}>{children}</div>
    </aside>
  );
}