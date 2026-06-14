"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardCard, ProgressBar } from "@/components/DashboardCard";
import { PageLayout, PageSection } from "@/components/PageLayout";
import { typography } from "@/components/theme";
import { calculateLevel, getStoredProgress } from "@/lib/xp";

const mockDashboard = {
  currentXP: 340,
  gamesPlayed: 6,
  subjectProgress: [
    { subject: "Mathematics", progress: 72, colorClass: "bg-sunshine" },
    { subject: "English", progress: 58, colorClass: "bg-mint" },
    { subject: "Science", progress: 35, colorClass: "bg-sky" },
    { subject: "Critical Thinking", progress: 44, colorClass: "bg-purple" },
    { subject: "Life Skills", progress: 28, colorClass: "bg-coral" },
  ],
  recentActivity: [
    "Completed Math Quiz Battle",
    "Built 7 words in English Word Builder",
    "Earned a 20 XP completion bonus",
    "Practiced Science Explorer preview",
  ],
};

export function StudentDashboard({ userEmail }: { userEmail?: string }) {
  const [currentXP, setCurrentXP] = useState(mockDashboard.currentXP);
  const [gamesPlayed, setGamesPlayed] = useState(mockDashboard.gamesPlayed);

  useEffect(() => {
    const storedProgress = getStoredProgress();

    if (storedProgress.totalXP > 0) {
      setCurrentXP(storedProgress.totalXP);
      setGamesPlayed(
        Object.values(storedProgress.completedGames).reduce(
          (total, count) => total + count,
          0,
        ),
      );
    }
  }, []);

  const levelProgress = useMemo(() => calculateLevel(currentXP), [currentXP]);

  return (
    <PageLayout
      eyebrow="Student Dashboard"
      title="Your LearnPlay progress"
      description="A bright snapshot of XP, level, games, subjects, and recent activity for the signed-in student. This dashboard uses local mock data for now and is ready for future account integration."
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
            value={currentXP}
            helper="Stored locally for this browser"
            tone="yellow"
          />
          <DashboardCard
            title="Current Level"
            value={levelProgress.level}
            helper={
              levelProgress.nextLevelXP
                ? `${levelProgress.nextLevelXP - currentXP} XP to next level`
                : "Top level reached"
            }
            tone="purple"
          />
          <DashboardCard
            title="Games Played"
            value={gamesPlayed}
            helper="Includes local completed demos"
            tone="green"
          />
          <DashboardCard
            title="Next Goal"
            value="Level Up"
            helper="Keep playing to grow"
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
              XP progress is saved locally today. Later, this can connect to a
              student account and parent dashboard.
            </p>
          </DashboardCard>

          <DashboardCard title="Recent Activity" tone="pink">
            <ul className="space-y-3">
              {mockDashboard.recentActivity.map((activity) => (
                <li
                  key={activity}
                  className="rounded-3xl bg-white px-4 py-3 text-sm font-black text-ink"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>

        <div className="mt-6">
          <DashboardCard title="Subject Progress" tone="white">
            <div className="grid gap-5 md:grid-cols-2">
              {mockDashboard.subjectProgress.map((subject) => (
                <div
                  key={subject.subject}
                  className="rounded-3xl border border-ink/10 bg-cloud p-4"
                >
                  <ProgressBar
                    value={subject.progress}
                    label={subject.subject}
                    colorClass={subject.colorClass}
                  />
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="mt-6 rounded-3xl bg-[#FFF6D8] p-6">
          <h2 className={typography.h3}>Future dashboard integration</h2>
          <p className="mt-3 text-base font-bold leading-7 text-ink/70">
            This screen is structured so local XP, subject progress, and recent
            activity can later be replaced with synced student data when
            authentication and a database are introduced.
          </p>
        </div>
      </PageSection>
    </PageLayout>
  );
}
