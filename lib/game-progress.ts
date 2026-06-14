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

type SavedGameProgress = {
  totalXP: number;
  level: number;
};

export async function saveGameResultToSupabase({
  gameId,
  gameTitle,
  subject,
  score,
  totalQuestions,
  xpEarned,
}: SaveGameResultInput): Promise<SavedGameProgress | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("current_xp,current_level,email")
    .eq("id", user.id)
    .maybeSingle();

  const previousXP = Number(profile?.current_xp ?? 0);
  const totalXP = previousXP + Math.max(0, xpEarned);
  const level = calculateLevel(totalXP).level;
  const now = new Date().toISOString();

  await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    current_xp: totalXP,
    current_level: level,
    updated_at: now,
  });

  await supabase.from("game_results").insert({
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

  const { data: subjectProgress } = await supabase
    .from("progress")
    .select("total_xp,current_level,games_played,best_score")
    .eq("user_id", user.id)
    .eq("subject", subject)
    .maybeSingle();

  const subjectXP = Number(subjectProgress?.total_xp ?? 0) + Math.max(0, xpEarned);
  const subjectLevel = calculateLevel(subjectXP).level;

  await supabase.from("progress").upsert(
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

  const localProgress = getStoredProgress();

  saveStoredProgress({
    totalXP,
    level,
    completedGames: localProgress.completedGames,
    updatedAt: now,
  });

  return { totalXP, level };
}




