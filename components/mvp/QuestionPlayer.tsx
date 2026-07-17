"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExplanationTabs } from "@/components/mvp/explanation/ExplanationTabs";
import { ForestRewardScreen } from "@/components/mvp/explanation/ForestRewardScreen";
import { getThinkModeHint, HintPanel } from "@/components/mvp/explanation/HintPanel";
import { LearnBotPanel } from "@/components/mvp/explanation/LearnBotPanel";
import { ProgressTracker } from "@/components/mvp/explanation/ProgressTracker";
import { QuestionCard } from "@/components/mvp/explanation/QuestionCard";
import { XPRewardCard } from "@/components/mvp/explanation/XPRewardCard";
import { ExplanationDrawer } from "@/components/mvp/learning-session/ExplanationDrawer";
import { LearningSessionShell } from "@/components/mvp/learning-session/LearningSessionShell";
import { LockedLevelNotice } from "@/components/mvp/LockedLevelNotice";
import { StickyActionBar } from "@/components/mvp/learning-session/StickyActionBar";
import { MvpButton } from "@/components/mvp/MvpUi";
import { calculateStars, useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import { mathematicsForestWorldPackage } from "@/data/learning-packages";
import { getLevelBonusXp, getQuestionLearningContent, type MvpLevel } from "@/data/mvp-forest-world";
import type { NodeType } from "@/data/curriculum-types";
import type { LevelQuestionAttemptInput } from "@/data/progress-types";
import { getLevelAccess } from "@/lib/progress/level-access";
import { trackLearningEvent } from "@/lib/learning-analytics/client";

export function QuestionPlayer({ level }: { level: MvpLevel }) {
  const { progress, ready, worldProgressRecord, worldCompleted, completeLevel, syncStatus, lastSyncedAt } = useMvpProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState<LevelQuestionAttemptInput[]>([]);
  const [completed, setCompleted] = useState(false);
  const [rewardXp, setRewardXp] = useState(0);
  const [rewardTotals, setRewardTotals] = useState({ stars: 0, xp: 0 });
  const [explanationOpen, setExplanationOpen] = useState(false);
  const finishingRef = useRef(false);
  const currentQuestion = level.questions[questionIndex];
  const learningContent = useMemo(() => getQuestionLearningContent(currentQuestion), [currentQuestion]);
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(() => calculateStars(correctCount, level.questions.length), [correctCount, level.questions.length]);
  const answerXp = attempts.reduce((total, attempt) => total + (attempt.correct ? attempt.xpReward : 0), 0);
  const completesWorld = level.level === mathematicsForestWorldPackage.totalLevels;
  const answered = selectedAnswer !== null;
  const thinkHint = getThinkModeHint(learningContent.visual.type, currentQuestion.id, learningContent.hint);
  const progressLoading = level.level !== 1 && (!ready || syncStatus === "loading");
  const levelAccess = getLevelAccess({
    level: level.level,
    completedLevels: worldProgressRecord.completedLevels,
    totalLevels: mathematicsForestWorldPackage.totalLevels,
  });
  const analyticsBase = useMemo(() => ({
    subject: forestWorldIdentity.subject,
    year: forestWorldIdentity.year,
    worldId: forestWorldIdentity.worldId,
    level: level.level,
  }) as const, [level.level]);
  const questionType = learningContent.visual.type;

  useEffect(() => {
    trackLearningEvent("learning_session_started", {
      ...analyticsBase,
      questionCount: level.questions.length,
    });
  }, [analyticsBase, level.level, level.questions.length]);

  useEffect(() => {
    trackLearningEvent("question_viewed", {
      ...analyticsBase,
      questionId: currentQuestion.id,
      questionIndex: questionIndex + 1,
      questionType,
    });
    trackLearningEvent("learnbot_hint_viewed", {
      ...analyticsBase,
      questionId: currentQuestion.id,
      hintType: questionType,
    });
  }, [analyticsBase, currentQuestion.id, questionIndex, questionType, level.level]);

  useEffect(() => {
    if (!selectedAnswer) return;
    trackLearningEvent("learnbot_tip_viewed", {
      ...analyticsBase,
      questionId: currentQuestion.id,
      state: selectedAnswer === currentQuestion.correctAnswer ? "correct" : "incorrect",
    });
  }, [analyticsBase, currentQuestion.correctAnswer, currentQuestion.id, level.level, selectedAnswer]);

  function chooseAnswer(answer: string | null) {
    if (selectedAnswer !== null || answer === null) return;

    const correct = answer === currentQuestion.correctAnswer;

    trackLearningEvent("question_answered", {
      ...analyticsBase,
      questionId: currentQuestion.id,
      questionIndex: questionIndex + 1,
      correct,
      xpReward: currentQuestion.xpReward,
    });
    trackLearningEvent("explanation_opened", {
      ...analyticsBase,
      questionId: currentQuestion.id,
      source: "answer",
    });

    setSelectedAnswer(answer);
    setAttempts((current) => [
      ...current,
      {
        questionId: currentQuestion.id,
        selectedAnswer: answer,
        correct,
        xpReward: currentQuestion.xpReward,
      },
    ]);

    if (correct) {
      setCorrectCount((current) => current + 1);
    }

    setExplanationOpen(true);
  }

  function nextQuestion() {
    if (!answered) return;
    trackLearningEvent("question_next_clicked", {
      ...analyticsBase,
      questionId: currentQuestion.id,
      questionIndex: questionIndex + 1,
      lastQuestion: questionIndex === level.questions.length - 1,
    });
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
    const earnedXp = answerXp + completionBonus + worldBonus;
    const previousStars = worldProgressRecord.levelStars[String(level.level)] ?? 0;
    setRewardXp(earnedXp);
    setRewardTotals({
      stars: progress.totalStars + Math.max(0, starsEarned - previousStars),
      xp: progress.totalXp + earnedXp,
    });
    trackLearningEvent("level_completed", {
      ...analyticsBase,
      correctAnswers: correctCount,
      totalQuestions: level.questions.length,
      starsEarned,
      xpEarned: earnedXp,
    });
    trackLearningEvent("learning_session_ended", {
      ...analyticsBase,
      reason: "completed",
    });
    if (completesWorld && !worldCompleted) {
      trackLearningEvent("badge_awarded", {
        ...analyticsBase,
        badgeName: forestWorldIdentity.completionBadge,
      });
    }
    completeLevel({
      subject: forestWorldIdentity.subject,
      year: forestWorldIdentity.year,
      worldId: forestWorldIdentity.worldId,
      level: level.level,
      nodeType: level.nodeType as NodeType,
      totalLevels: mathematicsForestWorldPackage.totalLevels,
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
            totalStars={rewardTotals.stars}
            totalXp={rewardTotals.xp}
            syncStatus={syncStatus}
            lastSyncedAt={lastSyncedAt}
          />
        </div>
      </main>
    );
  }

  if (progressLoading) {
    return <LockedLevelNotice level={level.level} requiredLevel={levelAccess.requiredLevel} checking />;
  }

  if (!levelAccess.accessible) {
    return <LockedLevelNotice level={level.level} requiredLevel={levelAccess.requiredLevel} />;
  }

  const support = answered ? (
    <div className="h-full min-h-0">
      <ExplanationDrawer open={explanationOpen} onClose={() => {
        trackLearningEvent("explanation_closed", {
          ...analyticsBase,
          questionId: currentQuestion.id,
          source: "drawer",
        });
        setExplanationOpen(false);
      }}>
        <ExplanationTabs
          key={currentQuestion.id}
          content={learningContent}
          correctAnswer={currentQuestion.correctAnswer}
          selectedAnswer={selectedAnswer}
          compact
        />
      </ExplanationDrawer>
      {!explanationOpen ? (
        <aside className="hidden h-full min-h-0 flex-col justify-center rounded-[1.5rem] border border-[#BDE7D0] bg-gradient-to-br from-[#F8FBFF] via-white to-[#EAFBF0] p-5 text-center shadow-playful xl:flex" aria-label="Learning notes collapsed">
          <p className="text-xs font-black uppercase tracking-wide text-[#FF4FA0]">Learning notes</p>
          <h2 className="mt-2 text-2xl font-black text-[#082B80]">Notes are hidden</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm font-bold leading-6 text-[#5B6B94]">
            Open the quick explanation when you want to review the visual, steps, answer, and LearnBot tip.
          </p>
          <div className="mt-4">
            <MvpButton
              type="button"
              tone="soft"
              onClick={() => {
                trackLearningEvent("explanation_opened", {
                  ...analyticsBase,
                  questionId: currentQuestion.id,
                  source: "toggle",
                });
                setExplanationOpen(true);
              }}
            >
              Show notes
            </MvpButton>
          </div>
        </aside>
      ) : null}
    </div>
  ) : (
    <div className="hidden min-h-0 xl:block">
      <LearnBotPanel answered={false} correct={false} tip={learningContent.learnBotTip} state="thinking" messageSeed={currentQuestion.id} compact />
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
          syncStatus={syncStatus}
          compact
        />
      )}
      support={support}
      actionBar={(
        <StickyActionBar
          answered={answered}
          lastQuestion={questionIndex === level.questions.length - 1}
          explanationOpen={explanationOpen}
          onToggleExplanation={() => {
            setExplanationOpen((current) => {
              const next = !current;
              if (next) {
                trackLearningEvent("explanation_opened", {
                  ...analyticsBase,
                  questionId: currentQuestion.id,
                  source: "toggle",
                });
              } else {
                trackLearningEvent("explanation_closed", {
                  ...analyticsBase,
                  questionId: currentQuestion.id,
                  source: "toggle",
                });
              }
              return next;
            });
          }}
          onNext={nextQuestion}
        />
      )}
    >
      <div className="grid h-full min-h-0 gap-2 xl:grid-cols-[11rem_minmax(0,1fr)] 2xl:grid-cols-[13rem_minmax(0,1fr)]">
        <div className="hidden min-h-0 xl:block">
          <HintPanel hint={learningContent.hint} type={learningContent.visual.type} nodeType={level.nodeType} messageSeed={currentQuestion.id} />
        </div>
        <div className="flex min-h-0 flex-col gap-2">
          <details className="shrink-0 rounded-[1.25rem] border border-[#FFD76A] bg-[#FFF7D6] p-2 xl:hidden">
            <summary className="min-h-11 cursor-pointer py-2 text-sm font-black text-[#082B80] focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25">
              Need a hint?
            </summary>
            <p className="pb-2 text-sm font-bold leading-6 text-[#5B6B94]">{thinkHint}</p>
          </details>
          <div key={currentQuestion.id} className="lp-reveal-soft min-h-0 flex-1">
            <QuestionCard
              question={currentQuestion}
              visual={learningContent.visual}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={chooseAnswer}
              compact
            />
          </div>
          {answered ? (
            <div className="shrink-0">
              <XPRewardCard
                correct={answeredCorrectly}
                xpGained={answeredCorrectly ? currentQuestion.xpReward : 0}
                levelXp={answerXp}
                compact
              />
            </div>
          ) : null}
        </div>
      </div>
    </LearningSessionShell>
  );
}
