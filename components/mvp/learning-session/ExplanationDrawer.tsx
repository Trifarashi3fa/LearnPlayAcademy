"use client";

import { useEffect, type ReactNode } from "react";
import { MvpButton } from "@/components/mvp/MvpUi";

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
      aria-label="Answer explanation"
      aria-hidden={!open}
      className={`fixed inset-x-2 bottom-[calc(4.7rem+env(safe-area-inset-bottom))] z-40 flex max-h-[min(74dvh,34rem)] min-h-0 max-w-full flex-col overflow-hidden overflow-x-hidden rounded-[1.35rem] border border-[#BDE7D0] bg-white shadow-[0_-14px_44px_rgba(8,43,128,0.18)] transition duration-200 motion-reduce:transition-none sm:inset-x-4 lg:static lg:inset-auto lg:h-auto lg:max-h-none lg:w-full lg:min-w-0 lg:overflow-visible lg:rounded-[1.5rem] lg:shadow-playful ${
        open
          ? "translate-y-0 opacity-100 lg:flex"
          : "pointer-events-none translate-y-[112%] opacity-0 lg:hidden"
      }`}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#DDE8F5] bg-white px-3 py-1.5 sm:px-4">
        <div className="min-w-0">
          <p className="text-[0.65rem] font-black uppercase tracking-wide text-[#FF4FA0]">Quick explanation</p>
          <h2 className="break-words text-base font-black leading-tight text-[#082B80]">See why it works</h2>
        </div>
        <MvpButton tone="soft" size="sm" onClick={onClose} aria-label="Close explanation" className="min-h-10 shrink-0 px-3">
          Close
        </MvpButton>
      </div>
      <div
        className="min-h-0 min-w-0 flex-1 touch-pan-y overflow-hidden overscroll-contain p-2 lg:overflow-visible"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>
    </aside>
  );
}