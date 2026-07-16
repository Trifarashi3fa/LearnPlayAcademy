"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { activeMvpYearLevel, childAvatarOptions, parseSupportedMvpYearLevel, type ChildAvatar } from "@/data/account-types";
import { ensureParentProfile } from "@/lib/account/profiles";

function cleanNickname(value: FormDataEntryValue | null) {
  const nickname = String(value ?? "").trim();
  if (nickname.length < 1) return null;
  return nickname.slice(0, 40);
}

function cleanYear(value: FormDataEntryValue | null) {
  return parseSupportedMvpYearLevel(value);
}

function cleanAvatar(value: FormDataEntryValue | null): ChildAvatar {
  const avatar = String(value ?? "learnbot");
  return childAvatarOptions.some((option) => option.value === avatar) ? avatar as ChildAvatar : "learnbot";
}

export async function saveChildProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/account");
  }

  const nickname = cleanNickname(formData.get("nickname"));
  if (!nickname) {
    redirect("/account?error=nickname-required");
  }

  const yearLevel = cleanYear(formData.get("year_level"));
  if (!yearLevel) {
    redirect("/account?error=year-not-available");
  }

  const { error: parentError } = await ensureParentProfile(supabase, user);
  if (parentError) {
    redirect("/account?error=profile-save-failed");
  }

  const { error } = await supabase.from("child_profiles").upsert(
    {
      parent_id: user.id,
      nickname,
      year_level: yearLevel ?? activeMvpYearLevel,
      avatar: cleanAvatar(formData.get("avatar")),
      selected: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "parent_id" },
  );

  if (error) {
    console.error("[LearnPlay account] Failed to save child profile", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    redirect("/account?error=profile-save-failed");
  }

  revalidatePath("/account");
  redirect("/account?profile=saved");
}

export async function deleteChildProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/account");
  }

  const { error } = await supabase
    .from("child_profiles")
    .delete()
    .eq("parent_id", user.id);

  if (error) {
    console.error("[LearnPlay account] Failed to delete child profile", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    redirect("/account?error=profile-delete-failed");
  }

  revalidatePath("/account");
  redirect("/account?profile=deleted");
}
