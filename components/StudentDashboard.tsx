import { DashboardCard, ProgressBar } from "@/components/DashboardCard";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";
import { calculateLevel } from "@/lib/xp";

export type SubjectProgressSummary = {
  subject: string;
  totalXP: number;
  currentLevel: number;
  gamesPlayed: number;
  bestScore: number;
  progressPercent: number;
  colorClass: string;
};

export type RecentActivitySummary = {
  id: string;
  gameTitle: string;
  subject: string;
  score: number;
  totalQuestions: number;
  xpEarned: number;
  playedAt: string;
};

export type StudentDashboardData = {
  currentXP: number;
  currentLevel: number;
  gamesPlayed: number;
  subjectProgress: SubjectProgressSummary[];
  recentActivity: RecentActivitySummary[];
};

type StudentDashboardProps = {
  userEmail?: string;
  dashboardData: StudentDashboardData;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function StudentDashboard({ userEmail, dashboardData }: StudentDashboardProps) {
  const levelProgress = calculateLevel(dashboardData.currentXP);

  return (
    <PageLayout
      eyebrow="Student Dashboard"
      title="Your LearnPlay progress"
      description="A bright snapshot of XP, level, games, subjects, and recent activity from your LearnPlay account."
      heroTone="blue"
    >
      <PageSection>
        {userEmail ? (
          <p className="mb-5 rounded-3xl bg-white px-5 py-3 text-sm font-black text-ink shadow-sm">
            Signed in as {userEmail}
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Current XP"
            value={dashboardData.currentXP}
            helper="Saved in Supabase"
            tone="yellow"
          />
          <DashboardCard
            title="Current Level"
            value={dashboardData.currentLevel}
            helper={
              levelProgress.nextLevelXP
                ? `${Math.max(0, levelProgress.nextLevelXP - dashboardData.currentXP)} XP to next level`
                : "Top level reached"
            }
            tone="purple"
          />
          <DashboardCard
            title="Games Played"
            value={dashboardData.gamesPlayed}
            helper="Completed game sessions"
            tone="green"
          />
          <DashboardCard
            title="Next Goal"
            value="Level Up"
            helper="Play games to grow XP"
            tone="blue"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <DashboardCard title="Level Progress" tone="white">
            <ProgressBar
              value={levelProgress.progressPercent}
              label={`Level ${levelProgress.level}`}
              colorClass="bg-sky"
            />
            <p className="mt-4 text-sm font-bold leading-6 text-ink/70">
              XP, level, scores, and completed game history are now saved to
              Supabase for signed-in students.
            </p>
          </DashboardCard>

          <DashboardCard title="Recent Activity" tone="pink">
            {dashboardData.recentActivity.length > 0 ? (
              <ul className="space-y-3">
                {dashboardData.recentActivity.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-3xl bg-white px-4 py-3 text-sm font-black text-ink"
                  >
                    <span className="block">{activity.gameTitle}</span>
                    <span className="block text-xs font-bold text-ink/60">
                      {activity.score}/{activity.totalQuestions} score • +{activity.xpEarned} XP • {formatDate(activity.playedAt)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-3xl bg-white px-4 py-3 text-sm font-bold text-ink/70">
                No games played yet. Try Math Quiz Battle or English Word Builder.
              </p>
            )}
          </DashboardCard>
        </div>

        <div className="mt-6">
          <DashboardCard title="Subject Progress" tone="white">
            <div className="grid gap-5 md:grid-cols-2">
              {dashboardData.subjectProgress.map((subject) => (
                <div
                  key={subject.subject}
                  className="rounded-3xl border border-ink/10 bg-cloud p-4"
                >
                  <ProgressBar
                    value={subject.progressPercent}
                    label={subject.subject}
                    colorClass={subject.colorClass}
                  />
                  <p className="mt-3 text-sm font-bold text-ink/70">
                    {subject.totalXP} XP • Level {subject.currentLevel} • {subject.gamesPlayed} games • Best score {subject.bestScore}
                  </p>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="mt-6 rounded-3xl bg-[#FFF6D8] p-6">
          <h2 className={typography.h3}>Database progress tracking</h2>
          <p className="mt-3 text-base font-bold leading-7 text-ink/70">
            Game results are saved in Supabase, subject progress is summarized
            per student, and the dashboard reads that real data after login.
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
}

