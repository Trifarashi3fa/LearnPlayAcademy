"use client";

import { useRouter } from "next/navigation";
import { MvpButton } from "@/components/mvp/MvpUi";
import { trackLearningEvent } from "@/lib/learning-analytics/client";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    trackLearningEvent("auth_logout_clicked", { location: "top-navigation" });
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }

    router.push("/auth/login");
    router.refresh();
  }

  return (
    <MvpButton onClick={handleLogout} tone="white" size="sm">
      Logout
    </MvpButton>
  );
}
