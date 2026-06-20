"use client";

import { useState } from "react";
import { VisualMath } from "@/components/mvp/explanation/VisualMath";
import type { QuestionLearningContent } from "@/data/mvp-forest-world";

type TabId = "steps" | "visual" | "voice" | "tip";

type ExplanationTabsProps = {
  content: QuestionLearningContent;
  correctAnswer: string;
};

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "steps", label: "Steps" },
  { id: "visual", label: "Visual" },
  { id: "voice", label: "Voice" },
  { id: "tip", label: "LearnBot Tip" },
];

export function ExplanationTabs({ content, correctAnswer }: ExplanationTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("steps");
  const [speaking, setSpeaking] = useState(false);

  function playVoice() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(content.voiceScript);
    voice.rate = 0.9;
    voice.pitch = 1.05;
    voice.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(voice);
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white shadow-sm">
      <div className="border-b border-[#DDE8F5] p-4 sm:p-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">
          Explanation Notes
        </p>
        <h2 className="mt-1 text-2xl font-black text-[#082B80]">Understand every step</h2>
        <div
          className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
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
              className={`min-h-11 rounded-full px-4 py-2 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${
                activeTab === tab.id
                  ? "bg-[#0B63F6] text-white"
                  : "bg-[#EAF6FF] text-[#082B80] hover:bg-[#DCEEFF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        id={`explanation-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`explanation-tab-${activeTab}`}
        className="min-h-80 p-5 sm:p-6"
      >
        {activeTab === "steps" ? (
          <div>
            <h3 className="text-xl font-black text-[#082B80]">Step-by-step</h3>
            <ol className="mt-5 space-y-4">
              {content.steps.map((step, index) => (
                <li key={`${step}-${index}`} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0B63F6] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base font-bold leading-7 text-[#5B6B94]">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl bg-[#DCFCE7] p-4">
              <p className="text-sm font-black text-[#15803D]">Answer: {correctAnswer}</p>
            </div>
          </div>
        ) : null}

        {activeTab === "visual" ? (
          <div>
            <h3 className="text-xl font-black text-[#082B80]">See the mathematics</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
              Use the objects and groups to check how the answer is built.
            </p>
            <div className="mt-5">
              <VisualMath visual={content.visual} revealAnswer />
            </div>
            <p className="mt-4 rounded-2xl bg-[#EAF6FF] p-4 text-sm font-bold leading-6 text-[#5B6B94]">
              {content.visualExplanation}
            </p>
          </div>
        ) : null}

        {activeTab === "voice" ? (
          <div>
            <h3 className="text-xl font-black text-[#082B80]">Listen to the explanation</h3>
            <p className="mt-4 text-base font-bold leading-7 text-[#5B6B94]">
              {content.voiceScript}
            </p>
            <button
              type="button"
              onClick={playVoice}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#8B5CF6] px-6 py-3 text-base font-black text-white transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/25"
            >
              {speaking ? "Playing explanation..." : "Play Voice Explanation"}
            </button>
            <p className="mt-3 text-xs font-bold text-[#5B6B94]">
              Voice playback uses the speech feature available on this device.
            </p>
          </div>
        ) : null}

        {activeTab === "tip" ? (
          <div>
            <h3 className="text-xl font-black text-[#082B80]">LearnBot Tip</h3>
            <div className="mt-5 rounded-[1.5rem] border border-[#BDE7D0] bg-[#EAFBF0] p-6">
              <p className="text-lg font-black leading-8 text-[#14532D]">
                {content.learnBotTip}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}