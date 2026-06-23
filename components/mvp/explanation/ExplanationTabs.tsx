"use client";

import { useState } from "react";
import { MathVisualRenderer } from "@/components/mvp/explanation/MathVisualRenderer";
import type { QuestionLearningContent } from "@/data/mvp-forest-world";

type TabId = "steps" | "visual" | "voice" | "tip";
const tabs: Array<{ id: TabId; label: string }> = [
  { id: "steps", label: "Steps" },
  { id: "visual", label: "Visual" },
  { id: "voice", label: "Voice" },
  { id: "tip", label: "LearnBot Tip" },
];

function getAnswerNumber(answer: string) {
  const match = answer.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function NumberLine({ answer }: { answer: string }) {
  const answerNumber = getAnswerNumber(answer);
  if (!Number.isFinite(answerNumber)) return null;
  const numericAnswer = Number(answerNumber);
  const max = Math.max(10, Math.min(12, numericAnswer));
  const numbers = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <div className="rounded-[1.25rem] border border-[#DDE8F5] bg-white p-3">
      <p className="text-sm font-black text-[#082B80]">Number line</p>
      <div className="mt-3 max-w-full overflow-hidden">
        <div className="relative flex max-w-full items-center justify-between gap-1">
          <span className="absolute left-0 right-0 top-4 h-0.5 bg-[#B8C5D9]" aria-hidden />
          {numbers.map((number) => {
            const active = number === numericAnswer;
            return (
              <span key={number} className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-1">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${active ? "bg-[#66CC00] text-white" : "bg-[#EAF6FF] text-[#5B6B94]"}`}>
                  {number}
                </span>
                <span className={`text-[0.65rem] font-black ${active ? "text-[#15803D]" : "text-[#5B6B94]"}`}>
                  {number}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ExplanationTabs({
  content,
  correctAnswer,
  compact = false,
}: {
  content: QuestionLearningContent;
  correctAnswer: string;
  compact?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("steps");
  const [speaking, setSpeaking] = useState(false);

  function playVoice() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(content.voiceScript);
    voice.rate = 0.88;
    voice.pitch = 1.05;
    voice.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(voice);
  }

  return (
    <section
      className={`flex min-h-0 max-w-full flex-col overflow-hidden overflow-x-hidden bg-white ${
        compact ? "h-full rounded-[1.25rem]" : "rounded-[2rem] border border-[#DDE8F5] shadow-sm"
      }`}
    >
      <div className={`shrink-0 border-b border-[#DDE8F5] ${compact ? "p-3" : "p-5 sm:p-6"}`}>
        {!compact ? (
          <>
            <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Explanation Notes</p>
            <h2 className="mt-1 break-words text-3xl font-black text-[#082B80]">Learn how the answer works</h2>
          </>
        ) : null}
        <div
          className={`${compact ? "grid grid-cols-2 gap-1.5 md:flex md:flex-wrap md:gap-2" : "mt-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap"}`}
          role="tablist"
          aria-label="Question explanation"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`explanation-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`explanation-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-11 min-w-0 rounded-full px-2 py-2 text-xs font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 sm:min-h-12 sm:px-3 sm:text-sm md:flex-1 ${
                activeTab === tab.id ? "bg-[#0B63F6] text-white" : "bg-[#EAF6FF] text-[#082B80] hover:bg-[#DCEEFF]"
              }`}
            >
              <span className="block whitespace-normal break-words leading-tight">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        id={`explanation-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`explanation-tab-${activeTab}`}
        className={`min-h-0 min-w-0 flex-1 touch-pan-y overflow-y-auto overflow-x-hidden overscroll-contain ${
          compact ? "p-3 pb-6" : "min-h-80 p-5 sm:p-7"
        }`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {activeTab === "steps" ? (
          <div className="max-w-full overflow-x-hidden break-words">
            <h3 className="text-xl font-black text-[#082B80]">Step-by-step</h3>
            <ol className="mt-3 grid max-w-full gap-3">
              {content.steps.map((step, index) => (
                <li key={`${step}-${index}`} className="min-w-0 rounded-[1.1rem] bg-[#F8FBFF] p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B63F6] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="mt-2 break-words text-sm font-bold leading-6 text-[#5B6B94]">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-3 max-w-full rounded-2xl bg-[#DCFCE7] p-3 text-center text-lg font-black text-[#15803D]">
              Final answer: <span className="break-words">{correctAnswer}</span>
            </div>
          </div>
        ) : null}

        {activeTab === "visual" ? (
          <div className="grid max-w-full gap-3 overflow-x-hidden break-words">
            <div>
              <h3 className="text-xl font-black text-[#082B80]">See the mathematics</h3>
              <p className="mt-2 text-sm font-bold text-[#5B6B94]">Follow the groups, operator, and highlighted answer.</p>
            </div>
            <div className="max-w-full overflow-x-hidden [&_img]:h-auto [&_img]:max-w-full [&_img]:object-contain">
              <MathVisualRenderer visual={content.visual} revealAnswer compact={compact} fitNarrow />
            </div>
            <div className="rounded-[1.25rem] border border-[#DDE8F5] bg-[#F8FBFF] p-3">
              <p className="text-sm font-black text-[#082B80]">Why this works</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{content.visualExplanation}</p>
            </div>
            <NumberLine answer={correctAnswer} />
            <div className="max-w-full rounded-[1.25rem] border border-[#22C55E] bg-[#F0FDF4] p-3 text-sm font-bold leading-6 text-[#14532D]">
              <span className="font-black text-[#082B80]">Answer: </span>
              <span className="break-words">{correctAnswer}</span>
            </div>
          </div>
        ) : null}

        {activeTab === "voice" ? (
          <div className="max-w-full overflow-x-hidden break-words">
            <h3 className="text-xl font-black text-[#082B80]">Listen and learn</h3>
            <p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">{content.voiceScript}</p>
            <button
              type="button"
              onClick={playVoice}
              className="mt-4 inline-flex min-h-12 max-w-full items-center justify-center whitespace-normal break-words rounded-full bg-[#8B5CF6] px-5 py-3 text-center text-base font-black text-white focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/25"
            >
              {speaking ? "Playing explanation..." : "Play Voice Explanation"}
            </button>
          </div>
        ) : null}

        {activeTab === "tip" ? (
          <div className="max-w-full overflow-x-hidden break-words">
            <h3 className="text-xl font-black text-[#082B80]">LearnBot Tip</h3>
            <div className="mt-3 min-w-0 rounded-[1.25rem] border border-[#BDE7D0] bg-[#EAFBF0] p-4">
              <p className="break-words text-base font-black leading-7 text-[#14532D]">{content.learnBotTip}</p>
              <p className="mt-2 break-words text-sm font-bold text-[#5B6B94]">
                Keep going. Careful thinking grows stronger with every question.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}