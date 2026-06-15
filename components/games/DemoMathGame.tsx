"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import type { MathDemoGame } from "@/data/math-demo-games";

type GameStatus = "start" | "playing" | "complete";

type DemoMathGameProps = {
  game: MathDemoGame | undefined;
};

export function DemoMathGame({ game }: DemoMathGameProps) {
  const [status, setStatus] = useState<GameStatus>("start");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = game?.questions[questionIndex];
  const progressPercent = game ? Math.round(((questionIndex + 1) / game.questions.length) * 100) : 0;
  const answeredCorrectly = Boolean(
    currentQuestion && selectedAnswer === currentQuestion.correctAnswer,
  );
  const starsEarned = useMemo(() => correctAnswers, [correctAnswers]);

  if (!game) {
    return (
      <main className="bg-[#FFFDF7] px-5 py-16 text-center text-[#082B80]">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#DDE8F5] bg-white p-8 shadow-playful">
          <p className="text-sm font-black uppercase text-[#FF4FB8]">Game not found</p>
          <h1 className="mt-3 text-4xl font-black">Game not found. Please return to Mathematics.</h1>
          <div className="mt-8 flex justify-center">
            <Button href="/subjects/mathematics" variant="blue">
              Back to Mathematics
            </Button>
          </div>
        </div>
      </main>
    );
  }

  function startGame() {
    setStatus("playing");
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setShowExplanation(false);
    setCorrectAnswers(0);
  }

  function chooseAnswer(answer: string) {
    if (!currentQuestion || selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers((current) => current + 1);
    }
  }

  function nextQuestion() {
    if (!game || questionIndex === game.questions.length - 1) {
      setStatus("complete");
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setShowHint(false);
    setShowExplanation(false);
  }

  if (status === "start") {
    return (
      <main className="bg-[#FFFDF7] text-[#082B80]">
        <section className="bg-[#EAF6FF]">
          <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
            <Button href="/subjects/mathematics" variant="secondary">
              Back to Mathematics
            </Button>
            <div className="mt-6 rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-playful md:p-8">
              <span className={`inline-flex rounded-full px-4 py-2 text-sm font-black text-white ${game.accentClass}`}>
                Demo Game
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                {game.title}
              </h1>
              <p className="mt-3 text-lg font-black text-[#0B63F6]">{game.topic}</p>
              <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-[#5B6B94]">
                {game.description}
              </p>

              <section className="mt-8 rounded-[1.5rem] bg-[#EEF7FF] p-5" aria-labelledby="how-to-play">
                <h2 id="how-to-play" className="text-2xl font-black">How to Play</h2>
                <ul className="mt-4 grid gap-3 text-base font-bold leading-7 text-[#5B6B94] md:grid-cols-2">
                  {game.howToPlay.map((step) => (
                    <li key={step} className="rounded-2xl bg-white px-4 py-3">
                      {step}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={startGame} variant="blue">
                  Start Demo
                </Button>
                <Button href="/subjects/mathematics" variant="secondary">
                  Back
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (status === "complete") {
    return (
      <main className="bg-[#FFFDF7] px-5 py-12 text-[#082B80] lg:px-8">
        <section className="mx-auto max-w-4xl rounded-[2rem] border border-[#DDE8F5] bg-white p-6 text-center shadow-playful md:p-8">
          <span className="inline-flex rounded-full bg-[#22C55E]/15 px-4 py-2 text-sm font-black text-[#15803D]">
            Demo complete
          </span>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">You finished the demo!</h1>
          <p className="mt-4 text-lg font-bold text-[#5B6B94]">
            Great effort. Register to keep learning with full progress tracking.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ResultTile label="Score" value={`${correctAnswers}/${game.questions.length}`} />
            <ResultTile label="Stars earned" value={`${starsEarned}`} />
            <ResultTile label="Correct answers" value={`${correctAnswers}`} />
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-[#EAF6FF] p-6">
            <p className="text-xl font-black">
              Register to unlock full learning, progress tracking and more activities.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button onClick={startGame} variant="secondary">
                Play Again
              </Button>
              <Button href="/register" variant="green">
                Register Now
              </Button>
              <Button href="/subjects/mathematics" variant="blue">
                Back to Mathematics
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button href="/subjects/mathematics" variant="secondary">
            Back
          </Button>
          <div className="flex flex-wrap gap-3">
            <StatusPill label="Score" value={`${correctAnswers}`} />
            <StatusPill label="Stars" value={`${starsEarned}`} />
          </div>
        </div>

        <article className="rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-playful md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
                {game.title}
              </p>
              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                Question {questionIndex + 1} of {game.questions.length}
              </h1>
            </div>
            <span className="rounded-full bg-[#EEF7FF] px-4 py-2 text-sm font-black text-[#0B63F6]">
              {currentQuestion?.difficulty}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs font-black uppercase text-[#5B6B94]">
              <span>Progress</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#EEF7FF]">
              <div className="h-full rounded-full bg-[#0B63F6]" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <section className="mt-8 rounded-[1.5rem] bg-[#FFF3C4] p-6" aria-live="polite">
            <p className="text-2xl font-black leading-tight sm:text-3xl">
              {currentQuestion?.question}
            </p>
          </section>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {currentQuestion?.choices.map((choice) => {
              const isSelected = selectedAnswer === choice;
              const isCorrect = choice === currentQuestion.correctAnswer;
              const answerClass = !selectedAnswer
                ? "border-[#DDE8F5] bg-white hover:border-[#0B63F6] hover:bg-[#EEF7FF]"
                : isCorrect
                  ? "border-[#22C55E] bg-[#22C55E]/15 text-[#15803D]"
                  : isSelected
                    ? "border-[#EF4444] bg-[#EF4444]/10 text-[#991B1B]"
                    : "border-[#DDE8F5] bg-white opacity-75";

              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => chooseAnswer(choice)}
                  disabled={Boolean(selectedAnswer)}
                  className={`min-h-16 rounded-[1.25rem] border px-5 py-4 text-left text-lg font-black transition focus:outline-none focus:ring-4 focus:ring-[#0B63F6]/25 ${answerClass}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setShowHint((current) => !current)} variant="secondary">
              Hint
            </Button>
            <Button
              onClick={() => setShowExplanation((current) => !current)}
              variant="secondary"
              disabled={!selectedAnswer}
            >
              Explanation
            </Button>
            <Button onClick={nextQuestion} disabled={!selectedAnswer} variant="blue">
              {questionIndex === game.questions.length - 1 ? "Finish Demo" : "Next Question"}
            </Button>
          </div>

          {showHint && currentQuestion ? (
            <InfoCard title="Hint" body={currentQuestion.hint} tone="blue" />
          ) : null}

          {selectedAnswer && currentQuestion ? (
            <InfoCard
              title={answeredCorrectly ? "Correct!" : "Try this idea"}
              body={
                answeredCorrectly
                  ? "Nice work. You chose the correct answer."
                  : `The correct answer is ${currentQuestion.correctAnswer}.`
              }
              tone={answeredCorrectly ? "green" : "pink"}
            />
          ) : null}

          {showExplanation && currentQuestion ? (
            <InfoCard title="Simple explanation" body={currentQuestion.explanation} tone="yellow" />
          ) : null}
        </article>
      </section>
    </main>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm">
      <span className="text-[#5B6B94]">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

function InfoCard({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: "blue" | "green" | "pink" | "yellow";
}) {
  const toneClass = {
    blue: "bg-[#EEF7FF] text-[#082B80]",
    green: "bg-[#22C55E]/15 text-[#14532D]",
    pink: "bg-[#FF4FB8]/10 text-[#831843]",
    yellow: "bg-[#FFF3C4] text-[#082B80]",
  }[tone];

  return (
    <div className={`mt-5 rounded-[1.5rem] p-5 ${toneClass}`}>
      <p className="text-sm font-black uppercase">{title}</p>
      <p className="mt-2 text-base font-bold leading-7">{body}</p>
    </div>
  );
}

function ResultTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-[#EEF7FF] p-5">
      <p className="text-sm font-black uppercase text-[#5B6B94]">{label}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
}