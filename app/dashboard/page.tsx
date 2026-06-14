import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/LogoutButton";
import {
  StudentDashboard,
  type RecentActivitySummary,
  type StudentDashboardData,
  type SubjectProgressSummary,
} from "@/components/StudentDashboard";
import { updateStudentProfile } from "@/app/dashboard/actions";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { calculateLevel } from "@/lib/xp";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View LearnPlay Academy student progress, activities completed, streaks, stars, badges, recent learning, and achievements.",
  openGraph: {
    title: "LearnPlay Academy Student Dashboard",
    description:
      "A parent-friendly progress view for LearnPlay Academy learners.",
  },
};

const defaultSubjects = [
  { subject: "Mathematics", colorClass: "bg-sunshine" },
  { subject: "English", colorClass: "bg-mint" },
  { subject: "Science", colorClass: "bg-sky" },
  { subject: "Bahasa Melayu", colorClass: "bg-purple" },
  { subject: "Critical Thinking", colorClass: "bg-coral" },
  { subject: "Life Skills", colorClass: "bg-mint" },
];

type ProfileRow = {
  current_xp: number | null;
  current_level: number | null;
  display_name: string | null;
  student_name: string | null;
  age: number | null;
  grade_level: string | null;
  favorite_subject: string | null;
};

type ProgressRow = {
  subject: string;
  total_xp: number | null;
  current_level: number | null;
  games_played: number | null;
  best_score: number | null;
  last_played_at: string | null;
};

type GameResultRow = {
  id: string;
  game_title: string;
  subject: string;
  score: number;
  total_questions: number;
  xp_earned: number;
  played_at: string;
};

function buildSubjectProgress(progressRows: ProgressRow[]): SubjectProgressSummary[] {
  return defaultSubjects.map((subject) => {
    const progress = progressRows.find((row) => row.subject === subject.subject);
    const totalXP = Number(progress?.total_xp ?? 0);
    const levelProgress = calculateLevel(totalXP);

    return {
      subject: subject.subject,
      totalXP,
      currentLevel: Number(progress?.current_level ?? levelProgress.level),
      gamesPlayed: Number(progress?.games_played ?? 0),
      bestScore: Number(progress?.best_score ?? 0),
      progressPercent: levelProgress.progressPercent,
      colorClass: subject.colorClass,
    };
  });
}

function buildRecentActivity(results: GameResultRow[]): RecentActivitySummary[] {
  return results.map((result) => ({
    id: result.id,
    gameTitle: result.game_title,
    subject: result.subject,
    score: result.score,
    totalQuestions: result.total_questions,
    xpEarned: result.xp_earned,
    playedAt: result.played_at,
  }));
}

export default async function DashboardPage() {
  if (!isSupabaseConfigured()) {
    redirect("/login");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { count: gamesPlayed }, { data: progressRows }, { data: results }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("current_xp,current_level,display_name,student_name,age,grade_level,favorite_subject")
        .eq("id", user.id)
        .maybeSingle<ProfileRow>(),
      supabase
        .from("game_results")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("progress")
        .select("subject,total_xp,current_level,games_played,best_score,last_played_at")
        .eq("user_id", user.id),
      supabase
        .from("game_results")
        .select("id,game_title,subject,score,total_questions,xp_earned,played_at")
        .eq("user_id", user.id)
        .order("played_at", { ascending: false })
        .limit(5),
    ]);

  const currentXP = Number(profile?.current_xp ?? 0);
  const dashboardData: StudentDashboardData = {
    currentXP,
    currentLevel: Number(profile?.current_level ?? calculateLevel(currentXP).level),
    gamesPlayed: gamesPlayed ?? 0,
    subjectProgress: buildSubjectProgress((progressRows ?? []) as ProgressRow[]),
    recentActivity: buildRecentActivity((results ?? []) as GameResultRow[]),
  };

  return (
    <div>
      <div className="mx-auto flex max-w-6xl justify-end px-5 pt-6 lg:px-8">
        <LogoutButton />
      </div>
      <StudentDashboard
        userEmail={user.email ?? "Student"}
        profile={{
          studentName: profile?.student_name ?? profile?.display_name ?? null,
          age: profile?.age ?? null,
          gradeLevel: profile?.grade_level ?? null,
          favoriteSubject: profile?.favorite_subject ?? null,
        }}
        profileAction={updateStudentProfile}
        dashboardData={dashboardData}
      />
    </div>
  );
}