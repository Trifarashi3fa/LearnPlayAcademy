"use client";

import { useMemo, useState } from "react";
import { PrimaryLink } from "@/components/mvp/MvpShell";
import { ExplanationTabs } from "@/components/mvp/explanation/ExplanationTabs";
import { ForestRewardScreen } from "@/components/mvp/explanation/ForestRewardScreen";
import { HintPanel } from "@/components/mvp/explanation/HintPanel";
import { LearnBotPanel } from "@/components/mvp/explanation/LearnBotPanel";
import { ProgressTracker } from "@/components/mvp/explanation/ProgressTracker";
import { QuestionCard } from "@/components/mvp/explanation/QuestionCard";
import { XPRewardCard } from "@/components/mvp/explanation/XPRewardCard";
import { calculateStars, useMvpProgress, type MvpProgress } from "@/components/mvp/useMvpProgress";
import { getLevelBonusXp, getQuestionLearningContent, type MvpLevel } from "@/data/mvp-forest-world";
import { forestWorldIdentity } from "@/data/forest-world-identity";

export function QuestionPlayer({ level }: { level: MvpLevel }) {
  const { progress, updateProgress } = useMvpProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);
  const currentQuestion = level.questions[questionIndex];
  const learningContent = useMemo(() => getQuestionLearningContent(currentQuestion), [currentQuestion]);
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(() => calculateStars(correctCount, level.questions.length), [correctCount, level.questions.length]);
  const answerXp = correctCount * 10;
  const levelBonusXp = getLevelBonusXp(level.level);
  const worldComplete = level.level === 10 && completed;
  const totalXpEarned = answerXp + levelBonusXp + (worldComplete ? 500 : 0);

  function chooseAnswer(answer: string) { if (selectedAnswer) return; setSelectedAnswer(answer); if (answer === currentQuestion.correctAnswer) setCorrectCount((current) => current + 1); }
  function nextQuestion() { if (questionIndex === level.questions.length - 1) { setCompleted(true); return; } setQuestionIndex((current) => current + 1); setSelectedAnswer(null); }
  function saveCompletion() {
    if (saved) return;
    const alreadyCompleted = progress.completedLevels.includes(level.level);
    const completedLevels = alreadyCompleted ? progress.completedLevels : [...progress.completedLevels, level.level].sort((a, b) => a - b);
    const existingStars = progress.levelStars[String(level.level)] ?? 0;
    const levelStars = Math.max(existingStars, starsEarned);
    const badges = [...progress.badges];
    if (level.level === 10 && !badges.includes(forestWorldIdentity.completionBadge)) badges.push(forestWorldIdentity.completionBadge);
    else if (!badges.includes(`Level ${level.level} Badge`)) badges.push(`Level ${level.level} Badge`);
    const next: MvpProgress = { ...progress, currentLevel: Math.min(10, Math.max(progress.currentLevel, level.level + 1)), xp: progress.xp + (alreadyCompleted ? answerXp : totalXpEarned), stars: progress.stars + Math.max(0, levelStars - existingStars), badges, completedLevels, levelStars: { ...progress.levelStars, [String(level.level)]: levelStars }, questionsAnswered: progress.questionsAnswered + level.questions.length, correctAnswers: progress.correctAnswers + correctCount };
    updateProgress(next); setSaved(true);
  }

  if (completed) {
    if (!saved) saveCompletion();
    return <ForestRewardScreen level={level.level} worldComplete={worldComplete} correctCount={correctCount} totalQuestions={level.questions.length} starsEarned={starsEarned} xpEarned={totalXpEarned} />;
  }

  return (
    <div className="space-y-5">
      <ProgressTracker level={level.level} nodeType={level.nodeType} questionNumber={questionIndex + 1} totalQuestions={level.questions.length} score={correctCount} xp={answerXp} />
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:items-start">
        <div className="order-2 lg:order-1"><HintPanel hint={learningContent.hint} type={learningContent.visual.type} /></div>
        <div className="order-1 space-y-5 lg:order-2"><QuestionCard question={currentQuestion} visual={learningContent.visual} selectedAnswer={selectedAnswer} onSelectAnswer={chooseAnswer} />{selectedAnswer ? <XPRewardCard correct={answeredCorrectly} xpGained={answeredCorrectly ? currentQuestion.xpReward : 0} levelXp={answerXp} /> : null}</div>
        <div className="order-3"><LearnBotPanel answered={Boolean(selectedAnswer)} correct={answeredCorrectly} tip={learningContent.learnBotTip} /></div>
        {selectedAnswer ? <div className="order-4 lg:col-span-3"><ExplanationTabs key={currentQuestion.id} content={learningContent} correctAnswer={currentQuestion.correctAnswer} /></div> : null}
      </div>
      <nav className="flex flex-col gap-3 rounded-[1.5rem] border border-[#DDE8F5] bg-white p-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Question controls"><PrimaryLink href="/mvp/world-map" tone="white">Back to World Map</PrimaryLink>{selectedAnswer ? <button type="button" onClick={nextQuestion} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-7 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">{questionIndex === level.questions.length - 1 ? "Finish Level" : "Next Question"}</button> : <p className="text-center text-sm font-bold text-[#5B6B94]">Select one answer to continue.</p>}</nav>
    </div>
  );
}