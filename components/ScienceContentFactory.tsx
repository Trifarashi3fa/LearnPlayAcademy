"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";
import {
  scienceActivities,
  scienceBadges,
  scienceFacts,
  scienceLearningPaths,
  scienceQuestions,
  scienceQuizLevels,
  type ScienceQuestion,
  type ScienceQuizLevel,
} from "@/data/science-content";

type ScienceTab = "quizzes" | "facts" | "activities" | "paths";

type ScienceProgress = {
  xp: number;
  completedQuizzes: string[];
  completedActivities: string[];
  completedPaths: string[];
  badges: string[];
};

const storageKey = "learnplay-science-progress-v1";

const defaultProgress: ScienceProgress = {
  xp: 0,
  completedQuizzes: [],
  completedActivities: [],
  completedPaths: [],
  badges: [],
};

const tabs: { id: ScienceTab; label: string }[] = [
  { id: "quizzes", label: "Quizzes" },
  { id: "facts", label: "Facts" },
  { id: "activities", label: "Activities" },
  { id: "paths", label: "Learning Paths" },
];

function loadProgress() {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? { ...defaultProgress, ...JSON.parse(saved) } as ScienceProgress : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: ScienceProgress) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function calculateBadges(progress: ScienceProgress) {
  const badges: string[] = [];

  if (
    progress.xp > 0 ||
    progress.completedQuizzes.length > 0 ||
    progress.completedActivities.length > 0
  ) {
    badges.push("Science Starter");
  }

  if (progress.completedQuizzes.length >= 2 || progress.xp >= 100) {
    badges.push("Science Explorer");
  }

  if (progress.completedQuizzes.length >= 3 || progress.xp >= 220) {
    badges.push("Science Master");
  }

  if (progress.completedActivities.includes("paper-rocket")) {
    badges.push("Young Inventor");
  }

  if (progress.completedPaths.includes("future-innovator") || progress.xp >= 350) {
    badges.push("Future Scientist");
  }

  if (
    progress.completedQuizzes.length >= 3 &&
    progress.completedActivities.length >= 4 &&
    progress.completedPaths.length >= 3
  ) {
    badges.push("LearnPlay Science Champion");
  }

  return unique([...progress.badges, ...badges]);
}

function nextLevelXP(xp: number) {
  if (xp < 100) {
    return { level: 1, current: xp, target: 100, percent: Math.round((xp / 100) * 100) };
  }

  if (xp < 250) {
    return { level: 2, current: xp - 100, target: 150, percent: Math.round(((xp - 100) / 150) * 100) };
  }

  if (xp < 500) {
    return { level: 3, current: xp - 250, target: 250, percent: Math.round(((xp - 250) / 250) * 100) };
  }

  return { level: 4, current: xp, target: xp, percent: 100 };
}

function getLevelQuestions(level: ScienceQuizLevel) {
  return scienceQuestions.filter((question) => question.level === level);
}

