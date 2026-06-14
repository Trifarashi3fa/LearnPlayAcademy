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
  const activitiesCompleted = dashboardData.gamesPlayed;
  const starsEarned = Math.max(activitiesCompleted * 12, Math.floor(dashboardData.currentXP / 10), 24);
  const badgesCollected = Math.max(2, Math.min(8, activitiesCompleted + 2));
  const currentStreak = activitiesCompleted > 0 ? "3 days" : "Ready";
  const recentLearning =
    dashboardData.recentActivity.length > 0
      ? dashboardData.recentActivity
      : [
          {
            id: "sample-math",
            gameTitle: "Math Quiz Battle",
            subject: "Mathematics",
            score: 8,
            totalQuestions: 10,
            xpEarned: 100,
            playedAt: new Date().toISOString(),
          },
          {
            id: "sample-english",
            gameTitle: "English Word Builder",
            subject: "English",
            score: 7,
            totalQuestions: 10,
            xpEarned: 90,
            playedAt: new Date().toISOString(),
          },
        ];
  const achievements = [
    "First activity completed",
    "Word practice started",
    "Math confidence builder",
    "Progress tracker unlocked",
  ];

  return (
    <PageLayout
      eyebrow="Student Dashboard"
      title={`Welcome, ${studentName}`}
      description="A bright snapshot of activities completed, streaks, stars, badges, recent learning, and achievements."
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
            title="Activities Completed"
            value={activitiesCompleted}
            helper="Learning sessions finished"
            tone="yellow"
          />
          <DashboardCard
            title="Current Streak"
            value={currentStreak}
            helper="Keep practicing regularly"
            tone="green"
          />
          <DashboardCard
            title="Stars Earned"
            value={starsEarned}
            helper="Reward progress"
            tone="blue"
          />
          <DashboardCard
            title="Badges Collected"
            value={badgesCollected}
            helper="Achievement moments"
            tone="purple"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <DashboardCard title="Progress Level" tone="white">
            <ProgressBar
              value={levelProgress.progressPercent}
              label={`Level ${levelProgress.level}`}
              colorClass="bg-sky"
            />
            <p className="mt-4 text-sm font-bold leading-6 text-ink/70">
              Current XP: {dashboardData.currentXP}. Level progress helps
              learners see effort build over time.
            </p>
          </DashboardCard>

          <DashboardCard title="Achievements" tone="pink">
            <ul className="space-y-3">
              {achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="rounded-3xl bg-white px-4 py-3 text-sm font-black text-ink"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <DashboardCard title="Recent Learning" tone="white">
            <ul className="space-y-3">
              {recentLearning.map((activity) => (
                <li
                  key={activity.id}
                  className="rounded-3xl bg-cloud px-4 py-3 text-sm font-black text-ink"
                >
                  <span className="block">{activity.gameTitle}</span>
                  <span className="block text-xs font-bold text-ink/60">
                    {activity.subject} - {activity.score}/{activity.totalQuestions} score - +{activity.xpEarned} XP - {formatDate(activity.playedAt)}
                  </span>
                </li>
              ))}
            </ul>
          </DashboardCard>

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
                    {subject.totalXP} XP - Level {subject.currentLevel} - {subject.gamesPlayed} games - Best score {subject.bestScore}
                  </p>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="mt-6 rounded-3xl bg-[#FFF6D8] p-6">
          <h2 className={typography.h3}>Progress made visible</h2>
          <p className="mt-3 text-base font-bold leading-7 text-ink/70">
            The dashboard gives families a clear, encouraging view of practice,
            rewards, and learning habits.
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
}