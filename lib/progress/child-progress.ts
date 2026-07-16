import type { SupabaseClient } from "@supabase/supabase-js";
import type { ChildProfile } from "@/data/account-types";
import type { LocalProgressV2, ProgressWorldRef, WorldProgressRecord } from "@/data/progress-types";
import { getSelectedChildProfile } from "@/lib/account/profiles";
import {
  createDefaultLocalProgress,
  getWorldProgress,
  normalizeLocalProgress,
  progressWorldKey,
} from "@/lib/progress/local-progress";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type ProgressSyncStatus =
  | "loading"
  | "local-only"
  | "signed-out"
  | "no-child-profile"
  | "syncing"
  | "synced"
  | "error";

export type ChildProgressLoadResult = {
  progress: LocalProgressV2 | null;
  status: ProgressSyncStatus;
  lastPlayedAt: string | null;
  child: ChildProfile | null;
  message?: string;
};

export type ChildProgressSaveResult = {
  saved: boolean;
  status: ProgressSyncStatus;
  lastPlayedAt: string | null;
  message?: string;
};

type ChildProgressRow = {
  child_id: string;
  parent_id: string;
  progress_data: unknown;
  last_played_at: string | null;
};

function canUseSupabase() {
  return typeof window !== "undefined" && isSupabaseConfigured();
}

async function getAuthenticatedParent(supabase: SupabaseClient) {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

function getActiveWorld(progress: LocalProgressV2): WorldProgressRecord {
  return getWorldProgress(progress, progress.active);
}

function completedLevels(progress: LocalProgressV2) {
  return getActiveWorld(progress).completedLevels;
}

function levelStars(progress: LocalProgressV2) {
  return getActiveWorld(progress).levelStars;
}

function currentLevel(progress: LocalProgressV2) {
  return getActiveWorld(progress).currentLevel;
}

function worldProgressSummary(progress: LocalProgressV2) {
  const world = getActiveWorld(progress);
  return {
    [progressWorldKey(progress.active)]: {
      currentLevel: world.currentLevel,
      completedLevels: world.completedLevels,
      levelStars: world.levelStars,
      questionsAnswered: world.questionsAnswered,
      correctAnswers: world.correctAnswers,
    },
  };
}

function progressPayload(progress: LocalProgressV2, childId: string, parentId: string) {
  return {
    child_id: childId,
    parent_id: parentId,
    current_subject: progress.active.subject,
    current_world: progress.active.worldId,
    current_level: currentLevel(progress),
    completed_levels: completedLevels(progress),
    level_stars: levelStars(progress),
    total_xp: progress.totalXp,
    total_stars: progress.totalStars,
    badges: progress.badges,
    completed_worlds: progress.completedWorlds,
    unlocked_worlds: progress.unlockedWorlds,
    world_progress: worldProgressSummary(progress),
    progress_data: progress,
    last_played_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

export async function loadProgress(): Promise<ChildProgressLoadResult> {
  if (!canUseSupabase()) {
    return { progress: null, status: "local-only", lastPlayedAt: null, child: null };
  }

  try {
    const supabase = createClient();
    const user = await getAuthenticatedParent(supabase);
    if (!user) return { progress: null, status: "signed-out", lastPlayedAt: null, child: null };

    const { child, error: childError } = await getSelectedChildProfile(supabase, user.id);
    if (childError) {
      return { progress: null, status: "error", lastPlayedAt: null, child: null, message: childError.message };
    }
    if (!child) {
      return { progress: null, status: "no-child-profile", lastPlayedAt: null, child: null };
    }

    const { data, error } = await supabase
      .from("child_progress")
      .select("child_id,parent_id,progress_data,last_played_at")
      .eq("child_id", child.id)
      .eq("parent_id", user.id)
      .maybeSingle();

    if (error) {
      return { progress: null, status: "error", lastPlayedAt: null, child, message: error.message };
    }

    const row = data as ChildProgressRow | null;
    if (!row) {
      return { progress: null, status: "synced", lastPlayedAt: null, child };
    }

    const normalized = normalizeLocalProgress(row.progress_data);
    if (!normalized) {
      return { progress: createDefaultLocalProgress(), status: "error", lastPlayedAt: row.last_played_at, child, message: "Saved progress could not be read." };
    }

    return { progress: normalized, status: "synced", lastPlayedAt: row.last_played_at, child };
  } catch (error) {
    return {
      progress: null,
      status: "error",
      lastPlayedAt: null,
      child: null,
      message: error instanceof Error ? error.message : "Progress could not be loaded.",
    };
  }
}

export async function saveProgress(progress: LocalProgressV2): Promise<ChildProgressSaveResult> {
  if (!canUseSupabase()) {
    return { saved: false, status: "local-only", lastPlayedAt: null };
  }

  try {
    const supabase = createClient();
    const user = await getAuthenticatedParent(supabase);
    if (!user) return { saved: false, status: "signed-out", lastPlayedAt: null };

    const { child, error: childError } = await getSelectedChildProfile(supabase, user.id);
    if (childError) {
      return { saved: false, status: "error", lastPlayedAt: null, message: childError.message };
    }
    if (!child) {
      return { saved: false, status: "no-child-profile", lastPlayedAt: null };
    }

    const payload = progressPayload(progress, child.id, user.id);
    const { error } = await supabase
      .from("child_progress")
      .upsert(payload, { onConflict: "child_id" });

    if (error) {
      return { saved: false, status: "error", lastPlayedAt: null, message: error.message };
    }

    return { saved: true, status: "synced", lastPlayedAt: payload.last_played_at };
  } catch (error) {
    return {
      saved: false,
      status: "error",
      lastPlayedAt: null,
      message: error instanceof Error ? error.message : "Progress could not be saved.",
    };
  }
}

export function updateXP(progress: LocalProgressV2, xp: number): LocalProgressV2 {
  return { ...progress, totalXp: Math.max(0, progress.totalXp + xp) };
}

export function unlockLevel(progress: LocalProgressV2, ref: ProgressWorldRef, level: number): LocalProgressV2 {
  const key = progressWorldKey(ref);
  const world = progress.worlds[key];
  if (!world) return progress;
  return {
    ...progress,
    worlds: {
      ...progress.worlds,
      [key]: {
        ...world,
        currentLevel: Math.max(world.currentLevel, Math.min(10, Math.max(1, level))),
      },
    },
  };
}

export function awardBadge(progress: LocalProgressV2, badge: string): LocalProgressV2 {
  if (progress.badges.includes(badge)) return progress;
  return { ...progress, badges: [...progress.badges, badge] };
}