export function ScienceContentFactory() {
  const [activeTab, setActiveTab] = useState<ScienceTab>("quizzes");
  const [selectedLevel, setSelectedLevel] = useState<ScienceQuizLevel>("level1");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [progress, setProgress] = useState<ScienceProgress>(defaultProgress);

  const questions = useMemo(() => getLevelQuestions(selectedLevel), [selectedLevel]);
  const currentQuestion = questions[questionIndex];
  const answeredCorrectly = selectedAnswer === currentQuestion?.correctAnswer;
  const levelProgress = nextLevelXP(progress.xp);
  const quizKey = `science-${selectedLevel}`;
  const score = questions.reduce((total, question) => {
    return selectedAnswers[question.id] === question.correctAnswer ? total + 1 : total;
  }, 0);
  const quizXP = questions.reduce((total, question) => {
    return selectedAnswers[question.id] === question.correctAnswer ? total + question.xpReward : total;
  }, 0);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  function updateProgress(updater: (current: ScienceProgress) => ScienceProgress) {
    setProgress((current) => {
      const updated = updater(current);
      const withBadges = { ...updated, badges: calculateBadges(updated) };
      saveProgress(withBadges);
      return withBadges;
    });
  }

  function startQuiz(level: ScienceQuizLevel) {
    setSelectedLevel(level);
    setQuizStarted(true);
    setQuizCompleted(false);
    setQuestionIndex(0);
    setSelectedAnswers({});
    setSelectedAnswer(null);
  }

  function chooseAnswer(answer: string) {
    if (!currentQuestion || selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    setSelectedAnswers((current) => ({
      ...current,
      [currentQuestion.id]: answer,
    }));
  }

  function finishQuiz() {
    setQuizCompleted(true);
    setQuizStarted(false);

    if (progress.completedQuizzes.includes(quizKey)) {
      return;
    }

    updateProgress((current) => ({
      ...current,
      xp: current.xp + quizXP + 20,
      completedQuizzes: unique([...current.completedQuizzes, quizKey]),
    }));
  }

  function goNextQuestion() {
    if (questionIndex === questions.length - 1) {
      finishQuiz();
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  function completeActivity(activityId: string, xpReward: number) {
    if (progress.completedActivities.includes(activityId)) {
      return;
    }

    updateProgress((current) => ({
      ...current,
      xp: current.xp + xpReward,
      completedActivities: unique([...current.completedActivities, activityId]),
    }));
  }

  function completePath(pathId: string, xpReward: number, badge: string) {
    if (progress.completedPaths.includes(pathId)) {
      return;
    }

    updateProgress((current) => ({
      ...current,
      xp: current.xp + xpReward,
      completedPaths: unique([...current.completedPaths, pathId]),
      badges: unique([...current.badges, badge]),
    }));
  }

  function resetScienceProgress() {
    saveProgress(defaultProgress);
    setProgress(defaultProgress);
  }

  return (
    <>
      <PageSection>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card tone="yellow">
            <p className="text-sm font-black uppercase text-ink/60">Science XP</p>
            <p className="mt-3 text-5xl font-black text-ink">{progress.xp}</p>
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-black text-ink/70">
                <span>Level {levelProgress.level} progress</span>
                <span>{levelProgress.percent}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-sky"
                  style={{ width: `${levelProgress.percent}%` }}
                />
              </div>
            </div>
            <Button onClick={resetScienceProgress} variant="secondary" className="mt-6">
              Reset Local Progress
            </Button>
          </Card>

          <Card tone="blue">
            <p className="text-sm font-black uppercase text-ink/60">Badges</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {scienceBadges.map((badge) => {
                const earned = progress.badges.includes(badge);
                return (
                  <span
                    key={badge}
                    className={`rounded-full px-4 py-2 text-sm font-black ${
                      earned ? "bg-mint text-ink" : "bg-white text-ink/50"
                    }`}
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
            <p className={`mt-5 ${typography.small}`}>
              Progress is saved on this device using browser localStorage only.
              No database setup is required for Version 1.
            </p>
          </Card>
        </div>
      </PageSection>

      <section className="bg-cloud">
        <PageSection>
          <div className="mb-8 flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-3 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-sky/25 ${
                  activeTab === tab.id
                    ? "bg-sky text-white"
                    : "bg-white text-ink hover:bg-sky/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "quizzes" ? (
            <div>
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {(Object.keys(scienceQuizLevels) as ScienceQuizLevel[]).map((level) => {
                  const group = scienceQuizLevels[level];
                  const complete = progress.completedQuizzes.includes(`science-${level}`);

                  return (
                    <Card key={level} tone={complete ? "green" : "white"}>
                      <p className="text-sm font-black uppercase text-sky">
                        {group.ageRange} - {group.difficulty}
                      </p>
                      <h2 className={`${typography.h3} mt-2`}>{group.title}</h2>
                      <p className={`mt-3 ${typography.small}`}>
                        {questions.length} kid-friendly questions with explanations and XP rewards.
                      </p>
                      <Button onClick={() => startQuiz(level)} variant="blue" className="mt-5">
                        {complete ? "Replay Quiz" : "Start Quiz"}
                      </Button>
                    </Card>
                  );
                })}
              </div>

              {quizStarted && currentQuestion ? (
                <QuizPanel
                  question={currentQuestion}
                  questionIndex={questionIndex}
                  totalQuestions={questions.length}
                  selectedAnswer={selectedAnswer}
                  answeredCorrectly={answeredCorrectly}
                  onChooseAnswer={chooseAnswer}
                  onNext={goNextQuestion}
                />
              ) : null}

              {quizCompleted ? (
                <Card tone="green" className="mt-6">
                  <p className="text-sm font-black uppercase text-ink/60">Quiz complete</p>
                  <h2 className={`${typography.h3} mt-2`}>
                    Score: {score}/{questions.length}
                  </h2>
                  <p className={`mt-3 ${typography.small}`}>
                    You earned {quizXP} question XP plus a 20 XP completion bonus.
                    Open another level or replay this one for practice.
                  </p>
                </Card>
              ) : null}
            </div>
          ) : null}

          {activeTab === "facts" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {scienceFacts.map((fact) => (
                <Card key={fact.title} tone="white">
                  <p className="text-sm font-black uppercase text-coral">{fact.category}</p>
                  <h2 className={`${typography.h3} mt-2`}>{fact.title}</h2>
                  <p className="mt-3 text-base font-black text-ink">{fact.fact}</p>
                  <p className={`mt-3 ${typography.small}`}>{fact.explanation}</p>
                </Card>
              ))}
            </div>
          ) : null}

          {activeTab === "activities" ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {scienceActivities.map((activity) => {
                const complete = progress.completedActivities.includes(activity.id);

                return (
                  <Card key={activity.id} tone={complete ? "green" : "white"}>
                    <p className="text-sm font-black uppercase text-sky">
                      {activity.estimatedTime} - {activity.xpReward} XP
                    </p>
                    <h2 className={`${typography.h3} mt-2`}>{activity.title}</h2>
                    <p className={`mt-3 ${typography.small}`}>
                      Objective: {activity.objective}
                    </p>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <DetailList title="Materials" items={activity.materials} />
                      <DetailList title="Steps" items={activity.steps} />
                    </div>
                    <p className={`mt-4 ${typography.small}`}>
                      Learning outcome: {activity.learningOutcome}
                    </p>
                    <p className="mt-3 rounded-3xl bg-coral/10 p-4 text-sm font-bold text-ink">
                      Safety note: {activity.safetyNote}
                    </p>
                    <Button
                      onClick={() => completeActivity(activity.id, activity.xpReward)}
                      disabled={complete}
                      variant={complete ? "secondary" : "green"}
                      className="mt-5"
                    >
                      {complete ? "Completed" : "Mark Complete"}
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : null}

          {activeTab === "paths" ? (
            <div className="grid gap-5 lg:grid-cols-3">
              {scienceLearningPaths.map((path) => {
                const complete = progress.completedPaths.includes(path.id);

                return (
                  <Card key={path.id} tone={complete ? "green" : "white"}>
                    <p className="text-sm font-black uppercase text-coral">{path.ageRange}</p>
                    <h2 className={`${typography.h3} mt-2`}>{path.title}</h2>
                    <p className={`mt-3 ${typography.small}`}>
                      Completion badge: {path.completionBadge}
                    </p>
                    <DetailList title="Levels" items={path.levels} />
                    <DetailList title="Topics" items={path.topics} className="mt-4" />
                    <DetailList title="Recommended order" items={path.recommendedOrder} className="mt-4" />
                    <Button
                      onClick={() => completePath(path.id, path.xpReward, path.completionBadge)}
                      disabled={complete}
                      variant={complete ? "secondary" : "purple"}
                      className="mt-5"
                    >
                      {complete ? "Path Complete" : `Complete Path +${path.xpReward} XP`}
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : null}
        </PageSection>
      </section>
    </>
  );
}

function QuizPanel({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  answeredCorrectly,
  onChooseAnswer,
  onNext,
}: {
  question: ScienceQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  answeredCorrectly: boolean;
  onChooseAnswer: (answer: string) => void;
  onNext: () => void;
}) {
  return (
    <Card tone="yellow" className="mt-6">
      <p className="text-sm font-black uppercase text-sky">
        Question {questionIndex + 1} of {totalQuestions} - {question.topic} - {question.difficulty}
      </p>
      <h2 className={`${typography.h3} mt-3`}>{question.question}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const style =
            selectedAnswer && isCorrect
              ? "border-mint bg-mint/20"
              : selectedAnswer && isSelected
                ? "border-coral bg-coral/10"
                : "border-ink/10 bg-white hover:border-sky";

          return (
            <button
              key={option}
              onClick={() => onChooseAnswer(option)}
              className={`min-h-14 rounded-3xl border-2 px-4 py-3 text-left text-base font-black text-ink transition focus:outline-none focus:ring-4 focus:ring-sky/25 ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selectedAnswer ? (
        <div className="mt-5 rounded-3xl bg-white p-5">
          <p className="text-lg font-black text-ink">
            {answeredCorrectly ? `Correct! +${question.xpReward} XP` : "Good try!"}
          </p>
          <p className={`mt-2 ${typography.small}`}>{question.explanation}</p>
          <Button onClick={onNext} variant="blue" className="mt-4">
            {questionIndex === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

function DetailList({
  title,
  items,
  className = "",
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm font-black uppercase text-ink/60">{title}</p>
      <ul className="mt-2 space-y-2 text-sm font-bold leading-6 text-ink/70">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-white/80 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}