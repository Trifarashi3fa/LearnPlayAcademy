"use client";

import { useMemo, useState } from "react";
import { MvpCard, PrimaryLink } from "@/components/mvp/MvpShell";
import { ExplanationTabs } from "@/components/mvp/explanation/ExplanationTabs";
import { LearnBotPanel } from "@/components/mvp/explanation/LearnBotPanel";
import { ProgressTracker } from "@/components/mvp/explanation/ProgressTracker";
import { QuestionCard } from "@/components/mvp/explanation/QuestionCard";
import { XPRewardCard } from "@/components/mvp/explanation/XPRewardCard";
import {
  calculateStars,
  useMvpProgress,
  type MvpProgress,
} from "@/components/mvp/useMvpProgress";
import {
  getLevelBonusXp,
  getQuestionLearningContent,
  type MvpLevel,
} from "@/data/mvp-forest-world";

export function QuestionPlayer({ level }: { level: MvpLevel }) {
  const { progress, updateProgress } = useMvpProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentQuestion = level.questions[questionIndex];
  const learningContent = useMemo(
    () => getQuestionLearningContent(currentQuestion),
    [currentQuestion],
  );
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(
    () => calculateStars(correctCount, level.questions.length),
    [correctCount, level.questions.length],
  );
  const answerXp = correctCount * 10;
  const levelBonusXp = getLevelBonusXp(level.level);
  const worldComplete = level.level === 10 && completed;
  const worldBonusXp = worldComplete ? 500 : 0;
  const totalXpEarned = answerXp + levelBonusXp + worldBonusXp;

  function chooseAnswer(answer: string) {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount((current) => current + 1);
    }
  }

  function nextQuestion() {
    if (questionIndex === level.questions.length - 1) {
      setCompleted(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  function saveCompletion() {
    if (saved) return;

    const alreadyCompleted = progress.completedLevels.includes(level.level);
    const nextCompletedLevels = alreadyCompleted
      ? progress.completedLevels
      : [...progress.completedLevels, level.level].sort((a, b) => a - b);
    const existingStars = progress.levelStars[String(level.level)] ?? 0;
    const nextStarsForLevel = Math.max(existingStars, starsEarned);
    const newStars = Math.max(0, nextStarsForLevel - existingStars);
    const nextBadges = [...progress.badges];

    if (level.level === 10 && !nextBadges.includes("Forest Explorer Badge")) {
      nextBadges.push("Forest Explorer Badge");
    } else if (!nextBadges.includes(`Level ${level.level} Badge`)) {
      nextBadges.push(`Level ${level.level} Badge`);
    }

    const nextProgress: MvpProgress = {
      ...progress,
      currentLevel: Math.min(10, Math.max(progress.currentLevel, level.level + 1)),
      xp: progress.xp + (alreadyCompleted ? answerXp : totalXpEarned),
      stars: progress.stars + newStars,
      badges: nextBadges,
      completedLevels: nextCompletedLevels,
      levelStars: {
        ...progress.levelStars,
        [String(level.level)]: nextStarsForLevel,
      },
      questionsAnswered: progress.questionsAnswered + level.questions.length,
      correctAnswers: progress.correctAnswers + correctCount,
    };

    updateProgress(nextProgress);
    setSaved(true);
  }

  if (completed) {
    if (!saved) {
      saveCompletion();
    }

    return (
      <div className="relative overflow-hidden">
        {worldComplete ? <Confetti /> : null}
        <MvpCard className="text-center">
          <p className="text-sm font-black uppercase text-[#FF4FA0]">
            {worldComplete ? "World Completed" : "Level Complete"}
          </p>
          <h2 className="mt-2 text-4xl font-black">
            {worldComplete ? "Forest World Complete!" : `Level ${level.level} Complete!`}
          </h2>
          <p className="mt-3 text-lg font-bold text-[#5B6B94]">
            You answered {correctCount} of {level.questions.length} questions correctly.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Result label="Stars earned" value={String(starsEarned)} />
            <Result label="XP earned" value={String(totalXpEarned)} />
            <Result
              label="Badge earned"
              value={worldComplete ? "Forest Explorer Badge" : `Level ${level.level} Badge`}
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {level.level < 10 ? (
              <PrimaryLink href={`/mvp/level/${level.level + 1}`} tone="green">
                Unlock Next Level
              </PrimaryLink>
            ) : (
              <PrimaryLink href="/mvp/rewards" tone="green">
                View Forest Explorer Badge
              </PrimaryLink>
            )}
            <PrimaryLink href="/mvp/world-map" tone="blue">World Map</PrimaryLink>
            <PrimaryLink href="/mvp/parent-dashboard" tone="white">Parent Dashboard</PrimaryLink>
          </div>
        </MvpCard>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ProgressTracker
        level={level.level}
        nodeType={level.nodeType}
        questionNumber={questionIndex + 1}
        totalQuestions={level.questions.length}
        score={correctCount}
        xp={answerXp}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)_260px] lg:items-start">
        <div className="space-y-5">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={chooseAnswer}
          />
          {selectedAnswer ? (
            <XPRewardCard
              correct={answeredCorrectly}
              xpGained={answeredCorrectly ? currentQuestion.xpReward : 0}
              levelXp={answerXp}
            />
          ) : (
            <section className="rounded-[1.5rem] border border-dashed border-[#B8CDED] bg-[#F8FBFF] p-4">
              <p className="text-sm font-black text-[#082B80]">Choose an answer to unlock the learning notes.</p>
              <p className="mt-1 text-sm font-bold text-[#5B6B94]">
                You will see feedback, XP, steps, a visual explanation, voice, and a LearnBot tip.
              </p>
            </section>
          )}
        </div>

        {selectedAnswer ? (
          <ExplanationTabs
            key={currentQuestion.id}
            content={learningContent}
            correctAnswer={currentQuestion.correctAnswer}
          />
        ) : (
          <section className="flex min-h-96 items-center justify-center rounded-[2rem] border border-[#DDE8F5] bg-white p-8 text-center shadow-sm">
            <div className="max-w-sm">
              <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">
                Explanation Notes
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#082B80]">Answer, then learn why</h2>
              <p className="mt-3 text-base font-bold leading-7 text-[#5B6B94]">
                Steps, Visual, Voice, and LearnBot Tip will open here after an answer is selected.
              </p>
            </div>
          </section>
        )}

        <LearnBotPanel
          answered={Boolean(selectedAnswer)}
          correct={answeredCorrectly}
          tip={learningContent.learnBotTip}
        />
      </div>

      <nav className="flex flex-col gap-3 rounded-[1.5rem] border border-[#DDE8F5] bg-white p-4 sm:flex-row sm:items-center sm:justify-between" aria-label="Question controls">
        <PrimaryLink href="/mvp/world-map" tone="white">Back to World Map</PrimaryLink>
        {selectedAnswer ? (
          <button
            type="button"
            onClick={nextQuestion}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-7 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
          >
            {questionIndex === level.questions.length - 1 ? "Finish Level" : "Next Question"}
          </button>
        ) : (
          <p className="text-center text-sm font-bold text-[#5B6B94]">Select one answer to continue.</p>
        )}
      </nav>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-[#EAF6FF] p-4">
      <p className="text-sm font-black uppercase text-[#5B6B94]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}

function Confetti() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute left-6 top-4 h-4 w-4 animate-bounce rounded-full bg-[#FF4FA0]" />
      <span className="absolute right-10 top-8 h-5 w-5 animate-ping rounded-full bg-[#FFC83D]" />
      <span className="absolute bottom-10 left-1/3 h-4 w-4 animate-bounce rounded-full bg-[#22C55E]" />
      <span className="absolute bottom-5 right-1/4 h-3 w-3 animate-ping rounded-full bg-[#8B5CF6]" />
    </div>
  );
}