import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { calculateLevel, getStoredProgress, saveStoredProgress } from "@/lib/xp";

type SaveGameResultInput = {
  gameId: string;
  gameTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  xpEarned: number;
};

export type SaveGameResultResponse = {
  totalXP: number;
  level: number;
  savedToSupabase: boolean;
  message: string;
};

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }

  return "Unable to save progress.";
}

export async function saveGameResultToSupabase({
  gameId,
  gameTitle,
  subject,
  score,
  totalQuestions,
  xpEarned,
}: SaveGameResultInput): Promise<SaveGameResultResponse> {
  const localProgress = getStoredProgress();

  if (!isSupabaseConfigured()) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: "Supabase is not configured yet. Progress was saved locally only.",
    };
  }

  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: "Log in before finishing a game to save progress to the dashboard.",
    };
  }

  const { data: profile, error: profileReadError } = await supabase
    .from("profiles")
    .select("current_xp,current_level,email")
    .eq("id", user.id)
    .maybeSingle();

  if (profileReadError) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: getErrorMessage(profileReadError),
    };
  }

  const previousXP = Number(profile?.current_xp ?? 0);
  const totalXP = previousXP + Math.max(0, xpEarned);
  const level = calculateLevel(totalXP).level;
  const now = new Date().toISOString();

  const { error: profileSaveError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      current_xp: totalXP,
      current_level: level,
      updated_at: now,
    },
    { onConflict: "id" },
  );

  if (profileSaveError) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: getErrorMessage(profileSaveError),
    };
  }

  const { error: resultSaveError } = await supabase.from("game_results").insert({
    user_id: user.id,
    game_id: gameId,
    game_title: gameTitle,
    subject,
    score,
    total_questions: totalQuestions,
    xp_earned: xpEarned,
    level_after: level,
    played_at: now,
  });

  if (resultSaveError) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: getErrorMessage(resultSaveError),
    };
  }

  const { data: subjectProgress, error: progressReadError } = await supabase
    .from("progress")
    .select("total_xp,current_level,games_played,best_score")
    .eq("user_id", user.id)
    .eq("subject", subject)
    .maybeSingle();

  if (progressReadError) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: getErrorMessage(progressReadError),
    };
  }

  const subjectXP = Number(subjectProgress?.total_xp ?? 0) + Math.max(0, xpEarned);
  const subjectLevel = calculateLevel(subjectXP).level;

  const { error: progressSaveError } = await supabase.from("progress").upsert(
    {
      user_id: user.id,
      subject,
      total_xp: subjectXP,
      current_level: subjectLevel,
      games_played: Number(subjectProgress?.games_played ?? 0) + 1,
      best_score: Math.max(Number(subjectProgress?.best_score ?? 0), score),
      last_played_at: now,
      updated_at: now,
    },
    { onConflict: "user_id,subject" },
  );

  if (progressSaveError) {
    return {
      totalXP: localProgress.totalXP,
      level: localProgress.level,
      savedToSupabase: false,
      message: getErrorMessage(progressSaveError),
    };
  }

  saveStoredProgress({
    totalXP,
    level,
    completedGames: localProgress.completedGames,
    updatedAt: now,
  });

  return {
    totalXP,
    level,
    savedToSupabase: true,
    message: "Progress saved to your dashboard.",
  };
}
