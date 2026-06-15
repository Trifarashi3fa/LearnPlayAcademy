"use client";

import Image from "next/image";
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
  const [showVoice, setShowVoice] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [celebrating, setCelebrating] = useState(false);

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
    setShowVoice(false);
    setCorrectAnswers(0);
    setCelebrating(false);
  }

  function chooseAnswer(answer: string) {
    if (!currentQuestion || selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    setShowExplanation(true);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers((current) => current + 1);
      setCelebrating(true);
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
    setShowVoice(false);
    setCelebrating(false);
  }

  if (status === "start") {
    return (
      <main className="bg-[#FFFDF7] text-[#082B80]">
        <section className={`bg-gradient-to-br ${game.worldClass}`}>
          <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
            <Button href="/subjects/mathematics" variant="secondary">
              Back to Mathematics
            </Button>
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white p-6 shadow-playful md:p-8">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
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
                </div>
                <GameCover game={game} />
              </div>

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
                  Start Mission
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
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white p-6 text-center shadow-playful md:p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFC83D] text-4xl font-black text-[#082B80]">
            WIN
          </div>
          <h1 className="mt-5 text-4xl font-black sm:text-5xl">You finished the demo!</h1>
          <p className="mt-4 text-lg font-bold text-[#5B6B94]">
            Great mission. Register to keep learning with full progress tracking.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ResultTile label="Score" value={`${correctAnswers}/${game.questions.length}`} />
            <ResultTile label="Stars earned" value={`${starsEarned}`} />
            <ResultTile label="Correct answers" value={`${correctAnswers}`} />
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-gradient-to-br from-[#EAF6FF] to-[#FFF3C4] p-6">
            <p className="text-2xl font-black">Unlock the Full Adventure</p>
            <p className="mt-2 text-base font-bold text-[#5B6B94]">
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
    <main className={`min-h-screen bg-gradient-to-br ${game.worldClass} text-[#082B80]`}>
      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button href="/subjects/mathematics" variant="secondary">
            Back
          </Button>
          <div className="flex flex-wrap gap-3">
            <StatusPill label="Mission" value={`${questionIndex + 1}/${game.questions.length}`} />
            <StatusPill label="Score" value={`${correctAnswers}`} />
            <StatusPill label="Stars" value={`${starsEarned}`} />
          </div>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-[#DDE8F5] bg-white p-5 shadow-playful md:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-[#FF4FB8]">
                    {game.title}
                  </p>
                  <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                    Mission {questionIndex + 1}
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
                <div className="mt-2 h-4 overflow-hidden rounded-full bg-[#EEF7FF]">
                  <div className="h-full rounded-full bg-[#0B63F6]" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            <MascotHelper mood={game.mascotMood} />
          </div>

          <section className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-[#FFF3C4] p-6" aria-live="polite">
            {celebrating ? <Celebration /> : null}
            <div className="flex flex-wrap gap-2 text-lg leading-relaxed">
              {currentQuestion?.visualPrompt.map((item, index) => (
                <VisualChip key={`${currentQuestion.id}-${item}-${index}`} label={item} />
              ))}
            </div>
            <p className="mt-5 text-2xl font-black leading-tight sm:text-3xl">
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

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            <Button onClick={() => setShowVoice((current) => !current)} variant="secondary">
              Voice
            </Button>
            <Button onClick={nextQuestion} disabled={!selectedAnswer} variant="blue">
              {questionIndex === game.questions.length - 1 ? "Finish Demo" : "Next Mission"}
            </Button>
          </div>

          {showVoice && currentQuestion ? (
            <InfoCard title="Voice button" body={currentQuestion.voiceLine} tone="blue" />
          ) : null}

          {showHint && currentQuestion ? (
            <InfoCard title="Hint" body={currentQuestion.hint} tone="blue" />
          ) : null}

          {selectedAnswer && currentQuestion ? (
            <InfoCard
              title={answeredCorrectly ? "Celebration!" : "Keep trying"}
              body={
                answeredCorrectly
                  ? `You earned 1 star. ${currentQuestion.correctAnswer} is correct.`
                  : `The correct answer is ${currentQuestion.correctAnswer}. Read the steps below and try the next mission.`
              }
              tone={answeredCorrectly ? "green" : "pink"}
            />
          ) : null}

          {showExplanation && currentQuestion ? (
            <ExplanationCard
              hint={currentQuestion.hint}
              steps={currentQuestion.stepByStep}
              visual={currentQuestion.visualExplanation}
              tip={currentQuestion.learnBotTip}
            />
          ) : null}
        </article>
      </section>
    </main>
  );
}

function VisualChip({ label }: { label: string }) {
  const lower = label.toLowerCase();

  if (lower.includes("bird")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-full bg-[#BAE6FD] px-3 text-xs font-black text-[#0B63F6]">bird</span>;
  }

  if (lower.includes("apple")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-full bg-[#EF4444] px-3 text-xs font-black text-white">apple</span>;
  }

  if (lower.includes("fish")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-full bg-[#14B8A6] px-3 text-xs font-black text-white">fish</span>;
  }

  if (lower.includes("star")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-full bg-[#FFC83D] px-3 text-xs font-black text-[#082B80]">star</span>;
  }

  if (lower.includes("coin")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-full bg-[#FFB300] px-3 text-xs font-black text-[#082B80]">coin</span>;
  }

  if (lower.includes("circle")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-full bg-[#FFC83D] px-3 text-xs font-black text-[#082B80]">circle</span>;
  }

  if (lower.includes("triangle")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-2xl bg-[#FF9F1C] px-3 text-xs font-black text-white">triangle</span>;
  }

  if (lower.includes("square")) {
    return <span className="flex min-h-12 min-w-14 items-center justify-center rounded-xl bg-[#0B63F6] px-3 text-xs font-black text-white">square</span>;
  }

  if (lower.includes("rectangle")) {
    return <span className="flex min-h-12 min-w-20 items-center justify-center rounded-xl bg-[#8B5CF6] px-3 text-xs font-black text-white">rectangle</span>;
  }

  return (
    <span className="flex min-h-12 min-w-14 items-center justify-center rounded-2xl bg-white px-3 text-center text-base font-black text-[#082B80] shadow-sm">
      {label}
    </span>
  );
}

function GameCover({ game }: { game: MathDemoGame }) {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-[2rem] bg-white shadow-inner">
      <Image
        src={game.imageSrc}
        alt={game.imageAlt}
        fill
        sizes="(min-width: 1024px) 420px, 90vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
function MascotHelper({ mood }: { mood: string }) {
  return (
    <aside className="rounded-[1.5rem] bg-[#EEF7FF] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-sm font-black text-[#0B63F6] shadow-sm">
          BOT
        </div>
        <div>
          <p className="text-sm font-black uppercase text-[#5B6B94]">LearnBot Helper</p>
          <p className="text-lg font-black">{mood}</p>
        </div>
      </div>
      <p className="mt-4 text-sm font-bold leading-6 text-[#5B6B94]">
        I can give hints, explain each step, and read the mission voice line.
      </p>
    </aside>
  );
}

function Celebration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute left-8 top-4 animate-bounce rounded-full bg-[#FFC83D] px-3 py-2 text-sm font-black text-[#082B80]">STAR</span>
      <span className="absolute right-12 top-8 animate-ping rounded-full bg-[#FF4FB8] px-3 py-2 text-sm font-black text-white">YES</span>
      <span className="absolute bottom-6 left-1/2 animate-bounce rounded-full bg-[#22C55E] px-3 py-2 text-sm font-black text-white">WIN</span>
    </div>
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

function ExplanationCard({
  hint,
  steps,
  visual,
  tip,
}: {
  hint: string;
  steps: string[];
  visual: string;
  tip: string;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#DDE8F5] bg-white" aria-label="Explanation note">
      <div className="grid gap-0 md:grid-cols-4">
        <div className="border-b border-[#DDE8F5] p-5 md:border-b-0 md:border-r">
          <p className="text-sm font-black uppercase text-[#0B63F6]">Hint</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">{hint}</p>
        </div>
        <div className="border-b border-[#DDE8F5] p-5 md:border-b-0 md:border-r">
          <p className="text-sm font-black uppercase text-[#0B63F6]">Step-by-step</p>
          <ol className="mt-2 space-y-2 text-sm font-bold leading-6 text-[#5B6B94]">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="border-b border-[#DDE8F5] p-5 md:border-b-0 md:border-r">
          <p className="text-sm font-black uppercase text-[#0B63F6]">Visual</p>
          <p className="mt-2 text-lg font-black leading-7 text-[#082B80]">{visual}</p>
        </div>
        <div className="bg-[#EAFBF0] p-5">
          <p className="text-sm font-black uppercase text-[#15803D]">LearnBot says</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#14532D]">{tip}</p>
        </div>
      </div>
    </section>
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