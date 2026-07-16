"use client";

import Image from "next/image";
import { useState } from "react";
import { deleteChildProfile } from "@/app/account/actions";
import { ChildProfileSetupForm } from "@/components/account/ChildProfileSetupForm";
import { MvpButton, MvpButtonLink, MvpMetricCard, MvpProgressBar, MvpStatusPill, MvpSurface } from "@/components/mvp/MvpUi";
import { getYearLevelAvailabilityMessage, isSupportedMvpYearLevel, type ChildAvatar, type ChildProfile, type ChildProgressSummary } from "@/data/account-types";

const avatarImages: Record<ChildAvatar, string> = {
  learnbot: "/mascots/learnbot-happy.webp",
  explorer: "/mascots/explorer-boy-front.webp",
  star: "/rewards/star.webp",
};

function formatWorld(world: string) {
  if (world === "forest-world") return "Forest World";
  return world.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function formatLastPlayed(value: string | null) {
  if (!value) return "Not played yet";
  return new Date(value).toLocaleString();
}

export function ChildProfileManager({
  child,
  progress,
}: {
  child: ChildProfile | null;
  progress: ChildProgressSummary;
}) {
  const [editing, setEditing] = useState(false);
  const activeYear = child ? isSupportedMvpYearLevel(child.yearLevel) : false;

  if (!child) {
    return (
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <MvpSurface className="overflow-hidden bg-gradient-to-br from-[#EAF6FF] via-white to-[#FFF3C4] shadow-playful">
          <div className="grid gap-5 sm:grid-cols-[8rem_1fr] sm:items-center lg:grid-cols-1">
            <div className="relative mx-auto h-32 w-32 rounded-[2rem] bg-white/80 p-3 shadow-sm">
              <Image src="/mascots/learnbot-happy.webp" alt="LearnBot welcoming the family" fill sizes="128px" className="object-contain" priority />
            </div>
            <div>
              <MvpStatusPill tone="pink">Welcome</MvpStatusPill>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#082B80]">Set up one learner</h2>
              <p className="mt-3 text-sm font-bold leading-6 text-[#5B6B94]">
                Add a nickname, choose Year 1, and pick a friendly avatar. That is enough for the MVP.
              </p>
              <div className="mt-4 rounded-[1.25rem] bg-white/85 p-4 text-sm font-black text-[#082B80] shadow-sm">
                Use a nickname only. No child legal name or date of birth is needed.
              </div>
            </div>
          </div>
        </MvpSurface>

        <ChildProfileSetupForm child={null} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <MvpSurface className="overflow-hidden bg-gradient-to-br from-[#EAF6FF] via-white to-[#EAFBF0] p-0 shadow-playful">
          <div className="relative overflow-hidden p-5 sm:p-7">
            <span className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#66CC00]/20" aria-hidden />
            <span className="absolute bottom-8 right-12 h-16 w-16 rounded-full bg-[#FFB300]/25" aria-hidden />
            <div className="relative grid gap-6 lg:grid-cols-[11rem_1fr] lg:items-center">
              <div className="mx-auto">
                <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] border-8 border-white bg-[#FFF7D6] shadow-playful">
                  <Image src={avatarImages[child.avatar]} alt={`${child.nickname} avatar`} fill sizes="160px" className="object-contain p-2" priority />
                </div>
              </div>
              <div className="min-w-0">
                <MvpStatusPill tone="green">Selected child</MvpStatusPill>
                <h2 className="mt-3 break-words text-4xl font-black leading-tight text-[#082B80] sm:text-5xl">{child.nickname}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold text-[#5B6B94]">Year {child.yearLevel} learner</p>
                  {!activeYear ? <MvpStatusPill tone="yellow">Coming soon</MvpStatusPill> : null}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {activeYear ? <MvpButtonLink href="/mvp/world-map">Continue Learning</MvpButtonLink> : null}
                  <MvpButton type="button" tone="white" onClick={() => setEditing((current) => !current)}>
                    {editing ? "Hide Edit Form" : activeYear ? "Edit Profile" : "Switch to Year 1"}
                  </MvpButton>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-[#DDE8F5] bg-white/80 p-5 sm:grid-cols-2 lg:grid-cols-4">
            <ProfileStat label="Current world" value={formatWorld(progress.currentWorld)} />
            <ProfileStat label="Current level" value={`Level ${progress.currentLevel}`} />
            <ProfileStat label="XP" value={progress.totalXp} />
            <ProfileStat label="Stars" value={progress.totalStars} />
          </div>
        </MvpSurface>

        {!activeYear ? (
          <MvpSurface className="border-[#FFD76A] bg-[#FFF7D6]">
            <MvpStatusPill tone="yellow">Curriculum availability</MvpStatusPill>
            <h3 className="mt-3 text-2xl font-black text-[#082B80]">Active lessons are Year 1 only</h3>
            <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
              {getYearLevelAvailabilityMessage(child.yearLevel)} Your saved profile is still safe. LearnPlay will not change it silently.
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
              To play the current Mathematics Forest World MVP, edit the profile and choose Year 1.
            </p>
          </MvpSurface>
        ) : null}

        <MvpSurface>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <MvpStatusPill tone="blue">Learning progress</MvpStatusPill>
              <h3 className="mt-2 text-2xl font-black text-[#082B80]">Forest World journey</h3>
            </div>
            <p className="text-sm font-black text-[#5B6B94]">{progress.progressPercent}% complete</p>
          </div>
          <div className="mt-4">
            <MvpProgressBar value={progress.progressPercent} label="Forest World progress" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MvpMetricCard label="Badges" value={progress.badges.length} tone="pink" />
            <MvpMetricCard label="Completed" value={`${progress.completedLevels.length}/10`} tone="green" />
            <MvpMetricCard label="Last Played" value={formatLastPlayed(progress.lastPlayedAt)} tone="yellow" />
          </div>
        </MvpSurface>

        {editing ? <ChildProfileSetupForm child={child} mode="edit" /> : null}
      </div>

      <div className="space-y-6">
        <MvpSurface className="bg-gradient-to-br from-white to-[#EAF6FF]">
          <div className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:items-center xl:grid-cols-1">
            <div className="relative mx-auto h-24 w-24 rounded-[1.5rem] bg-white p-2 shadow-sm">
              <Image src="/mascots/learnbot-front.webp" alt="LearnBot helper" fill sizes="96px" className="object-contain" />
            </div>
            <div>
              <MvpStatusPill tone="yellow">LearnBot helper</MvpStatusPill>
              <h3 className="mt-3 text-2xl font-black text-[#082B80]">Family learning space</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
                Your child profile connects parent account access with Forest World progress, rewards, and parent views using a nickname-based profile.
              </p>
            </div>
          </div>
        </MvpSurface>

        <MvpSurface>
          <MvpStatusPill tone="blue">MVP note</MvpStatusPill>
          <p className="mt-3 text-sm font-bold leading-6 text-[#5B6B94]">
            The MVP currently supports one child profile. Family profiles will be available in a future update.
          </p>
        </MvpSurface>

        <MvpSurface className="border-[#FCA5A5] bg-[#FFF7F7]">
          <MvpStatusPill tone="red">Danger zone</MvpStatusPill>
          <h3 className="mt-3 text-2xl font-black text-[#082B80]">Delete child profile</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-[#5B6B94]">
            This removes the child profile. Because saved child progress is linked to the profile, linked Supabase progress may also be removed. This action cannot be undone.
          </p>
          <form
            action={deleteChildProfile}
            className="mt-4"
            onSubmit={(event) => {
              if (!window.confirm("Delete this child profile? Linked saved child progress may also be removed. This cannot be undone.")) {
                event.preventDefault();
              }
            }}
          >
            <MvpButton type="submit" tone="danger">Delete Child Profile</MvpButton>
          </form>
        </MvpSurface>
      </div>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[1.25rem] bg-white p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-[#5B6B94]">{label}</p>
      <p className="mt-1 break-words text-xl font-black text-[#082B80]">{value}</p>
    </div>
  );
}
