import { DashboardCard, ProgressBar } from "@/components/DashboardCard";
import { PageLayout, PageSection } from "@/components/PageLayout";
import {
  StudentProfileForm,
  type StudentProfileSummary,
} from "@/components/StudentProfileForm";
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
  profile: StudentProfileSummary;
  profileAction: (formData: FormData) => Promise<void>;
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

function getStudentDisplayName(profile: StudentProfileSummary, userEmail?: string) {
  if (profile.studentName) {
    return profile.studentName;
  }

  return userEmail?.split("@")[0] ?? "Student";
}

export function StudentDashboard({
  userEmail,
  profile,
  profileAction,
  dashboardData,
}: StudentDashboardProps) {
  const levelProgress = calculateLevel(dashboardData.currentXP);
  const studentName = getStudentDisplayName(profile, userEmail);

  return (
    <PageLayout
      eyebrow="Student Dashboard"
      title={`Welcome, ${studentName}`}
      description="A bright snapshot of XP, level, games, subjects, and recent activity from your LearnPlay account."
      heroTone="blue"
    >
      <PageSection>
        {userEmail ? (
          <p className="mb-5 rounded-3xl bg-white px-5 py-3 text-sm font-black text-ink shadow-sm">
            Signed in as {userEmail}
          </p>
        ) : null}

        <div className="mb-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <DashboardCard title="Profile Snapshot" tone="blue">
            <div className="grid gap-3 text-sm font-black text-ink/70">
              <p>
                Name: <span className="text-ink">{profile.studentName ?? "Not set yet"}</span>
              </p>
              <p>
                Age: <span className="text-ink">{profile.age ?? "Not set yet"}</span>
              </p>
              <p>
                Grade: <span className="text-ink">{profile.gradeLevel ?? "Not set yet"}</span>
              </p>
              <p>
                Favorite subject:{" "}
                <span className="text-ink">{profile.favoriteSubject ?? "Not set yet"}</span>
              </p>
            </div>
          </DashboardCard>

          <StudentProfileForm profile={profile} action={profileAction} />
        </div>

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
              XP, level, scores, and completed game history are saved to
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
          <h2 className={typography.h3}>Student profile basics</h2>
          <p className="mt-3 text-base font-bold leading-7 text-ink/70">
            Student name, age, grade level, and favorite subject are now saved
            with each LearnPlay account.
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
}
