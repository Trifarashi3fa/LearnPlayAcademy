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
  canSubmitEnglishLevelOneAnswer,
  getEnglishLevelOneActivityState,
  getEnglishLevelOneBlankDisplay,
  getEnglishLevelOneChoiceById,
  getEnglishLevelOneMatchingModel,
  getEnglishLevelOnePicturePresentation,
  getEnglishLevelOnePrototype,
  getEnglishLevelOneSelectedAnswer,
  isEnglishLevelOneChoiceCorrect,
  type EnglishLevelOneChoice,
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
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [submittedChoiceId, setSubmittedChoiceId] = useState<string | null>(null);
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
  const submittedAnswer = getEnglishLevelOneSelectedAnswer(prototype, submittedChoiceId);
  const answered = submittedChoiceId !== null;
  const answeredCorrectly = isEnglishLevelOneChoiceCorrect(prototype, submittedChoiceId);
  const canSubmit = canSubmitEnglishLevelOneAnswer({ selectedChoiceId, submitted: answered });
  const starsEarned = useMemo(() => calculateStars(correctCount, sessionQuestions.length), [correctCount, sessionQuestions.length]);
  const answerXp = attempts.reduce((total, attempt) => total + (attempt.correct ? attempt.xpReward : 0), 0);
  const completesWorld = level.level === 10;
  const progressLoading = level.level !== 1 && (!ready || syncStatus === "loading");
  const levelAccess = getForestLevelAccess(level.level, worldProgressRecord.completedLevels);
  const mapHref = level.mapHref ?? "/english/world-map";
  const levelHrefBase = level.levelHrefBase ?? "/english/level";
  const worldName = level.worldName ?? "Forest World";

  function submitAnswer() {
    if (!canSubmit) return;

    const selectedAnswer = getEnglishLevelOneSelectedAnswer(prototype, selectedChoiceId);
    if (selectedAnswer === null || selectedChoiceId === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setSubmittedChoiceId(selectedChoiceId);
    setAttempts((current) => [
      ...current,
      {
        questionId: currentQuestion.id,
        selectedAnswer,
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
      setSelectedChoiceId(null);
      setSubmittedChoiceId(null);
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

      <section
        className="mx-auto grid min-h-0 w-full max-w-[96rem] flex-1 gap-3 overflow-y-auto overflow-x-hidden px-3 pb-3 pt-3 lg:px-4 lg:pb-3 lg:pt-4"
        style={{ scrollPaddingBottom: "calc(5.5rem + env(safe-area-inset-bottom))" }}
        aria-label="English Level 1 question experience"
        data-english-actionbar-safe-area="true"
      >
        <div className={`grid min-h-0 gap-3 ${answered ? "lg:grid-cols-[minmax(0,1fr)_minmax(23rem,34rem)]" : "lg:grid-cols-1"}`}>
          <EnglishActivityCard
            question={currentQuestion}
            prototype={prototype}
            selectedChoiceId={selectedChoiceId}
            submittedChoiceId={submittedChoiceId}
            hintOpen={hintOpen}
            voiceOpen={voiceOpen}
            onChooseChoice={setSelectedChoiceId}
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
        draftSelected={selectedChoiceId !== null}
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
  selectedChoiceId,
  submittedChoiceId,
  hintOpen,
  voiceOpen,
  onChooseChoice,
  onToggleHint,
  onToggleVoice,
}: {
  question: MvpQuestion;
  prototype: EnglishLevelOnePrototype;
  selectedChoiceId: string | null;
  submittedChoiceId: string | null;
  hintOpen: boolean;
  voiceOpen: boolean;
  onChooseChoice: (choiceId: string) => void;
  onToggleHint: () => void;
  onToggleVoice: () => void;
}) {
  const submitted = submittedChoiceId !== null;
  const activityState = getEnglishLevelOneActivityState({ submitted });
  const correct = isEnglishLevelOneChoiceCorrect(prototype, submittedChoiceId);

  return (
    <article className={`mx-auto flex min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border bg-white p-3 shadow-playful sm:p-4 lg:max-w-none ${prototype.type === "picture-choice" ? "border-[#CDEFD9]" : "border-[#D8CDFC]"}`} aria-labelledby={`${question.id}-prompt`} data-english-level-one-prototype="true" data-english-activity-type={prototype.type}>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#6D28D9] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white">Type {prototype.typeCode}</span>
        <span className="rounded-full bg-[#F3ECFF] px-3 py-1.5 text-xs font-black text-[#6D28D9]">{prototype.activityLabel}</span>
        <span className="rounded-full bg-[#EAF6FF] px-3 py-1.5 text-xs font-black uppercase tracking-wide text-[#0B63F6]">English - Alphabet Recognition</span>
        {submitted ? (
          <span className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wide ${correct ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#B91C1C]"}`} role="status" aria-live="polite">
            {correct ? "Correct" : "Review"}
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
        <div className="flex shrink-0 gap-2" aria-label="English help controls">
          <LessonToolButton label="Hint" expanded={hintOpen} tone="hint" onClick={onToggleHint} />
          <LessonToolButton label="Listen" expanded={voiceOpen} tone="voice" onClick={onToggleVoice} />
        </div>
      </div>

      {hintOpen ? <HelpNote tone="hint" label="Hint" body={prototype.hint} /> : null}
      {voiceOpen ? <HelpNote tone="voice" label="Listen" body={prototype.voiceScript} /> : null}

      <EnglishActivityBody
        prototype={prototype}
        selectedChoiceId={selectedChoiceId}
        submittedChoiceId={submittedChoiceId}
        showCorrectAnswer={activityState.showCorrectAnswer}
        onChooseChoice={onChooseChoice}
      />
    </article>
  );
}

function LessonToolButton({ label, expanded, tone, onClick }: { label: string; expanded: boolean; tone: "hint" | "voice"; onClick: () => void }) {
  const toneClass = tone === "hint"
    ? "border-[#FFE0A3] bg-[#FFF7D6] text-[#8A4B00] hover:bg-[#FFF0B5] focus-visible:ring-[#FFD76A]/40"
    : "border-[#CFE2FF] bg-[#EAF6FF] text-[#0B63F6] hover:bg-[#DCEEFF] focus-visible:ring-[#0B63F6]/25";
  const icon = tone === "hint" ? "?" : "))";

  return (
    <button type="button" onClick={onClick} aria-label={`${label}. ${expanded ? "Hide" : "Show"} help`} aria-expanded={expanded} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 px-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-4 ${toneClass}`}>
      <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-full bg-white/75 text-xs">{icon}</span>
      {label}
    </button>
  );
}

function HelpNote({ tone, label, body }: { tone: "hint" | "voice"; label: string; body: string }) {
  const toneClass = tone === "hint" ? "border-[#FFD76A] bg-[#FFF7D6]" : "border-[#CFE2FF] bg-[#F8FBFF]";
  return (
    <div className={`mt-3 rounded-[1.1rem] border px-4 py-3 text-sm font-black leading-6 text-[#082B80] ${toneClass}`} role="note">
      <span className="mr-2 text-[0.68rem] uppercase tracking-wide text-[#5B6B94]">{label}</span>
      {body}
    </div>
  );
}

function EnglishActivityBody({
  prototype,
  selectedChoiceId,
  submittedChoiceId,
  showCorrectAnswer,
  onChooseChoice,
}: {
  prototype: EnglishLevelOnePrototype;
  selectedChoiceId: string | null;
  submittedChoiceId: string | null;
  showCorrectAnswer: boolean;
  onChooseChoice: (choiceId: string) => void;
}) {
  if (prototype.type === "matching") {
    return <EnglishMatchingActivity prototype={prototype} selectedChoiceId={selectedChoiceId} submittedChoiceId={submittedChoiceId} onChooseChoice={onChooseChoice} />;
  }

  if (prototype.type === "picture-choice") {
    return <EnglishPictureChoiceActivity prototype={prototype} selectedChoiceId={selectedChoiceId} submittedChoiceId={submittedChoiceId} showCorrectAnswer={showCorrectAnswer} onChooseChoice={onChooseChoice} />;
  }

  return <EnglishFillBlankActivity prototype={prototype} selectedChoiceId={selectedChoiceId} submittedChoiceId={submittedChoiceId} showCorrectAnswer={showCorrectAnswer} onChooseChoice={onChooseChoice} />;
}

function EnglishFillBlankActivity({
  prototype,
  selectedChoiceId,
  submittedChoiceId,
  showCorrectAnswer,
  onChooseChoice,
}: {
  prototype: EnglishLevelOnePrototype;
  selectedChoiceId: string | null;
  submittedChoiceId: string | null;
  showCorrectAnswer: boolean;
  onChooseChoice: (choiceId: string) => void;
}) {
  const submitted = submittedChoiceId !== null;
  const blankDisplay = getEnglishLevelOneBlankDisplay(prototype, selectedChoiceId);
  const selectedChoice = getEnglishLevelOneChoiceById(prototype, selectedChoiceId);

  return (
    <div className="mt-3 grid min-h-0 gap-3 rounded-[1.35rem] border border-[#D8CDFC] bg-[#FBF8FF] p-3 sm:p-4" data-english-activity-layout="blank-completion">
      <div className="rounded-[1.25rem] bg-white p-4 text-center shadow-sm">
        <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">{prototype.visualLabel}</p>
        <p className="mt-3 text-3xl font-black tracking-wide text-[#082B80] sm:text-4xl" aria-live="polite">{blankDisplay}</p>
        <p className="mx-auto mt-3 inline-flex min-h-10 items-center rounded-full bg-[#F3ECFF] px-4 text-sm font-black text-[#6D28D9]">
          {selectedChoice ? `Blank filled with ${selectedChoice.label}` : "Tap an answer to fill the blank"}
        </p>
        {showCorrectAnswer ? <p className="mx-auto mt-3 inline-flex rounded-full bg-[#DCFCE7] px-4 py-2 text-lg font-black text-[#15803D]">Correct answer: {prototype.correctAnswer}</p> : null}
      </div>
      <div>
        <p className="mb-2 text-sm font-black text-[#3F527E]">{prototype.selectionPrompt}</p>
        <div className="grid gap-2 sm:grid-cols-4">
          {prototype.choices.map((choice) => (
            <EnglishChoiceTile
              key={choice.id}
              choice={choice}
              compact
              selected={selectedChoiceId === choice.id}
              submitted={submitted}
              correct={choice.label === prototype.correctAnswer}
              chosenIncorrect={submittedChoiceId === choice.id && choice.label !== prototype.correctAnswer}
              onChoose={() => onChooseChoice(choice.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnglishMatchingActivity({
  prototype,
  selectedChoiceId,
  submittedChoiceId,
  onChooseChoice,
}: {
  prototype: EnglishLevelOnePrototype;
  selectedChoiceId: string | null;
  submittedChoiceId: string | null;
  onChooseChoice: (choiceId: string) => void;
}) {
  const model = getEnglishLevelOneMatchingModel(prototype);
  const submitted = submittedChoiceId !== null;
  const activeChoiceId = submittedChoiceId ?? selectedChoiceId;
  const selectedChoice = getEnglishLevelOneChoiceById(prototype, activeChoiceId);
  const correctChoice = getEnglishLevelOneChoiceById(prototype, model.correctChoiceId);
  const chosenIncorrect = submitted && activeChoiceId !== model.correctChoiceId;

  return (
    <div className="mt-3 grid min-h-0 gap-3 rounded-[1.35rem] border border-[#D8CDFC] bg-[#FBF8FF] p-3 sm:p-4" data-english-activity-layout="tap-to-match">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,0.85fr)_auto_minmax(0,1.15fr)] lg:items-center">
        <div className="rounded-[1.25rem] border border-[#D8CDFC] bg-white p-4 text-center shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">Clue</p>
          <p className="mt-2 text-2xl font-black text-[#082B80] sm:text-3xl">{model.clue.label}</p>
          <p className="mt-2 text-sm font-bold text-[#5B6B94]">{model.clue.helper}</p>
        </div>

        <div className="mx-auto flex min-h-16 min-w-20 flex-col items-center justify-center rounded-2xl bg-white px-3 text-center shadow-sm" aria-live="polite">
          <span className={`h-2 w-16 rounded-full ${selectedChoice ? "bg-[#6D28D9]" : "bg-[#DDE8F5]"}`} aria-hidden />
          <span className="mt-2 text-xs font-black uppercase tracking-wide text-[#5B6B94]">{selectedChoice ? "Matched" : "Tap"}</span>
        </div>

        <div>
          <p className="mb-2 text-sm font-black text-[#3F527E]">{prototype.selectionPrompt}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {model.partners.map((choice) => (
              <EnglishChoiceTile
                key={choice.id}
                choice={choice}
                selected={activeChoiceId === choice.id}
                submitted={submitted}
                correct={choice.id === model.correctChoiceId}
                chosenIncorrect={submittedChoiceId === choice.id && choice.id !== model.correctChoiceId}
                onChoose={() => onChooseChoice(choice.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-2 rounded-[1rem] bg-white/80 p-3 text-sm font-black text-[#082B80] sm:grid-cols-2" aria-live="polite">
        <div>
          <span className="text-[0.68rem] uppercase tracking-wide text-[#5B6B94]">Your match</span>
          <p>{selectedChoice ? `${model.clue.label} = ${selectedChoice.label}` : "Choose a partner letter."}</p>
        </div>
        {submitted ? (
          <div>
            <span className="text-[0.68rem] uppercase tracking-wide text-[#5B6B94]">{chosenIncorrect ? "Correct match" : "Result"}</span>
            <p>{chosenIncorrect ? `${model.clue.label} = ${correctChoice?.label ?? prototype.correctAnswer}` : "Your match is correct."}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function EnglishPictureChoiceActivity({
  prototype,
  selectedChoiceId,
  submittedChoiceId,
  showCorrectAnswer,
  onChooseChoice,
}: {
  prototype: EnglishLevelOnePrototype;
  selectedChoiceId: string | null;
  submittedChoiceId: string | null;
  showCorrectAnswer: boolean;
  onChooseChoice: (choiceId: string) => void;
}) {
  const submitted = submittedChoiceId !== null;
  const picturePresentation = getEnglishLevelOnePicturePresentation(prototype);

  return (
    <div className="mt-2 grid min-h-0 gap-2 rounded-[1.35rem] border border-[#CDEFD9] bg-[#F4FFF8] p-2.5 sm:p-3 [@media(max-height:800px)]:gap-2 [@media(max-height:800px)]:p-2" data-english-activity-layout="picture-choice" data-english-compact-type-f="true">
      <div className="grid min-w-0 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.68fr)] md:items-center lg:gap-3">
        <div className="min-w-0 rounded-[1.1rem] bg-gradient-to-br from-[#EAFBF0] to-white px-3 py-2 text-center shadow-sm sm:py-2.5 lg:p-3">
          <div className="mx-auto flex h-[clamp(5.625rem,14dvh,7.75rem)] w-full max-w-[12.5rem] items-center justify-center rounded-[1rem] border border-white/80 bg-white/75 p-2 shadow-inner sm:h-[clamp(6rem,16dvh,8.75rem)] lg:h-[clamp(7.5rem,18dvh,10.75rem)] lg:max-w-[14rem]" data-english-picture-frame="compact">
            {picturePresentation?.assetSrc && !picturePresentation.usesFallback ? (
              <Image
                src={picturePresentation.assetSrc}
                alt={picturePresentation.altText}
                width={512}
                height={512}
                className="h-full w-full object-contain"
              />
            ) : (
              <EnglishPictureFallback label={picturePresentation?.label ?? prototype.displayText} altText={picturePresentation?.altText ?? "Picture clue placeholder"} />
            )}
          </div>
          <p className="mt-2 text-xl font-black lowercase text-[#082B80] sm:text-2xl [@media(max-height:800px)]:mt-1.5 [@media(max-height:800px)]:text-xl">{picturePresentation?.label ?? prototype.displayText.toLowerCase()}</p>
          <p className="mt-0.5 text-xs font-bold text-[#3F527E] sm:text-sm">Say the word slowly.</p>
        </div>
        <div className="rounded-[1.1rem] bg-white px-3 py-3 text-center shadow-sm sm:px-4">
          <p className="text-xs font-black uppercase tracking-wide text-[#15803D]">{prototype.visualLabel}</p>
          <p className="mt-1.5 text-base font-black leading-6 text-[#082B80] sm:text-lg">Which first letter do you hear?</p>
          {showCorrectAnswer ? <p className="mt-2 rounded-full bg-[#DCFCE7] px-4 py-1.5 text-lg font-black text-[#15803D]">Correct answer: {prototype.correctAnswer}</p> : null}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-sm font-black text-[#3F527E]">{prototype.selectionPrompt}</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" data-english-answer-grid="responsive-type-f">
          {prototype.choices.map((choice) => (
            <EnglishChoiceTile
              key={choice.id}
              choice={choice}
              compact
              choiceDensity="picture"
              selected={selectedChoiceId === choice.id || submittedChoiceId === choice.id}
              submitted={submitted}
              correct={choice.label === prototype.correctAnswer}
              chosenIncorrect={submittedChoiceId === choice.id && choice.label !== prototype.correctAnswer}
              onChoose={() => onChooseChoice(choice.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnglishPictureFallback({ label, altText }: { label: string; altText: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-[0.9rem] border-2 border-dashed border-[#CDEFD9] bg-[#F8FFF9] px-4 text-center" role="img" aria-label={altText}>
      <span className="text-xs font-black uppercase tracking-wide text-[#15803D]">Picture coming soon</span>
      <span className="mt-2 text-3xl font-black lowercase text-[#082B80]">{label}</span>
    </div>
  );
}
function EnglishChoiceTile({
  choice,
  selected,
  submitted,
  correct,
  chosenIncorrect,
  compact = false,
  choiceDensity = "default",
  onChoose,
}: {
  choice: EnglishLevelOneChoice;
  selected: boolean;
  submitted: boolean;
  correct: boolean;
  chosenIncorrect: boolean;
  compact?: boolean;
  choiceDensity?: "default" | "picture";
  onChoose: () => void;
}) {
  const stateClass = submitted && correct
    ? "border-[#22C55E] bg-[#DCFCE7] text-[#15803D]"
    : chosenIncorrect
      ? "border-[#FCA5A5] bg-[#FEE2E2] text-[#B91C1C]"
      : selected
        ? "border-[#6D28D9] bg-[#F3ECFF] text-[#6D28D9]"
        : "border-[#DDE8F5] bg-white text-[#082B80] hover:border-[#6D28D9] hover:bg-[#F8F4FF]";
  const statusLabel = submitted && correct ? "Correct" : chosenIncorrect ? "Review" : selected ? "Selected" : "";

  return (
    <button
      type="button"
      onClick={onChoose}
      disabled={submitted}
      aria-label={choice.accessibilityLabel}
      aria-pressed={selected || (submitted && correct)}
      className={`flex ${choiceDensity === "picture" ? "min-h-12" : "min-h-14"} min-w-0 items-center gap-3 rounded-[1.1rem] border-2 px-4 text-left font-black transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6D28D9]/25 disabled:cursor-default ${compact ? "justify-center text-xl sm:text-2xl" : "justify-between text-lg"} ${stateClass}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70 text-sm font-black text-[#0B63F6]">{choice.label.slice(0, 1).toUpperCase()}</span>
      <span className="min-w-0 flex-1 break-words">{choice.label}</span>
      {statusLabel ? <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase">{statusLabel}</span> : null}
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
