"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ForestRewardScreen } from "@/components/mvp/explanation/ForestRewardScreen";
import { MvpButton, MvpButtonLink, MvpProgressBar } from "@/components/mvp/MvpUi";
import { calculateStars, useMvpProgress } from "@/components/mvp/useMvpProgress";
import { englishWorldIdentity } from "@/data/english-world-identity";
import { forestWorldIdentity } from "@/data/forest-world-identity";
import { getLevelBonusXp, type MvpLevel, type MvpQuestion } from "@/data/mvp-forest-world";
import type { NodeType } from "@/data/curriculum-types";
import type { LevelQuestionAttemptInput, ProgressWorldRef } from "@/data/progress-types";
import type { ProgressSyncStatus } from "@/lib/progress/child-progress";
import {
  buildEnglishLevelOneExplanationSections,
  getEnglishLevelOneActivityState,
  getEnglishLevelOnePrototype,
  type EnglishLevelOnePrototype,
} from "@/lib/english/level-one-prototype";
import { getForestLevelAccess } from "@/lib/progress/level-access";
import { LockedLevelNotice } from "@/components/mvp/LockedLevelNotice";

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

function saveStatusLabel(status: ProgressSyncStatus) {
  return {
    loading: "Loading",
    "local-only": "Local",
    "signed-out": "Local",
    "no-child-profile": "Profile needed",
    syncing: "Saving",
    synced: "Saved",
    error: "Save issue",
  }[status];
}

function saveStatusClass(status: ProgressSyncStatus) {
  if (status === "synced") return "bg-[#DCFCE7] text-[#15803D]";
  if (status === "syncing" || status === "loading") return "bg-[#EAF6FF] text-[#0B63F6]";
  if (status === "error") return "bg-[#FEE2E2] text-[#B91C1C]";
  return "bg-[#FFF3C4] text-[#9A6700]";
}

