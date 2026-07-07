import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ChildProfileManager } from "@/components/account/ChildProfileManager";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { MvpEmptyState, MvpStatusPill } from "@/components/mvp/MvpUi";
import type { ChildProgressSummary } from "@/data/account-types";
import { getParentProfile, getSelectedChildProfile } from "@/lib/account/profiles";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Parent Account",
  description: "Manage your LearnPlay Academy parent account and child profile.",
};

type ChildProgressRow = {
  current_world: string | null;
  current_level: number | null;
  completed_levels: number[] | null;
  total_xp: number | null;
  total_stars: number | null;
  badges: string[] | null;
  last_played_at: string | null;
};

const emptyProgress: ChildProgressSummary = {
  currentWorld: "forest-world",
  currentLevel: 1,
  completedLevels: [],
  totalXp: 0,
  totalStars: 0,
  badges: [],
  lastPlayedAt: null,
  progressPercent: 0,
};

async function loadChildProgressSummary(
  supabase: Awaited<ReturnType<typeof createClient>>,
  childId: string,
  parentId: string,
): Promise<ChildProgressSummary> {
  const { data, error } = await supabase
    .from("child_progress")
    .select("current_world,current_level,completed_levels,total_xp,total_stars,badges,last_played_at")
    .eq("child_id", childId)
    .eq("parent_id", parentId)
    .order("last_played_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("[LearnPlay account] Failed to load child progress summary", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return emptyProgress;
  }

  const row = data?.[0] as ChildProgressRow | undefined;
  if (!row) return emptyProgress;

  const completedLevels = Array.isArray(row.completed_levels) ? row.completed_levels : [];

  return {
    currentWorld: row.current_world ?? "forest-world",
    currentLevel: row.current_level ?? Math.min(10, completedLevels.length + 1),
    completedLevels,
    totalXp: row.total_xp ?? 0,
    totalStars: row.total_stars ?? 0,
    badges: Array.isArray(row.badges) ? row.badges : [],
    lastPlayedAt: row.last_played_at,
    progressPercent: Math.round((completedLevels.length / 10) * 100),
  };
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; profile?: string }>;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <AccountShell>
        <MvpEmptyState
          title="Supabase is not configured yet"
          description="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local to enable parent registration and child profile setup."
        />
      </AccountShell>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/account");
  }

  const params = await searchParams;
  const parent = await getParentProfile(supabase, user);
  const { child, error } = await getSelectedChildProfile(supabase, user.id);
  const progress = child ? await loadChildProgressSummary(supabase, child.id, user.id) : emptyProgress;

  return (
    <AccountShell>
      <div className="mb-6 flex flex-col gap-3 rounded-[1.5rem] border border-[#DDE8F5] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <MvpStatusPill tone="green">Signed in</MvpStatusPill>
          <p className="mt-2 text-sm font-bold text-[#5B6B94]">{parent.email}</p>
        </div>
        <LogoutButton />
      </div>

      {params?.profile === "saved" ? (
        <div className="mb-6 rounded-[1.25rem] bg-[#DCFCE7] p-4 text-sm font-bold text-[#14532D]" role="status">
          Child profile saved.
        </div>
      ) : null}

      {params?.profile === "deleted" ? (
        <div className="mb-6 rounded-[1.25rem] bg-[#FFF3C4] p-4 text-sm font-bold text-[#9A6700]" role="status">
          Child profile deleted. You can create a new one below.
        </div>
      ) : null}

      {params?.error || error ? (
        <div className="mb-6 rounded-[1.25rem] bg-[#FEE2E2] p-4 text-sm font-bold text-[#B91C1C]" role="alert">
          {params?.error === "nickname-required"
            ? "Please add a child nickname."
            : "We could not load or save the child profile. You can try the form below. The server console includes the exact Supabase error."}
        </div>
      ) : null}

      <ChildProfileManager child={child} progress={progress} />
    </AccountShell>
  );
}

function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-[#FFFDF7] text-[#082B80]">
      <section className="overflow-hidden bg-[#EAF6FF]">
        <div className="relative mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <span className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-[#FFB300]/25" aria-hidden />
          <span className="absolute bottom-6 right-40 h-16 w-16 rounded-full bg-[#66CC00]/20" aria-hidden />
          <p className="text-sm font-black uppercase tracking-wide text-[#FF4FA0]">Parent account</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Your LearnPlay family space</h1>
          <p className="mt-4 max-w-2xl text-base font-bold leading-7 text-[#5B6B94]">
            Manage one child profile, continue Forest World, and keep learning progress connected.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">{children}</section>
    </main>
  );
}