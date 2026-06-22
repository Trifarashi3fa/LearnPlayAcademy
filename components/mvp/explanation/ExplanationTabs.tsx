"use client";

import { useState } from "react";
import { MathVisualRenderer } from "@/components/mvp/explanation/MathVisualRenderer";
import type { QuestionLearningContent } from "@/data/mvp-forest-world";

type TabId = "steps" | "visual" | "voice" | "tip";
const tabs: Array<{ id: TabId; label: string }> = [{ id: "steps", label: "Steps" }, { id: "visual", label: "Visual" }, { id: "voice", label: "Voice" }, { id: "tip", label: "LearnBot Tip" }];

export function ExplanationTabs({ content, correctAnswer, compact = false }: { content: QuestionLearningContent; correctAnswer: string; compact?: boolean }) {
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
    <section className={`flex min-h-0 flex-col overflow-hidden bg-white ${compact ? "h-full rounded-[1.25rem]" : "rounded-[2rem] border border-[#DDE8F5] shadow-sm"}`}>
      <div className={`shrink-0 border-b border-[#DDE8F5] ${compact ? "p-3" : "p-5 sm:p-6"}`}>
        {!compact ? <><p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Explanation Notes</p><h2 className="mt-1 text-3xl font-black text-[#082B80]">Learn how the answer works</h2></> : null}
        <div className={`${compact ? "grid grid-cols-2 gap-1.5 sm:flex sm:flex-nowrap sm:gap-2" : "mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"}`} role="tablist" aria-label="Question explanation">
          {tabs.map((tab) => (
            <button key={tab.id} id={`explanation-tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`explanation-panel-${tab.id}`} onClick={() => setActiveTab(tab.id)} className={`min-h-11 flex-1 rounded-full px-2 py-2 text-xs font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 sm:min-h-12 sm:px-3 sm:text-sm ${activeTab === tab.id ? "bg-[#0B63F6] text-white" : "bg-[#EAF6FF] text-[#082B80] hover:bg-[#DCEEFF]"}`}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div id={`explanation-panel-${activeTab}`} role="tabpanel" aria-labelledby={`explanation-tab-${activeTab}`} className={`min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain ${compact ? "p-3 pb-6" : "min-h-80 p-5 sm:p-7"}`} style={{ WebkitOverflowScrolling: "touch" }}>
        {activeTab === "steps" ? <div><h3 className="text-xl font-black text-[#082B80]">Step-by-step</h3><ol className="mt-3 grid gap-3">{content.steps.map((step, index) => <li key={`${step}-${index}`} className="rounded-[1.1rem] bg-[#F8FBFF] p-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B63F6] text-sm font-black text-white">{index + 1}</span><p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{step}</p></li>)}</ol><div className="mt-3 rounded-2xl bg-[#DCFCE7] p-3 text-center text-lg font-black text-[#15803D]">Final answer: {correctAnswer}</div></div> : null}
        {activeTab === "visual" ? <div><h3 className="text-xl font-black text-[#082B80]">See the mathematics</h3><p className="mt-2 text-sm font-bold text-[#5B6B94]">Follow the groups, operator, and highlighted answer.</p><div className="mt-3"><MathVisualRenderer visual={content.visual} revealAnswer compact={compact} /></div><p className="mt-3 rounded-2xl bg-[#EAF6FF] p-3 text-sm font-bold leading-6 text-[#5B6B94]">{content.visualExplanation}</p></div> : null}
        {activeTab === "voice" ? <div><h3 className="text-xl font-black text-[#082B80]">Listen and learn</h3><p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">{content.voiceScript}</p><button type="button" onClick={playVoice} className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[#8B5CF6] px-5 py-3 text-base font-black text-white focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/25">{speaking ? "Playing explanation..." : "Play Voice Explanation"}</button></div> : null}
        {activeTab === "tip" ? <div><h3 className="text-xl font-black text-[#082B80]">LearnBot Tip</h3><div className="mt-3 rounded-[1.25rem] border border-[#BDE7D0] bg-[#EAFBF0] p-4"><p className="text-base font-black leading-7 text-[#14532D]">{content.learnBotTip}</p><p className="mt-2 text-sm font-bold text-[#5B6B94]">Keep going. Careful thinking grows stronger with every question.</p></div></div> : null}
      </div>
    </section>
  );
}