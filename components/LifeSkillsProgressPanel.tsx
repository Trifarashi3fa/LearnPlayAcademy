"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { typography } from "@/components/theme";

type LifeSkillsProgress = {
  xp: number;
  completedCategories: string[];
  completedActivities: string[];
  badges: string[];
};

const storageKey = "learnplay-life-skills-progress-v1";

const defaultProgress: LifeSkillsProgress = {
  xp: 0,
  completedCategories: [],
  completedActivities: [],
  badges: [],
};

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function loadProgress() {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved ? { ...defaultProgress, ...JSON.parse(saved) } as LifeSkillsProgress : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: LifeSkillsProgress) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress));
}

function getLevel(xp: number) {
  if (xp >= 250) {
    return { label: "Advanced", percent: 100 };
  }

  if (xp >= 100) {
    return { label: "Intermediate", percent: Math.min(100, Math.round(((xp - 100) / 150) * 100)) };
  }

  return { label: "Beginner", percent: Math.min(100, Math.round((xp / 100) * 100)) };
}

export function LifeSkillsProgressPanel() {
  const [progress, setProgress] = useState<LifeSkillsProgress>(defaultProgress);
  const level = getLevel(progress.xp);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  function resetProgress() {
    saveProgress(defaultProgress);
    setProgress(defaultProgress);
  }

  return (
    <Card tone="yellow">
      <p className="text-sm font-black uppercase text-ink/60">Life Skills XP</p>
      <p className="mt-3 text-5xl font-black text-ink">{progress.xp}</p>
      <div className="mt-5">
        <div className="flex items-center justify-between text-sm font-black text-ink/70">
          <span>{level.label} progress</span>
          <span>{level.percent}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full bg-sky" style={{ width: `${level.percent}%` }} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {progress.badges.length > 0 ? (
          progress.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-mint px-3 py-2 text-xs font-black text-ink">
              {badge}
            </span>
          ))
        ) : (
          <p className={typography.small}>Complete activities to earn badges.</p>
        )}
      </div>
      <Button onClick={resetProgress} variant="secondary" className="mt-6">
        Reset Local Progress
      </Button>
    </Card>
  );
}

export function CompleteLifeSkillButton({
  itemId,
  badge,
  xpReward,
  type = "activity",
}: {
  itemId: string;
  badge: string;
  xpReward: number;
  type?: "activity" | "category";
}) {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const progress = loadProgress();
    setComplete(
      type === "activity"
        ? progress.completedActivities.includes(itemId)
        : progress.completedCategories.includes(itemId),
    );
  }, [itemId, type]);

  function markComplete() {
    const progress = loadProgress();
    if (
      (type === "activity" && progress.completedActivities.includes(itemId)) ||
      (type === "category" && progress.completedCategories.includes(itemId))
    ) {
      setComplete(true);
      return;
    }

    const updated: LifeSkillsProgress = {
      ...progress,
      xp: progress.xp + xpReward,
      completedActivities:
        type === "activity"
          ? unique([...progress.completedActivities, itemId])
          : progress.completedActivities,
      completedCategories:
        type === "category"
          ? unique([...progress.completedCategories, itemId])
          : progress.completedCategories,
      badges: unique([...progress.badges, badge]),
    };

    if (updated.badges.length >= 6) {
      updated.badges = unique([...updated.badges, "Life Skills Champion Badge"]);
    }

    saveProgress(updated);
    setComplete(true);
  }

  return (
    <Button onClick={markComplete} disabled={complete} variant={complete ? "secondary" : "green"}>
      {complete ? "Completed" : `Complete +${xpReward} XP`}
    </Button>
  );
}