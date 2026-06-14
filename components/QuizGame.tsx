"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type XpRules = {
  correctAnswer: number;
  completionBonus: number;
  perfectScoreBonus: number;
};

type QuizGameProps = {
  title: string;
  description: string;
  questions: QuizQuestion[];
  xpRules: XpRules;
};

type GameStatus = "start" | "playing" | "finished";

export function QuizGame({
  title,
  description,
  questions,
  xpRules,
}: QuizGameProps) {
  const [status, setStatus] = useState<GameStatus>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCorrectly = selectedAnswer === currentQuestion?.correctAnswer;

  const earnedXp = useMemo(() => {
    const answerXp = score * xpRules.correctAnswer;
    const completionXp = status === "finished" ? xpRules.completionBonus : 0;
    const perfectXp =
      status === "finished" && score === questions.length
        ? xpRules.perfectScoreBonus
        : 0;

    return answerXp + completionXp + perfectXp;
  }, [questions.length, score, status, xpRules]);

  function startGame() {
    setStatus("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  }

  function chooseAnswer(answer: string) {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function goNext() {
    if (isLastQuestion) {
      setStatus("finished");
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  }

  if (status === "start") {
    return (
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <div className="rounded-3xl border border-sky/15 bg-white p-6 shadow-playful sm:p-8">
          <span className="inline-flex rounded-full bg-sunshine/80 px-4 py-2 text-sm font-black text-ink">
            Demo Game
          </span>
          <h1 className="mt-5 text-4xl font-black text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg font-bold leading-8 text-ink/70">
            {description}
          </p>
          <div className="mt-8 rounded-3xl bg-cloud p-5">
            <h2 className="text-2xl font-black text-sky">How to play</h2>
            <ul className="mt-4 space-y-3 text-base font-bold leading-7 text-ink/75">
              <li>Answer 10 primary-school math questions.</li>
              <li>Choose one answer from four options.</li>
              <li>Earn {xpRules.correctAnswer} XP for every correct answer.</li>
              <li>Finish the game for a {xpRules.completionBonus} XP bonus.</li>
              <li>
                Get every question right for a {xpRules.perfectScoreBonus} XP
                perfect score bonus.
              </li>
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={startGame}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-coral px-6 py-3 text-base font-extrabold text-white shadow-playful transition hover:-translate-y-0.5 hover:bg-[#e83d8e]"
            >
              Start Battle
            </button>
            <Button href="/games" variant="secondary">
              Back to Games
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (status === "finished") {
    const perfectScore = score === questions.length;
    const message = perfectScore
      ? "Amazing work! You solved every challenge."
      : score >= 7
        ? "Great effort! Your math skills are getting stronger."
        : "Good try! Keep practicing and come back for another battle.";

    return (
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <div className="rounded-3xl border border-sky/15 bg-white p-6 text-center shadow-playful sm:p-8">
          <span className="inline-flex rounded-full bg-mint/20 px-4 py-2 text-sm font-black text-mint">
            Battle Complete
          </span>
          <h1 className="mt-5 text-4xl font-black text-ink sm:text-5xl">
            Final Result
          </h1>
          <p className="mt-4 text-lg font-bold text-ink/70">{message}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-cloud p-6">
              <p className="text-sm font-black uppercase text-sky">Score</p>
              <p className="mt-2 text-4xl font-black text-ink">
                {score}/{questions.length}
              </p>
            </div>
            <div className="rounded-3xl bg-sunshine/20 p-6">
              <p className="text-sm font-black uppercase text-coral">XP Earned</p>
              <p className="mt-2 text-4xl font-black text-ink">{earnedXp}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={startGame}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-coral px-6 py-3 text-base font-extrabold text-white shadow-playful transition hover:-translate-y-0.5 hover:bg-[#e83d8e]"
            >
              Restart Game
            </button>
            <Button href="/games" variant="secondary">
              Back to Games
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <div className="rounded-3xl border border-sky/15 bg-white p-6 shadow-playful sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-sky">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <h1 className="mt-2 text-3xl font-black text-ink">{title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-3xl bg-cloud px-4 py-3">
              <p className="text-xs font-black uppercase text-sky">Score</p>
              <p className="text-2xl font-black text-ink">{score}</p>
            </div>
            <div className="rounded-3xl bg-sunshine/20 px-4 py-3">
              <p className="text-xs font-black uppercase text-coral">XP</p>
              <p className="text-2xl font-black text-ink">{earnedXp}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-[#FFF6D8] p-6">
          <p className="text-3xl font-black text-ink">
            {currentQuestion.question}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const feedbackClass =
              selectedAnswer && isCorrect
                ? "border-mint bg-mint/15 text-ink"
                : selectedAnswer && isSelected
                  ? "border-coral bg-coral/10 text-ink"
                  : "border-ink/10 bg-white text-ink hover:border-sky hover:bg-cloud";

            return (
              <button
                key={option}
                onClick={() => chooseAnswer(option)}
                className={`min-h-16 rounded-3xl border-2 px-5 py-4 text-left text-xl font-black transition ${feedbackClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer ? (
          <div className="mt-6 rounded-3xl bg-cloud p-5">
            <p className="text-xl font-black text-ink">
              {answeredCorrectly ? "Correct! +10 XP" : "Good try!"}
            </p>
            {!answeredCorrectly ? (
              <p className="mt-2 font-bold text-ink/70">
                The correct answer is {currentQuestion.correctAnswer}.
              </p>
            ) : null}
            <button
              onClick={goNext}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-sky px-6 py-3 text-base font-extrabold text-white shadow-playful transition hover:-translate-y-0.5 hover:bg-[#0a51c9]"
            >
              {isLastQuestion ? "See Results" : "Next Question"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