export function EnglishLevelOneQuestionPlayer({ level }: { level: MvpLevel }) {
  const progressRef = useMemo<ProgressWorldRef>(() => ({
    subject: level.subject ?? englishWorldIdentity.subject,
    year: level.year ?? englishWorldIdentity.year,
    worldId: level.worldId ?? englishWorldIdentity.worldId,
  }), [level.subject, level.year, level.worldId]);
  const totalLevelCount = 10;
  const { progress, ready, worldProgressRecord, worldCompleted, completeLevel, syncStatus, lastSyncedAt } = useMvpProgress(progressRef, totalLevelCount);
  const [sessionQuestions] = useState(() => createSessionQuestions(level));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [draftAnswer, setDraftAnswer] = useState<string | null>(null);
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState<LevelQuestionAttemptInput[]>([]);
  const [completed, setCompleted] = useState(false);
  const [rewardXp, setRewardXp] = useState(0);
  const [rewardTotals, setRewardTotals] = useState({ stars: 0, xp: 0 });
  const [hintOpen, setHintOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const finishingRef = useRef(false);
  const currentQuestion = sessionQuestions[questionIndex];
  const prototype = useMemo(() => getEnglishLevelOnePrototype(currentQuestion), [currentQuestion]);
  const answered = submittedAnswer !== null;
  const answeredCorrectly = submittedAnswer === currentQuestion.correctAnswer;
  const starsEarned = useMemo(() => calculateStars(correctCount, sessionQuestions.length), [correctCount, sessionQuestions.length]);
  const answerXp = attempts.reduce((total, attempt) => total + (attempt.correct ? attempt.xpReward : 0), 0);
  const completesWorld = level.level === 10;
  const progressLoading = level.level !== 1 && (!ready || syncStatus === "loading");
  const levelAccess = getForestLevelAccess(level.level, worldProgressRecord.completedLevels);
  const mapHref = level.mapHref ?? "/english/world-map";
  const levelHrefBase = level.levelHrefBase ?? "/english/level";
  const worldName = level.worldName ?? "Forest World";

  function submitAnswer() {
    if (answered || draftAnswer === null) return;

    const correct = draftAnswer === currentQuestion.correctAnswer;
    setSubmittedAnswer(draftAnswer);
    setAttempts((current) => [
      ...current,
      {
        questionId: currentQuestion.id,
        selectedAnswer: draftAnswer,
        correct,
        xpReward: currentQuestion.xpReward,
      },
    ]);

    if (correct) {
      setCorrectCount((current) => current + 1);
    }
  }

  function continueQuestion() {
    if (!answered) return;
    if (questionIndex < sessionQuestions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setDraftAnswer(null);
      setSubmittedAnswer(null);
      setHintOpen(false);
      setVoiceOpen(false);
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
            nextLevelHrefBase={level.levelHrefBase ?? "/english/level"}
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

  return (
    <main className="fixed inset-0 z-50 isolate flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,#F3ECFF_0,#F8FBFF_38%,#EAFBF0_100%)] text-[#082B80]">
      <EnglishLessonHeader level={level} mapHref={mapHref} />
      <EnglishProgressStrip
        questionNumber={questionIndex + 1}
        totalQuestions={sessionQuestions.length}
        score={correctCount}
        xp={answerXp}
        syncStatus={syncStatus}
      />

      <section className="mx-auto grid min-h-0 w-full max-w-[96rem] flex-1 gap-3 overflow-y-auto overflow-x-hidden p-3 lg:overflow-hidden lg:p-4" aria-label="English Level 1 question experience">
        <div className={`grid min-h-0 gap-3 ${answered ? "lg:grid-cols-[minmax(0,1fr)_minmax(23rem,34rem)]" : "lg:grid-cols-1"}`}>
          <EnglishActivityCard
            question={currentQuestion}
            prototype={prototype}
            draftAnswer={draftAnswer}
            submittedAnswer={submittedAnswer}
            hintOpen={hintOpen}
            voiceOpen={voiceOpen}
            onChoose={setDraftAnswer}
            onToggleHint={() => setHintOpen((current) => !current)}
            onToggleVoice={() => setVoiceOpen((current) => !current)}
          />

          {answered ? (
            <EnglishExplanationPanel
              prototype={prototype}
              selectedAnswer={submittedAnswer}
              correct={answeredCorrectly}
              xpGained={answeredCorrectly ? currentQuestion.xpReward : 0}
            />
          ) : null}
        </div>
      </section>

      <EnglishActionBar
        mapHref={mapHref}
        answered={answered}
        draftSelected={draftAnswer !== null}
        lastQuestion={questionIndex === sessionQuestions.length - 1}
        correct={answeredCorrectly}
        onSubmit={submitAnswer}
        onContinue={continueQuestion}
      />
    </main>
  );
}

function EnglishLessonHeader({ level, mapHref }: { level: MvpLevel; mapHref: string }) {
  return (
    <header className="shrink-0 border-b border-[#DDE8F5] bg-white/95 px-3 py-2 shadow-sm backdrop-blur sm:px-5">
      <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image src="/learnplay-academy-logo.webp" alt="LearnPlay Academy" width={42} height={42} className="h-10 w-10 shrink-0 rounded-xl object-contain" priority />
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-wide text-[#6D28D9]">English - Forest World - Level {level.level}</p>
            <h1 className="truncate text-lg font-black leading-tight text-[#082B80] sm:text-2xl">{level.title}</h1>
          </div>
        </div>
        <Link href={mapHref} className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border-2 border-[#DDE8F5] bg-white px-4 text-sm font-black transition hover:border-[#6D28D9] hover:bg-[#F3ECFF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6D28D9]/25">
          Exit lesson
        </Link>
      </div>
    </header>
  );
}

function EnglishProgressStrip({
  questionNumber,
  totalQuestions,
  score,
  xp,
  syncStatus,
}: {
  questionNumber: number;
  totalQuestions: number;
  score: number;
  xp: number;
  syncStatus: ProgressSyncStatus;
}) {
  const percent = Math.round((questionNumber / totalQuestions) * 100);
  return (
    <section className="shrink-0 border-b border-[#DDE8F5] bg-white/90 px-3 py-2 backdrop-blur sm:px-5" aria-label="English level progress">
      <div className="mx-auto grid max-w-[96rem] gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F3ECFF] px-3 py-1 text-sm font-black text-[#6D28D9]">Question {questionNumber} of {totalQuestions}</span>
            <span className={`inline-flex min-h-7 items-center rounded-full px-2.5 text-[0.68rem] font-black ${saveStatusClass(syncStatus)}`} aria-live="polite">
              {saveStatusLabel(syncStatus)}
            </span>
          </div>
          <div className="mt-2"><MvpProgressBar value={percent} label="English Level 1 progress" /></div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:min-w-72">
          <Metric label="Progress" value={`${percent}%`} tone="purple" />
          <Metric label="Score" value={`${score}/${totalQuestions}`} tone="green" />
          <Metric label="XP" value={String(xp)} tone="yellow" />
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "purple" | "green" | "yellow" }) {
  const toneClass = {
    purple: "bg-[#F3ECFF]",
    green: "bg-[#EAFBF0]",
    yellow: "bg-[#FFF7D6]",
  }[tone];
  return (
    <div className={`rounded-xl px-2 py-1.5 text-center ${toneClass}`}>
      <p className="text-[0.58rem] font-black uppercase tracking-wide text-[#5B6B94]">{label}</p>
      <p className="mt-0.5 text-sm font-black text-[#082B80] sm:text-base">{value}</p>
    </div>
  );
}

function EnglishActivityCard({
  question,
  prototype,
  draftAnswer,
  submittedAnswer,
  hintOpen,
  voiceOpen,
  onChoose,
  onToggleHint,
  onToggleVoice,
}: {
  question: MvpQuestion;
  prototype: EnglishLevelOnePrototype;
  draftAnswer: string | null;
  submittedAnswer: string | null;
  hintOpen: boolean;
  voiceOpen: boolean;
  onChoose: (answer: string) => void;
  onToggleHint: () => void;
  onToggleVoice: () => void;
}) {
  const submitted = submittedAnswer !== null;
  const activityState = getEnglishLevelOneActivityState({ submitted });

  return (
    <article className="mx-auto flex min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-[#D8CDFC] bg-white p-3 shadow-playful sm:p-4 lg:max-w-none" aria-labelledby={`${question.id}-prompt`} data-english-level-one-prototype="true">
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#6D28D9] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white">Type {prototype.typeCode}</span>
        <span className="rounded-full bg-[#F3ECFF] px-3 py-1.5 text-xs font-black text-[#6D28D9]">{prototype.typeName}</span>
        <span className="rounded-full bg-[#EAF6FF] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-[#0B63F6]">English - Alphabet Recognition</span>
        {submitted ? (
          <span className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wide ${submittedAnswer === question.correctAnswer ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#B91C1C]"}`} role="status" aria-live="polite">
            {submittedAnswer === question.correctAnswer ? "Correct" : "Review"}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex shrink-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 id={`${question.id}-prompt`} className="text-2xl font-black leading-tight text-[#082B80] sm:text-3xl lg:text-[2rem]">
            {prototype.prompt}
          </h2>
          <p className="mt-1 text-sm font-bold leading-6 text-[#3F527E] sm:text-base">{prototype.instruction}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={onToggleHint} aria-expanded={hintOpen} className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#FFE0A3] bg-[#FFF7D6] px-3 text-sm font-black text-[#8A4B00] transition hover:bg-[#FFF0B5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A]/40">
            Hint
          </button>
          <button type="button" onClick={onToggleVoice} aria-expanded={voiceOpen} className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#CFE2FF] bg-[#EAF6FF] px-3 text-sm font-black text-[#0B63F6] transition hover:bg-[#DCEEFF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B63F6]/25">
            Listen
          </button>
        </div>
      </div>

      {hintOpen ? (
        <div className="mt-3 rounded-[1.1rem] border border-[#FFD76A] bg-[#FFF7D6] px-4 py-3 text-sm font-black leading-6 text-[#082B80]" role="note">
          {prototype.hint}
        </div>
      ) : null}
      {voiceOpen ? (
        <div className="mt-3 rounded-[1.1rem] border border-[#CFE2FF] bg-[#F8FBFF] px-4 py-3 text-sm font-black leading-6 text-[#082B80]" role="note">
          {prototype.voiceScript}
        </div>
      ) : null}

      <div className="mt-3 min-h-0 flex-1 overflow-visible rounded-[1.35rem] border border-[#DDE8F5] bg-[#F8FBFF] p-3">
        <EnglishActivityVisual prototype={prototype} showCorrectAnswer={activityState.showCorrectAnswer} />
      </div>

      <div className="mt-3 grid shrink-0 gap-2 sm:grid-cols-2">
        {prototype.choices.map((choice) => (
          <AnswerButton
            key={choice.id}
            label={choice.label}
            accessibilityLabel={choice.accessibilityLabel}
            selected={draftAnswer === choice.label}
            submitted={submitted}
            correct={choice.label === question.correctAnswer}
            chosenIncorrect={submitted && submittedAnswer === choice.label && submittedAnswer !== question.correctAnswer}
            onClick={() => onChoose(choice.label)}
          />
        ))}
      </div>
    </article>
  );
}

function EnglishActivityVisual({ prototype, showCorrectAnswer }: { prototype: EnglishLevelOnePrototype; showCorrectAnswer: boolean }) {
  if (prototype.type === "picture-choice") {
    return (
      <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0 rounded-[1.25rem] bg-gradient-to-br from-[#EAFBF0] to-white p-4 text-center">
          {prototype.picture?.assetSrc ? (
            <Image
              src={prototype.picture.assetSrc}
              alt={prototype.picture.altText}
              width={112}
              height={112}
              className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
            />
          ) : (
            <div className="text-6xl sm:text-7xl" role="img" aria-label={prototype.picture?.altText ?? prototype.displayText}>{prototype.picture?.emoji}</div>
          )}
          <p className="mt-2 text-lg font-black text-[#082B80]">{prototype.picture?.label}</p>
        </div>
        <div className="min-w-0 rounded-[1.15rem] bg-white p-4 text-center shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">{prototype.visualLabel}</p>
          <p className="mt-2 text-base font-black leading-6 text-[#082B80]">Choose the first letter.</p>
          {showCorrectAnswer ? <p className="mt-3 rounded-full bg-[#DCFCE7] px-4 py-2 text-xl font-black text-[#15803D]">Answer: {prototype.correctAnswer}</p> : null}
        </div>
      </div>
    );
  }

  if (prototype.type === "matching") {
    return (
      <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
        <div className="rounded-[1.25rem] bg-[#F3ECFF] p-4 text-center">
          <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">Clue</p>
          <p className="mt-2 text-2xl font-black text-[#082B80] sm:text-3xl">{prototype.displayText}</p>
        </div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#6D28D9] shadow-sm" aria-hidden>
          =
        </div>
        <div className="rounded-[1.25rem] bg-white p-4 text-center shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">Match</p>
          <p className="mt-2 text-lg font-black text-[#082B80]">Choose the partner letter.</p>
          {showCorrectAnswer ? <p className="mt-3 rounded-full bg-[#DCFCE7] px-4 py-2 text-xl font-black text-[#15803D]">Answer: {prototype.correctAnswer}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.25rem] bg-white p-4 text-center shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">{prototype.visualLabel}</p>
      <p className="mt-2 text-3xl font-black tracking-wide text-[#082B80] sm:text-4xl">{showCorrectAnswer ? prototype.displayText.replace("___", prototype.correctAnswer) : prototype.displayText}</p>
      {showCorrectAnswer ? <p className="mx-auto mt-3 inline-flex rounded-full bg-[#DCFCE7] px-4 py-2 text-xl font-black text-[#15803D]">Answer: {prototype.correctAnswer}</p> : null}
    </div>
  );
}

function AnswerButton({
  label,
  accessibilityLabel,
  selected,
  submitted,
  correct,
  chosenIncorrect,
  onClick,
}: {
  label: string;
  accessibilityLabel: string;
  selected: boolean;
  submitted: boolean;
  correct: boolean;
  chosenIncorrect: boolean;
  onClick: () => void;
}) {
  const stateClass = submitted && correct
    ? "border-[#22C55E] bg-[#DCFCE7] text-[#15803D]"
    : chosenIncorrect
      ? "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]"
      : selected
        ? "border-[#6D28D9] bg-[#F3ECFF] text-[#6D28D9]"
        : "border-[#DDE8F5] bg-white text-[#082B80] hover:border-[#6D28D9] hover:bg-[#F8F4FF]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={submitted}
      aria-label={accessibilityLabel}
      aria-pressed={selected || (submitted && correct)}
      className={`flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-[1.1rem] border-2 px-4 text-left text-lg font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6D28D9]/25 disabled:cursor-default ${stateClass}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70 text-sm font-black text-[#0B63F6]">{label.slice(0, 1).toUpperCase()}</span>
      <span className="min-w-0 flex-1 break-words">{label}</span>
      {submitted && correct ? <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase">Correct</span> : null}
      {chosenIncorrect ? <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase">Review</span> : null}
    </button>
  );
}

function EnglishExplanationPanel({
  prototype,
  selectedAnswer,
  correct,
  xpGained,
}: {
  prototype: EnglishLevelOnePrototype;
  selectedAnswer: string | null;
  correct: boolean;
  xpGained: number;
}) {
  const sections = buildEnglishLevelOneExplanationSections(prototype);
  return (
    <aside className="lp-reveal-soft min-w-0 overflow-hidden rounded-[1.75rem] border border-[#D8CDFC] bg-white p-3 shadow-playful sm:p-4" aria-label="English answer explanation" data-english-explanation-block-count={sections.length}>
      <div className="grid min-w-0 gap-3 lg:grid-cols-[8rem_1fr] lg:items-start">
        <div className="hidden rounded-[1.25rem] bg-[#F3ECFF] p-3 text-center lg:block">
          <Image src={correct ? "/mascots/learnbot-happy.webp" : "/mascots/learnbot-thinking.webp"} alt="LearnBot" width={120} height={120} className="mx-auto h-28 w-28 object-contain" />
          <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#6D28D9]">LearnBot</p>
        </div>
        <div className="min-w-0">
          <div className={`rounded-[1.15rem] border px-4 py-3 ${correct ? "border-[#22C55E]/50 bg-[#DCFCE7]" : "border-[#FCA5A5] bg-[#FEE2E2]"}`} aria-live="polite">
            <p className="text-xs font-black uppercase tracking-wide text-[#5B6B94]">{correct ? "Correct" : "Try this way"}</p>
            <h2 className="mt-1 text-xl font-black text-[#082B80]">{correct ? "Great job!" : "Good try."}</h2>
            <p className="mt-1 text-sm font-bold leading-6 text-[#3F527E]">
              {correct ? "You found the English clue." : `You chose ${selectedAnswer}. Let us check the clue together.`}
            </p>
          </div>

          <div className="mt-3 grid gap-2">
            {sections.map((section) => (
              <section key={section.id} className="rounded-[1rem] border border-[#DDE8F5] bg-[#F8FBFF] px-4 py-3">
                <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#6D28D9]">{section.title}</p>
                <p className="mt-1 text-sm font-black leading-6 text-[#082B80]">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 rounded-[1rem] bg-[#FFF7D6] px-4 py-3">
            <span className="text-lg font-black text-[#082B80]">+{xpGained} XP</span>
            <span className="text-sm font-bold text-[#5B6B94]">Continue when you are ready.</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function EnglishActionBar({
  mapHref,
  answered,
  draftSelected,
  lastQuestion,
  correct,
  onSubmit,
  onContinue,
}: {
  mapHref: string;
  answered: boolean;
  draftSelected: boolean;
  lastQuestion: boolean;
  correct: boolean;
  onSubmit: () => void;
  onContinue: () => void;
}) {
  return (
    <nav className="shrink-0 border-t border-[#DDE8F5] bg-white/95 px-3 pt-2 shadow-[0_-8px_24px_rgba(8,43,128,0.1)] backdrop-blur sm:px-5 sm:pt-3" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }} aria-label="English question actions">
      <div className="mx-auto grid max-w-[96rem] grid-cols-[auto_1fr] items-center gap-2 sm:flex sm:gap-3">
        <MvpButtonLink href={mapHref} tone="white" className="shrink-0 px-3 sm:px-4">Exit</MvpButtonLink>
        <p className="hidden min-w-0 flex-1 text-center text-sm font-bold text-[#5B6B94] md:block" aria-live="polite">
          {answered ? (correct ? "Read the short explanation, then continue." : "Check the clue, then continue.") : "Choose an answer, then submit."}
        </p>
        {answered ? (
          <MvpButton onClick={onContinue} className="col-span-2 min-w-0 px-4 sm:col-span-1 sm:min-w-48">
            {lastQuestion ? "Finish Level" : "Next Question"}
          </MvpButton>
        ) : (
          <MvpButton onClick={onSubmit} disabled={!draftSelected} className="col-span-2 min-w-0 px-4 sm:col-span-1 sm:min-w-48">
            {draftSelected ? "Submit Answer" : "Choose an answer"}
          </MvpButton>
        )}
      </div>
    </nav>
  );
}
