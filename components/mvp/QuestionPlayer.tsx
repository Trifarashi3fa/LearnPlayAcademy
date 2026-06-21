"use client";

import { useMemo, useRef, useState } from "react";
import { PrimaryLink } from "@/components/mvp/MvpShell";
import { ExplanationTabs } from "@/components/mvp/explanation/ExplanationTabs";
import { ForestRewardScreen } from "@/components/mvp/explanation/ForestRewardScreen";
import { HintPanel } from "@/components/mvp/explanation/HintPanel";
import { LearnBotPanel } from "@/components/mvp/explanation/LearnBotPanel";
import { ProgressTracker } from "@/components/mvp/explanation/ProgressTracker";
import { QuestionCard } from "@/components/mvp/explanation/QuestionCard";
import { XPRewardCard } from "@/components/mvp/explanation/XPRewardCard";
import { calculateStars, useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import { getLevelBonusXp, getQuestionLearningContent, type MvpLevel } from "@/data/mvp-forest-world";
import type { NodeType } from "@/data/curriculum-types";
import type { LevelQuestionAttemptInput } from "@/data/progress-types";

export function QuestionPlayer({ level }: { level: MvpLevel }) {
  const { worldProgressRecord, worldCompleted, completeLevel } = useMvpProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState<LevelQuestionAttemptInput[]>([]);
  const [completed, setCompleted] = useState(false);
  const [rewardXp, setRewardXp] = useState(0);
  const finishingRef = useRef(false);
  const currentQuestion = level.questions[questionIndex];
  const learningContent = useMemo(() => getQuestionLearningContent(currentQuestion), [currentQuestion]);
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(() => calculateStars(correctCount, level.questions.length), [correctCount, level.questions.length]);
  const answerXp = attempts.reduce((total, attempt) => total + (attempt.correct ? attempt.xpReward : 0), 0);
  const completesWorld = level.level === 10;

  function chooseAnswer(answer: string) {
    if (selectedAnswer) return;
    const correct = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    setAttempts((current) => [...current, {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      correct,
      xpReward: currentQuestion.xpReward,
    }]);
    if (correct) setCorrectCount((current) => current + 1);
  }

  function nextQuestion() {
    if (questionIndex < level.questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setSelectedAnswer(null);
      return;
    }
    if (finishingRef.current) return;
    finishingRef.current = true;
    const firstLevelCompletion = !worldProgressRecord.completedLevels.includes(level.level);
    const completionBonus = firstLevelCompletion ? getLevelBonusXp(level.level) : 0;
    const worldBonus = completesWorld && !worldCompleted ? 500 : 0;
    setRewardXp(answerXp + completionBonus + worldBonus);
    completeLevel({
      subject: forestWorldIdentity.subject,
      year: forestWorldIdentity.year,
      worldId: forestWorldIdentity.worldId,
      level: level.level,
      nodeType: level.nodeType as NodeType,
      totalLevels: 10,
      totalQuestions: level.questions.length,
      correctAnswers: correctCount,
      starsEarned,
      completionBonusXp: getLevelBonusXp(level.level),
      worldCompletionXp: 500,
      completesWorld,
      completionBadge: forestWorldIdentity.completionBadge,
      questionAttempts: attempts,
    });
    setCompleted(true);
  }

  if (completed) {
    return (
      <ForestRewardScreen
        level={level.level}
        worldComplete={completesWorld}
        correctCount={correctCount}
        totalQuestions={level.questions.length}
        starsEarned={starsEarned}
        xpEarned={rewardXp}
      />
    );
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