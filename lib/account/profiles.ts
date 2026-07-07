import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { ChildAvatar, ChildProfile, ParentProfile } from "@/data/account-types";

type ChildProfileRow = {
  id: string;
  parent_id: string;
  nickname: string;
  year_level: number;
  avatar: ChildAvatar | null;
  selected: boolean | null;
  created_at: string;
  updated_at: string;
};

type ParentProfileRow = {
  id: string;
  email: string | null;
  display_name: string | null;
};

function logAccountError(scope: string, error: unknown) {
  if (error && typeof error === "object") {
    const supabaseError = error as {
      code?: string;
      message?: string;
      details?: string;
      hint?: string;
      name?: string;
    };
    console.error(`[LearnPlay account] ${scope}`, {
      code: supabaseError.code,
      message: supabaseError.message,
      details: supabaseError.details,
      hint: supabaseError.hint,
      name: supabaseError.name,
    });
    return;
  }

  console.error(`[LearnPlay account] ${scope}`, error);
}

export function toParentProfile(row: ParentProfileRow | null, user: User): ParentProfile {
  return {
    id: user.id,
    email: row?.email ?? user.email ?? null,
    displayName: row?.display_name ?? user.email?.split("@")[0] ?? null,
  };
}

export function toChildProfile(row: ChildProfileRow): ChildProfile {
  return {
    id: row.id,
    parentId: row.parent_id,
    nickname: row.nickname,
    yearLevel: row.year_level,
    avatar: row.avatar ?? "learnbot",
    selected: Boolean(row.selected),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getParentProfile(supabase: SupabaseClient, user: User) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,display_name")
    .eq("id", user.id)
    .maybeSingle<ParentProfileRow>();

  if (error) {
    logAccountError("Failed to load parent profile", error);
  }

  return toParentProfile(data ?? null, user);
}

export async function ensureParentProfile(supabase: SupabaseClient, user: User) {
  const payload = {
    id: user.id,
    email: user.email,
    display_name: user.email?.split("@")[0] ?? "Parent",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" })
    .select("id,email,display_name")
    .single<ParentProfileRow>();

  if (error) {
    logAccountError("Failed to ensure parent profile", error);
    return { parent: toParentProfile(null, user), error };
  }

  return { parent: toParentProfile(data, user), error: null };
}

async function selectChildRows(supabase: SupabaseClient, userId: string, selectedOnly: boolean) {
  let query = supabase
    .from("child_profiles")
    .select("id,parent_id,nickname,year_level,avatar,selected,created_at,updated_at")
    .eq("parent_id", userId)
    .order("created_at", { ascending: true })
    .limit(1);

  if (selectedOnly) {
    query = query.eq("selected", true);
  }

  return query;
}

async function markSelectedChild(supabase: SupabaseClient, child: ChildProfileRow) {
  if (child.selected === true) return child;

  const { data, error } = await supabase
    .from("child_profiles")
    .update({ selected: true, updated_at: new Date().toISOString() })
    .eq("id", child.id)
    .eq("parent_id", child.parent_id)
    .select("id,parent_id,nickname,year_level,avatar,selected,created_at,updated_at")
    .single<ChildProfileRow>();

  if (error) {
    logAccountError("Failed to auto-select child profile", error);
    return child;
  }

  return data;
}

export async function getSelectedChildProfile(supabase: SupabaseClient, userId: string) {
  const selectedResult = await selectChildRows(supabase, userId, true);

  if (selectedResult.error) {
    logAccountError("Failed to load selected child profile", selectedResult.error);
    return { child: null, error: selectedResult.error };
  }

  const selectedChild = selectedResult.data?.[0] as ChildProfileRow | undefined;
  if (selectedChild) {
    return { child: toChildProfile(selectedChild), error: null };
  }

  const fallbackResult = await selectChildRows(supabase, userId, false);

  if (fallbackResult.error) {
    logAccountError("Failed to load fallback child profile", fallbackResult.error);
    return { child: null, error: fallbackResult.error };
  }

  const fallbackChild = fallbackResult.data?.[0] as ChildProfileRow | undefined;
  if (!fallbackChild) {
    return { child: null, error: null };
  }

  const selectedFallback = await markSelectedChild(supabase, fallbackChild);
  return { child: toChildProfile(selectedFallback), error: null };
}