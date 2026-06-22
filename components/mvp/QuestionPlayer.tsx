"use client";

import { useMemo, useRef, useState } from "react";
import { ExplanationTabs } from "@/components/mvp/explanation/ExplanationTabs";
import { ForestRewardScreen } from "@/components/mvp/explanation/ForestRewardScreen";
import { HintPanel } from "@/components/mvp/explanation/HintPanel";
import { LearnBotPanel } from "@/components/mvp/explanation/LearnBotPanel";
import { ProgressTracker } from "@/components/mvp/explanation/ProgressTracker";
import { QuestionCard } from "@/components/mvp/explanation/QuestionCard";
import { XPRewardCard } from "@/components/mvp/explanation/XPRewardCard";
import { ExplanationDrawer } from "@/components/mvp/learning-session/ExplanationDrawer";
import { LearningSessionShell } from "@/components/mvp/learning-session/LearningSessionShell";
import { StickyActionBar } from "@/components/mvp/learning-session/StickyActionBar";
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
  const [explanationOpen, setExplanationOpen] = useState(false);
  const finishingRef = useRef(false);
  const currentQuestion = level.questions[questionIndex];
  const learningContent = useMemo(() => getQuestionLearningContent(currentQuestion), [currentQuestion]);
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(() => calculateStars(correctCount, level.questions.length), [correctCount, level.questions.length]);
  const answerXp = attempts.reduce((total, attempt) => total + (attempt.correct ? attempt.xpReward : 0), 0);
  const completesWorld = level.level === 10;
  const answered = selectedAnswer !== null;

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
    setExplanationOpen(true);
  }

  function nextQuestion() {
    if (!answered) return;
    setExplanationOpen(false);
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
      <main className="min-h-[100dvh] bg-[#FFFDF7] p-4 text-[#082B80] sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <ForestRewardScreen
            level={level.level}
            worldComplete={completesWorld}
            correctCount={correctCount}
            totalQuestions={level.questions.length}
            starsEarned={starsEarned}
            xpEarned={rewardXp}
          />
        </div>
      </main>
    );
  }

  const support = answered ? (
    <ExplanationDrawer open={explanationOpen} onClose={() => setExplanationOpen(false)}>
      <ExplanationTabs
        key={currentQuestion.id}
        content={learningContent}
        correctAnswer={currentQuestion.correctAnswer}
        compact
      />
    </ExplanationDrawer>
  ) : (
    <div className="hidden min-h-0 lg:block">
      <LearnBotPanel answered={false} correct={false} tip={learningContent.learnBotTip} compact />
    </div>
  );

  return (
    <LearningSessionShell
      level={level.level}
      title={level.title}
      nodeType={level.nodeType}
      progress={(
        <ProgressTracker
          level={level.level}
          nodeType={level.nodeType}
          questionNumber={questionIndex + 1}
          totalQuestions={level.questions.length}
          score={correctCount}
          xp={answerXp}
          compact
        />
      )}
      support={support}
      actionBar={(
        <StickyActionBar
          answered={answered}
          lastQuestion={questionIndex === level.questions.length - 1}
          explanationOpen={explanationOpen}
          onToggleExplanation={() => setExplanationOpen((current) => !current)}
          onNext={nextQuestion}
        />
      )}
    >
      <div className="grid gap-3 xl:grid-cols-[12rem_minmax(0,1fr)]">
        <div className="hidden xl:block">
          <HintPanel hint={learningContent.hint} type={learningContent.visual.type} />
        </div>
        <div className="space-y-3">
          <details className="rounded-[1.25rem] border border-[#FFD76A] bg-[#FFF7D6] p-3 xl:hidden">
            <summary className="min-h-12 cursor-pointer py-3 text-sm font-black text-[#082B80] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">
              Need a hint?
            </summary>
            <p className="pb-2 text-sm font-bold leading-6 text-[#5B6B94]">{learningContent.hint}</p>
          </details>
          <QuestionCard
            question={currentQuestion}
            visual={learningContent.visual}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={chooseAnswer}
            compact
          />
          {answered ? (
            <XPRewardCard
              correct={answeredCorrectly}
              xpGained={answeredCorrectly ? currentQuestion.xpReward : 0}
              levelXp={answerXp}
              compact
            />
          ) : null}
        </div>
      </div>
    </LearningSessionShell>
  );
}