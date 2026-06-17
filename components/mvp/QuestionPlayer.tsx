"use client";

import { useMemo, useState } from "react";
import { MvpCard, PrimaryLink, ProgressBar } from "@/components/mvp/MvpShell";
import {
  calculateStars,
  useMvpProgress,
  type MvpProgress,
} from "@/components/mvp/useMvpProgress";
import { getLevelBonusXp, type MvpLevel } from "@/data/mvp-forest-world";

export function QuestionPlayer({ level }: { level: MvpLevel }) {
  const { progress, updateProgress } = useMvpProgress();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentQuestion = level.questions[questionIndex];
  const answeredCorrectly = selectedAnswer === currentQuestion.correctAnswer;
  const percent = Math.round(((questionIndex + 1) / level.questions.length) * 100);
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
            <Result label="Badge earned" value={worldComplete ? "Forest Explorer Badge" : `Level ${level.level} Badge`} />
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
    <div className="space-y-6">
      <MvpCard>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#FF4FA0]">
              Level {level.level} - {level.nodeType}
            </p>
            <h2 className="mt-1 text-3xl font-black">{level.title}</h2>
          </div>
          <div className="rounded-full bg-[#FFF3C4] px-4 py-2 text-sm font-black">
            Score {correctCount}/{level.questions.length}
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-black text-[#5B6B94]">
            <span>Question {questionIndex + 1} of {level.questions.length}</span>
            <span>{percent}%</span>
          </div>
          <ProgressBar value={percent} />
        </div>
      </MvpCard>

      <MvpCard>
        <p className="rounded-full bg-[#EAF6FF] px-4 py-2 text-sm font-black text-[#0B63F6]">
          {currentQuestion.topic} - {currentQuestion.difficulty}
        </p>
        <h1 className="mt-5 text-3xl font-black leading-tight">
          {currentQuestion.question}
        </h1>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option) => {
            const selected = selectedAnswer === option;
            const correct = option === currentQuestion.correctAnswer;
            const className = !selectedAnswer
              ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EAF6FF]"
              : correct
                ? "border-[#22C55E] bg-[#22C55E]/15 text-[#14532D]"
                : selected
                  ? "border-[#EF4444] bg-[#EF4444]/10 text-[#7F1D1D]"
                  : "border-[#DDE8F5] bg-white text-[#5B6B94]";

            return (
              <button
                key={option}
                type="button"
                onClick={() => chooseAnswer(option)}
                disabled={Boolean(selectedAnswer)}
                className={`min-h-16 rounded-[1.25rem] border px-5 py-4 text-left text-lg font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${className}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer ? (
          <div className="mt-6 rounded-[1.5rem] bg-[#EAF6FF] p-5">
            <p className={`text-lg font-black ${answeredCorrectly ? "text-[#15803D]" : "text-[#B91C1C]"}`}>
              {answeredCorrectly ? "Correct! +10 XP" : "Not quite yet."}
            </p>
            <p className="mt-2 text-base font-bold leading-7 text-[#5B6B94]">
              {currentQuestion.explanation}
            </p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryLink href="/mvp/world-map" tone="white">Back</PrimaryLink>
          {selectedAnswer ? (
            <button
              type="button"
              onClick={nextQuestion}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#0B63F6] px-6 py-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25"
            >
              {questionIndex === level.questions.length - 1 ? "Finish Level" : "Next Question"}
            </button>
          ) : null}
        </div>
      </MvpCard>
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