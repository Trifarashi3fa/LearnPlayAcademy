"use client";

import { useMemo, useRef, useState } from "react";
import { EnglishLevelOneQuestionPlayer } from "@/components/english/EnglishLevelOneQuestionPlayer";
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
import { calculateStars, useMvpProgress } from "@/components/mvp/useMvpProgress";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import { getLevelBonusXp, getQuestionLearningContent, type MvpLevel } from "@/data/mvp-forest-world";
import type { NodeType } from "@/data/curriculum-types";
import type { LevelQuestionAttemptInput, ProgressWorldRef } from "@/data/progress-types";
import { getForestLevelAccess } from "@/lib/progress/level-access";
import { shouldUseEnglishLevelOnePrototype } from "@/lib/english/level-one-prototype";

function createSessionQuestions(level: MvpLevel) {
  const questionCount = Math.min(level.sessionQuestionCount ?? level.questions.length, level.questions.length);
  if (!level.randomizeQuestions) return level.questions.slice(0, questionCount);

  const shuffled = [...level.questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, questionCount);
}

export function QuestionPlayer({ level }: { level: MvpLevel }) {
  if (shouldUseEnglishLevelOnePrototype(level)) {
    return <EnglishLevelOneQuestionPlayer level={level} />;
  }

  return <StandardQuestionPlayer level={level} />;
}

function StandardQuestionPlayer({ level }: { level: MvpLevel }) {
  const progressRef = useMemo<ProgressWorldRef>(() => ({
    subject: level.subject ?? forestWorldIdentity.subject,
    year: level.year ?? forestWorldIdentity.year,
    worldId: level.worldId ?? forestWorldIdentity.worldId,
  }), [level.subject, level.year, level.worldId]);
  const totalLevelCount = 10;
  const { progress, ready, worldProgressRecord, worldCompleted, completeLevel, syncStatus, lastSyncedAt } = useMvpProgress(progressRef, totalLevelCount);
  const [sessionQuestions] = useState(() => createSessionQuestions(level));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState<LevelQuestionAttemptInput[]>([]);
  const [completed, setCompleted] = useState(false);
  const [rewardXp, setRewardXp] = useState(0);
  const [rewardTotals, setRewardTotals] = useState({ stars: 0, xp: 0 });
  const [explanationOpen, setExplanationOpen] = useState(false);
  const finishingRef = useRef(false);
  const currentQuestion = sessionQuestions[questionIndex];
  const learningContent = useMemo(() => getQuestionLearningContent(currentQuestion), [currentQuestion]);
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(() => calculateStars(correctCount, sessionQuestions.length), [correctCount, sessionQuestions.length]);
  const answerXp = attempts.reduce((total, attempt) => total + (attempt.correct ? attempt.xpReward : 0), 0);
  const completesWorld = level.level === 10;
  const answered = selectedAnswer !== null;
  const thinkHint = getThinkModeHint(learningContent.visual.type, currentQuestion.id, learningContent.hint);
  const progressLoading = level.level !== 1 && (!ready || syncStatus === "loading");
  const levelAccess = getForestLevelAccess(level.level, worldProgressRecord.completedLevels);
  const mapHref = level.mapHref ?? "/mvp/world-map";
  const levelHrefBase = level.levelHrefBase ?? "/mvp/level";
  const worldName = level.worldName ?? "Forest World";

  function chooseAnswer(answer: string | null) {
  if (selectedAnswer !== null || answer === null) return;

  const correct = answer === currentQuestion.correctAnswer;

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
    setExplanationOpen(false);
    if (questionIndex < sessionQuestions.length - 1) {
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
    completeLevel({
      subject: progressRef.subject,
      year: progressRef.year,
      worldId: progressRef.worldId,
      level: level.level,
      nodeType: level.nodeType as NodeType,
      totalLevels: totalLevelCount,
      totalQuestions: sessionQuestions.length,
      correctAnswers: correctCount,
      starsEarned,
      completionBonusXp: getLevelBonusXp(level.level),
      worldCompletionXp: 500,
      completesWorld,
      completionBadge: level.completionBadge ?? forestWorldIdentity.completionBadge,
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
            totalQuestions={sessionQuestions.length}
            starsEarned={starsEarned}
            xpEarned={rewardXp}
            totalStars={rewardTotals.stars}
            totalXp={rewardTotals.xp}
            syncStatus={syncStatus}
            lastSyncedAt={lastSyncedAt}
            worldName={worldName}
            bossName={level.bossName ?? forestWorldIdentity.bossName}
            completionBadge={level.completionBadge ?? forestWorldIdentity.completionBadge}
            skillLearned={level.title}
            mapHref={mapHref}
            rewardsHref={level.rewardsHref ?? "/mvp/rewards"}
            dashboardHref={level.dashboardHref ?? "/mvp/parent-dashboard"}
            nextLevelHrefBase={level.levelHrefBase ?? "/mvp/level"}
          />
        </div>
      </main>
    );
  }

  if (progressLoading) {
    return <LockedLevelNotice level={level.level} requiredLevel={levelAccess.requiredLevel} checking worldName={worldName} mapHref={mapHref} levelHrefBase={levelHrefBase} />;
  }

  if (!levelAccess.accessible) {
    return <LockedLevelNotice level={level.level} requiredLevel={levelAccess.requiredLevel} worldName={worldName} mapHref={mapHref} levelHrefBase={levelHrefBase} />;
  }

  const support = answered ? (
    <ExplanationDrawer open={explanationOpen} onClose={() => setExplanationOpen(false)}>
      <ExplanationTabs
        key={currentQuestion.id}
        content={learningContent}
        correctAnswer={currentQuestion.correctAnswer}
        selectedAnswer={selectedAnswer}
        compact
      />
    </ExplanationDrawer>
  ) : (
    <div className="hidden min-h-0 lg:block">
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
          totalQuestions={sessionQuestions.length}
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
          lastQuestion={questionIndex === sessionQuestions.length - 1}
          explanationOpen={explanationOpen}
          onToggleExplanation={() => setExplanationOpen((current) => !current)}
          onNext={nextQuestion}
        />
      )}
    >
      <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="hidden min-h-0 lg:block">
          <HintPanel hint={learningContent.hint} type={learningContent.visual.type} nodeType={level.nodeType} messageSeed={currentQuestion.id} />
        </div>
        <div className="flex min-h-0 flex-col gap-2 lg:gap-3">
          <details className="shrink-0 rounded-[1.25rem] border border-[#FFD76A] bg-[#FFF7D6] p-2 lg:hidden">
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
