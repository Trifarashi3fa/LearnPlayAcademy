"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { typography } from "@/components/theme";
import {
  calculateLevel,
  calculateXP,
  getDefaultProgress,
  getStoredProgress,
  recordGameXP,
  type StoredProgress,
  type XPRules,
} from "@/lib/xp";

export type WordChallenge = {
  prompt: string;
  answer: string;
  letters: string[];
};

type WordBuilderGameProps = {
  title: string;
  description: string;
  challenges: WordChallenge[];
  gameId?: string;
  xpRules?: XPRules;
};

type GameStatus = "start" | "playing" | "finished";

const defaultXpRules: XPRules = {
  correctAnswer: 10,
  completionBonus: 20,
  perfectScoreBonus: 30,
};

export function WordBuilderGame({
  title,
  description,
  challenges,
  gameId = "word-builder",
  xpRules = defaultXpRules,
}: WordBuilderGameProps) {
  const [status, setStatus] = useState<GameStatus>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [progress, setProgress] = useState<StoredProgress>(getDefaultProgress);
  const [hasSavedResult, setHasSavedResult] = useState(false);

  const currentChallenge = challenges[currentIndex];
  const builtWord = selectedLetters.join("");
  const isLastChallenge = currentIndex === challenges.length - 1;
  const canCheck = builtWord.length === currentChallenge.answer.length && !feedback;
  const earnedXp = useMemo(
    () =>
      calculateXP({
        correctAnswers: score,
        totalQuestions: challenges.length,
        rules: xpRules,
        completed: status === "finished",
      }),
    [challenges.length, score, status, xpRules],
  );
  const levelProgress = calculateLevel(progress.totalXP);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  useEffect(() => {
    if (status !== "finished" || hasSavedResult) {
      return;
    }

    setProgress(recordGameXP(gameId, earnedXp));
    setHasSavedResult(true);
  }, [earnedXp, gameId, hasSavedResult, status]);

  function startGame() {
    setStatus("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelectedLetters([]);
    setUsedIndexes([]);
    setFeedback(null);
    setHasSavedResult(false);
  }

  function chooseLetter(letter: string, index: number) {
    if (feedback || usedIndexes.includes(index)) {
      return;
    }

    if (selectedLetters.length >= currentChallenge.answer.length) {
      return;
    }

    setSelectedLetters((letters) => [...letters, letter]);
    setUsedIndexes((indexes) => [...indexes, index]);
  }

  function clearAnswer() {
    if (feedback) {
      return;
    }

    setSelectedLetters([]);
    setUsedIndexes([]);
  }

  function checkAnswer() {
    if (!canCheck) {
      return;
    }

    if (builtWord === currentChallenge.answer) {
      setScore((previousScore) => previousScore + 1);
      setFeedback("correct");
      return;
    }

    setFeedback("incorrect");
  }

  function goNext() {
    if (isLastChallenge) {
      setStatus("finished");
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedLetters([]);
    setUsedIndexes([]);
    setFeedback(null);
  }

  if (status === "start") {
    return (
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <Card className="shadow-playful" tone="green">
          <span className="inline-flex rounded-full bg-mint px-4 py-2 text-sm font-black text-ink">
            English Demo Game
          </span>
          <h1 className={`mt-5 ${typography.h1}`}>{title}</h1>
          <p className={`mt-4 ${typography.body}`}>{description}</p>
          <Card className="mt-8" tone="white">
            <h2 className={typography.h3}>How to play</h2>
            <ul className="mt-4 space-y-3 text-base font-bold leading-7 text-ink/75">
              <li>Look at the word challenge.</li>
              <li>Tap letters in the correct order to build the word.</li>
              <li>Earn {xpRules.correctAnswer} XP for each correct word.</li>
              <li>Complete all 10 words for bonus XP.</li>
            </ul>
          </Card>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={startGame} variant="green">
              Start Word Builder
            </Button>
            <Button href="/games" variant="secondary">
              Back to Games
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  if (status === "finished") {
    const perfectScore = score === challenges.length;
    const message = perfectScore
      ? "Brilliant spelling! You built every word."
      : score >= 7
        ? "Great word work! Your English skills are growing."
        : "Good effort! Try again and build an even stronger score.";

    return (
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <Card className="text-center shadow-playful" tone="white">
          <span className="inline-flex rounded-full bg-purple/15 px-4 py-2 text-sm font-black text-purple">
            Word Quest Complete
          </span>
          <h1 className={`mt-5 ${typography.h1}`}>Final Result</h1>
          <p className={`mt-4 ${typography.body}`}>{message}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card tone="blue">
              <p className="text-sm font-black uppercase text-sky">Score</p>
              <p className="mt-2 text-4xl font-black text-ink">
                {score}/{challenges.length}
              </p>
            </Card>
            <Card tone="yellow">
              <p className="text-sm font-black uppercase text-coral">Game XP</p>
              <p className="mt-2 text-4xl font-black text-ink">{earnedXp}</p>
            </Card>
            <Card tone="green">
              <p className="text-sm font-black uppercase text-mint">Total XP</p>
              <p className="mt-2 text-4xl font-black text-ink">{progress.totalXP}</p>
            </Card>
            <Card tone="purple">
              <p className="text-sm font-black uppercase text-purple">Level</p>
              <p className="mt-2 text-4xl font-black text-ink">{progress.level}</p>
            </Card>
          </div>
          <Card className="mt-5 text-left" tone="blue">
            <div className="flex items-center justify-between text-sm font-black text-ink/70">
              <span>Level {levelProgress.level} progress</span>
              <span>{levelProgress.progressPercent}%</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-sky"
                style={{ width: `${levelProgress.progressPercent}%` }}
              />
            </div>
          </Card>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={startGame}>Restart Game</Button>
            <Button href="/games" variant="secondary">
              Back to Games
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <Card className="shadow-playful" tone="white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-sky">
              Word {currentIndex + 1} of {challenges.length}
            </p>
            <h1 className={`mt-2 ${typography.h2}`}>{title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <Card className="p-4" tone="blue">
              <p className="text-xs font-black uppercase text-sky">Score</p>
              <p className="text-2xl font-black text-ink">{score}</p>
            </Card>
            <Card className="p-4" tone="yellow">
              <p className="text-xs font-black uppercase text-coral">XP</p>
              <p className="text-2xl font-black text-ink">{earnedXp}</p>
            </Card>
          </div>
        </div>

        <Card className="mt-8 text-center" tone="green">
          <p className="text-sm font-black uppercase text-ink/60">Build this word</p>
          <p className="mt-3 text-5xl font-black tracking-wide text-ink">
            {currentChallenge.prompt}
          </p>
        </Card>

        <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
          {Array.from({ length: currentChallenge.answer.length }).map((_, index) => (
            <div
              key={`${currentChallenge.answer}-${index}`}
              className="grid aspect-square place-items-center rounded-3xl border-2 border-sky/15 bg-cloud text-3xl font-black text-ink"
            >
              {selectedLetters[index] ?? ""}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {currentChallenge.letters.map((letter, index) => {
            const used = usedIndexes.includes(index);

            return (
              <button
                key={`${letter}-${index}`}
                onClick={() => chooseLetter(letter, index)}
                disabled={used || Boolean(feedback)}
                className="min-h-14 rounded-3xl border-2 border-ink/10 bg-white text-2xl font-black text-ink transition hover:border-sky hover:bg-cloud disabled:cursor-not-allowed disabled:opacity-35"
              >
                {letter}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={checkAnswer} variant="green" disabled={!canCheck}>
            Check Word
          </Button>
          <Button onClick={clearAnswer} variant="secondary" disabled={Boolean(feedback)}>
            Clear
          </Button>
        </div>

        {feedback ? (
          <Card className="mt-6" tone={feedback === "correct" ? "green" : "pink"}>
            <p className="text-xl font-black text-ink">
              {feedback === "correct"
                ? `Correct! +${xpRules.correctAnswer} XP`
                : "Good try!"}
            </p>
            {feedback === "incorrect" ? (
              <p className="mt-2 font-bold text-ink/70">
                The word is {currentChallenge.answer}.
              </p>
            ) : null}
            <Button onClick={goNext} variant="blue" className="mt-4">
              {isLastChallenge ? "See Results" : "Next Word"}
            </Button>
          </Card>
        ) : null}
      </Card>
    </section>
  );
}
